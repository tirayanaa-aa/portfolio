/* ============================================================
   ATHIRAH ILYANA — Portfolio JavaScript
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ---- Mobile menu toggle ----
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// ---- Modal open / close ----
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e, id) {
  if (e.target === e.currentTarget) {
    closeModal(id);
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ---- Smooth scroll to section ----
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ---- Certificates slider ----
let certScroll = 0;
function slideCerts(dir) {
  const slider = document.getElementById('certs-slider');
  const cardWidth = 216; // 200px card + 16px gap
  certScroll += dir * cardWidth * 2;
  certScroll = Math.max(0, Math.min(certScroll, slider.scrollWidth - slider.clientWidth));
  slider.scrollTo({ left: certScroll, behavior: 'smooth' });
}

// ---- Matrix / Code rain canvas ----
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノPYTHONSQLJIRAIOTQA<>{}[];()';
  const fontSize = 14;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(20,20,20,0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Lead character bright red, trail fades
      if (drops[i] === Math.floor(drops[i])) {
        ctx.fillStyle = '#ff0000';
      } else {
        ctx.fillStyle = 'rgba(229,9,20,0.6)';
      }

      ctx.fillText(char, x, y);

      if (y > H && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  setInterval(draw, 50);
})();

// ---- Intersection Observer for skill bar animations ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.pill-fill');
      fills.forEach(fill => {
        fill.style.animation = 'none';
        // Force reflow
        void fill.offsetWidth;
        fill.style.animation = 'grow-bar 1.5s ease-out forwards';
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ---- Entrance animations for cards ----
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.08}s`;
      entry.target.classList.add('card-visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.exp-card, .project-card, .cert-card, .edu-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

// Inject CSS for card-visible
const style = document.createElement('style');
style.textContent = `.card-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ---- Typewriter for hero subtitle ----
(function typewriter() {
  const el = document.querySelector('.hero-subtitle');
  if (!el) return;
  const texts = [
    'IT Graduate | QA Engineer | Data Science Enthusiast',
    'Selenium Tester | Python Developer | Problem Solver',
    'Detail-Oriented | Team Player | Continuous Learner'
  ];
  let textIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = texts[textIdx];
    if (deleting) {
      el.textContent = current.slice(0, --charIdx);
    } else {
      el.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 40 : 75;

    if (!deleting && charIdx === current.length) {
      delay = 2500;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      textIdx = (textIdx + 1) % texts.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1500);
})();

// ---- Particle hover on profile image ----
const profileImg = document.querySelector('.profile-img-wrapper');
if (profileImg) {
  profileImg.addEventListener('mouseenter', () => {
    const ring = profileImg.querySelector('.profile-ring');
    if (ring) ring.style.animationDuration = '2s';
  });
  profileImg.addEventListener('mouseleave', () => {
    const ring = profileImg.querySelector('.profile-ring');
    if (ring) ring.style.animationDuration = '8s';
  });
}

// ---- Auto-slide certs every 4s ----
let autoCertDir = 1;
setInterval(() => {
  const slider = document.getElementById('certs-slider');
  if (!slider) return;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  certScroll += autoCertDir * 216;
  if (certScroll >= maxScroll) { certScroll = maxScroll; autoCertDir = -1; }
  if (certScroll <= 0) { certScroll = 0; autoCertDir = 1; }
  slider.scrollTo({ left: certScroll, behavior: 'smooth' });
}, 4000);

// ---- Tilt effect on project cards ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) scale(1.02) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c ATHIRAH ILYANA PORTFOLIO ', 'background:#e50914;color:#fff;font-size:18px;font-weight:bold;padding:8px 16px;border-radius:6px;');
console.log('%c Built with passion for IT 🚀 ', 'color:#00d4ff;font-size:12px;');
