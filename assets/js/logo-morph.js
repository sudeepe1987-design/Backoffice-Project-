(function () {
  'use strict';
  var big=document.getElementById('boMorphBig'),slot=document.getElementById('boMorphSlot'),hero=document.getElementById('main');
  if(!big||!slot||!hero)return;
  var motion=matchMedia('(prefers-reduced-motion: reduce)'),content=hero.querySelector('.landing-hero__content');
  var light=document.querySelector('.bo-bg--light'),deep=document.querySelector('.bo-bg--deep');
  var footer=document.getElementById('landingFooter'),travel=footer.closest('.bo-footer-travel');
  var tags=Array.from(document.querySelectorAll('.bo-brand-tag')),sets=Array.from(document.querySelectorAll('.bo-hero-set'));
  var frame=0,active=0,requested=0,swap=0,docked=false,finished=false,timers=[];
  var clamp=function(v){return Math.max(0,Math.min(1,v));};
  function measureDock(){
    // Derive the untransformed intro box from its CSS dimensions.
    var css=getComputedStyle(big),w=parseFloat(css.width),h=parseFloat(css.height),top=parseFloat(css.top);
    var dest=slot.getBoundingClientRect();
    big.style.setProperty('--bo-dx',(dest.left+dest.width/2-innerWidth/2)+'px');
    big.style.setProperty('--bo-dy',(dest.top+dest.height/2-top-h/2)+'px');
    big.style.setProperty('--bo-s',String(dest.height/Math.max(1,h)));
  }
  function setSequence(next){
    if(next===requested&&!motion.matches)return;
    requested=next;clearTimeout(swap);
    if(motion.matches){sets.forEach(function(s,i){s.classList.remove('is-leaving');s.classList.toggle('is-active',i===0);s.setAttribute('aria-hidden',String(i!==0));});active=0;return;}
    if(next===active){sets[active].classList.remove('is-leaving');sets[active].classList.add('is-active');sets[active].removeAttribute('aria-hidden');return;}
    sets[active].classList.remove('is-active');sets[active].classList.add('is-leaving');
    swap=setTimeout(function(){sets.forEach(function(s){s.classList.remove('is-active','is-leaving');s.setAttribute('aria-hidden','true');});sets[requested].classList.add('is-active');sets[requested].removeAttribute('aria-hidden');active=requested;},600);
  }
  function update(){
    frame=0;
    // All geometry reads precede writes; footer uses its unscaled wrapper.
    var range=Math.max(1,hero.offsetHeight-innerHeight),p=clamp(scrollY/range);
    var footerTop=travel.getBoundingClientRect().top+parseFloat(getComputedStyle(travel).paddingTop);
    var fp=clamp((innerHeight-footerTop)/(innerHeight*.85));
    content.style.transform=motion.matches?'none':'translateY('+(-90*p)+'px) scale('+(1-.05*p)+')';
    setSequence(motion.matches?0:p<.22?0:p<=.60?1:2);
    footer.style.transform=motion.matches||footerTop>=innerHeight?'none':'scale('+(.55+.45*fp)+')';
    var inner=footer.querySelector('.bo-foot-inner')||footer;
    inner.style.borderRadius=motion.matches?'0px':24*(1-fp)+'px';
    document.body.classList.toggle('footer-revealed',!motion.matches&&footerTop<innerHeight*.82);
    light.style.opacity=motion.matches?'0':docked?'.35':'1';
    deep.style.opacity=motion.matches||fp>.15?'1':'0';
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  function intro(){
    timers.forEach(clearTimeout);timers=[];
    if(motion.matches){big.style.visibility='hidden';slot.style.opacity='1';tags.forEach(function(t){t.classList.remove('in');});docked=true;finished=true;schedule();return;}
    big.style.visibility='visible';big.classList.remove('in','is-docked','is-finished');slot.style.opacity='0';docked=false;finished=false;
    tags.forEach(function(t){t.classList.remove('in','is-out');});
    measureDock();
    timers.push(setTimeout(function(){big.classList.add('in');tags.forEach(function(t){t.classList.add('in');});},150));
    timers.push(setTimeout(function(){measureDock();docked=true;big.classList.add('is-docked');tags.forEach(function(t){t.classList.add('is-out');});schedule();},2100));
    timers.push(setTimeout(function(){finished=true;big.classList.add('is-finished');slot.style.opacity='1';schedule();},3300));
    timers.push(setTimeout(function(){big.style.visibility='hidden';},3600));
    schedule();
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',function(){if(!finished||docked)measureDock();schedule();});
  addEventListener('load',function(){measureDock();schedule();});
  big.addEventListener('load',function(){measureDock();schedule();});slot.querySelector('img').addEventListener('load',function(){measureDock();schedule();});
  motion.addEventListener('change',intro);document.fonts.ready.then(schedule);intro();
})();
