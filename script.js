(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const internships = [
    {
      title: "Web Development Internship Program", provider: "VaultofCodes", sector: "IT-ITeS", fee: "free", mode: "virtual",
      duration: ["1m", "2m"], desc: "Virtual internship focusing on modern web development practices. Start date: 05/09/2026. No stipend.",
      link: "https://www.vaultofcodes.in/courses/506813", image: "https://imgs.search.brave.com/8kQjrRzQuWbUL6cbq9lMcSmPG4OL_-yRZavImqmQ_8c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMzA4NDU5/ODgvNDI2NzYvaS80/NTAvZGVwb3NpdHBo/b3Rvc180MjY3NjUy/MjQtc3RvY2stcGhv/dG8td2ViLWRldmVs/b3BtZW50LWluc2Ny/aXB0aW9uLWxhcHRv/cC1jb2RlLmpwZw"
    },
    {
      title: "AI and Prompt Engineering Program", provider: "VaultofCodes", sector: "IT-ITeS", fee: "free", mode: "virtual",
      duration: ["1m", "2m"], desc: "Virtual program designed to build core AI and prompt engineering skills. Start date: 05/06/2026. No stipend.",
      link: "https://www.vaultofcodes.in/courses/506806", image: "https://imgs.search.brave.com/ghXPouyKIHbXbvjoc-dIj2pMhmvm26X737CPBNcDppU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9hb3l4NzNn/OWgycGcvNFAyR2tj/aURGOHZlS2Z6VzJw/b2tSaS83MmI2NDhl/MzVmNDVmOWZlZDUz/MDdmMTgzZTU2MDhk/Yi9XaHktUHJvbXB0/LUVuZ2luZWVyaW5n/LVdpbGwtQmUtdGhl/LS0xLUFJLVNraWxs/LUJ5LUVuZC1vZi0y/MDI1LUJsb2cuanBn/P3c9Mzg0MCZxPTEw/MA"
    },
    {
      title: "Python Programming Internship", provider: "VaultofCodes", sector: "Software", fee: "free", mode: "virtual",
      duration: ["1m", "2m"], desc: "Virtual intensive training in Python programming and problem-solving. Start date: 05/11/2026. No stipend.",
      link: "https://www.vaultofcodes.in/courses/506722", image: "https://miro.medium.com/1*tKhIpBdPe172fFJeWvLeEw.jpeg"
    },
    {
      title: "Java Programming Internship Program", provider: "VaultofCodes", sector: "Software", fee: "free", mode: "virtual",
      duration: ["1m", "2m"], desc: "Virtual backend development experience utilizing the Java ecosystem. Start date: 05/07/2026. No stipend.",
      link: "https://www.vaultofcodes.in/courses/506804", image: "https://thumbs.dreamstime.com/b/java-programming-language-virtual-screen-technology-concept-futuristic-digital-illustration-showing-word-symbolizing-377593913.jpg"
    },
    {
      title: "Ethical Hacking Internship Program", provider: "VaultofCodes", sector: "Software", fee: "free", mode: "virtual",
      duration: ["1m", "2m"], desc: "Virtual ethical hacking experience utilizing the latest tools and techniques. Start date: 05/10/2026. No stipend.",
      link: "https://www.vaultofcodes.in/courses/797972", image: "https://imgs.search.brave.com/sl0Nqp3sc1HAlgeJN5cX9iU8rNiSP4YVwL5lKvSclVE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDExMjY2/MDc5LmpwZw"
    }
  ];

  const grid = document.getElementById('grid');
  const emptyState = document.getElementById('emptyState');
  const countNum = document.getElementById('countNum');
  const countBadge = document.getElementById('countBadge');
  const srAnnounce = document.getElementById('srAnnounce');

  function durationLabel(arr) {
    return arr.map(d => d === "1m" ? "1 month" : d === "2m" ? "2 months" : "3+ months").join(" / ");
  }

  function cardHTML(item, idx) {
    return `
    <article class="card" data-provider="${item.provider === 'VaultofCodes' ? 'VaultofCodes' : 'External'}" data-fee="${item.fee}" data-mode="${item.mode}" data-duration="${item.duration.join(',')}" data-sector="${item.sector}" data-title="${item.title.toLowerCase()}">
      <div class="card-banner" style="background-image: url('${item.image}');">
        <span class="badge">${item.fee === 'free' ? 'Free' : 'Paid'}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <div class="provider"><i class="fas fa-code"></i> ${item.provider}</div>
        <span class="sector-tag">${item.sector}</span>
        <p class="description">${item.desc}</p>
        <div class="card-footer">
          <div class="duration">Duration: ${durationLabel(item.duration)}</div>
          <a href="${item.link}" class="view-link" target="_blank" rel="noopener">View Details <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </article>`;
  }

  function renderSkeletons() {
    grid.innerHTML = internships.map(() => `<div class="skeleton-card"><div class="skeleton-shimmer"></div></div>`).join('');
  }
  function renderCards() {
    grid.innerHTML = internships.map(cardHTML).join('');
    observeCards();
    attachTilt();
  }
  renderSkeletons();
  setTimeout(() => {
    renderCards();
    setTimeout(attachTilt, 100);
  }, reduceMotion ? 0 : 500);

  function observeCards() {
    const cards = document.querySelectorAll('.card');
    if (reduceMotion) { cards.forEach(c => c.classList.add('revealed')); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    cards.forEach(c => io.observe(c));
  }

  function attachTilt() {
  console.log('🔥 attachTilt() called (fully smooth fallback)');

  if (reduceMotion) return;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch && window.matchMedia('(pointer: coarse)').matches) return;

  const tiltStates = [];
  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
    const banner = card.querySelector('.card-banner');
    if (!banner) return;

    const state = {
      currentRotX: 0,
      currentRotY: 0,
      currentLift: 0,     
      currentScale: 1,

      targetRotX: 0,
      targetRotY: 0,
      targetLift: 0,       
      targetScale: 1,     

      mouseX: 50,
      mouseY: 50,
      isHovering: false,
      lerpSpeed: 0.08,   

      card: card,
      banner: banner,
    };

    tiltStates.push(state);

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;

      state.targetRotX = ((y - cy) / cy) * -10;
      state.targetRotY = ((x - cx) / cx) * 10;

      state.targetLift = -6;
      state.targetScale = 1.1;

      state.mouseX = (x / r.width) * 50;
      state.mouseY = (y / r.height) * 50;

      state.isHovering = true;
    };

    const onLeave = () => {
  state.isHovering = false;
  clearTimeout(state._leaveTimeout);
  state._leaveTimeout = setTimeout(() => {
    state.targetRotX = 0;
    state.targetRotY = 0;
    state.targetLift = 0;
    state.targetScale = 1;
  }, 600);
};

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    card._tiltMove = onMove;
    card._tiltLeave = onLeave;
  });

  function updateTilts() {
    tiltStates.forEach(state => {
      const { card, banner, mouseX, mouseY, lerpSpeed } = state;

      state.currentRotX += (state.targetRotX - state.currentRotX) * lerpSpeed;
      state.currentRotY += (state.targetRotY - state.currentRotY) * lerpSpeed;
      state.currentLift += (state.targetLift - state.currentLift) * lerpSpeed;
      state.currentScale += (state.targetScale - state.currentScale) * lerpSpeed;

      const rotX = state.currentRotX;
      const rotY = state.currentRotY;
      const lift = state.currentLift;
      const scale = state.currentScale;

      const tiltVal = `translateY(${lift}px) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      card.style.setProperty('transform', tiltVal, 'important');

      card.style.setProperty('--mx', mouseX + '%');
      card.style.setProperty('--my', mouseY + '%');

      const shiftX = rotY * -0.6;
      const shiftY = rotX * 0.6;
      banner.style.backgroundPosition = `${50 + shiftX}% ${50 + shiftY}%`;
    });

    requestAnimationFrame(updateTilts);
  }

  updateTilts();
}

  const aurora = document.getElementById('aurora');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      aurora.style.left = mouseX + 'px';
      aurora.style.top = mouseY + 'px';
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      const target = e.target.closest('a, button, input, label, .card');
      cursorRing.classList.toggle('hover', !!target);
    });
    (function loop() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(loop);
    })();
  }

  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    scrollProgress.style.width = pct + '%';
    backToTop.classList.toggle('show', h.scrollTop > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  document.querySelectorAll('.filter-group').forEach(group => {
    const header = group.querySelector('.filter-header');
    header.setAttribute('aria-expanded', group.classList.contains('open') ? 'true' : 'false');
    header.addEventListener('click', () => {
      const isOpen = group.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });


  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', e => {
    resetBtn.classList.add('spin');
    setTimeout(() => resetBtn.classList.remove('spin'), 500);

    const rect = resetBtn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left - 4) + 'px';
    ripple.style.top = (e.clientY - rect.top - 4) + 'px';
    ripple.style.width = ripple.style.height = '8px';
    resetBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
    ['VaultofCodes', '1m', 'IT-ITeS', 'Software'].forEach(v => {
      const el = document.querySelector(`.filter-options input[value="${v}"]`);
      if (el) el.checked = true;
    });
    document.querySelectorAll('.filter-options input[type="radio"]').forEach(r => { r.checked = r.value === 'all'; });
    document.getElementById('searchInput').value = '';
    applyFilters();
  });

  const searchInput = document.getElementById('searchInput');
  let debounceId;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(applyFilters, 200);
  });
  document.getElementById('filterGroups').addEventListener('change', applyFilters);

  function applyFilters() {
    const checkedProviders = [...document.querySelectorAll('input[value="VaultofCodes"], input[value="External"]:checked')]
      .filter(i => i.checked).map(i => i.value);
    const providers = checkedProviders.length ? checkedProviders : ['VaultofCodes', 'External'];
    const fee = document.querySelector('input[name="fee"]:checked').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const durations = [...document.querySelectorAll('input[value="1m"],input[value="2m"],input[value="3m"]')].filter(i => i.checked).map(i => i.value);
    const sectors = [...document.querySelectorAll('input[value="IT-ITeS"],input[value="Software"]')].filter(i => i.checked).map(i => i.value);
    const query = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;
    document.querySelectorAll('.card').forEach(card => {
      const matchesProvider = providers.includes(card.dataset.provider);
      const matchesFee = fee === 'all' || card.dataset.fee === fee;
      const matchesMode = mode === 'all' || card.dataset.mode === mode;
      const cardDurations = card.dataset.duration.split(',');
      const matchesDuration = durations.length === 0 || cardDurations.some(d => durations.includes(d));
      const matchesSector = sectors.length === 0 || sectors.includes(card.dataset.sector);
      const matchesQuery = !query || card.dataset.title.includes(query);
      const shouldShow = matchesProvider && matchesFee && matchesMode && matchesDuration && matchesSector && matchesQuery;

      if (shouldShow) {
        card.style.display = '';
        card.classList.remove('filtered-out');
        visibleCount++;
      } else {
        card.classList.add('filtered-out');
        setTimeout(() => { if (card.classList.contains('filtered-out')) card.style.display = 'none'; }, reduceMotion ? 0 : 280);
      }
    });

    emptyState.classList.toggle('show', visibleCount === 0);
    countNum.textContent = visibleCount;
    countBadge.classList.remove('pulse');
    void countBadge.offsetWidth;
    countBadge.classList.add('pulse');
    srAnnounce.textContent = `${visibleCount} opportunity${visibleCount === 1 ? '' : 's'} available`;
  }
})();