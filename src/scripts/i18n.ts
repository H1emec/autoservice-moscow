import { ui, LANGS, DEFAULT_LANG, type Lang } from '../i18n/dict';

/**
 * Переключение языка на лету. Разметка страницы содержит русский текст, поэтому сайт читается и без скриптов.
 *  data-i18n="ключ"                    заменить textContent
 *  data-i18n-attr="атрибут:ключ,…"      заменить атрибуты (alt, placeholder, aria-label, content, title)
 *  data-i18n-vars='{"n":5}'            подстановка {n} в текст
 *  data-i18n-count="9"                 число для склонения (Intl.PluralRules)
 * Исходный русский текст запоминается при старте, поэтому возврат на русский не требует отдельного словаря.
 */
const STORAGE_KEY = 'lang';
const ruCache: Record<string, string> = {};

const isLang = (v: unknown): v is Lang => typeof v === 'string' && (LANGS as string[]).includes(v);

function readStored(): Lang {
  /* Сайт только на русском: сохранённый ранее язык игнорируем */
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* не критично */
  }
  return DEFAULT_LANG;
}

let lang: Lang = readStored();

export const getLang = (): Lang => lang;

const has = (l: Lang, key: string) => key in ui[l] || (l !== 'ru' && false);

function lookup(l: Lang, key: string): string {
  if (l === 'ru') return ui.ru[key] ?? ruCache[key] ?? key;
  return ui[l][key] ?? ui.ru[key] ?? ruCache[key] ?? key;
}

function format(text: string, vars?: Record<string, string | number>): string {
  return vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : text;
}

/** Перевод строки для скриптов (сообщения форм, подписи) */
export function t(key: string, vars?: Record<string, string | number>): string {
  return format(lookup(lang, key), vars);
}

const parseAttr = (el: HTMLElement): [string, string][] =>
  (el.dataset.i18nAttr ?? '')
    .split(',')
    .map((p) => p.trim().split(':') as [string, string])
    .filter((p) => p[0] && p[1]);

const parseVars = (el: HTMLElement): Record<string, string | number> | undefined => {
  if (!el.dataset.i18nVars) return undefined;
  try {
    return JSON.parse(el.dataset.i18nVars);
  } catch {
    return undefined;
  }
};

function collectRussian(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const k = el.dataset.i18n!;
    if (!(k in ruCache)) ruCache[k] = (el.textContent ?? '').trim();
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    for (const [attr, key] of parseAttr(el)) if (!(key in ruCache)) ruCache[key] = el.getAttribute(attr) ?? '';
  });
}

function apply(l: Lang): void {
  document.documentElement.lang = l;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    el.textContent = format(lookup(l, el.dataset.i18n!), parseVars(el));
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const vars = parseVars(el);
    for (const [attr, key] of parseAttr(el)) el.setAttribute(attr, format(lookup(l, key), vars));
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-count]').forEach((el) => {
    const n = Number(el.dataset.i18nCount);
    const cat = new Intl.PluralRules(l).select(n);
    const key = has(l, `svc.count.${cat}`) || l === 'ru' ? `svc.count.${cat}` : 'svc.count.other';
    el.textContent = format(lookup(l, key), { n });
  });
}

export function setLang(next: Lang): void {
  if (!isLang(next)) return;
  lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* не критично */
  }
  apply(next);
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
}

let started = false;
export function initI18n(): void {
  if (started) return;
  started = true;
  collectRussian();
  apply(lang);
  document.documentElement.classList.remove('lang-pending');
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}
