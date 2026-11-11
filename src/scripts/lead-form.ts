import { submitJson } from '../lib/submit';
import {
  escapeHtml,
  hideStatus,
  mailtoHref,
  phoneError,
  requiredError,
  resetFormMessages,
  setError,
  showStatus,
  submitErrorText,
} from '../lib/form-utils';
import { t } from './i18n';

/** Форма записи: проверка полей, честная отправка и подстановка услуги из каталога. */
export function initLeadForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-lead-form]');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const submitText = submitBtn.querySelector<HTMLElement>('.bform__submit-text')!;

  const el = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
  const fieldOf = (input: HTMLElement) => input.closest<HTMLElement>('.field');

  const rules: Record<string, () => string> = {
    name: () => requiredError(el('name').value, 'v.name', 2),
    phone: () => phoneError(el('phone').value),
    consent: () => ((el('consent') as HTMLInputElement).checked ? '' : t('v.consent')),
  };

  const validate = (name: string): boolean => {
    const msg = rules[name]();
    setError(fieldOf(el(name)), el(name), msg);
    return !msg;
  };

  Object.keys(rules).forEach((name) => {
    const input = el(name);
    input.addEventListener('blur', () => {
      if (name === 'consent' || input.value.trim() !== '') validate(name);
    });
    input.addEventListener('input', () => {
      if (fieldOf(input)?.dataset.invalid === 'true') validate(name);
    });
    input.addEventListener('change', () => {
      if (name === 'consent') validate(name);
    });
  });

  const setBusy = (busy: boolean) => {
    submitBtn.disabled = busy;
    submitBtn.setAttribute('aria-busy', String(busy));
    submitText.textContent = t(busy ? 'f.sending' : 'f.submit');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return; // защита от двойного клика
    hideStatus(status);

    // Бот заполнил скрытое поле: молча прекращаем
    if ((el('website') as HTMLInputElement).value) return;

    const results = Object.keys(rules).map((n) => [n, validate(n)] as const);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) {
      el(firstBad[0]).focus();
      return;
    }

    const data = {
      type: 'lead',
      name: el('name').value.trim(),
      phone: el('phone').value.trim(),
      car: el('car').value.trim(),
      message: el('message').value.trim(),
      source: 'booking-form',
      page: location.href,
      sentAt: new Date().toISOString(),
    };

    setBusy(true);
    const res = await submitJson(form.dataset.endpoint ?? '', data);
    setBusy(false);

    const phoneHref = form.dataset.phoneHref ?? '';
    const email = form.dataset.email ?? '';
    const body = [
      `${t('m.name')}: ${data.name}`,
      `${t('m.phone')}: ${data.phone}`,
      `${t('m.car')}: ${data.car || '—'}`,
      `${t('m.task')}: ${data.message || '—'}`,
    ].join('\n');
    const fallback = `
      <div class="form-status__actions">
        <a class="btn btn--primary btn--sm" href="tel:${escapeHtml(phoneHref)}">${escapeHtml(t('s.call', { phone: form.dataset.phone ?? '' }))}</a>
        ${email ? `<a class="btn btn--ghost btn--sm" href="${escapeHtml(mailtoHref(email, t('m.subjectLead'), body))}">${escapeHtml(t('s.mail'))}</a>` : ''}
      </div>`;

    if (res.status === 'ok') {
      showStatus(
        status,
        'success',
        `<p><strong>${escapeHtml(t('s.ok.title', { name: data.name }))}</strong></p><p>${escapeHtml(t('s.ok.text', { phone: data.phone }))}</p>`,
      );
      form.reset();
      Object.keys(rules).forEach((n) => setError(fieldOf(el(n)), el(n), ''));
    } else if (res.status === 'not-configured') {
      showStatus(
        status,
        'demo',
        `<p><strong>${escapeHtml(t('s.demo.title'))}</strong></p><p>${escapeHtml(t('s.demo.text'))}</p>${fallback}`,
      );
    } else {
      showStatus(
        status,
        'error',
        `<p><strong>${escapeHtml(t('s.err.title'))}</strong> ${escapeHtml(submitErrorText(res))}.</p><p>${escapeHtml(t('s.err.text'))}</p>${fallback}`,
      );
    }
    status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

  // Старые ошибки и статусы остались бы на прежнем языке
  document.addEventListener('langchange', () => resetFormMessages(form));

  // Кнопки «Записаться на услугу» из каталога подставляют услугу в поле сообщения (на выбранном языке)
  let lastPrefill = '';
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-prefill-service]');
    if (!link) return;
    const textarea = el('message');
    const name = link.dataset.prefillKey ? t(link.dataset.prefillKey) : (link.dataset.prefillService ?? '');
    const next = t('svc.prefill', { name });
    if (!textarea.value.trim() || textarea.value === lastPrefill) {
      textarea.value = next;
      lastPrefill = next;
    }
  });
}
