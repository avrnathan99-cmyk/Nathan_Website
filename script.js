// Always open the homepage at the top instead of restoring an old anchor/scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const openAtTop = () => {
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};
openAtTop();
window.addEventListener('load', () => setTimeout(openAtTop, 0));
window.addEventListener('pageshow', openAtTop);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orbit').forEach((el, i) => {
    el.style.transform = `translateY(${y * (0.035 + i * 0.015)}px)`;
  });
}, { passive: true });
