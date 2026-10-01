/* ==========================================================================
   ALOK KUMAR AGRAHARI - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initBackgroundCanvas();
  initProjectFilters();
  initScrollSpy();
  initMobileMenu();
});

/* --- 1. Typing Animation in Hero Section --- */
function initTypingEffect() {
  const words = [
    'Data Science & AI',
    'Machine Learning & EDA',
    'Computer Vision (OpenCV)',
    'Power BI & Analytics',
    'Full-Stack Python Solutions'
  ];
  
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --- 2. Interactive Background Canvas Particles --- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --- 3. Project Category Filtering --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. Scroll Spy & Navbar Highlighting --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow & blur state
    if (scrollY > 50) {
      navbar.classList.add('shadow-lg', 'bg-dark/95');
    } else {
      navbar.classList.remove('shadow-lg', 'bg-dark/95');
    }

    // Active Section Detection
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --- 5. Mobile Menu Toggle --- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

/* --- 6. Resume Modal Handlers --- */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
    }, 10);
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
}

// Close on backdrop click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('resume-modal');
  if (e.target === modal) {
    closeResumeModal();
  }
});

/* --- 7. Real Direct Email (Gmail Web) & WhatsApp Submission --- */
function handleContactSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');

  const name = nameInput ? nameInput.value.trim() : 'Recruiter / Collaborator';
  const email = emailInput ? emailInput.value.trim() : '';
  const subject = (subjectInput && subjectInput.value.trim()) ? subjectInput.value.trim() : 'Portfolio Inquiry / Collaboration';
  const message = messageInput ? messageInput.value.trim() : '';

  // Formatted Body for Email
  const emailBody = `Hi Alok,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=alok2882006@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  // Show Feedback banner
  if (feedback) {
    feedback.classList.remove('hidden');
  }

  // Open Gmail Web in a new browser tab with everything pre-filled
  window.open(gmailUrl, '_blank');
}

function sendViaWhatsApp() {
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const subjectInput = document.getElementById('subject');

  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Collaborator';
  const subject = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Portfolio Inquiry';
  const message = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'Hello Alok, I saw your portfolio and would like to connect.';

  const waText = `Hi Alok, I am ${name} (${subject}):\n${message}`;
  const waUrl = `https://wa.me/919151586400?text=${encodeURIComponent(waText)}`;

  window.open(waUrl, '_blank');
}
