/* Back Office hero deck — adapted from Anima export.
   Canvas 2D perspective deck, driven by page scroll, with inertia/snap. */
(function () {
  'use strict';

  var CFG = {
    visible: 4.2,
    focal: 1000,
    cardW: 360, cardH: 480,          // 3:4 portrait, matches your 1080x1440 posters
    xStep: 250, zStep: 190, arc: 20, yaw: 0.07, roll: 0.04,
    centerY: 0.40,
    tiltX: 24, tiltY: 14, tiltLag: 0.055,
    follow: 0.12, snap: 0.06, friction: 0.93, glide: 0.5, drag: 0.0042,
    loops: 2                          // country cycles per hero pass
  };

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  var COUNTRIES = [
    { key: 'canada',      label: 'Canada' },
    { key: 'australia',   label: 'Australia' },
    { key: 'uk',          label: 'UK' },
    { key: 'usa',         label: 'USA' },
    { key: 'china',       label: 'China' },
    { key: 'germany',     label: 'Germany' },
    { key: 'nz',          label: 'New Zealand' },
    { key: 'austria',     label: 'Austria' },
    { key: 'netherlands', label: 'Netherlands' },
    { key: 'portugal',    label: 'Portugal' },
    { key: 'sweden',      label: 'Sweden' }
  ];

  var hero = document.getElementById('main');
  var cv = document.getElementById('lxHero');
  if (!hero || !cv) return;
  var ctx = cv.getContext('2d');
  if (!ctx) return;
  var pin = cv.closest('.lx-pin');
  var nameEl = document.getElementById('lxName');
  var links = Array.prototype.slice.call(document.querySelectorAll('.lx-nav a'));

  var W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = pin.clientWidth; H = pin.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();

  /* --- posters: load your real images, draw when ready -------------- */
  var cards = COUNTRIES.map(function (c, i) {
    var img = new Image();
    img.src = 'assets/images/countries/' + c.key + '-main.jpg?v=posters-20261012';
    var card = { i: i, key: c.key, label: c.label, img: img, ready: false, hover: 0 };
    img.onload = function () { card.ready = true; };
    return card;
  });

  /* --- state --------------------------------------------------------- */
  var S = {
    scroll: 0, target: 0, velocity: 0,
    dragging: false, pointerDown: false, lastX: 0, moved: 0,
    tiltX: 0, tiltY: 0, wantTiltX: 0, wantTiltY: 0,
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches
  };
  var cursor = { x: -999, y: -999, has: false };

  /* --- page scroll drives the deck (replaces Anima's own wheel) ------ */
  function targetFromScroll() {
    var range = Math.max(1, hero.offsetHeight - window.innerHeight);
    var n = cards.length;
    return (window.scrollY / range) * (n * CFG.loops);
  }
  S.target = S.reduced ? 0 : targetFromScroll(); S.scroll = S.target;
  window.addEventListener('scroll', function(){if(!S.reduced){S.target=targetFromScroll();S.velocity=0;}}, {passive:true});

  /* --- optional drag on the canvas (touch + mouse) -------------------- */
  cv.addEventListener('pointerdown', function (e) {
    if (S.reduced) return;
    cv.setPointerCapture(e.pointerId);
    S.pointerDown = true; S.dragging = false; S.lastX = e.clientX; S.moved = 0;
  });
  window.addEventListener('pointermove', function (e) {
    cursor.x = e.clientX; cursor.y = e.clientY; cursor.has = true;
    S.wantTiltX = S.reduced ? 0 : (e.clientX / window.innerWidth) * 2 - 1;
    S.wantTiltY = S.reduced ? 0 : (e.clientY / window.innerHeight) * 2 - 1;
    if (S.pointerDown) {
      var dx = e.clientX - S.lastX; S.lastX = e.clientX;
      S.moved += Math.abs(dx);
      if (S.moved > 4) S.dragging = true;
      S.target += dx * CFG.drag;
      S.velocity = dx * CFG.drag;
    }
  });
  window.addEventListener('pointerup', function () {
    if (S.dragging) S.velocity *= CFG.glide;
    S.pointerDown = false; S.dragging = false;
  });

  /* --- nav click: jump to that country -------------------------------- */
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var idx = cards.findIndex(function (c) { return c.key === a.dataset.country; });
      if (idx < 0) return;
      if (S.reduced) return;
      e.preventDefault();
      var n = cards.length;
      var range = Math.max(1, hero.offsetHeight - window.innerHeight);
      var cur = S.scroll % n; if (cur < 0) cur += n;
      var d = ((idx - cur) % n + n) % n; if (d > n / 2) d -= n;
      S.target = S.scroll + d;
      S.velocity = 0;
    });
  });

  /* --- label + nav sync (your blur/slide swap, 12px below deck) -------- */
  var activeIdx = -1, nameTimer = 0;
  function sync(p) {
    var n = cards.length, idx = Math.round(p) % n; if (idx < 0) idx += n;
    if (idx === activeIdx) return;
    activeIdx = idx;
    var key = cards[idx].key;
    if (nameEl && !S.reduced) {
      nameEl.classList.add('is-out');
      clearTimeout(nameTimer);
      nameTimer = setTimeout(function () {
        nameEl.textContent = cards[idx].label;
        nameEl.classList.remove('is-out');
        nameEl.classList.add('is-in');
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          nameEl.classList.remove('is-in');
        }); });
      }, 340);
    } else if (nameEl) { nameEl.textContent = cards[idx].label; }
    links.forEach(function (a) { var on=a.dataset.country===key; a.classList.toggle('is-active',on); if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current'); });
  }

  /* --- render ---------------------------------------------------------- */
  function wrapped(i, p, n) {
    var d = (i - p) % n; if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d;
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    var fit = clamp(Math.min(W / 1280, H / 780), 0.38, 1.1);
    var cx = W / 2 + S.tiltX * CFG.tiltX * fit;
    var cy = H * CFG.centerY + S.tiltY * CFG.tiltY * fit;
    var n = cards.length, p = S.scroll % n; if (p < 0) p += n;
    var order = [];

    cards.forEach(function (c) {
      var d = wrapped(c.i, p, n);
      if (Math.abs(d) > CFG.visible) return;
      c.hover = lerp(c.hover, 0, 0.14);
      var z = Math.abs(d) * CFG.zStep * fit;
      var s = (CFG.focal * fit) / (CFG.focal * fit + z);
      order.push({
        c: c, d: d, dist: Math.abs(d),
        x: cx + d * CFG.xStep * fit * s + S.tiltX * 22 * fit * Math.abs(d) * s,
        y: cy + (CFG.arc * d * d * fit + S.tiltY * 14 * fit * Math.abs(d)) * s + Math.abs(d) * 22 * s,
        yaw: d * CFG.yaw + S.tiltX * 0.05,
        roll: d * CFG.roll + S.tiltY * 0.03,
        w: CFG.cardW * fit * s, h: CFG.cardH * fit * s, s: s,
        fade: 1 - Math.pow(clamp((Math.abs(d) - CFG.visible * 0.5) / (CFG.visible * 0.5), 0, 1), 2)
      });
    });
    order.sort(function (a, b) { return b.dist - a.dist; });

    order.forEach(function (o) {
      if (o.fade <= 0.01 || !o.c.ready) return;
      ctx.save();
      ctx.globalAlpha = o.fade;
      ctx.shadowColor = 'rgba(0,0,0,.45)';
      ctx.shadowBlur = 30 * o.s * fit;
      ctx.shadowOffsetY = 14 * o.s * fit;
      ctx.translate(o.x, o.y);
      ctx.rotate(o.roll);
      ctx.scale(Math.cos(o.yaw), 1);
      ctx.beginPath();
      ctx.rect(-o.w / 2, -o.h / 2, o.w, o.h);
      ctx.clip();
      // Soften neighbors optically; never tint the supplied poster artwork.
      var blur = S.reduced ? 0 : Math.min(3, Math.max(0, o.dist - 0.25) * 1.2) * fit;
      ctx.filter = blur > 0 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
      ctx.drawImage(o.c.img, -o.w / 2, -o.h / 2, o.w, o.h);
      ctx.restore();
    });

    sync(p);
  }

  /* --- loop ------------------------------------------------------------- */
  var last = performance.now();
  function frame(now) {
    var dt = Math.min((now - last) / 16.6667, 3); last = now;

    if (!S.pointerDown) {
      if (Math.abs(S.velocity) > 0.00002 && !S.reduced) {
        S.target += S.velocity * dt;
        S.velocity *= Math.pow(CFG.friction, dt);
      } else {
        S.velocity = 0;
        var nearest = Math.round(S.target);
        if (Math.abs(S.target - nearest) > 0.0005) {
          S.target = S.reduced ? nearest
            : lerp(S.target, nearest, 1 - Math.pow(1 - CFG.snap, dt));
        }
      }

    }

    S.scroll = S.reduced ? S.target
      : lerp(S.scroll, S.target, 1 - Math.pow(1 - CFG.follow, dt));
    S.tiltX = lerp(S.tiltX, S.wantTiltX, 1 - Math.pow(1 - CFG.tiltLag, dt));
    S.tiltY = lerp(S.tiltY, S.wantTiltY, 1 - Math.pow(1 - CFG.tiltLag, dt));

    render();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.addEventListener('resize', resize);
})();
