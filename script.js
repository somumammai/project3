
(() => {
  // Theme toggle with localStorage, accessible ARIA state
  const THEME_KEY = 'theme';
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.querySelector('.icon').textContent = '🌞';
    } else {
      root.setAttribute('data-theme', 'light');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.querySelector('.icon').textContent = '🌗';
    }
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
      return;
    }
    // default to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Scroll reveal for .card
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.card').forEach((c) => observer.observe(c));

  // Reading progress bar (optional enhancement)
  const progress = document.createElement('div');
  progress.id = 'reading-progress';
  progress.style.position = 'fixed';
  progress.style.top = '0';
  progress.style.left = '0';
  progress.style.height = '3px';
  progress.style.background = 'linear-gradient(90deg, #6366f1, #06b6d4)';
  progress.style.width = '0%';
  progress.style.zIndex = '9999';
  document.body.appendChild(progress);

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  loadTheme();
  updateProgress();
})();
