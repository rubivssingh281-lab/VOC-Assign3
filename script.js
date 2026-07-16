(function () {
  'use strict';

  const grid = document.getElementById('grid');
  const emptyState = document.getElementById('emptyState');
  const countNum = document.getElementById('countNum');
  const countBadge = document.getElementById('countBadge');
  const srAnnounce = document.getElementById('srAnnounce');
  const searchInput = document.getElementById('searchInput');

  document.querySelectorAll('.filter-header').forEach(header => {
    const group = header.closest('.filter-group');
    header.setAttribute('aria-expanded', group.classList.contains('open') ? 'true' : 'false');
    header.addEventListener('click', () => {
      const isOpen = group.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  function applyFilters() {
    const checkedProviders = [...document.querySelectorAll('input[value="VaultofCodes"], input[value="External"]')].filter(i => i.checked).map(i => i.value);
    const providers = checkedProviders.length ? checkedProviders : ['VaultofCodes', 'External'];
    const fee = document.querySelector('input[name="fee"]:checked').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const durations = [...document.querySelectorAll('input[value="1m"],input[value="2m"],input[value="3m"]')].filter(i => i.checked).map(i => i.value);
    const sectors = [...document.querySelectorAll('input[value="IT-ITeS"],input[value="Software"]')].filter(i => i.checked).map(i => i.value);
    const query = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;
    document.querySelectorAll('.card').forEach(card => {
      const cardDurations = card.dataset.duration.split(',');
      const shouldShow =
        providers.includes(card.dataset.provider) &&
        (fee === 'all' || card.dataset.fee === fee) &&
        (mode === 'all' || card.dataset.mode === mode) &&
        (durations.length === 0 || cardDurations.some(d => durations.includes(d))) &&
        (sectors.length === 0 || sectors.includes(card.dataset.sector)) &&
        (!query || card.dataset.title.includes(query));

      card.classList.toggle('filtered-out', !shouldShow);
      if (shouldShow) visibleCount++;
    });

    emptyState.classList.toggle('show', visibleCount === 0);
    countNum.textContent = visibleCount;
    countBadge.classList.remove('pulse');
    void countBadge.offsetWidth;
    countBadge.classList.add('pulse');
    srAnnounce.textContent = `${visibleCount} opportunity${visibleCount === 1 ? '' : 's'} available`;
  }

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      card.style.transition = 'transform 0s';
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -15;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 15;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 1s var(--ease-spring)';
      card.style.transform = '';
    });
  });

  document.getElementById('filterGroups').addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
    ['VaultofCodes', '1m', 'IT-ITeS', 'Software'].forEach(v => {
      const el = document.querySelector(`.filter-options input[value="${v}"]`);
      if (el) el.checked = true;
    });
    document.querySelectorAll('.filter-options input[type="radio"]').forEach(r => { r.checked = r.value === 'all'; });
    searchInput.value = '';
    applyFilters();
  });

  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.prepend(scrollProgress);
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    scrollProgress.style.width = pct + '%';
    backToTop.classList.toggle('show', h.scrollTop > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Saksham Singh