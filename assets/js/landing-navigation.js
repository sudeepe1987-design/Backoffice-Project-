(function () {
  'use strict';
  var footer = document.getElementById('landingFooter');
  if (!footer) return;
  var reveal = document.querySelector('[data-footer-reveal]');
  var returnLink = document.querySelector('[data-back-to-top]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function scrollToElement(element) {
    element.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  }
  if (reveal) reveal.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add('footer-revealed');
    scrollToElement(footer);
  });
  if (returnLink) returnLink.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.remove('footer-revealed');
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  });

})();
