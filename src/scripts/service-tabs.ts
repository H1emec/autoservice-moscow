/** Вкладки услуг: одна категория на экране, переключение кликом и стрелками (WAI-ARIA tabs). */
export function initServiceTabs(): void {
  const root = document.querySelector<HTMLElement>('[data-svc-tabs]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));

  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.id !== tab.getAttribute('aria-controls');
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const key = e.key;
      let next = -1;
      if (key === 'ArrowRight' || key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (key === 'ArrowLeft' || key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (key === 'Home') next = 0;
      else if (key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });
}
