// Shared progress for one family: the app on each phone saves Ada's progress
// here under the family code, and loads it when opened. Stored in Netlify
// Blobs (no database to run). The family code is the only key, so it is
// made of two words and four digits, and is only ever shown in Grown-ups.

import { getStore } from '@netlify/blobs';

const CODE = /^[a-z]{3,10}-[a-z]{3,10}-\d{4}$/;
const MAX_BYTES = 300_000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export default async (req) => {
  const url = new URL(req.url);
  const code = (url.searchParams.get('family') || '').trim().toLowerCase();
  if (!CODE.test(code)) return json({ error: 'That family code does not look right.' }, 400);
  const store = getStore({ name: 'family-progress', consistency: 'strong' });

  if (req.method === 'GET') {
    const saved = await store.get(code, { type: 'json' });
    return saved ? json(saved) : json({ error: 'No progress saved under that family code.' }, 404);
  }

  if (req.method === 'PUT') {
    const text = await req.text();
    if (text.length > MAX_BYTES) return json({ error: 'Too big.' }, 413);
    let body;
    try { body = JSON.parse(text); } catch { return json({ error: 'Not JSON.' }, 400); }
    if (!body || typeof body.updatedAt !== 'number' || !body.state || typeof body.state !== 'object') {
      return json({ error: 'Missing progress.' }, 400);
    }
    // Never let an older copy overwrite a newer one.
    const current = await store.get(code, { type: 'json' });
    if (current && current.updatedAt > body.updatedAt) return json(current, 409);
    await store.setJSON(code, { updatedAt: body.updatedAt, state: body.state });
    return json({ ok: true, updatedAt: body.updatedAt });
  }

  if (req.method === 'DELETE' && url.searchParams.get('confirm') === 'yes') {
    await store.delete(code);
    return json({ ok: true });
  }

  return json({ error: 'Not allowed.' }, 405);
};

export const config = { path: '/api/progress' };
