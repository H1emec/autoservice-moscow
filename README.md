# Шаблон сайта автосервиса

Премиальный тёмный лендинг на Astro (статическая сборка). Все демонстрационные данные вынесены в `src/config`,
вёрстка их не содержит. Заказчику меняются данные, а не код.

## Запуск

```bash
npm install
npm run dev       # разработка: http://localhost:4321
npm run build     # сборка в dist/
npm run preview   # предпросмотр сборки
```

## Что менять под нового клиента

| Что | Где |
|---|---|
| Название, телефон, адрес, e-mail, Instagram, часы работы, координаты карты, адрес сайта | `src/config/site.ts` |
| Заголовок и тексты первого экрана | `src/config/hero.ts` |
| Логотипы обслуживаемых марок | `src/config/brands.ts` + файлы в `public/brands` |
| Категории и услуги | `src/config/services.ts` |
| Блок «О нас» (этапы работы) | `src/config/process.ts` |
| Отзывы | `src/config/reviews.ts` (после замены на реальные поставьте `reviewsAreDemo: false` в `site.ts`) |
| Фото и подписи | `src/config/photos.ts`, `src/config/gallery.ts`, файлы в `src/assets/photos` |
| Цвета, радиусы, отступы | токены в начале `src/styles/global.css` |
| Политика конфиденциальности | `src/pages/privacy.astro` |

## Структура

```
src/
  config/       данные (всё, что меняется под клиента)
  components/   секции страницы: Hero, Brands, Services, Booking, About, Gallery, Reviews, Contacts
  scripts/      поведение: шапка, аккордеон, форма, лайтбокс, диалог отзыва, появление блоков
  lib/          отправка (submit.ts), проверка полей, мелкие помощники
  layouts/      Layout.astro: head, SEO, Open Graph, JSON-LD
  styles/       global.css: токены и общие стили
  pages/        index, privacy, credits
docs/CONNECT.md        как подключить заявки и отзывы
examples/              пример серверной части (Telegram)
```

## Приём заявок

Пока `endpoints` в `site.ts` пусты, формы **не изображают отправку**: показывают, что заявка не ушла, и предлагают
позвонить или написать письмом. Как подключить сервер: `docs/CONNECT.md`.

## Перед запуском у клиента

- [ ] Заменить все демо-данные в `src/config` (особенно название, телефон, адрес, координаты, `site.url`).
- [ ] Заменить фото на снимки сервиса клиента. Текущие взяты из Wikimedia Commons (CC BY 2.0), авторы в `/credits`.
- [ ] Заменить демо-отзывы реальными и поставить `reviewsAreDemo: false`.
- [ ] Проверить, что этапы в `process.ts` и преимущества в `hero.ts` соответствуют реальной работе сервиса.
- [ ] Подключить приём заявок и отзывов (`docs/CONNECT.md`).
- [ ] Заменить текст `/privacy` документом от юриста.
- [ ] Проверить логотипы марок: они принадлежат их владельцам и показываются только для обозначения обслуживаемых марок.
- [ ] Заменить OpenStreetMap на Google Maps при необходимости (`src/components/Contacts.astro`).
- [ ] Проверить обещания в `hero.ts` и `process.ts` (гарантия, фотоотчёт, часы работы): на странице они не помечены как демо.
- [ ] JSON-LD в `Layout.astro` берёт данные из `site.ts`: убедитесь, что там нет example.com и тестового телефона.

## Технологии

Astro 7, TypeScript, чистый CSS, шрифты Unbounded и Onest (локально через Fontsource, кириллица), иконки Lucide.
Картинки оптимизируются при сборке (AVIF/WebP, адаптивные размеры).
