// ===================== PROFILE CARD 3D TILT =====================
(() => {
  const card = document.querySelector('.profile-card');
  if (!card) return;
  const MAX = 14; // degrees
  let raf = 0;
  const onMove = (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;  // 0..1
    const y = (e.clientY - r.top) / r.height;  // 0..1
    // Outward tilt: top-half tilts toward viewer at top edge, etc.
    const rotY = (x - 0.5) * 2 * MAX;          // left → -, right → +
    const rotX = -(y - 0.5) * 2 * MAX;         // top → +, bottom → -
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    });
  };
  const onEnter = () => card.classList.add('is-tilting');
  const onLeave = () => {
    card.classList.remove('is-tilting');
    card.style.transform = '';
  };
  card.addEventListener('mouseenter', onEnter);
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
})();

// ===================== I18N (EN / ES) =====================
const langToggle = document.getElementById('langToggle');
const savedLang = localStorage.getItem('jdrr-lang') || 'en';

// Cache English source text from DOM on init
const i18nNodes = document.querySelectorAll('[data-i18n]');
const i18nPhNodes = document.querySelectorAll('[data-i18n-ph]');
const i18nDefaults = new Map();
const i18nPhDefaults = new Map();

i18nNodes.forEach(n => {
  i18nDefaults.set(n.dataset.i18n, n.innerHTML);
});
i18nPhNodes.forEach(n => {
  i18nPhDefaults.set(n.dataset.i18nPh, n.getAttribute('placeholder') || '');
});

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'es' ? 'es' : 'en');
  const dict = (window.I18N && window.I18N[lang]) || {};
  i18nNodes.forEach(n => {
    const key = n.dataset.i18n;
    const val = lang === 'en' ? i18nDefaults.get(key) : (dict[key] ?? i18nDefaults.get(key));
    if (val != null) n.innerHTML = val;
  });
  i18nPhNodes.forEach(n => {
    const key = n.dataset.i18nPh;
    const val = lang === 'en' ? i18nPhDefaults.get(key) : (dict[key] ?? i18nPhDefaults.get(key));
    if (val != null) n.setAttribute('placeholder', val);
  });
  setCvForLang(lang);
  localStorage.setItem('jdrr-lang', lang);
}

// ===================== CV DOWNLOAD (locale-aware) =====================
// Spanish visitors get the Spanish CV, everyone else gets the English resume.
// The filename swap keeps whatever folder prefix is already in the href
// (e.g. "assets/") so this works the same in src/ and the docs/ static export.
const cvLink = document.getElementById('cvDownloadLink');
function setCvForLang(lang) {
  if (!cvLink) return;
  const fileName = lang === 'es'
    ? 'Juan_David_Rios_Rodriguez_CV.pdf'
    : 'Juan_David_Rios_Rodriguez_Resume.pdf';
  const currentHref = cvLink.getAttribute('href');
  const dir = currentHref.slice(0, currentHref.lastIndexOf('/') + 1);
  cvLink.setAttribute('href', dir + fileName);
  cvLink.setAttribute('download', fileName);
}

langToggle.addEventListener('click', e => {
  const btn = e.target.closest('.lang-toggle__btn');
  if (!btn) return;
  applyLang(btn.dataset.lang);
});

applyLang(savedLang);

// ===================== CASE STUDY (expandable) =====================
document.querySelectorAll('.case-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const project = btn.closest('.project');
    const study = project.querySelector('.case-study');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    if (isOpen) {
      study.hidden = true;
    } else {
      study.hidden = false;
      // Smooth scroll the study into view a moment after expanding
      setTimeout(() => {
        const top = study.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 120);
    }
  });
});

// ===================== THEME (dark / light) =====================
const html = document.documentElement;
const savedTheme = localStorage.getItem('jdrr-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', e => {
  const btn = e.target.closest('.theme-toggle__btn');
  if (!btn) return;
  const next = btn.dataset.theme;
  html.setAttribute('data-theme', next);
  localStorage.setItem('jdrr-theme', next);
});

// ===================== NAV =====================
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 30);
});

navBurger.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// ===================== ACTIVE LINK ON SCROLL =====================
const sections = document.querySelectorAll('section[id]');
const linkMap = {};
navLinks.querySelectorAll('a').forEach(a => {
  const id = a.getAttribute('href').slice(1);
  linkMap[id] = a;
});

const setActive = () => {
  const y = window.scrollY + 120;
  let current = null;
  sections.forEach(s => {
    if (s.offsetTop <= y) current = s.id;
  });
  Object.entries(linkMap).forEach(([id, link]) => {
    link.classList.toggle('is-active', id === current);
  });
};
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// ===================== REVEAL ON SCROLL =====================
const revealTargets = document.querySelectorAll(
  '.section__head, .about__copy, .about__info, .ai-step, .timeline__item, .resume-item, .lang-ring, .strength, .method-chip, .skill-card, .project, .service-card, .contact__intro, .contact__form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);
revealTargets.forEach(el => io.observe(el));

// ===================== CONTACT FORM =====================
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(form);
  if (!fd.get('name') || !fd.get('email') || !fd.get('message')) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const lang = document.documentElement.getAttribute('data-lang') || 'en';

  fd.set('subject', fd.get('subject') || 'Portfolio Contact — New Message');
  fd.set('from_name', fd.get('name'));

  submitBtn.disabled = true;
  status.className = 'form__status';
  status.textContent = lang === 'es' ? 'Enviando…' : 'Sending…';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: fd
    });
    const json = await res.json();
    if (json.success) {
      const sent = (window.I18N && window.I18N[lang] && window.I18N[lang]['contact.form.sent'])
        || '✓ Message sent! I\'ll reply within 24h.';
      status.textContent = sent;
      status.className = 'form__status form__status--ok';
      form.reset();
    } else {
      status.textContent = `✗ ${json.message || 'Error desconocido'}`;
      status.className = 'form__status form__status--err';
    }
  } catch (err) {
    status.textContent = `✗ ${err.message}`;
    status.className = 'form__status form__status--err';
  } finally {
    submitBtn.disabled = false;
    setTimeout(() => { status.textContent = ''; status.className = 'form__status'; }, 8000);
  }
});


