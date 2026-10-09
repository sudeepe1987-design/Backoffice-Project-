/**
 * Countries We Support — 14-country coverflow carousel (Canada default active)
 */
(function () {
  'use strict';

  var SHARED_VISUAL = 'assets/images/global/visit-global.jpg';

  function contactRoute(country, service) {
    var q = 'contact.html?country=' + encodeURIComponent(country);
    if (service) q += '&service=' + encodeURIComponent(service);
    return q;
  }

  var countries = [
    {
      name: 'Canada',
      code: 'CA',
      status: 'live',
      route: 'countries.html#canada',
      services: ['PR', 'STUDY', 'WORK', 'VISIT', 'FAMILY'],
      images: [
        { src: 'assets/images/canada/canada-overview.jpg', pos: 'center top' },
        { src: 'assets/images/canada/canada-student.jpg', pos: 'center 20%' },
        { src: 'assets/images/canada/canada-work.jpg', pos: 'center 15%' },
        { src: 'assets/images/canada/canada-pr.jpg', pos: 'center 18%' },
        { src: 'assets/images/canada/canada-spousal.jpg', pos: 'center 20%' },
        { src: 'assets/images/canada/canada-ee.jpg', pos: 'center 15%' },
        { src: 'assets/images/canada/canada-pnp.jpg', pos: 'center 18%' },
        { src: 'assets/images/canada/canada-pgwp.jpg', pos: 'center 20%' },
        { src: 'assets/images/canada/canada-super-visa.jpg', pos: 'center 22%' },
        { src: 'assets/images/canada/canada-startup.jpg', pos: 'center 18%' }
      ]
    },
    {
      name: 'Australia',
      code: 'AU',
      status: 'live',
      route: 'countries.html#australia',
      services: ['SKILLED', 'STUDY', 'WORK', 'FAMILY'],
      images: [
        { src: 'assets/images/australia/au-skills-1.jpg', pos: 'center 12%' },
        { src: 'assets/images/australia/au-skills-2.jpg', pos: 'center 12%' },
        { src: 'assets/images/australia/au-189.jpg', pos: 'center 15%' },
        { src: 'assets/images/australia/au-190.jpg', pos: 'center 15%' },
        { src: 'assets/images/australia/au-485.jpg', pos: 'center 18%' },
        { src: 'assets/images/australia/au-491.jpg', pos: 'center 15%' },
        { src: 'assets/images/australia/au-partner.jpg', pos: 'center 18%' },
        { src: 'assets/images/australia/au-parent.jpg', pos: 'center 18%' }
      ]
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      status: 'live',
      route: contactRoute('United Kingdom', 'United Kingdom documentation'),
      services: ['STUDY', 'WORK', 'VISIT', 'TALENT'],
      images: [
        { src: 'assets/images/uk/uk-student.jpg', pos: 'center 14%' },
        { src: 'assets/images/uk/uk-work.jpg', pos: 'center 16%' },
        { src: 'assets/images/uk/uk-visitor.jpg', pos: 'center 18%' },
        { src: 'assets/images/uk/uk-global.jpg', pos: 'center 15%' },
        { src: 'assets/images/uk/uk-dep.jpg', pos: 'center 16%' }
      ]
    },
    {
      name: 'Germany',
      code: 'DE',
      status: 'live',
      route: contactRoute('Germany', 'Germany documentation'),
      services: ['OPPORTUNITY CARD', 'WORK', 'STUDY'],
      images: [
        { src: 'assets/images/germany/de-main.jpg', pos: 'center 14%' },
        { src: 'assets/images/germany/de-opportunity.jpg', pos: 'center 15%' },
        { src: 'assets/images/germany/de-work.jpg', pos: 'center 16%' },
        { src: 'assets/images/germany/de-study.jpg', pos: 'center 15%' },
        { src: 'assets/images/germany/de-visit.jpg', pos: 'center 18%' }
      ]
    },
    {
      name: 'New Zealand',
      code: 'NZ',
      status: 'live',
      route: 'countries.html#new-zealand',
      services: ['SKILLED', 'STUDY', 'WORK', 'VISIT'],
      images: [
        { src: 'assets/images/new-zealand/nz-study.jpg', pos: 'center 14%' },
        { src: 'assets/images/new-zealand/nz-skilled.jpg', pos: 'center 15%' },
        { src: 'assets/images/new-zealand/nz-visitor.jpg', pos: 'center 18%' },
        { src: 'assets/images/new-zealand/nz-nzqa.jpg', pos: 'center 16%' }
      ]
    },
    {
      name: 'Austria',
      code: 'AT',
      status: 'live',
      route: contactRoute('Austria', 'Europe documentation'),
      services: ['JOB SEEKER', 'WORK', 'STUDY'],
      images: [{ src: 'assets/images/europe/at.jpg', pos: 'center 14%' }]
    },
    {
      name: 'Netherlands',
      code: 'NL',
      status: 'live',
      route: contactRoute('Netherlands', 'Europe documentation'),
      services: ['ORIENTATION YEAR', 'WORK', 'STUDY'],
      images: [{ src: 'assets/images/europe/nl.jpg', pos: 'center 14%' }]
    },
    {
      name: 'Portugal',
      code: 'PT',
      status: 'live',
      route: contactRoute('Portugal', 'Europe documentation'),
      services: ['JOB SEEKER', 'WORK', 'STUDY'],
      images: [{ src: 'assets/images/europe/pt.jpg', pos: 'center 14%' }]
    },
    {
      name: 'Sweden',
      code: 'SE',
      status: 'live',
      route: contactRoute('Sweden', 'Europe documentation'),
      services: ['JOB SEEKER', 'WORK', 'STUDY'],
      images: [{ src: 'assets/images/europe/se.jpg', pos: 'center 14%' }]
    },
    {
      name: 'United States',
      code: 'US',
      status: 'live',
      route: contactRoute('United States', 'USA visa documentation'),
      services: ['STUDY', 'WORK', 'VISIT', 'REGISTRATION'],
      images: [{ src: 'assets/images/usa/us.jpg', pos: 'center 14%' }]
    },
    {
      name: 'Ireland',
      code: 'IE',
      status: 'shared-visual',
      route: contactRoute('Ireland', 'Europe documentation'),
      services: ['STUDY', 'WORK', 'VISIT'],
      images: [{ src: SHARED_VISUAL, pos: 'center 20%' }]
    },
    {
      name: 'Singapore',
      code: 'SG',
      status: 'shared-visual',
      route: contactRoute('Singapore', 'Other'),
      services: ['WORK', 'STUDY', 'VISIT'],
      images: [{ src: SHARED_VISUAL, pos: 'center 20%' }]
    },
    {
      name: 'Thailand',
      code: 'TH',
      status: 'shared-visual',
      route: contactRoute('Thailand', 'Other'),
      services: ['WORK', 'STUDY', 'VISIT'],
      images: [{ src: SHARED_VISUAL, pos: 'center 20%' }]
    },
    {
      name: 'UAE',
      code: 'AE',
      status: 'shared-visual',
      route: contactRoute('UAE', 'Other'),
      services: ['WORK', 'VISIT', 'DOCUMENTATION'],
      images: [{ src: SHARED_VISUAL, pos: 'center 20%' }]
    }
  ];

  window.BO_COUNTRIES = countries;

  function init(){
    const mount=document.querySelector('[data-countries-support]');if(!mount)return;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    mount.className='bo-countries';mount.setAttribute('role','region');mount.setAttribute('aria-label','Countries we support');
    mount.innerHTML='<div class="bo-carousel-controls"><button type="button" aria-label="Previous country">←</button><span aria-live="polite"></span><button type="button" aria-label="Next country">→</button><button type="button" aria-label="Pause poster rotation" aria-pressed="false">Ⅱ</button></div><div class="bo-country-stage" tabindex="0" aria-label="Country gallery; use left and right arrows"></div>';
    const stage=mount.querySelector('.bo-country-stage');let active=0,timer,paused=false,hovered=false,touched=false,focused=false;
    const positions=countries.map(()=>0);
    const cards=countries.map((c,i)=>{
      const card=document.createElement('article');card.className='bo-country';
      const stack=document.createElement('div');stack.className='bo-poster-stack';
      c.images.forEach((image,n)=>{const img=document.createElement('img');img.alt=c.name+' documentation poster '+(n+1);img.dataset.src=image.src;if(i<3&&n===0)img.src=image.src;img.classList.toggle('current',n===0);img.setAttribute('aria-hidden',String(n!==0));img.decoding='async';stack.append(img);});
      const body=document.createElement('div');body.className='bo-country-body';
      const h=document.createElement('h3');h.textContent=c.name;
      const p=document.createElement('p');p.textContent=c.services.join(' · ');
      const link=document.createElement('a');link.href=c.route;link.className='glass-cta';link.textContent='Explore '+c.name;
      body.append(h,p,link);card.append(stack,body);
      const select=document.createElement('button');select.type='button';select.className='bo-country-select';select.setAttribute('aria-label','Show '+c.name);select.onclick=()=>choose(i);card.append(select);
      if(c.images.length>1){const nav=document.createElement('div');nav.className='bo-poster-controls';[-1,1].forEach(dir=>{const btn=document.createElement('button');btn.type='button';btn.textContent=dir<0?'←':'→';btn.setAttribute('aria-label',(dir<0?'Previous':'Next')+' poster for '+c.name);btn.onclick=()=>poster(i,dir);nav.append(btn);});card.append(nav);}
      card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;if(i!==active)choose(i);stop();}});
      card.addEventListener('pointerleave',()=>{hovered=false;restart();});
      let lastWheel=0;
      card.addEventListener('wheel',e=>{if(i!==active)choose(i);else if(performance.now()-lastWheel>700&&Math.abs(e.deltaY)>15){poster(i,e.deltaY>0?1:-1);lastWheel=performance.now();}},{passive:true});
      stage.append(card);return card;
    });
    function load(card){card.querySelectorAll('img[data-src]').forEach(img=>{if(!img.getAttribute('src'))img.src=img.dataset.src;});}
    function poster(i,dir){const imgs=cards[i].querySelectorAll('img');if(imgs.length<2)return;const n=(positions[i]+dir+imgs.length)%imgs.length;const img=imgs[n];img.src=img.dataset.src;const show=()=>{imgs.forEach((el,j)=>{el.classList.toggle('current',j===n);el.setAttribute('aria-hidden',String(j!==n));});positions[i]=n;};if(img.complete&&img.naturalWidth)show();else img.onload=show;}
    function stop(){clearInterval(timer);}
    function restart(){stop();if(!motion.matches&&!paused&&!hovered&&!focused&&!touched&&!document.hidden)timer=setInterval(()=>poster(active,1),5500);}
    function paint(){let slot=0;cards.forEach((card,i)=>{const isActive=i===active;card.classList.toggle('active',isActive);const n=isActive?-1:slot++;card.style.setProperty('--slot',n);card.hidden=!isActive&&n>2;card.inert=card.hidden;card.querySelector('.bo-country-select').tabIndex=isActive?-1:0;card.querySelectorAll('a,.bo-poster-controls button').forEach(el=>el.tabIndex=isActive?0:-1);if(isActive||n<3)load(card);});mount.querySelector('.bo-carousel-controls span').textContent=countries[active].name+' · '+(active+1)+' / '+countries.length;restart();}
    function choose(i){active=(i+cards.length)%cards.length;paint();}
    const buttons=mount.querySelectorAll('.bo-carousel-controls button');buttons[0].onclick=()=>choose(active-1);buttons[1].onclick=()=>choose(active+1);buttons[2].onclick=()=>{paused=!paused;buttons[2].setAttribute('aria-pressed',String(paused));buttons[2].setAttribute('aria-label',paused?'Resume poster rotation':'Pause poster rotation');buttons[2].textContent=paused?'▶':'Ⅱ';restart();};
    mount.addEventListener('focusin',()=>{focused=true;stop();});mount.addEventListener('focusout',e=>{focused=mount.contains(e.relatedTarget);restart();});
    stage.addEventListener('touchstart',()=>{touched=true;stop();},{passive:true});
    stage.addEventListener('touchend',()=>{touched=false;restart();},{passive:true});
    stage.addEventListener('keydown',e=>{if(e.target!==stage)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();choose(active+(e.key==='ArrowRight'?1:-1));}});
    document.addEventListener('visibilitychange',restart);motion.addEventListener('change',restart);paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
