// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after tapping a link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Hero star rotates as you scroll past it ----------
const heroStar = document.getElementById('heroStar');

window.addEventListener('scroll', () => {
  const rotation = window.scrollY * 0.15;
  heroStar.style.transform = `rotate(${rotation}deg)`;
}, { passive: true });

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function showError(field, message) {
  const el = form.querySelector(`[data-error-for="${field.name}"]`);
  if (el) el.textContent = message;
}

function validateField(field) {
  field.setAttribute('data-touched', 'true');

  if (field.validity.valueMissing) {
    showError(field, 'This field is required.');
    return false;
  }
  if (field.type === 'email' && field.validity.typeMismatch) {
    showError(field, 'Enter a valid email address.');
    return false;
  }
  showError(field, '');
  return true;
}

form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const allValid = fields.map(validateField).every(Boolean);

  if (!allValid) {
    status.textContent = 'Please fix the highlighted fields.';
    status.classList.remove('success');
    return;
  }

  // No backend connected yet — this just confirms the form works client-side.
  // To actually receive messages, connect this to a form service (e.g. Formspree)
  // or your own backend endpoint, and replace this block with a fetch() call.
  status.textContent = `Thanks, ${form.name.value.split(' ')[0]} — your message looks good. (Connect a backend to actually send it.)`;
  status.classList.add('success');
  form.reset();
  fields.forEach(f => f.removeAttribute('data-touched'));
});
