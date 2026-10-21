/* Independent dropdown controller. app.js still owns language and the hamburger. */
(() => {
  const root = document.querySelector('.dropdown-navigation');
  if (!root) return;
  const desktop = matchMedia('(min-width: 801px)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const states = [...root.querySelectorAll('.dropdown-branch')].map(item => ({
    item,
    button: item.querySelector(':scope > .dropdown-toggle, :scope > .dropdown-row > .dropdown-toggle'),
    panel: item.querySelector(':scope > .dropdown-panel'),
    source: null,
    timer: null
  }));
  const parentState = state => states.find(s => s.item === state.item.parentElement.closest('.dropdown-branch'));
  function close(state, restore = false) {
    clearTimeout(state.timer);
    states.filter(s => s !== state && state.item.contains(s.item)).forEach(s => {
      clearTimeout(s.timer); s.panel.hidden = true; s.button.setAttribute('aria-expanded', 'false'); s.source = null;
    });
    state.panel.hidden = true; state.button.setAttribute('aria-expanded', 'false'); state.source = null;
    if (restore) state.button.focus();
  }
  function closeAll() { states.filter(s => !parentState(s)).forEach(s => close(s)); }
  function position(state) {
    const panel = state.panel;
    panel.removeAttribute('data-side'); panel.style.removeProperty('--dropdown-shift');
    if (!desktop.matches) return;
    if (panel.getBoundingClientRect().right > innerWidth - 8) panel.dataset.side = 'left';
    const r = panel.getBoundingClientRect();
    const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
    const shift = Math.min(0, Math.max(headerBottom - r.top, innerHeight - 8 - r.bottom));
    panel.style.setProperty('--dropdown-shift', `${shift}px`);
  }
  function open(state, source) {
    clearTimeout(state.timer);
    states.filter(s => s !== state && s.item.parentElement === state.item.parentElement).forEach(s => close(s));
    state.panel.hidden = false; state.button.setAttribute('aria-expanded', 'true'); state.source = source;
    position(state);
  }
  function firstItem(state) { return state.panel.querySelector('a, button'); }
  states.forEach(state => {
    state.button.addEventListener('click', () => {
      if (!state.panel.hidden && state.source !== 'hover') close(state);
      else open(state, 'click');
    });
    state.item.addEventListener('pointerenter', () => {
      clearTimeout(state.timer);
      if (desktop.matches && hover.matches && state.panel.hidden) open(state, 'hover');
    });
    state.item.addEventListener('pointerleave', () => {
      if (!desktop.matches || !hover.matches) return;
      clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        if (!state.panel.contains(document.activeElement)) close(state);
      }, 300);
    });
    state.button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault(); open(state, 'keyboard'); firstItem(state)?.focus();
      }
    });
  });
  // Close the deepest active level first, before the shared hamburger Escape handler.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' && event.key !== 'ArrowLeft') return;
    const focused = document.activeElement;
    let state = [...states].reverse().find(s => !s.panel.hidden && s.item.contains(focused));
    if (!state && event.key === 'Escape') state = [...states].reverse().find(s => !s.panel.hidden);
    if (!state) return;
    event.preventDefault(); event.stopImmediatePropagation(); close(state, true);
  }, true);
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget)) { closeAll(); return; }
    states.filter(s => !s.panel.hidden && !s.item.contains(event.relatedTarget)).forEach(s => close(s));
  });
  root.querySelectorAll('a').forEach(a => a.addEventListener('click', closeAll));
  document.addEventListener('pointerdown', event => { if (!event.target.closest('.site-header')) closeAll(); });
  document.querySelector('.menu-toggle').addEventListener('click', () => { if (!root.classList.contains('open')) closeAll(); });
  window.addEventListener('resize', closeAll);
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    states.filter(s => !s.panel.hidden).forEach(position);
  }));
})();
