import { t } from './i18n';

/** Шапка: фон при прокрутке, мобильное меню, подсветка активного раздела. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!header || !burger || !menu) return;


  const setOpen = (open: boolean) => {
    header.classList.toggle('menu-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
    menu.toggleAttribute('inert', !open);
    // пока меню открыто, остальная страница недоступна для Tab и экранного чтения
    document.querySelectorAll('main, footer, .mbar').forEach((el) => el.toggleAttribute('inert', open));
  };
  setOpen(false);
  document.addEventListener('langchange', () => setOpen(burger.getAttribute('aria-expanded') === 'true'));

  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      burger.focus();
    }
  });
  window.matchMedia('(min-width: 1280px)').addEventListener('change', (m) => {
    if (m.matches) setOpen(false);
  });

  // Подсветка пункта меню по текущему разделу
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav]'));
  const ids = Array.from(new Set(links.map((l) => l.dataset.nav!)));
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const setCurrent = (id: string) =>
    links.forEach((l) => (l.dataset.nav === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));

  const visible = new Map<string, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) visible.set(en.target.id, en.intersectionRatio);
        else visible.delete(en.target.id);
      }
      // выбираем самый верхний из видимых разделов в нижней части зоны
      const current = sections.find((s) => visible.has(s.id));
      setCurrent(current ? current.id : '');
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 1] },
  );
  sections.forEach((s) => io.observe(s));
}
