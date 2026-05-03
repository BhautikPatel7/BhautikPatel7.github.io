/* ============================================
   HERO.JS — Hero Section Enhancements
   Parallax on floating elements + mouse tracking
   ============================================ */

(function() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // ---- Mouse parallax on floating code snippets ----
  const floatCodes = hero.querySelectorAll('.hero__float-code');
  const watermark = hero.querySelector('.hero__watermark');

  if (floatCodes.length > 0 || watermark) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    function animateParallax() {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      floatCodes.forEach((code, i) => {
        const depth = (i + 1) * 6;
        const x = currentX * depth;
        const y = currentY * depth;
        code.style.transform = `translate(${x}px, ${y}px)`;
      });

      if (watermark) {
        const x = currentX * 15;
        const y = currentY * 10;
        watermark.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
      }

      requestAnimationFrame(animateParallax);
    }

    // Only on non-touch
    if (window.matchMedia('(hover: hover)').matches) {
      animateParallax();
    }
  }

  // ---- Magnetic button effect ----
  const buttons = hero.querySelectorAll('.btn');
  
  if (window.matchMedia('(hover: hover)').matches) {
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
      });
    });
  }

})();
