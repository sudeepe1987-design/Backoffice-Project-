(function () {
  'use strict';
  var stacks = Array.from(document.querySelectorAll('.bo-stack'));
  if (!stacks.length) return;
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0, geometry = true;
  var items = [];
  stacks.forEach(function (stack) {
    var sections = Array.from(stack.children).filter(function (el) { return el.tagName === 'SECTION'; });
    stack.classList.toggle('bo-stack--single', sections.length < 2);
    sections.forEach(function (section, i) {
      section.classList.add('section--stack');
      section.style.zIndex = String(i + 1);
      var title = section.querySelector('.section__title, .page-hero h1, h2, h1');
      if (title) title.classList.add('bo-stack-title');
      items.push({section: section, next: sections[i + 1], title: title});
    });
  });
  function tick() {
    frame = 0;
    stacks.forEach(function (stack) { stack.classList.toggle('bo-stack--flat', motion.matches); });
    if (motion.matches) {
      items.forEach(function (item) {
        item.section.style.transform = ''; item.section.style.filter = '';
        if (item.title) { item.title.style.transform = ''; item.title.style.opacity = ''; }
      });
      geometry = true;
      return;
    }
    // Separate the sizing pass from scroll reads and writes.
    if (geometry) {
      var heights = items.map(function (item) { return item.section.offsetHeight; });
      items.forEach(function (item, i) { item.section.style.setProperty('--bo-stack-top', Math.min(0, innerHeight - heights[i]) + 'px'); });
      geometry = false;
    }
    var reads = items.map(function (item) {
      // offset geometry stays stable while transforms alter the painted rectangle.
      var stack = item.section.parentElement;
      var origin = stack.getBoundingClientRect().top;
      var naturalTop = origin + item.section.offsetTop;
      var top = item.section.classList.contains('sticky-word-reveal') ? naturalTop : Math.max(naturalTop, parseFloat(item.section.style.getPropertyValue('--bo-stack-top')) || 0);
      var nextTop = item.next ? origin + item.next.offsetTop : innerHeight;
      return {top: top, bottom: top + item.section.offsetHeight, nextTop: nextTop};
    });
    items.forEach(function (item, i) {
      var rect = reads[i];
      if (rect.bottom < -innerHeight || rect.top > innerHeight * 2) return;
      var p = item.next ? Math.max(0, Math.min(1, 1 - rect.nextTop / innerHeight)) : 0;
      item.section.style.transform = 'scale(' + (1 - .06 * p) + ')';
      item.section.style.filter = 'brightness(' + (1 - .4 * p) + ')';
      if (item.title) {
        var q = Math.max(0, Math.min(1, (1 - rect.top / (innerHeight * .9)) / .4));
        item.title.style.transform = 'translateY(' + (60 * (1 - q)) + 'px)';
        item.title.style.opacity = String(.3 + .7 * q);
      }
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(tick); }
  function resize() { geometry = true; schedule(); }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', resize, {passive: true});
  addEventListener('load', resize, {passive: true});
  motion.addEventListener('change', resize);
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(resize);
    items.forEach(function (item) { observer.observe(item.section); });
  }
  document.fonts.ready.then(resize);
  schedule();
})();
