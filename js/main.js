/* ============================================
   MAIN.JS — Premium Scroll Animation Engine
   Bhautik Thummar Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Set current year in footer ----
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('preloader--hidden');
        document.body.classList.add('loaded');
      }, 800);
    });
    setTimeout(() => {
      preloader.classList.add('preloader--hidden');
      document.body.classList.add('loaded');
    }, 3000);
  }

  // ---- Scroll Progress Bar ----
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }, { passive: true });
  }

  // ---- Back to top button ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================
     PREMIUM SCROLL-REVEAL ENGINE
     ============================================ */

  // ---- 1. Split section titles into words for stagger animation ----
  const splitTargets = document.querySelectorAll('.section-title');
  
  splitTargets.forEach(title => {
    // Skip if already processed
    if (title.dataset.split) return;
    title.dataset.split = 'true';

    const html = title.innerHTML;
    // Split text nodes while preserving HTML tags (e.g. <span class="gradient-text">)
    let wordIndex = 0;
    const wrapped = html.replace(/>([^<]+)</g, (match, text) => {
      const words = text.split(/(\s+)/).map(word => {
        if (word.trim() === '') return word;
        const delay = wordIndex * 80;
        wordIndex++;
        return `<span class="word-wrap"><span class="word-reveal" style="transition-delay:${delay}ms">${word}</span></span>`;
      });
      return '>' + words.join('') + '<';
    });

    // Also handle text at the beginning/end not wrapped in tags
    title.innerHTML = wrapped;
    // Remove the basic reveal class since words handle it
    title.classList.remove('reveal');
  });

  // ---- 2. Advanced IntersectionObserver with threshold array ----
  const allRevealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-wipe, .reveal-flip, .reveal-zoom, .reveal-glow'
  );

  if (allRevealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    allRevealElements.forEach(el => revealObserver.observe(el));
  }

  // ---- 3. Word reveal observer (for split titles) ----
  const wordWrappers = document.querySelectorAll('.section-title[data-split]');

  if (wordWrappers.length > 0) {
    const wordObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const words = entry.target.querySelectorAll('.word-reveal');
          words.forEach(word => word.classList.add('revealed'));
          wordObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    wordWrappers.forEach(el => wordObserver.observe(el));
  }

  // ---- 4. Parallax scroll layers ----
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0 && window.matchMedia('(hover: hover)').matches) {
    let ticking = false;
    
    function updateParallax() {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowH / 2;
        const offset = (elementCenter - viewportCenter) * speed;

        el.style.transform = `translateY(${offset}px)`;
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- 5. Section background shift on scroll ----
  const sectionBgs = document.querySelectorAll('section');
  
  if (sectionBgs.length > 0) {
    let bgTicking = false;

    function updateSectionBg() {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      sectionBgs.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionProgress = 1 - (rect.top / windowH);
        const clampedProgress = Math.max(0, Math.min(1, sectionProgress));

        // Subtle vertical shift on pseudo-elements via CSS variable
        section.style.setProperty('--scroll-progress', clampedProgress.toFixed(3));
      });

      bgTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!bgTicking) {
        requestAnimationFrame(updateSectionBg);
        bgTicking = true;
      }
    }, { passive: true });
  }


  /* ============================================
     NAVIGATION & MENU
     ============================================ */

  // ---- Active section detection for nav ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  const sideDots = document.querySelectorAll('.side-dots__dot');

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
          
          sideDots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-section') === id);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ---- Mobile menu ----
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ---- Console Easter Egg ----
  console.log('%c' + [
    '╔══════════════════════════════════════╗',
    '║        BHAUTIK THUMMAR               ║',
    '║   AI/ML Engineer • Software Dev      ║',
    '║                                      ║',
    '║   Curious? Let\'s connect!            ║',
    '║   thummarbhautik7045@gmail.com       ║',
    '╚══════════════════════════════════════╝'
  ].join('\n'), 'color: #6366f1; font-family: monospace; font-size: 12px;');

  // ---- Project Filter ----
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          const matches = filter === 'all' || categories.includes(filter);

          if (matches) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ---- Other Projects Filter ----
  const otherFilterBtns = document.querySelectorAll('.other-projects__filter-btn');
  const miniCards = document.querySelectorAll('.mini-card:not(.mini-card--add)');

  if (otherFilterBtns.length > 0 && miniCards.length > 0) {
    otherFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        otherFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        miniCards.forEach(card => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          const matches = filter === 'all' || categories.includes(filter);

          if (matches) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

});
