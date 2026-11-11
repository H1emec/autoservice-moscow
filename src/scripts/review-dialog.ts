import { submitJson } from '../lib/submit';
import { escapeHtml, hideStatus, mailtoHref, requiredError, resetFormMessages, setError, showStatus, submitErrorText } from '../lib/form-utils';
import { t } from './i18n';

/** Диалог «Оставить отзыв»: проверка, честная отправка. Без endpoint отзыв НЕ сохраняется и сайт об этом говорит. */
export function initReviewDialog(): void {
  const dlg = document.querySelector<HTMLDialogElement>('[data-review-dialog]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-review-open]');
  const form = document.querySelector<HTMLFormElement>('[data-review-form]');
  if (!dlg || !openBtn || !form) return;

  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-review-submit]')!;
  const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement;
  const ratingSet = form.querySelector<HTMLElement>('.rating')!;
  const getRating = () => Number(form.querySelector<HTMLInputElement>('input[name="rating"]:checked')?.value ?? 0);

  const checks = {
    name: () => {
      const m = requiredError(el('name').value, 'v.rev.name', 2);
      setError(el('name').closest('.field'), el('name'), m);
      return !m;
    },
    rating: () => {
      const m = getRating() ? '' : t('v.rating');
      setError(ratingSet, ratingSet.querySelector('input'), m);
      return !m;
    },
    text: () => {
      const m = requiredError(el('text').value, 'v.text', 10);
      setError(el('text').closest('.field'), el('text'), m);
      return !m;
    },
  };

  openBtn.addEventListener('click', () => {
    hideStatus(status);
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
  });
  const close = () => dlg.close();
  dlg.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    openBtn.focus();
  });
  form.querySelector('[data-review-close]')!.addEventListener('click', close);
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) close();
  });

  document.addEventListener('langchange', () => resetFormMessages(form));

  form.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    const key = target.getAttribute('name') as keyof typeof checks | null;
    if (key && key in checks && (target.closest('.field') as HTMLElement | null)?.dataset.invalid === 'true') checks[key]();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    hideStatus(status);
    if ((el('website') as HTMLInputElement).value) return;

    const ok = [checks.name(), checks.rating(), checks.text()];
    if (ok.includes(false)) {
      const order: [string, HTMLElement][] = [
        ['name', el('name')],
        ['rating', ratingSet.querySelector('input') as HTMLElement],
        ['text', el('text')],
      ];
      order[ok.indexOf(false)][1].focus();
      return;
    }

    const data = {
      type: 'review',
      name: el('name').value.trim(),
      rating: getRating(),
      text: el('text').value.trim(),
      page: location.href,
      sentAt: new Date().toISOString(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = t('rd.sending');
    const res = await submitJson(form.dataset.endpoint ?? '', data);
    submitBtn.disabled = false;
    submitBtn.textContent = t('rd.submit');

    const email = form.dataset.email ?? '';
    const body = `${t('m.name')}: ${data.name}\n${t('m.rating')}: ${data.rating} ${t('m.of')}\n\n${data.text}`;
    const mail = email
      ? `<div class="form-status__actions"><a class="btn btn--ghost btn--sm" href="${escapeHtml(mailtoHref(email, t('m.subjectReview'), body))}">${escapeHtml(t('s.mailReview'))}</a></div>`
      : '';

    if (res.status === 'ok') {
      showStatus(status, 'success', `<p><strong>${escapeHtml(t('sr.ok.title'))}</strong></p><p>${escapeHtml(t('sr.ok.text'))}</p>`);
      form.reset();
    } else if (res.status === 'not-configured') {
      showStatus(status, 'demo', `<p><strong>${escapeHtml(t('sr.demo.title'))}</strong></p><p>${escapeHtml(t('sr.demo.text'))}</p>${mail}`);
    } else {
      showStatus(status, 'error', `<p><strong>${escapeHtml(t('sr.err.title'))}</strong> ${escapeHtml(submitErrorText(res))}. ${escapeHtml(t('sr.err.text'))}</p>${mail}`);
    }
  });
}
