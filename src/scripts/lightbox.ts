import { t } from './i18n';

/** Лайтбокс галереи: клавиши ← → Esc, свайп, клик по фону, возврат фокуса на плитку. Подписи берутся из плитки, поэтому всегда на выбранном языке. */
export function initLightbox(): void {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const tiles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-lightbox-index]'));
  if (!dlg || !tiles.length) return;

  const img = dlg.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const cap = dlg.querySelector<HTMLElement>('[data-lb-cap]')!;
  const count = dlg.querySelector<HTMLElement>('[data-lb-count]')!;
  let index = 0;
  let opener: HTMLElement | null = null;

  const preload = (i: number) => {
    const tile = tiles[(i + tiles.length) % tiles.length];
    if (tile?.dataset.full) new Image().src = tile.dataset.full;
  };

  const render = () => {
    const tile = tiles[index];
    img.alt = tile.querySelector('img')?.alt ?? '';
    cap.textContent = tile.querySelector('.tile__cap > span')?.textContent ?? '';
    count.textContent = t('lb.count', { i: index + 1, n: tiles.length });
  };

  const show = (i: number) => {
    index = (i + tiles.length) % tiles.length;
    img.src = tiles[index].dataset.full ?? '';
    render();
    preload(index + 1);
    preload(index - 1);
  };

  document.addEventListener('langchange', () => dlg.open && render());

  tiles.forEach((tile, i) =>
    tile.addEventListener('click', () => {
      opener = tile;
      show(i);
      dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );

  const close = () => dlg.close();
  dlg.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus();
  });

  dlg.querySelector('[data-lb-close]')!.addEventListener('click', close);
  dlg.querySelector('[data-lb-prev]')!.addEventListener('click', () => show(index - 1));
  dlg.querySelector('[data-lb-next]')!.addEventListener('click', () => show(index + 1));

  // Клик по тёмному фону вне фото и кнопок
  dlg.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target === dlg || target.classList.contains('lb__stage')) close();
  });

  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Свайп
  let startX = 0;
  let startY = 0;
  const fig = dlg.querySelector<HTMLElement>('.lb__fig')!;
  fig.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  fig.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) show(index + (dx < 0 ? 1 : -1));
  });
}
