/* ===========================
   NAVBAR SCROLL
   =========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

/* ===========================
   SMOOTH SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   TYPING EFFECT
   =========================== */
const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'Spring Boot Dev',
  'Java Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
    setTimeout(typeEffect, 90);
  }
}

setTimeout(typeEffect, 1200);

/* ===========================
   HERO CANVAS — PARTICLE GRID
   =========================== */
(function () {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(45, 126, 255, ${(1 - dist / 130) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(74, 154, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    animId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createParticles();
    cancelAnimationFrame(animId);
    draw();
  }

  window.addEventListener('resize', () => {
    init();
  });

  init();
})();

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealEls.forEach(el => observer.observe(el));

/* ===========================
   ACTIVE NAV HIGHLIGHTING
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--blue-bright)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   CONTACT FORM
   =========================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '✓ Message Sent!';
  btn.style.background = '#16a34a';
  btn.style.boxShadow = '0 0 30px rgba(22,163,74,0.35)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 3000);
}

/* ===========================
   SKILL CARD GLOW ON HOVER
   =========================== */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
});

/* ===========================
   PROJECT CARD TILT
   =========================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.querySelector('.project-card-inner').style.transform =
      `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.project-card-inner').style.transform = '';
  });
});

/* ===========================
   FLOATING ANIMATION ON HERO STATS
   =========================== */
document.querySelectorAll('.stat-item').forEach((item, i) => {
  item.style.animation = `floatStat ${3 + i * 0.4}s ease-in-out infinite`;
  item.style.animationDelay = `${i * 0.3}s`;
});

// Inject keyframes for float
const style = document.createElement('style');
style.textContent = `
  @keyframes floatStat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);