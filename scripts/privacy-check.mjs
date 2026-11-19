#!/usr/bin/env node
// Privacy guard, run in CI on every PR. Fails the build when:
//   1. An image in src/ or public/ carries GPS data (EXIF in JPEG, eXIf chunk in PNG) or is HEIC.
//   2. The built site loads anything from a host that isn't on the allowlist below.
//   3. Source or built output contains a private term. The terms themselves are private, so they
//      are NOT in this repo: CI reads them from the PRIVACY_TERMS secret (one per line, or comma
//      separated). Locally, put them in .privacy-terms (gitignored).
//
// Copied from gobinath.com (docs/DESIGN.md §5); keep the two in sync.
// Run after `pnpm docs:build`: pnpm privacy

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '../..');
const problems = [];
const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n === '_originals' || n.startsWith('.')) continue;
    const p = join(dir, n);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};
const rel = (p) => relative(root, p);

// 1. Image metadata ----------------------------------------------------------------------------
// Looks for the GPS IFD pointer (tag 0x8825) in IFD0 of a TIFF/EXIF block starting at offset t.
function tiffHasGps(buf, t) {
  const le = buf.toString('latin1', t, t + 2) === 'II';
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd = t + u32(t + 4);
  const n = u16(ifd);
  for (let e = 0; e < n; e++) if (u16(ifd + 2 + e * 12) === 0x8825) return true;
  return false;
}

// JPEG: the APP1 "Exif" segment
export function jpegHasGps(buf) {
  let i = 2;
  while (i + 4 < buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    if (marker === 0xe1 && buf.toString('latin1', i + 4, i + 10) === 'Exif\0\0' && tiffHasGps(buf, i + 10)) return true;
    if (marker === 0xda) break; // start of image data, no more metadata
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return false;
}

// PNG: the eXIf chunk holds a bare TIFF block
export function pngHasGps(buf) {
  for (let i = 8; i + 8 < buf.length; ) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString('latin1', i + 4, i + 8);
    if (type === 'eXIf' && tiffHasGps(buf, i + 8)) return true;
    if (type === 'IDAT' || type === 'IEND') break;
    i += 12 + len;
  }
  return false;
}

const contentDirs = ['certifications', 'resources', 'public', '.vitepress/theme'].map((d) => join(root, d));
for (const f of contentDirs.flatMap((d) => walk(d))) {
  const ext = extname(f).toLowerCase();
  if (ext === '.heic' || ext === '.heif') problems.push(`${rel(f)}: HEIC photo, convert to JPEG and strip metadata`);
  if (ext === '.jpg' || ext === '.jpeg') { if (jpegHasGps(readFileSync(f))) problems.push(`${rel(f)}: has GPS location data`); }
  if (ext === '.png') { if (pngHasGps(readFileSync(f))) problems.push(`${rel(f)}: has GPS location data`); }
}

// 2. Third-party loads in the built site --------------------------------------------------------
// Links people click are fine; this only checks what the browser loads on its own.
const ALLOWED_HOSTS = [
  /(^|\.)gobinath\.com$/,
  /^gemini-proxy\.gobinathm\.workers\.dev$/, // AI study assistant proxy (worker/)
  /^cloud\.umami\.is$/,                     // privacy-friendly analytics
  /^api-gateway\.umami\.dev$/,              // Umami collector (preconnect)
  // VitePress keeps a fallback for social-link icons it doesn't bundle. The only icon used
  // (github) is built in, so this URL is never requested; it just appears in the theme bundle.
  /^api\.iconify\.design$/,
];
const dist = join(root, '.vitepress', 'dist');
if (!existsSync(dist)) problems.push('dist missing: run `pnpm docs:build` first');
for (const f of walk(dist).filter((p) => /\.(html|css|js)$/.test(p))) {
  const s = readFileSync(f, 'utf8');
  const urls = [
    ...s.matchAll(/\s(?:src|action|data-live-url|poster)="(https?:\/\/[^"]+)"/g),
    ...s.matchAll(/<link\b[^>]*\bhref="(https?:\/\/[^"]+)"/g),
    ...s.matchAll(/url\(\s*["']?(https?:\/\/[^)"']+)/g),
    ...s.matchAll(/@import\s+["'](https?:\/\/[^"']+)/g),
  ].map((m) => m[1]);
  for (const u of urls) {
    const host = new URL(u).hostname;
    if (!ALLOWED_HOSTS.some((r) => r.test(host))) problems.push(`${rel(f)}: loads from ${host} (${u.slice(0, 80)})`);
  }
}

// 3. Private terms ------------------------------------------------------------------------------
const termsFile = join(root, '.privacy-terms');
const raw = process.env.PRIVACY_TERMS || (existsSync(termsFile) ? readFileSync(termsFile, 'utf8') : '');
const terms = raw.split(/[\n,]/).map((t) => t.trim()).filter((t) => t && !t.startsWith('#'));
if (!terms.length) console.log('[privacy] no private terms configured (PRIVACY_TERMS or .privacy-terms), skipping term check');
else {
  const files = [...contentDirs.flatMap((d) => walk(d)), ...walk(dist), ...['index.md', 'privacy.md', 'ai-disclaimer.md'].map((f) => join(root, f))]
    .filter((p) => /\.(astro|ts|mjs|js|json|md|html|css|txt|xml)$/.test(p));
  for (const f of files) {
    const s = readFileSync(f, 'utf8').toLowerCase();
    for (const t of terms) {
      const re = new RegExp(`\\b${t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      // Never print the term itself: CI logs are public
      if (re.test(s)) problems.push(`${rel(f)}: contains private term #${terms.indexOf(t) + 1}`);
    }
  }
}

if (problems.length) {
  console.error('[privacy] FAILED\n' + [...new Set(problems)].map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log(`[privacy] ok (${terms.length} private terms checked)`);
