import { t } from '../scripts/i18n';
import type { SubmitResult } from './submit';

/** Общие помощники для форм: проверка полей, вывод ошибок и статусов. Тексты берутся из словаря выбранного языка. */

const PHONE_RE = /^\+?\d{8,15}$/;

export function normalizePhone(v: string): string {
  return v.replace(/[\s().\-]/g, '');
}

export function phoneError(v: string): string {
  const value = v.trim();
  if (!value) return t('v.phone.empty');
  if (!/^[+\d\s().\-]+$/.test(value)) return t('v.phone.chars');
  if (!PHONE_RE.test(normalizePhone(value))) return t('v.phone.format');
  return '';
}

export function requiredError(v: string, messageKey: string, min = 1): string {
  return v.trim().length < min ? t(messageKey) : '';
}

export function setError(field: HTMLElement | null, input: HTMLElement | null, message: string): void {
  if (!field || !input) return;
  const slot = field.querySelector<HTMLElement>('.field__error');
  field.dataset.invalid = message ? 'true' : 'false';
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  if (slot) slot.textContent = message;
}

export type StatusState = 'success' | 'error' | 'demo';

export function showStatus(box: HTMLElement, state: StatusState, html: string): void {
  box.dataset.state = state;
  box.innerHTML = html;
  box.hidden = false;
}

export function hideStatus(box: HTMLElement): void {
  box.hidden = true;
  box.innerHTML = '';
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Текст ошибки отправки на выбранном языке */
export function submitErrorText(res: Extract<SubmitResult, { status: 'error' }>): string {
  return res.reason === 'http' ? t('err.http', { code: res.code ?? '' }) : t(res.reason === 'timeout' ? 'err.timeout' : 'err.network');
}

/** При смене языка очищаем старые сообщения: они остались бы на прежнем языке */
export function resetFormMessages(form: HTMLElement): void {
  form.querySelectorAll<HTMLElement>('.field').forEach((f) => {
    f.dataset.invalid = 'false';
    f.querySelector('.field__error')?.replaceChildren();
    f.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
  });
  const box = form.querySelector<HTMLElement>('[data-status]');
  if (box) hideStatus(box);
}
