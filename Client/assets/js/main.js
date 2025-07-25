document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
  });
});

AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-in-out',
  mirror: false
});
