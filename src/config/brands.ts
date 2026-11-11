/**
 * Логотипы лежат в public/brands. h — высота в px, подобрана оптически: у эмблем и надписей
 * разная плотность внутри рамки SVG, поэтому значения разные.
 * Логотипы марок принадлежат их владельцам и показаны только для обозначения обслуживаемых автомобилей.
 */
export const brandsIntro = 'ОБСЛУЖИВАЕМ АВТОМОБИЛИ ЛЮБЫХ МАРОК';

export const brands = [
  { name: 'Audi', file: 'audi.svg', h: 64 },
  { name: 'Volkswagen', file: 'volkswagen.svg', h: 44 },
  { name: 'Škoda', file: 'skoda.svg', h: 44 },
  { name: 'SEAT', file: 'seat.svg', h: 40 },
  { name: 'Tesla', file: 'tesla.svg', h: 38 },
  { name: 'BMW', file: 'bmw.svg', h: 44 },
  { name: 'Mercedes-Benz', file: 'mercedes-benz.svg', h: 32 },
  { name: 'Toyota', file: 'toyota.svg', h: 48 },
  { name: 'Lexus', file: 'lexus.svg', h: 28 },
  { name: 'Hyundai', file: 'hyundai.svg', h: 54 },
  { name: 'Kia', file: 'kia.svg', h: 54 },
  { name: 'Nissan', file: 'nissan.svg', h: 48 },
  { name: 'Honda', file: 'honda.svg', h: 40 },
  { name: 'Porsche', file: 'porsche.svg', h: 44 },
  { name: 'Renault', file: 'renault.svg', h: 44 },
  { name: 'Ford', file: 'ford.svg', h: 56 },
] as const;
