(function () {
  var deck = document.getElementById('boDeck'), hero = document.getElementById('main');
  var links = Array.from(document.querySelectorAll('.bo-hero-nav a'));
  var nameEl = document.querySelector('.bo-country-name');
  if (!deck || !hero) return;
  var cards = Array.from(deck.querySelectorAll('.bo-card'));
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  cards.forEach(function(card){var img=card.querySelector('img');img.addEventListener('error',function(){card.classList.add('is-missing');});if(img.complete&&!img.naturalWidth)card.classList.add('is-missing');});
  var frame = 0, activeIdx = -1, nameTimer = 0;

  function render() {
    frame = 0;
    var n = cards.length;
    if (motion.matches) { layout(0, n); sync(0, n); return; }
    var range = Math.max(1, hero.offsetHeight - innerHeight);
    var p = ((scrollY / range) * (n * 2)) % n; if (p < 0) p += n;   // INFINITE: 2 cycles per hero pass
    layout(p, n); sync(p, n);
  }
  function layout(p, n) {
    var spacing = Math.min(innerWidth * 0.36, 480);
    cards.forEach(function (card, i) {
      var d = ((i - p) % n + n) % n; if (d > n / 2) d -= n;          // circular distance
      var ad = Math.abs(d);
      card.style.setProperty('--x', (d * spacing) + 'px');
      card.style.transform = 'translateX(var(--x)) scale(' + Math.max(0.55, 1 - ad * 0.22).toFixed(3) + ')';
      card.style.zIndex = String(100 - Math.round(ad * 10));
      card.style.opacity = ad > 2.4 ? '0' : Math.max(0, 1 - ad * 0.38).toFixed(3);
    });
  }
  function sync(p, n) {
    var idx = Math.round(p) % n;
    if (idx === activeIdx) return;
    activeIdx = idx;
    var key = cards[idx].dataset.country;
    if (nameEl) {
      nameEl.style.opacity = '0';
      clearTimeout(nameTimer);
      if(motion.matches){nameEl.textContent=cards[idx].querySelector('img').alt;nameEl.style.opacity='.9';}
      else nameTimer = setTimeout(function () {
        nameEl.textContent = cards[idx].querySelector('img').alt;
        nameEl.style.opacity = '.9';
      }, 250);
    }
    links.forEach(function (a) {
      var on = a.dataset.country === key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change',function(){activeIdx=-1;schedule();});
  render();
})();
