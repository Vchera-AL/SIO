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


/* ── 3. NAVBAR — LIEN ACTIF ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObs.observe(s));



/* ── 7. BACK TO TOP ── */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
if (backToTop) {
  backToTop.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}


/* ── 8. HAMBURGER MOBILE ── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
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

/* ── 10. PDF MODAL ── */
const docBtns = document.querySelectorAll('.doc-btn');
const pdfModal = document.getElementById('pdf-modal');
const pdfIframe = document.getElementById('pdf-iframe');
const closeModal = document.getElementById('close-modal');
const openNewTab = document.getElementById('open-new-tab');

if (pdfModal) {
  docBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfUrl = btn.getAttribute('data-pdf');
      pdfIframe.src = pdfUrl;
      if (openNewTab) openNewTab.href = pdfUrl;
      pdfModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModal.addEventListener('click', closePdfModal);
  pdfModal.addEventListener('click', e => {
    if (e.target === pdfModal) closePdfModal();
  });

  function closePdfModal() {
    pdfModal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { pdfIframe.src = ''; }, 300);
  }
}
