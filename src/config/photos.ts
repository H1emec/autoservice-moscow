import hero from '../assets/photos/diagnostics.jpg';
import diagnostics from '../assets/photos/hero.jpg';
import mechanicLight from '../assets/photos/mechanic-light.jpg';
import engineCheck from '../assets/photos/engine-check.jpg';
import obd from '../assets/photos/obd.jpg';
import balancer from '../assets/photos/balancer.jpg';
import suspension from '../assets/photos/suspension.jpg';
import lift from '../assets/photos/lift.jpg';

/**
 * ВРЕМЕННЫЕ фото (Wikimedia Commons, CC BY 2.0): перед передачей клиенту замените
 * на снимки его цеха и удалите соответствующие записи credit. Файл можно заменить
 * 1-в-1 в src/assets/photos, имена менять не нужно.
 */
const by = 'CC BY 2.0';
const file = (name: string) => `https://commons.wikimedia.org/wiki/File:${name}`;

export const photos = {
  hero: {
    src: hero,
    alt: 'Мастер выполняет компьютерную диагностику двигателя ноутбуком',
    credit: { author: 'Shixart1985', license: by, url: file('Young_mechanic_with_laptop_doing_car_diagnostic_at_automobile_repair_shop_close.jpg') },
  },
  diagnostics: {
    src: diagnostics,
    alt: 'Автомобиль на подъёмнике в ремонтной зоне автосервиса',
    credit: { author: 'Shixart1985', license: by, url: file('Car_repair_in_an_auto_shop_with_tools_and_equipment_present_on_the_floor_and_a_partially_disassembled_vehicle_on_a_lift.jpg') },
  },
  mechanicLight: {
    src: mechanicLight,
    alt: 'Мастер работает у автомобиля на подъёмнике в залитом светом цехе',
    credit: { author: 'Shixart1985', license: by, url: file('Mechanic_works_in_garage_with_car_on_lift.jpg') },
  },
  engineCheck: {
    src: engineCheck,
    alt: 'Мастер проверяет моторный отсек автомобиля',
    credit: { author: 'Shixart1985', license: by, url: file('Mechanic_works_on_car_engine_performing_routine_maintenance_and_inspections_on_vehicle_parts.jpg') },
  },
  obd: {
    src: obd,
    alt: 'Подключение диагностического разъёма OBD к автомобилю',
    credit: { author: 'Nenad Stojkovic', license: by, url: file('Man_holding_Obd2_jack_for_car_software_diagnostic.jpg') },
  },
  balancer: {
    src: balancer,
    alt: 'Станок для балансировки колёс с экраном',
    credit: { author: 'Shixart1985', license: by, url: file('Machine_is_used_for_checking_tire_alignment_at_a_garage_in_a_busy_city.jpg') },
  },
  suspension: {
    src: suspension,
    alt: 'Мастер подводит стойку под подвеску поднятого автомобиля',
    credit: { author: 'Shixart1985', license: by, url: file('Car_mechanic_worker_repairing_suspension_of_lifted_automobile_at_auto_repair_garage_shop.jpg') },
  },
  lift: {
    src: lift,
    alt: 'Подъёмник и гидравлический агрегат в ремонтной зоне',
    credit: { author: 'Shixart1985', license: by, url: file('Car_lift_in_an_auto_repair_shop_with_vehicles_and_tools_present.jpg') },
  },
} as const;

export type PhotoKey = keyof typeof photos;
