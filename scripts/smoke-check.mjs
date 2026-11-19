#!/usr/bin/env node
// No-JS smoke test (gobinath.com docs/DESIGN.md §8). VitePress pre-renders every page to HTML, so if
// the built files contain the content, visitors without JavaScript can read it.
// Run after `pnpm docs:build`: pnpm smoke
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(fileURLToPath(import.meta.url), '../../.vitepress/dist');
const problems = [];
const walk = (d, out = []) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    statSync(p).isDirectory() ? (n !== 'assets' && n !== 'cheatsheets' && walk(p, out)) : out.push(p);
  }
  return out;
};
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

if (!existsSync(dist)) { console.error('[smoke] dist missing: run `pnpm docs:build` first'); process.exit(1); }
const pages = walk(dist).filter((p) => p.endsWith('.html'));
if (pages.length < 20) problems.push(`only ${pages.length} pages built`);

for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const rel = relative(dist, p);
  // Dark by default, also without JavaScript (DESIGN.md §3)
  if (!/<html[^>]*class="[^"]*\bdark\b/.test(html)) problems.push(`${rel}: <html> is not dark by default`);
  // Click-to-load only: no third-party players embedded on load
  if (/<iframe[^>]+src="https?:\/\/(?!([a-z0-9-]+\.)*gobinath\.com)/.test(html)) problems.push(`${rel}: embeds a third-party iframe`);
  // 404 and the certifications/ redirect stub have no article content by design
  if (rel === '404.html' || rel === 'certifications/index.html') continue;
  if (!/<h1[\s>]/.test(html)) problems.push(`${rel}: no <h1>`);
  if (rel.startsWith('certifications/') && !rel.endsWith('certifications/index.html') && text(html).split(/\s+/).length < 120)
    problems.push(`${rel}: under 120 words of readable text`);
}

for (const must of ['index.html', 'privacy.html', 'ai-disclaimer.html', 'sitemap.xml'])
  if (!existsSync(join(dist, must))) problems.push(`missing ${must}`);

if (problems.length) {
  console.error('[smoke] FAILED\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log(`[smoke] ok (${pages.length} pages readable without JavaScript, dark by default)`);
