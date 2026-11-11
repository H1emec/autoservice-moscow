import type { PhotoKey } from './photos';

export const galleryIntro = {
  title: 'НАШ АВТОСЕРВИС',
  subtitle: 'Современное оборудование, профессиональные мастера и комфортные условия обслуживания.',
};

/**
 * Порядок и размер плиток. area — имя области сетки в Gallery.astro (a–g).
 * Чтобы поменять фото, правьте photos.ts, а здесь — подписи и точку фокуса кадрирования.
 */
export const gallery: { photo: PhotoKey; caption: string; area: string; focus?: string }[] = [
  { photo: 'diagnostics', caption: 'Ремонтная зона', area: 'a', focus: '40% 55%' },
  { photo: 'balancer', caption: 'Балансировка колёс', area: 'b', focus: '40% 40%' },
  { photo: 'suspension', caption: 'Ремонт подвески', area: 'c', focus: '40% 45%' },
  { photo: 'engineCheck', caption: 'Осмотр двигателя', area: 'd', focus: '55% 50%' },
  { photo: 'lift', caption: 'Подъёмники и рабочая зона', area: 'e', focus: '50% 40%' },
  { photo: 'mechanicLight', caption: 'Рабочее место мастера', area: 'f', focus: '50% 62%' },
  { photo: 'obd', caption: 'Диагностическое оборудование', area: 'g', focus: '55% 50%' },
];
