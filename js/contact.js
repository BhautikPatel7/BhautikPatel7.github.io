/* ============================================
   CONTACT.JS — Form Handling
   ============================================ */

(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('.contact__submit');
  const btnText = submitBtn ? submitBtn.innerHTML : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate
    if (!data.name || !data.email || !data.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Update button state
    if (submitBtn) {
      submitBtn.classList.add('sending');
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.classList.remove('sending');
          submitBtn.classList.add('sent');
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
          setTimeout(() => {
            submitBtn.classList.remove('sent');
            submitBtn.innerHTML = btnText;
          }, 3000);
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      showToast('Oops! Something went wrong. Please try again.', 'error');
      if (submitBtn) {
        submitBtn.classList.remove('sending');
        submitBtn.innerHTML = btnText;
      }
    }
  });

  function showToast(message, type) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);

    // Show
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Auto-hide after 4s
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
})();
