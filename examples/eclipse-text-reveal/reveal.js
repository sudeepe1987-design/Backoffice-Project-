/* No dependencies. Scroll down to reveal; scroll up to reverse.
 * Use on a text-only heading/paragraph: <h2 data-eclipse-reveal>...</h2>.
 * Inline text formatting and line breaks are preserved; do not nest controls.
 */
(() => {
  'use strict';
  const clamp = value => Math.max(0, Math.min(1, value));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const instances = [];
  let frame = 0, previousTime = 0;

  function split(root) {
    const readable = root.innerText.replace(/\s+/g, ' ').trim();
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    while (root.firstChild) visual.append(root.firstChild);
    const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const chars = [];
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { fragment.append(document.createTextNode(part)); return; }
        const word = document.createElement('span');
        word.className = 'er-word';
        // Intl.Segmenter keeps combining marks/emoji together where available.
        const letters = typeof Intl.Segmenter === 'function'
          ? Array.from(new Intl.Segmenter(undefined, {granularity: 'grapheme'}).segment(part), item => item.segment)
          : Array.from(part);
        letters.forEach(letter => {
          const char = document.createElement('span');
          char.className = 'er-char'; char.textContent = letter;
          word.append(char); chars.push(char);
        });
        fragment.append(word);
      });
      node.replaceWith(fragment);
    });
    const accessible = document.createElement('span');
    accessible.className = 'er-sr-only'; accessible.textContent = readable;
    root.append(accessible, visual);
    return chars;
  }

  function render(item, progress) {
    const count = item.chars.length;
    // Overlapping character fades create the soft colour wave, not a hard cutoff.
    const wave = .22;
    item.chars.forEach((char, index) => {
      const start = count > 1 ? (index / (count - 1)) * (1 - wave) : 0;
      const x = clamp((progress - start) / wave);
      const eased = x * x * (3 - 2 * x);
      const opacity = reduced.matches ? 1 : item.muted + (1 - item.muted) * eased;
      char.style.setProperty('--er-opacity', opacity.toFixed(4));
    });
    item.root.dataset.revealProgress = progress.toFixed(3);
  }

  function tick(time) {
    frame = 0;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, .1) : 1 / 60;
    previousTime = time;
    let unsettled = false;
    // Batch geometry reads before style writes.
    const targets = instances.map(item => {
      const rect = item.root.getBoundingClientRect();
      const muted = parseFloat(getComputedStyle(item.root).getPropertyValue('--er-muted'));
      if (Number.isFinite(muted) && muted !== item.muted) { item.muted = clamp(muted); item.drawn = null; }
      // Start when top reaches 85% of viewport; finish when bottom reaches 60%.
      return clamp((innerHeight * .85 - rect.top) / Math.max(1, rect.height + innerHeight * .25));
    });
    instances.forEach((item, index) => {
      const target = reduced.matches ? 1 : targets[index];
      if (item.progress === null || reduced.matches) item.progress = target;
      else item.progress += (target - item.progress) * (1 - Math.exp(-dt / .12));
      if (Math.abs(target - item.progress) < .0001) item.progress = target;
      else unsettled = true;
      if (item.progress !== item.drawn || item.motion !== reduced.matches) {
        render(item, item.progress); item.drawn = item.progress; item.motion = reduced.matches;
      }
    });
    if (unsettled) frame = requestAnimationFrame(tick);
    else previousTime = 0;
  }

  function schedule() { if (!frame) frame = requestAnimationFrame(tick); }
  function init() {
    document.querySelectorAll('[data-eclipse-reveal]').forEach(root => {
      if (root.dataset.revealReady) return;
      root.dataset.revealReady = 'true'; root.classList.add('er-text');
      const value = parseFloat(getComputedStyle(root).getPropertyValue('--er-muted'));
      instances.push({root, chars: split(root), muted: Number.isFinite(value) ? clamp(value) : .065, progress: null});
    });
    if (!instances.length) return;
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', schedule);
    addEventListener('pageshow', schedule);
    addEventListener('reveal:refresh', schedule);
    reduced.addEventListener('change', schedule);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(schedule);
      instances.forEach(item => observer.observe(item.root));
    }
    document.fonts?.ready.then(schedule);
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();

