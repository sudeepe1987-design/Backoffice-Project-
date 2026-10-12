(function () {
  'use strict';
  var hero = document.getElementById('main');
  var footer = document.getElementById('landingFooter');
  var travel = footer && footer.closest('.bo-footer-travel');
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0;

  function update() {
    frame = 0;
    if (!footer || !travel) return;
    if(motion.matches){footer.style.transform='none';document.body.classList.remove('footer-pip','footer-pip-open');return;}
    if (document.body.classList.contains('footer-pip') ||
        document.body.classList.contains('footer-pip-open')) return;   // PIP owns the transform
    var top = travel.getBoundingClientRect().top + parseFloat(getComputedStyle(travel).paddingTop);
    var fp = Math.max(0, Math.min(1, (innerHeight - top) / (innerHeight * 0.85)));
    footer.style.transform = top >= innerHeight ? 'none' : 'scale(' + (0.55 + 0.45 * fp).toFixed(3) + ')';
    var inner = footer.querySelector('.bo-foot-inner') || footer;
    inner.style.borderRadius = (24 * (1 - fp)).toFixed(1) + 'px';
    document.body.classList.toggle('footer-revealed', top < innerHeight * 0.82);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change',schedule);
  update();

  /* PIP: hover the pills + one scroll-down click -> footer pops in small, zooms full */
  var pills = document.querySelector('.toggles-wrapper');
  if (pills && !motion.matches) {
    pills.addEventListener('wheel', function (e) {
      if (e.deltaY <= 0 || document.body.classList.contains('footer-pip') || motion.matches) return;
      e.preventDefault();
      footer.style.transition='none';
      document.body.classList.add('footer-pip');
      footer.getBoundingClientRect();
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        footer.style.transition='';
        document.body.classList.add('footer-pip-open');
        setTimeout(function () {
          document.body.classList.remove('footer-pip', 'footer-pip-open');
          window.scrollTo({top:document.body.scrollHeight,behavior:'instant'});
          schedule();
        }, 1000);
      }); });
    }, { passive: false });
  }
})();
