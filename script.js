/* ===================================================
   script.js — Nicolas Canadell Portfolio (v2)
   =================================================== */

/* ── 1. REVEAL AU SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const tlItems   = document.querySelectorAll('.tl-item');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));
tlItems.forEach(el => revealObs.observe(el));


/* ── 2. BARRES DE COMPÉTENCES ── */
const barFills = document.querySelectorAll('.bar-fill');

const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

barFills.forEach(b => barObs.observe(b));


/* ── 3. SIDEBAR DOT ACTIF ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObs.observe(s));


/* ── 4. COMPTEUR DE STATS ANIMÉ ── */
function animateCounter(el) {
  const target = parseFloat(el.textContent.replace('+', ''));
  const isPlus = el.textContent.includes('+');
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease) + (isPlus ? '+' : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll('.stat-number');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => counterObs.observe(n));


/* ── 5. FILTRE PARCOURS ── */
const filterBtns    = document.querySelectorAll('.tl-filter');
const parcoursItems = document.querySelectorAll('#parcours-timeline .tl-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    parcoursItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      if (match) {
        item.classList.remove('hidden');
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), 30);
      } else {
        item.classList.add('hidden');
        item.classList.remove('visible');
      }
    });
  });
});


/* ── 6. FORMULAIRE CONTACT ── */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    formNote.className = 'form-note';
    formNote.textContent = '';

    const name    = form.querySelector('#f-name').value.trim();
    const email   = form.querySelector('#f-email').value.trim();
    const message = form.querySelector('#f-msg').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = '⚠ Veuillez remplir tous les champs.';
      formNote.className = 'form-note error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.textContent = '⚠ Adresse email invalide.';
      formNote.className = 'form-note error';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi…';

    setTimeout(() => {
      formNote.textContent = '✓ Message envoyé ! Je vous réponds rapidement.';
      formNote.className = 'form-note success';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Envoyer le message →';
    }, 1200);
  });
}


/* ── 7. BOUTON RETOUR EN HAUT ── */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ── 8. HAMBURGER MOBILE ── */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    sidebar.classList.toggle('open');
  });

  // Fermer en cliquant un lien
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      sidebar.classList.remove('open');
    });
  });
}


/* ── 9. SMOOTH SCROLL (fallback) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
