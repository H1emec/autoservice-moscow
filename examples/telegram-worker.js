/**
 * Пример серверной части: Cloudflare Worker, пересылающий заявки и отзывы в Telegram.
 * Не входит в сборку сайта. Разверните отдельно и укажите адрес в src/config/site.ts → endpoints.
 *
 * Секреты Worker (Settings → Variables):
 *   TG_TOKEN        токен бота от @BotFather
 *   TG_CHAT_ID      id чата, куда слать заявки
 *   ALLOWED_ORIGIN  адрес сайта, например https://example.com
 */
const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
const clip = (s, n) => String(s ?? '').slice(0, n);

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });
    if (request.headers.get('Origin') !== env.ALLOWED_ORIGIN) return new Response('Forbidden', { status: 403, headers: cors });

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response('Bad JSON', { status: 400, headers: cors });
    }

    let text;
    if (data.type === 'review') {
      if (!data.name || !data.text || !(data.rating >= 1 && data.rating <= 5)) return new Response('Invalid', { status: 422, headers: cors });
      text = `⭐ <b>Новый отзыв на модерацию</b>\n${esc(clip(data.name, 80))}: ${'★'.repeat(data.rating)}\n\n${esc(clip(data.text, 1500))}`;
    } else {
      if (!data.name || !data.phone) return new Response('Invalid', { status: 422, headers: cors });
      text =
        `🔧 <b>Новая заявка</b>\n` +
        `Имя: ${esc(clip(data.name, 80))}\n` +
        `Телефон: ${esc(clip(data.phone, 30))}\n` +
        `Авто: ${esc(clip(data.car, 120)) || '—'}\n` +
        `Задача: ${esc(clip(data.message, 1000)) || '—'}\n` +
        `Источник: ${esc(clip(data.source, 40))}`;
    }

    const tg = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: 'HTML' }),
    });
    // 2xx только если Telegram реально принял сообщение
    return new Response(JSON.stringify({ ok: tg.ok }), {
      status: tg.ok ? 200 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  },
};
