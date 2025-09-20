// script.js for FundsHQ: interactive enhancements and max engagement

document.addEventListener('DOMContentLoaded', () => {
  // Collapsible sections toggle - click or keyboard (Enter/Space)
  document.querySelectorAll('.section-header').forEach(header => {
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');

    const toggleContent = () => {
      const content = header.nextElementSibling;
      const isActive = content.classList.toggle('active');
      content.hidden = !isActive;

      header.setAttribute('aria-expanded', isActive);
      const seeMore = header.querySelector('.see-more');
      if (seeMore) seeMore.textContent = isActive ? 'See Less' : 'See More';
    };

    header.addEventListener('click', toggleContent);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleContent();
      }
    });
  });

  // Theme toggle with persistence
  const body = document.body;
  const themeSwitchTxt = document.getElementById('themeSwitchTxt');
  const themeToggleBox = document.querySelector('.theme-toggle-box');

  themeToggleBox.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeSwitchTxt.textContent = body.classList.contains('dark-theme') ? 'Light?' : 'Dark?';
    localStorage.setItem('FundsHQTheme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  const savedTheme = localStorage.getItem('FundsHQTheme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeSwitchTxt) themeSwitchTxt.textContent = 'Light?';
  }

  // Accent color picker with persistence
  const accentPicker = document.getElementById('accentPicker');
  if (accentPicker) {
    accentPicker.addEventListener('change', (e) => {
      document.documentElement.style.setProperty('--primary-green', e.target.value);
      localStorage.setItem('FundsHQAccentColor', e.target.value);
    });
    const savedAccent = localStorage.getItem('FundsHQAccentColor');
    if (savedAccent) {
      document.documentElement.style.setProperty('--primary-green', savedAccent);
      accentPicker.value = savedAccent;
    }
  }

  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Accessibility: Show focus outlines only on keyboard tabbing
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }
  window.addEventListener('keydown', handleFirstTab);

  // Form submission handler (contact.html specific)
  window.submitForm = function (e) {
    e.preventDefault();
    const form = e.target;
    const confirmation = document.getElementById('confirmation');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      confirmation.style.color = 'red';
      confirmation.textContent = 'Please fill all fields correctly.';
      confirmation.style.display = 'block';
      return;
    }

    const mailtoLink = `mailto:fundshq@gmail.com?subject=FundsHQ Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;

    window.location.href = mailtoLink;

    confirmation.style.color = 'var(--primary-green)';
    confirmation.textContent = 'Thank you for your message. FundsHQ Team will respond shortly.';
    confirmation.style.display = 'block';

    setTimeout(() => {
      form.reset();
      confirmation.style.display = 'none';
    }, 8000);
  };
});
