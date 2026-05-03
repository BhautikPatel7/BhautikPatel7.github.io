/* ============================================
   TYPING.JS — Terminal Typing Effect
   ============================================ */

(function() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'AI/ML Engineer',
    'Software Engineer',
    'Computer Vision Expert',
    'Deep Learning Engineer',
    'Generative AI Developer',
    'Agentic AI Builder',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      // Typing
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        // Pause at end of word
        isDeleting = true;
        typingSpeed = 2000; // Wait before deleting
      } else {
        typingSpeed = 60 + Math.random() * 60; // Natural variation
      }
    } else {
      // Deleting
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Brief pause before next word
      } else {
        typingSpeed = 30 + Math.random() * 30; // Faster delete
      }
    }

    setTimeout(type, typingSpeed);
  }

  // Start after hero animations settle
  setTimeout(type, 1500);
})();
