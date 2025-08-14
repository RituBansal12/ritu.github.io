// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Ensure page begins on About (top) on first load (avoid restored scroll to other sections)
(function () {
  try {
    if (!location.hash) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      // Temporarily disable smooth scrolling for an instant jump to top
      root.style.scrollBehavior = 'auto';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Restore any inline override
      root.style.scrollBehavior = prev;
    }
  } catch (e) {
    // no-op
  }
})();
