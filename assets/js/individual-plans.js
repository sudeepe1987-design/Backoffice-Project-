/**
 * Individual home — Plans & Pricing cards (data-driven)
 */
(function () {
  'use strict';

  function contactHref(service, country) {
    var url = 'contact.html?service=' + encodeURIComponent(service);
    if (country) url += '&country=' + encodeURIComponent(country);
    return url;
  }

  function listsBlock(title, items, mod) {
    var html = '<p class="plan-card__lists-title">' + title + '</p><ul class="plan-card__lists plan-card__lists--desktop ' + (mod || '') + '">';
    items.forEach(function (item) {
      html += '<li>' + item + '</li>';
    });
    html += '</ul>';
    return html;
  }

  function detailsBlock(summary, items) {
    var html = '<details class="plan-card__details"><summary>' + summary + '</summary><ul class="plan-card__lists plan-card__lists--mobile">';
    items.forEach(function (item) {
      html += '<li>' + item + '</li>';
    });
    html += '</ul></details>';
    return html;
  }

  var plans = [
    {
      tag: 'Eligibility',
      name: 'Eligibility Check',
      price: '₹199',
      purpose: 'A low-cost first check before a client spends a large amount on a full immigration, visa or documentation process.',
      format: '10-minute video call or phone call.',
      desc: 'This is a basic discussion to understand whether the client appears to satisfy the main profile and documentation requirements for their intended immigration, visa, study or work pathway.',
      included: [
        'Review of target country and intended pathway',
        'Basic discussion of education, work history and available documents',
        'Identification of obvious documentation gaps',
        'Practical next steps',
        'Guidance on whether full documentation support may be suitable'
      ],
      excluded: [
        'Visa approval guarantee',
        'Legal advice',
        'Government representation',
        'Complete application preparation',
        'Document submission',
        'Detailed document-by-document audit'
      ],
      cta: 'ELIGIBILITY CHECK — ₹199',
      service: 'Eligibility Check',
      anchorId: 'plan-eligibility-check'
    },
    {
      tag: 'Documentation',
      name: 'Documentation Support - DIY',
      price: '₹499',
      purpose: 'For clients preparing and submitting their own application who want clear process guidance.',
      format: 'Video or phone-call guidance with checklist and document-organisation support.',
      desc: 'You remain responsible for every document and submission. We guide categories, naming, sequencing and readiness checks.',
      included: [
        'Personal document checklist', 'Document categories', 'File names and folders', 'Video or phone guidance', 'Supporting evidence guidance', 'Readiness check'
      ],
      excluded: [
        'Preparing documents on your behalf',
        'Fabricating information or letters',
        'Legal representation',
        'Government portal submission',
        'Visa outcome guarantee'
      ],
      cta: 'GET DOCUMENTATION SUPPORT - DIY',
      service: 'Documentation Support — DIY'
    },
    {
      tag: 'Documentation',
      name: 'Immigration Documentation Support',
      price: '₹3,999',
      purpose: 'Hands-on documentation organisation and preparation support for a defined immigration or visa file.',
      format: 'Remote case support with structured checklists and file build.',
      desc: 'We help organise, prepare and quality-check your documentation pack against pathway requirements while you remain the applicant.',
      included: [
        'Pathway-specific document checklist',
        'File organisation and naming structure',
        'Form-support and evidence mapping guidance',
        'Drafting support for standard supporting formats where applicable',
        'Internal quality review before you proceed'
      ],
      excluded: [
        'Legal advice or representation',
        'Government submission on your behalf',
        'Guaranteed visa outcomes',
        'Fabricated documents or false statements'
      ],
      cta: 'Enquire',
      service: 'Immigration Documentation Support'
    },
    {
      tag: 'Quality',
      name: 'Document Review & Quality Check',
      price: '₹499',
      purpose: 'A second-eye review of an existing file before submission or escalation.',
      format: 'Written correction list after structured review.',
      desc: 'We check names, dates, consistency, translations, missing pages and overall organisation. Output is a practical correction list — not a new application.',
      included: [
        'Consistency check across forms and supporting documents',
        'Missing-page and translation flagging',
        'Date, name and reference alignment review',
        'Organisation and presentation feedback',
        'Written correction list'
      ],
      excluded: [
        'Full re-preparation of the file',
        'Legal advice',
        'Government representation',
        'Outcome guarantees'
      ],
      cta: 'Enquire',
      service: 'Document Review & Quality Check'
    },
    {
      tag: 'Preparation',
      name: 'Application Preparation & Submission Ready',
      price: '₹5,999',
      purpose: 'End-to-end documentation workflow to produce an organised, submission-ready folder.',
      format: 'Structured preparation with QC and evidence mapping.',
      desc: 'Covers documentation workflow, form-support guidance, evidence mapping, quality control and a final organised folder. This is not government submission or immigration representation.',
      included: [
        'Workflow planning for your pathway',
        'Form-support and field-level guidance',
        'Evidence mapping to requirements',
        'Quality control pass',
        'Organised final documentation folder'
      ],
      excluded: [
        'Lodging the application with a government authority',
        'Acting as your immigration representative',
        'Legal advice',
        'Visa approval guarantees'
      ],
      cta: 'Enquire',
      service: 'Application Preparation & Submission Ready'
    },
    {
      tag: 'Consultation',
      name: 'Immigration Documentation Consultation',
      price: '₹499',
      purpose: 'Deeper paperwork strategy for complex or multi-step pathways.',
      format: 'Focused consultation session.',
      desc: 'Discussion of pathway paperwork, evidence standards, document sequencing and practical next steps for your file.',
      included: [
        'Pathway and evidence-standard discussion',
        'Document sequencing advice',
        'Risk flags on obvious gaps',
        'Next-step action list'
      ],
      excluded: [
        'Full file preparation',
        'Legal advice',
        'Representation',
        'Outcome guarantees'
      ],
      cta: 'Enquire',
      service: 'Immigration Documentation Consultation'
    },
    {
      tag: 'Documentation',
      name: 'SOP & Letter Review',
      price: '₹499',
      purpose: 'Structure and clarity review for statements and letters you author.',
      format: 'Marked-up or comment-based review.',
      desc: 'We check structure, clarity and consistency with your supporting documents. You remain the author; we do not invent facts.',
      included: [
        'Structure and flow feedback',
        'Clarity and tone suggestions',
        'Cross-check with supporting documents',
        'Consistency flags'
      ],
      excluded: [
        'Ghost-writing or inventing facts',
        'Legal advice',
        'Guaranteed outcomes'
      ],
      cta: 'Enquire',
      service: 'SOP & Letter Review'
    },
    {
      tag: 'Consultation',
      name: 'Study Abroad Consultation',
      price: '₹199',
      purpose: 'Early orientation on study-related documentation readiness.',
      format: 'Short consultation call.',
      desc: 'Helps students understand document readiness, offer-letter paperwork, study-related supporting documents and sensible next steps.',
      included: [
        'Pathway and intake orientation',
        'Document readiness overview',
        'Offer-letter and study-doc pointers',
        'Next-step guidance'
      ],
      excluded: [
        'Full application preparation',
        'Legal advice',
        'Admission or visa guarantees'
      ],
      cta: 'Enquire',
      service: 'Study Abroad Consultation'
    },
    {
      tag: 'Consultation',
      name: 'Ask Me — Immigration & Study Abroad',
      price: '₹299',
      purpose: 'Quick answers on documentation or study-abroad admin questions.',
      format: 'Short Q&A session.',
      desc: 'Focused responses on documentation processes, terminology and practical next steps — not legal representation.',
      included: ['Targeted answers to your questions', 'Pointers to relevant checklists or services', 'Practical next steps'],
      excluded: ['Legal advice', 'Representation', 'Guaranteed outcomes', 'Full file review'],
      cta: 'Enquire',
      service: 'Ask Me — Immigration & Study Abroad'
    },
    {
      tag: 'Documentation',
      name: 'Priority Document Question',
      price: '₹299',
      purpose: 'Fast clarification on a specific document or form field.',
      format: 'Priority written or call response.',
      desc: 'For a single focused question on a document, translation, form field or evidence item.',
      included: ['One priority question scope', 'Clear written or call response', 'Follow-up clarification within scope'],
      excluded: ['Full file review', 'Legal advice', 'Representation'],
      cta: 'Enquire',
      service: 'Priority Document Question'
    },
    {
      tag: 'Package',
      name: 'Study Abroad Starter Package',
      price: '₹499',
      purpose: 'Starter bundle for students beginning documentation planning.',
      format: 'Consultation plus starter checklist.',
      desc: 'Combines orientation on study documentation with a starter checklist and organisation tips.',
      included: ['Study pathway orientation', 'Starter document checklist', 'File organisation tips', 'Next-step guidance'],
      excluded: ['Full application build', 'Legal advice', 'Admission guarantees'],
      cta: 'Enquire',
      service: 'Study Abroad Starter Package'
    },
    {
      tag: 'Documentation',
      name: 'Complete Application File Review',
      price: '₹999',
      purpose: 'Comprehensive review of a near-complete application file.',
      format: 'Detailed review with structured feedback.',
      desc: 'In-depth pass across forms, evidence and supporting documents before you submit or hand off to counsel.',
      included: [
        'Full-file consistency review',
        'Evidence mapping check',
        'Form and attachment review',
        'Prioritised correction list'
      ],
      excluded: ['Legal advice', 'Government submission', 'Outcome guarantees'],
      cta: 'Enquire',
      service: 'Complete Application File Review'
    },
    {
      tag: 'Agency',
      name: 'B2B Immigration Back Office Support',
      price: '₹6,999',
      purpose: 'White-label documentation operations for agencies and consultants who stay client-facing.',
      format: 'Ongoing back-office case support per agreed scope.',
      desc: 'Your agency remains the client-facing brand. Back Office Solutions supports checklists, document organisation, follow-up, internal quality checks and white-label processes behind the scenes.',
      included: [
        'Shared checklists and file structure',
        'Document organisation and naming',
        'Follow-up tracking support',
        'Internal QC on prepared files',
        'White-label friendly workflows'
      ],
      excluded: [
        'Client-facing representation unless agreed separately',
        'Legal advice',
        'Guaranteed visa outcomes',
        'Replacing your client relationship'
      ],
      cta: 'Enquire',
      service: 'Corporate / agency back office'
    },
    {
      tag: 'Registration',
      name: 'ECA & WES Registration & Consultancy',
      price: '₹599',
      purpose: 'Document, account and checklist support for educational credential assessment.',
      format: 'Process guidance and documentation support.',
      desc: 'We help with paperwork, account setup guidance and checklists. WES or the assessing body makes all eligibility and assessment decisions.',
      included: ['Document checklist', 'Account setup guidance', 'Submission paperwork support'],
      excluded: ['Assessment outcome guarantees', 'Acting as the assessing body'],
      cta: 'Enquire',
      service: 'AHPRA / NCLEX / WES / IELTS docs'
    },
    {
      tag: 'Registration',
      name: 'NCLEX Registration & Consultancy',
      price: '₹2,999',
      purpose: 'Documentation and process support for NCLEX registration pathways.',
      format: 'Checklist-led support.',
      desc: 'Document, account and checklist assistance. Official boards decide registration eligibility.',
      included: ['Registration checklist', 'Document organisation', 'Process guidance'],
      excluded: ['Guaranteed registration', 'Acting as the regulatory body'],
      cta: 'Enquire',
      service: 'AHPRA / NCLEX / WES / IELTS docs'
    },
    {
      tag: 'Registration',
      name: 'AHPRA Registration & Consultancy',
      price: '₹2,999',
      purpose: 'Paperwork support for AHPRA-related registration processes.',
      format: 'Checklist and document support.',
      desc: 'We support documentation and process clarity. AHPRA makes all registration decisions.',
      included: ['Document checklist', 'File organisation', 'Process orientation'],
      excluded: ['Registration guarantees', 'Acting as AHPRA'],
      cta: 'Enquire',
      service: 'AHPRA / NCLEX / WES / IELTS docs'
    },
    {
      tag: 'Registration',
      name: 'OET Registration & Consultancy',
      price: '₹599',
      purpose: 'Booking and documentation support for OET registration.',
      format: 'Administrative guidance.',
      desc: 'Account and paperwork support. OET determines scores and eligibility.',
      included: ['Registration paperwork guidance', 'Document checklist', 'Booking orientation'],
      excluded: ['Score guarantees', 'Acting as OET'],
      cta: 'Enquire',
      service: 'AHPRA / NCLEX / WES / IELTS docs'
    },
    {
      tag: 'Booking',
      name: 'Passport Services & Visa Booking',
      price: '₹599',
      purpose: 'Administrative support for passport and visa appointment booking.',
      format: 'Booking assistance and checklist.',
      desc: 'Guidance on slots, forms and supporting documents for booking — government systems confirm appointments.',
      included: ['Booking process guidance', 'Document checklist for appointment', 'Slot-finding orientation'],
      excluded: ['Guaranteed appointments', 'Government decisions'],
      cta: 'Enquire',
      service: 'Other'
    },
    {
      tag: 'Travel finance',
      name: 'Forex Card Services',
      price: '₹1,999',
      purpose: 'Paperwork and guidance for forex card applications.',
      format: 'Documentation support only.',
      desc: 'We help with forms and required paperwork. Licensed banks and issuers execute the transaction and set rates.',
      included: ['Application paperwork guidance', 'Document checklist', 'Process orientation'],
      excluded: ['Executing the financial transaction', 'Rate guarantees'],
      cta: 'Enquire',
      service: 'Other'
    },
    {
      tag: 'Travel finance',
      name: 'Student Course Fee Payment',
      price: '₹1,999',
      purpose: 'Guidance on course-fee payment documentation.',
      format: 'Paperwork support only.',
      desc: 'Support with payment-related paperwork and bank processes. Institutions and banks make final decisions.',
      included: ['Payment paperwork checklist', 'Bank process orientation', 'Document preparation guidance'],
      excluded: ['Executing payments', 'Exchange-rate guarantees'],
      cta: 'Enquire',
      service: 'Other'
    },
    {
      tag: 'Travel finance',
      name: 'International Money Transfer',
      price: '₹1,499',
      purpose: 'Documentation for international transfers.',
      format: 'Guidance only — ADs and banks execute transfers.',
      desc: 'Paperwork and compliance-document orientation. Authorised dealers and banks execute transfers and set rates.',
      included: ['Transfer paperwork checklist', 'Compliance document orientation', 'Process guidance'],
      excluded: ['Executing the transfer', 'Rate or approval guarantees'],
      cta: 'Enquire',
      service: 'Other'
    },
    {
      tag: 'Travel',
      name: 'Tours & Travel',
      price: '₹2,499',
      purpose: 'Travel planning and documentation admin support.',
      format: 'Itinerary and booking paperwork assistance.',
      desc: 'Support with travel documentation and booking paperwork — suppliers confirm availability.',
      included: ['Itinerary paperwork support', 'Booking documentation guidance', 'Travel document checklist'],
      excluded: ['Guaranteed fares or availability', 'Visa outcome guarantees'],
      cta: 'Enquire',
      service: 'Other'
    },
    {
      tag: 'Travel',
      name: 'Air Ticketing',
      price: '₹1,499',
      purpose: 'Air ticket booking paperwork and guidance.',
      format: 'Administrative booking support.',
      desc: 'Help with ticketing paperwork and airline processes. Airlines confirm fares and seats.',
      included: ['Booking paperwork guidance', 'Passenger document checklist', 'Airline process orientation'],
      excluded: ['Guaranteed lowest fares', 'Airline policy decisions'],
      cta: 'Enquire',
      service: 'Air Ticketing'
    }
  ];

  function ctaLabel(p) {
    if (p.cta) return p.cta;
    return 'Enquire — ' + p.name;
  }

  function renderPlan(p) {
    var art = document.createElement('article');
    var isSpotlight = Boolean(p.anchorId);
    art.className = 'plan-card plan-card--expanded js-reveal' + (isSpotlight ? ' plan-card--spotlight' : '');
    if (p.anchorId) art.id = p.anchorId;
    var ctaClass = 'glass-cta' + (isSpotlight ? ' glass-cta--spotlight' : '');
    art.innerHTML =
      '<span class="plan-card__tag">' + p.tag + '</span>' +
      '<h3>' + p.name + '</h3>' +
      '<p class="plan-card__price">' + p.price + '</p>' +
      '<p class="plan-card__purpose">' + p.purpose + '</p>' +
      '<p class="plan-card__format"><strong>Format:</strong> ' + p.format + '</p>' +
      '<p class="plan-card__desc">' + p.desc + '</p>' +
      listsBlock('What is included', p.included) +
      listsBlock('What is not included', p.excluded) +
      detailsBlock('What is included', p.included) +
      detailsBlock('What is not included', p.excluded) +
      '<a class="' + ctaClass + '" href="' + contactHref(p.service) + '">' + ctaLabel(p) + '</a>';
    return art;
  }

  function initPlansCarousel(grid) {
    var cards = Array.from(grid.children);
    var wrap = document.createElement('div');
    wrap.className = 'bo-plans';
    wrap.setAttribute('role','region');
    wrap.setAttribute('aria-label','Service plans carousel');
    var controls = document.createElement('div');
    controls.className = 'bo-carousel-controls';
    controls.innerHTML = '<button type="button" aria-label="Previous plans">←</button><span aria-live="polite"></span><button type="button" aria-label="Next plans">→</button>';
    grid.before(wrap); wrap.append(controls,grid);
    grid.className='bo-plans-track'; grid.tabIndex=0;
    grid.setAttribute('aria-label','Swipe or use arrow keys to browse plans');
    var dots=document.createElement('div');dots.className='bo-plan-dots';dots.setAttribute('aria-label','Choose service plan');wrap.append(dots);
    cards.forEach(function(card,i){var dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Show '+card.querySelector('h3').textContent);dot.onclick=function(){go(i);};dots.append(dot);});
    cards.forEach(function(card){card.classList.remove('js-reveal');});
    var prev=controls.querySelector('button'),next=controls.querySelector('button:last-child'),status=controls.querySelector('span');
    var index=0, stride=0, touch=null;
    var motion=matchMedia('(prefers-reduced-motion: reduce)');
    function visibleCount(){return window.innerWidth>=1100?4:window.innerWidth>=640?2:1;}
    function maxIndex(){return Math.max(0,cards.length-visibleCount());}
    function step(){return (grid.clientWidth+16)/visibleCount();}
    function paint(){
      index=Math.max(0,Math.min(maxIndex(),Math.round(grid.scrollLeft/step())));
      prev.disabled=index===0; next.disabled=index===maxIndex();
      // For an even visible set, highlight the right-hand middle card.
      var center=index+Math.floor(visibleCount()/2);
      cards.forEach(function(card,i){card.classList.toggle('is-carousel-center',i===center);});
      Array.from(dots.children).forEach(function(dot,i){dot.setAttribute('aria-current',String(i===index));});
      status.textContent=(index+1)+'–'+Math.min(cards.length,index+visibleCount())+' of '+cards.length;
    }
    function go(target){grid.scrollTo({left:Math.max(0,Math.min(maxIndex(),target))*step(),behavior:motion.matches?'instant':'smooth'});}
    function move(delta){go(index+delta);}
    function resize(){
      var keep=Math.max(0,Math.min(maxIndex(),index));
      stride=step(); grid.scrollTo({left:keep*stride,behavior:'instant'});paint();
    }
    prev.onclick=function(){move(-1);};next.onclick=function(){move(1);};
    grid.addEventListener('keydown',function(e){if(e.target!==grid)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
    grid.addEventListener('touchstart',function(e){if(e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY,index:index};else touch=null;},{passive:true});
    grid.addEventListener('touchend',function(e){
      if(!touch||!e.changedTouches.length)return;
      var dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;
      if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))go(touch.index+(dx<0?1:-1));
      touch=null;
    },{passive:true});
    grid.addEventListener('touchcancel',function(){touch=null;},{passive:true});
    grid.addEventListener('scroll',paint,{passive:true});
    window.addEventListener('resize',resize);
    if('ResizeObserver' in window)new ResizeObserver(resize).observe(grid);
    resize();
  }

  function initIndividualPlans() {
    var grid = document.querySelector('[data-individual-plans]');
    if (!grid) return;
    grid.innerHTML = '';
    plans.forEach(function (p) {
      grid.appendChild(renderPlan(p));
    });
    initPlansCarousel(grid);
    if (window.BO_initReveal) window.BO_initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndividualPlans);
  } else {
    initIndividualPlans();
  }
})();
