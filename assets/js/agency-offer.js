/**
 * Agency — Build your own offer (range sliders + enquiry POST)
 */
(function () {
  'use strict';

  var cfg = window.BO_CONFIG || {};

  function qs(sel, root) { return (root || document).querySelector(sel); }

  function formatInr(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  function getEndpoint() {
    var url = (cfg.enquiryEndpoint || '').trim();
    if (!url || (!url.startsWith('/') && !url.startsWith('https://'))) return ''; 
    return url;
  }

  function initSliders(form) {
    var filesRange = qs('#monthlyFilesRange', form);
    var filesOut = qs('#monthlyFilesValue', form);
    var filesHidden = qs('#monthlyFiles', form);
    var budgetRange = qs('#budgetRange', form);
    var budgetOut = qs('#budgetValue', form);
    var budgetHidden = qs('#budget', form);
    if (!filesRange || !budgetRange) return;

    function syncFiles() {
      var v = filesRange.value;
      if (filesOut) filesOut.textContent = v + ' files / month';
      if (filesHidden) filesHidden.value = v;
    }
    function syncBudget() {
      var v = budgetRange.value;
      if (budgetOut) budgetOut.textContent = formatInr(v);
      if (budgetHidden) budgetHidden.value = v;
    }
    filesRange.addEventListener('input', syncFiles);
    budgetRange.addEventListener('input', syncBudget);
    syncFiles();
    syncBudget();
  }

  function showStatus(el, kind, html) {
    if (!el) return;
    el.hidden = false;
    el.className = 'form__success form__note form__note--' + kind;
    el.innerHTML = html;
  }

  function initAgencyOfferForm() {
    var form = document.getElementById('agencyOfferForm');
    if (!form) return;
    var status = document.getElementById('agencyOfferStatus');
    initSliders(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = getEndpoint();
      var data = new FormData(form);
      var payload = {
        formType: 'agency-offer',
        agencyName: data.get('agencyName'),
        contactPerson: data.get('contactPerson'),
        email: data.get('email'),
        phone: data.get('phone'),
        monthlyFiles: data.get('monthlyFiles'),
        destinations: data.get('destinations'),
        complexity: data.get('complexity'),
        budget: data.get('budget'),
        turnaround: data.get('turnaround'),
        notes: data.get('notes'),
        page: window.location.href
      };

      if (!endpoint) {
        showStatus(
          status,
          'warn',
          '<p>Online enquiries are unavailable. Please contact us by email or WhatsApp.</p>'
        );
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      var post = window.BO_postEnquiry || function () {
        return fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { return { ok: r.ok }; });
      };

      post(payload).then(function (result) {
        if (btn) btn.disabled = false;
        if (result.notConfigured) {
          showStatus(status, 'warn', '<p>Enquiry endpoint is not configured.</p>');
          return;
        }
        if (result.ok) {
          showStatus(status, 'ok', '<p><strong>Offer submitted.</strong> We will review scope and respond during business hours.</p>');
          form.reset();
          initSliders(form);
        } else {
          showStatus(status, 'err', '<p>We could not submit your offer. Please try again or use <a href="contact.html?service=Agency%20Partnership">Contact</a>.</p>');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgencyOfferForm);
  } else {
    initAgencyOfferForm();
  }
})();
