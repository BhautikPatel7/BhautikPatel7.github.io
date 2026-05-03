/* ============================================
   ABOUT.JS — Counter Animation
   ============================================ */

(function() {
  const stats = document.querySelectorAll('.about__stat-number[data-count]');
  if (stats.length === 0) return;

  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    stats.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-count'));
      const suffix = stat.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const startTime = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = target * easedProgress;

        if (isDecimal) {
          stat.textContent = current.toFixed(1) + suffix;
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            stat.textContent = target.toFixed(1) + suffix;
          } else {
            stat.textContent = target + suffix;
          }
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger when stats section comes into view
  const statsContainer = document.querySelector('.about__stats');
  if (statsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsContainer);
  }
})();
