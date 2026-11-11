/** Мягкое появление блоков при прокрутке. Без JS и при reduce-motion всё видно сразу (см. global.css). */
const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduce || !('IntersectionObserver' in window)) {
  items.forEach((i) => i.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((i) => io.observe(i));
}
