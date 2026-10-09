/**
 * Native paper-plane pointer; decorative halo and hero-only flight trail.
 */
(function () {
  'use strict';

  // Inner pages may load this script dynamically more than once.
  if (window.boTravelCursor) return;
  var fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var stopEffects = null;
  var ready = false;
  var protectedSelector = 'input, textarea, select, option, button, form, label, [contenteditable]:not([contenteditable="false"]), p, li, h1, h2, h3, h4, h5, h6, .sticky-word-reveal__text, .hero-navy-lead, .plan-card__desc, .plan-card__purpose';
  var clickableSelector = 'a[href], button, .glass-cta, [role="button"], summary, .premium-toggle';

  function isProtected(target) {
    if (!target || !target.closest) return true;
    // Never decorate native controls, editable regions, or form contents.
    if (target.closest('input, textarea, select, option, button, form, label, [contenteditable]:not([contenteditable="false"])')) return true;
    return !!target.closest(protectedSelector) && !target.closest(clickableSelector);
  }

  function hasSelection() {
    var selection = window.getSelection();
    return selection && !selection.isCollapsed;
  }

  function startEffects() {
    var halo = document.createElement('div');
    halo.className = 'bo-cursor-halo';
    halo.setAttribute('aria-hidden', 'true');
    document.body.appendChild(halo);

    var trails = Array.prototype.map.call(document.querySelectorAll('.landing-hero, .hero'), function (hero) {
      var layer = document.createElement('div');
      layer.className = 'bo-cursor-trail';
      layer.setAttribute('aria-hidden', 'true');
      hero.appendChild(layer);
      return { hero: hero, layer: layer, lastTime: 0, lastX: null, lastY: null };
    });
    var timers = new Set();
    var frame = 0;
    var hx = 0;
    var hy = 0;
    var tx = 0;
    var ty = 0;
    var visible = false;
    var pressed = false;
    var stopped = false;

    function clearTrails() {
      timers.forEach(function (timer) { window.clearTimeout(timer); });
      timers.clear();
      trails.forEach(function (trail) {
        trail.layer.textContent = '';
        trail.lastX = null;
        trail.lastTime = 0;
      });
    }

    function hide() {
      visible = false;
      halo.classList.remove('is-hover');
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      clearTrails();
    }

    function tick() {
      frame = 0;
      if (stopped || !visible) return;
      hx += (tx - hx) * 0.3;
      hy += (ty - hy) * 0.3;
      halo.style.transform = 'translate3d(' + hx + 'px, ' + hy + 'px, 0)';
      if (Math.abs(tx - hx) + Math.abs(ty - hy) > 0.1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function spawnTrail(event) {
      var now = performance.now();
      trails.forEach(function (trail) {
        if (!trail.hero.contains(event.target)) return;
        var rect = trail.layer.getBoundingClientRect();
        if (!rect.width || !rect.height || event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) return;
        if (now - trail.lastTime < 45) return;
        // Measure against the absolute layer, not the viewport or hero border.
        var x = (event.clientX - rect.left) * trail.layer.offsetWidth / rect.width;
        var y = (event.clientY - rect.top) * trail.layer.offsetHeight / rect.height;
        if (trail.lastX !== null && Math.hypot(x - trail.lastX, y - trail.lastY) < 9) return;
        trail.lastTime = now;
        trail.lastX = x;
        trail.lastY = y;
        var dot = document.createElement('span');
        dot.className = 'bo-cursor-trail__dot';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        trail.layer.appendChild(dot);
        var timer = window.setTimeout(function () {
          dot.remove();
          timers.delete(timer);
        }, 520);
        timers.add(timer);
      });
    }

    function update(event, trailAllowed) {
      if ((event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') ||
          pressed || event.buttons || isProtected(event.target) || hasSelection()) {
        hide();
        return;
      }
      tx = event.clientX;
      ty = event.clientY;
      // A modal dialog is in the browser's top layer; keep its halo above it.
      var surface = event.target.closest('dialog[open]') || document.body;
      if (halo.parentElement !== surface) surface.appendChild(halo);
      var clickable = !!event.target.closest(clickableSelector);
      if (clickable) {
        if (!visible) {
          hx = tx;
          hy = ty;
          halo.style.transform = 'translate3d(' + hx + 'px, ' + hy + 'px, 0)';
        }
        visible = true;
        halo.classList.add('is-hover');
        if (!frame) frame = window.requestAnimationFrame(tick);
      } else {
        visible = false;
        halo.classList.remove('is-hover');
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      }
      if (trailAllowed) spawnTrail(event);
    }

    function onMove(event) { update(event, true); }
    function onOver(event) { update(event, false); }
    function onOut(event) { if (!event.relatedTarget) onLeave(); }
    function onLeave() { pressed = false; hide(); }
    function onDown() { pressed = true; hide(); }
    function onUp(event) { pressed = false; update(event, false); }
    function onSelection() { if (hasSelection()) hide(); }
    var listeners = [
      [window, 'pointermove', onMove],
      [window, 'pointerover', onOver],
      [window, 'pointerout', onOut],
      [document.documentElement, 'pointerleave', onLeave],
      [window, 'pointerdown', onDown],
      [window, 'pointerup', onUp],
      [window, 'pointercancel', onLeave],
      [window, 'blur', onLeave],
      [document, 'scroll', hide],
      [document, 'selectionchange', onSelection],
      [document, 'visibilitychange', onLeave]
    ];
    listeners.forEach(function (item) {
      item[0].addEventListener(item[1], item[2], { passive: true, capture: true });
    });

    return function () {
      stopped = true;
      hide();
      listeners.forEach(function (item) { item[0].removeEventListener(item[1], item[2], true); });
      halo.remove();
      trails.forEach(function (trail) { trail.layer.remove(); });
    };
  }

  function refresh() {
    if (!ready) return;
    if (stopEffects) stopEffects();
    stopEffects = null;
    document.documentElement.classList.toggle('bo-travel-cursor', fineHover.matches);
    if (fineHover.matches && !reduceMotion.matches) stopEffects = startEffects();
  }

  function listen(media, listener, remove) {
    if (media.addEventListener) {
      media[remove ? 'removeEventListener' : 'addEventListener']('change', listener);
    } else {
      media[remove ? 'removeListener' : 'addListener'](listener);
    }
  }

  function init() {
    ready = true;
    refresh();
  }

  window.boTravelCursor = {
    destroy: function () {
      if (stopEffects) stopEffects();
      stopEffects = null;
      ready = false;
      document.documentElement.classList.remove('bo-travel-cursor');
      document.removeEventListener('DOMContentLoaded', init);
      listen(fineHover, refresh, true);
      listen(reduceMotion, refresh, true);
      delete window.boTravelCursor;
    }
  };
  listen(fineHover, refresh, false);
  listen(reduceMotion, refresh, false);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();