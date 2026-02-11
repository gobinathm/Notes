/**
 * Gemini API Proxy Worker
 * Routes requests from notes.gobinath.com to Gemini 2.5 Flash-Lite.
 * Handles CORS, rate limiting, and input validation.
 */

const ALLOWED_ORIGINS = [
  'https://notes.gobinath.com',
  'https://gobinathmallaiyan.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

const RATE_LIMIT_PER_MIN = 10;
const RATE_LIMIT_PER_DAY = 100;
const MAX_CONTENT_LENGTH = 50 * 1024; // 50KB
const MAX_QUESTION_LENGTH = 500;

// In-memory rate limiting (resets on cold start)
const rateLimits = new Map();

function getRateLimitKey(ip) {
  return ip || 'unknown';
}

function checkRateLimit(ip) {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  let entry = rateLimits.get(key);

  if (!entry) {
    entry = { minuteCount: 0, minuteStart: now, dayCount: 0, dayStart: now };
    rateLimits.set(key, entry);
  }

  // Reset minute window
  if (now - entry.minuteStart > 60_000) {
    entry.minuteCount = 0;
    entry.minuteStart = now;
  }

  // Reset day window
  if (now - entry.dayStart > 86_400_000) {
    entry.dayCount = 0;
    entry.dayStart = now;
  }

  if (entry.minuteCount >= RATE_LIMIT_PER_MIN || entry.dayCount >= RATE_LIMIT_PER_DAY) {
    return false;
  }

  entry.minuteCount++;
  entry.dayCount++;
  return true;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

function buildQAPrompt(pageContent, question) {
  return {
    system_instruction: {
      parts: [
        {
          text: `You are a helpful study assistant for certification exam preparation. Answer questions using ONLY the provided page content. If the answer is not in the content, say so. Keep answers concise and exam-focused. Use markdown formatting for clarity.`,
        },
      ],
    },
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Page content:\n\n${pageContent}\n\n---\n\nQuestion: ${question}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
    },
  };
}

function buildFlashcardPrompt(pageContent) {
  return {
    system_instruction: {
      parts: [
        {
          text: `You are a flashcard generator for certification exam preparation. Given study notes, create 8-12 high-quality flashcards that test key concepts. Return ONLY a valid JSON array of objects with "question" (string) and "answer" (string with HTML formatting like <strong>, <em>, <br>, <ul><li>). Focus on: definitions, comparisons, decision rules, and exam-relevant facts. Do not wrap the JSON in markdown code fences.`,
        },
      ],
    },
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate flashcards from these study notes:\n\n${pageContent}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigin = ALLOWED_ORIGINS.find((o) => origin.startsWith(o)) || ALLOWED_ORIGINS[0];

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, allowedOrigin);
    }

    // Validate origin
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return jsonResponse({ error: 'Forbidden' }, 403, allowedOrigin);
    }

    // Rate limit
    const clientIP = request.headers.get('CF-Connecting-IP');
    if (!checkRateLimit(clientIP)) {
      return jsonResponse({ error: 'Rate limit exceeded. Try again later.' }, 429, allowedOrigin);
    }

    // Parse and validate input
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400, allowedOrigin);
    }

    const { pageContent, question, mode } = body;

    if (!mode || !['qa', 'flashcard'].includes(mode)) {
      return jsonResponse({ error: 'Invalid mode. Use "qa" or "flashcard".' }, 400, allowedOrigin);
    }

    if (!pageContent || typeof pageContent !== 'string' || pageContent.length > MAX_CONTENT_LENGTH) {
      return jsonResponse(
        { error: `pageContent is required and must be under ${MAX_CONTENT_LENGTH / 1024}KB.` },
        400,
        allowedOrigin
      );
    }

    if (mode === 'qa') {
      if (!question || typeof question !== 'string' || question.length > MAX_QUESTION_LENGTH) {
        return jsonResponse(
          { error: `question is required for qa mode and must be under ${MAX_QUESTION_LENGTH} chars.` },
          400,
          allowedOrigin
        );
      }
    }

    // Build Gemini request
    const geminiBody =
      mode === 'qa' ? buildQAPrompt(pageContent, question) : buildFlashcardPrompt(pageContent);

    try {
      const geminiResponse = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('Gemini API error:', geminiResponse.status, errorText);
        return jsonResponse({ error: 'AI service temporarily unavailable.' }, 502, allowedOrigin);
      }

      const geminiData = await geminiResponse.json();
      const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return jsonResponse({ error: 'No response from AI.' }, 502, allowedOrigin);
      }

      if (mode === 'qa') {
        return jsonResponse({ answer: text, mode: 'qa' }, 200, allowedOrigin);
      }

      // Parse flashcard JSON from response
      try {
        // Strip markdown code fences if present
        const cleaned = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
        const flashcards = JSON.parse(cleaned);
        if (!Array.isArray(flashcards)) throw new Error('Not an array');
        return jsonResponse({ flashcards, mode: 'flashcard' }, 200, allowedOrigin);
      } catch {
        // If parsing fails, return raw text as a single-card fallback
        return jsonResponse(
          { flashcards: [{ question: 'Generated Summary', answer: text }], mode: 'flashcard' },
          200,
          allowedOrigin
        );
      }
    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ error: 'Internal server error.' }, 500, allowedOrigin);
    }
  },
};
