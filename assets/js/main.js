/**
 * Back Office Solutions — shared UI behaviours
 */
(function () {
  'use strict';

  var cfg = window.BO_CONFIG || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function applyConfigLinks() {
    qsa('[data-bo="phone"]').forEach(function (el) {
      if (el.tagName === 'A') el.href = 'tel:' + (cfg.PHONE_TEL || '');
      el.textContent = cfg.PHONE_DISPLAY || el.textContent;
    });
    qsa('[data-bo="phone-footer"]').forEach(function (el) {
      if (el.tagName === 'A') el.href = 'tel:' + (cfg.PHONE_FOOTER_TEL || '');
      el.textContent = cfg.PHONE_FOOTER_DISPLAY || el.textContent;
    });
    qsa('[data-bo="whatsapp"]').forEach(function (el) {
      if (el.tagName === 'A') {
        el.href = cfg.WHATSAPP_URL || '#';
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    });
    qsa('[data-bo="email"]').forEach(function (el) {
      if (el.tagName === 'A') el.href = 'mailto:' + (cfg.EMAIL || '');
      if (!el.dataset.keepLabel) el.textContent = cfg.EMAIL || el.textContent;
    });
    function wirePlaceholderLink(el, url) {
      if (el.tagName !== 'A') return;
      el.href = url || '#';
      if (String(url || '').indexOf('[INSERT') === 0) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          window.alert('Booking link placeholder — set TOPMATE_* URLs in assets/js/config.js');
        });
      }
    }
    qsa('[data-bo="topmate-eligibility"]').forEach(function (el) {
      wirePlaceholderLink(el, cfg.TOPMATE_ELIGIBILITY_URL);
    });
    qsa('[data-bo="topmate-guidance"]').forEach(function (el) {
      wirePlaceholderLink(el, cfg.TOPMATE_GUIDANCE_URL);
    });
    qsa('[data-bo="topmate-package"]').forEach(function (el) {
      wirePlaceholderLink(el, cfg.TOPMATE_PACKAGE_URL);
    });
    qsa('[data-bo="membership"]').forEach(function (el) {
      if (el.tagName === 'A') el.href = cfg.MEMBERSHIP_ENQUIRY_URL || 'contact.html';
    });
    qsa('[data-social]').forEach(function (el) {
      var key = el.getAttribute('data-social');
      var url = (cfg.SOCIAL && cfg.SOCIAL[key]) || '#';
      el.href = url;
      if (!url || url === '#' || String(url).indexOf('[INSERT') === 0) {
        el.hidden = true;
      }
    });
  }

  function initNav() {
    var toggle = qs('[data-nav-toggle]');
    var drawer = qs('[data-nav-drawer]');
    var overlay = qs('[data-nav-overlay]');
    if (!toggle || !drawer) return;

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (overlay) overlay.hidden = !open;
    }

    toggle.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });

    if (overlay) {
      overlay.addEventListener('click', function () { setOpen(false); });
    }

    qsa('a', drawer).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    setOpen(false);
  }

  function initEnquire() {
    var btn = qs('#enquirePopupBtn');
    if (!btn) return;
    var shown = false;
    function show() {
      if (shown) return;
      shown = true;
      btn.classList.add('is-visible');
    }
    var idle;
    function bump() {
      clearTimeout(idle);
      idle = setTimeout(show, 10000);
    }
    window.addEventListener('scroll', function () {
      if (window.scrollY > 160) show();
    }, { passive: true });
    window.addEventListener('mousemove', bump, { passive: true });
    window.addEventListener('keydown', bump);
    bump();
    btn.addEventListener('click', function () {
      window.location.href = 'contact.html';
    });
  }

  function initReveal() {
    var nodes = qsa('.reveal-text span, .js-reveal');
    if (!nodes.length) return;
    if (reduceMotion) {
      nodes.forEach(function (n) { n.classList.add('is-inview'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-inview'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    nodes.forEach(function (n) { io.observe(n); });
  }
  window.BO_initReveal = initReveal;

  function initHeroParallax() {
    var hero = qs('.hero');
    var flyers = qsa('.flyer-wrap');
    var logo = qs('.hero-brand');
    if (!hero || !flyers.length || reduceMotion) return;

    var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      targetX = (x - 0.5) * 2;
      targetY = (y - 0.5) * 2;
    }, { passive: true });
    hero.addEventListener('pointerleave', function () {
      targetX = 0;
      targetY = 0;
    });

    function tick() {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      flyers.forEach(function (flyer) {
        var depth = parseFloat(flyer.dataset.depth || '-3');
        flyer.style.setProperty('--mouse-x', (currentX * depth * 4) + 'px');
        flyer.style.setProperty('--mouse-y', (currentY * depth * 3) + 'px');
      });
      if (logo) {
        logo.style.setProperty('--logo-x', (currentX * 7) + 'px');
        logo.style.setProperty('--logo-y', (currentY * 5) + 'px');
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  function initHeroDropdowns() {
    var pairs = [
      { trigger: '#btnIndividualTrigger', panel: '#individualMegaPanel' },
      { trigger: '#btnAgencyTrigger', panel: '#agencyMegaPanel' }
    ];
    var items = pairs.map(function (p) {
      return { trigger: qs(p.trigger), panel: qs(p.panel) };
    }).filter(function (p) { return p.trigger && p.panel; });
    if (!items.length) return;

    function closeAll() {
      items.forEach(function (p) {
        p.panel.classList.remove('is-open');
        p.trigger.classList.remove('is-active');
        p.trigger.setAttribute('aria-expanded', 'false');
      });
    }

    items.forEach(function (p) {
      p.trigger.setAttribute('aria-expanded', 'false');
      p.trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !p.panel.classList.contains('is-open');
        closeAll();
        if (open) {
          p.panel.classList.add('is-open');
          p.trigger.classList.add('is-active');
          p.trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', closeAll);
  }

  function initExpandingCards() {
    var cards = qsa('.expand-card');
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { c.classList.remove('is-active'); });
        card.classList.add('is-active');
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  function initCardStacks() {
    qsa('[data-card-stack]').forEach(function (stack) {
      var cards = qsa('.stack-card', stack);
      if (cards.length < 2) return;
      var index = 0;

      function paint() {
        cards.forEach(function (card, i) {
          var offset = (i - index + cards.length) % cards.length;
          card.style.zIndex = String(cards.length - offset);
          card.style.transform = offset === 0
            ? 'translateY(0) scale(1)'
            : 'translateY(' + (offset * 10) + 'px) scale(' + (1 - offset * 0.04) + ')';
          card.style.opacity = offset > 2 ? '0' : String(1 - offset * 0.18);
          card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
        });
      }

      var nextBtn = qs('[data-stack-next]', stack);
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          index = (index + 1) % cards.length;
          paint();
        });
      }

      var startX = null;
      stack.addEventListener('pointerdown', function (e) {
        startX = e.clientX;
      });
      stack.addEventListener('pointerup', function (e) {
        if (startX == null) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 40) {
          index = dx < 0 ? (index + 1) % cards.length : (index - 1 + cards.length) % cards.length;
          paint();
        }
        startX = null;
      });

      paint();
    });
  }

  function initServiceCards() {
    qsa('.service-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        if (reduceMotion) return;
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }

  function initContactQueryParams() {
    var params = new URLSearchParams(window.location.search);
    var service = params.get('service');
    var country = params.get('country');
    if (!service && !country) return;
    var serviceSelect = qs('#service');
    var countryInput = qs('#country');
    var message = qs('#message');
    if (country && countryInput) countryInput.value = country;
    if (service && serviceSelect) {
      var opts = serviceSelect.querySelectorAll('option');
      var matched = false;
      opts.forEach(function (opt) {
        if (opt.textContent === service || opt.value === service) {
          serviceSelect.value = opt.value || opt.textContent;
          matched = true;
        }
      });
      if (!matched) {
        var custom = document.createElement('option');
        custom.textContent = service;
        custom.selected = true;
        serviceSelect.appendChild(custom);
        if (message && !message.value) {
          message.value = 'Service requested: ' + service + (country ? ' (' + country + ')' : '') + '\n\n';
        }
      }
    }
  }

  function getEnquiryEndpoint() {
    var url = (cfg.enquiryEndpoint || cfg.ENQUIRY_ENDPOINT || '').trim();
    if (!url || (!url.startsWith('/') && !url.startsWith('https://'))) return ''; 
    return url;
  }

  function showFormNote(el, kind, message) {
    if (!el) return;
    el.hidden = false;
    el.className = 'form__note form__note--' + (kind || 'warn');
    el.textContent = message;
  }

  function postEnquiry(payload) {
    if (window.BO_sendEnquiry) return window.BO_sendEnquiry(payload);
    var endpoint = getEnquiryEndpoint();
    if (!endpoint) {
      return Promise.resolve({ ok: false, notConfigured: true });
    }
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        return { ok: res.ok, status: res.status, data: data };
      });
    }).catch(function (err) {
      return { ok: false, error: err.message || 'Network error' };
    });
  }
  window.BO_postEnquiry = postEnquiry;

  function initWordReveal() {
    var block = qs('.word-reveal-block');
    if (!block) return;
    var words = qsa('.w', block);
    if (!words.length) return;
    if (reduceMotion) {
      words.forEach(function (w) { w.classList.add('is-lit'); });
      return;
    }
    var lit = 0;
    function lightNext() {
      if (lit >= words.length) return;
      words[lit].classList.add('is-lit');
      lit += 1;
    }
    if (!('IntersectionObserver' in window)) {
      words.forEach(function (w) { w.classList.add('is-lit'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var tick = window.setInterval(function () {
          if (lit >= words.length) {
            window.clearInterval(tick);
            io.disconnect();
            return;
          }
          lightNext();
        }, 70);
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(block);
  }

  function initContactForm() {
    initContactQueryParams();
    var form = qs('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = qs('#contactFormNote');
      var endpoint = getEnquiryEndpoint();
      if (!endpoint) {
        showFormNote(
          note,
          'warn',
          'Online enquiries are temporarily unavailable. Please contact us using the WhatsApp or email links on this page.'
        );
        return;
      }
      var data = new FormData(form);
      var payload = {
        formType: 'contact',
        preferredDate: data.get('preferredDate'),
        referralCode: data.get('referralCode'),
        name: data.get('name'),
        email: data.get('email'),
        company: data.get('company'),
        phone: data.get('phone'),
        service: data.get('service'),
        country_program: data.get('country_program'),
        message: data.get('message'),
        page: window.location.href
      };
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      postEnquiry(payload).then(function (result) {
        if (btn) btn.disabled = false;
        if (result.ok) {
          showFormNote(note, 'ok', (result.data && result.data.message) || 'Thank you — your enquiry was received. We will respond during business hours.');
          form.reset();
        } else {
          showFormNote(note, 'err', (result.data && result.data.error) || 'We could not send your enquiry. Please try WhatsApp or email, or try again later.');
        }
      });
    });
  }

  function setActiveNav() {
    var page = document.body.getAttribute('data-nav');
    if (!page) return;
    qsa('[data-nav-link]').forEach(function (link) {
      if (link.getAttribute('data-nav-link') === page) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function loadTravelCursor() {
    if (document.documentElement.classList.contains('bo-travel-cursor')) return;
    if (document.querySelector('script[data-bo-travel-cursor]')) return;
    var scr = document.createElement('script');
    scr.src = 'assets/js/travel-cursor.js';
    scr.defer = true;
    scr.setAttribute('data-bo-travel-cursor', '1');
    document.head.appendChild(scr);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadTravelCursor();
    applyConfigLinks();
    setActiveNav();
    initNav();
    initEnquire();
    initReveal();
    initHeroParallax();
    initHeroDropdowns();
    initExpandingCards();
    initCardStacks();
    initServiceCards();
    initContactForm();
    initWordReveal();
  });
})();
