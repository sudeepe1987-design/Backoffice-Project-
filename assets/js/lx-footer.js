(function () {
  var hero = document.getElementById('main');
  var footer = document.getElementById('landingFooter');
  var travel = footer && footer.closest('.lx-travel');
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0;
  function update() {
    frame = 0;
    if (!footer || !travel) return;
    if (motion.matches || document.body.classList.contains('footer-pip') || document.body.classList.contains('footer-pip-open')) return;
    var top = travel.getBoundingClientRect().top + parseFloat(getComputedStyle(travel).paddingTop);
    var fp = Math.max(0, Math.min(1, (innerHeight - top) / (innerHeight * 0.85)));
    footer.style.transform = top >= innerHeight ? 'none' : 'scale(' + (0.55 + 0.45 * fp).toFixed(3) + ')';
    var inner = footer.querySelector('.bo-foot-inner') || footer;
    inner.style.borderRadius = (24 * (1 - fp)).toFixed(1) + 'px';
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
  var pills = document.querySelector('.toggles-wrapper');
  if (pills && !motion.matches) {
    pills.addEventListener('wheel', function (e) {
      if (e.deltaY <= 0 || document.body.classList.contains('footer-pip')) return;
      e.preventDefault();
      document.body.classList.add('footer-pip');
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        document.body.classList.add('footer-pip-open');
        setTimeout(function () {
          document.body.classList.remove('footer-pip', 'footer-pip-open');
          window.scrollTo(0, document.body.scrollHeight); schedule();
        }, 1000);
      }); });
    }, { passive: false });
  }
})();
