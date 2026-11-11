import data from './services.json';

export type ServiceItem = {
  name: string;
  /** Путь к фото относительно src/assets/services, например «engine/01.jpg» */
  photo: string;
};

export type ServiceCategory = {
  id: string;
  /** Иконка из src/data/icon-paths.json */
  icon: string;
  name: string;
  items: ServiceItem[];
};

export const servicesIntro = {
  title: 'УСЛУГИ АВТОСЕРВИСА',
  subtitle: 'Полный спектр технического обслуживания и ремонта вашего автомобиля.',
};

/** Категории и услуги лежат в services.json (источник — папка «Исходники»). */
export const services: ServiceCategory[] = data;
