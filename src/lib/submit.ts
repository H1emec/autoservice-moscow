/**
 * Единая точка отправки заявок и отзывов.
 *
 * Если endpoint не задан в src/config/site.ts, ничего не отправляется и функция
 * возвращает 'not-configured': интерфейс обязан честно показать, что заявка НЕ ушла.
 * Успех возвращается только когда сервер ответил 2xx.
 *
 * Контракт: POST application/json на endpoint, тело — payload ниже, ответ 2xx = принято.
 * Примеры серверной части (Telegram, почта): docs/CONNECT.md и examples/.
 *
 * Текст ошибки здесь не формируется: возвращается причина, а формы переводят её на выбранный язык.
 */
export type SubmitResult =
  | { status: 'ok' }
  | { status: 'not-configured' }
  | { status: 'error'; reason: 'http' | 'timeout' | 'network'; code?: number };

export async function submitJson(endpoint: string, payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!endpoint) return { status: 'not-configured' };

  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    if (!res.ok) return { status: 'error', reason: 'http', code: res.status };
    return { status: 'ok' };
  } catch (e) {
    const aborted = e instanceof DOMException && e.name === 'AbortError';
    return { status: 'error', reason: aborted ? 'timeout' : 'network' };
  } finally {
    window.clearTimeout(timer);
  }
}
