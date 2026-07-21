
const menu=document.querySelector('.menubtn'),nav=document.querySelector('.nav');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
const drawer=document.querySelector('.drawer'),back=document.querySelector('.backdrop');function openCart(){drawer?.classList.add('open');back?.classList.add('open');document.body.style.overflow='hidden'}function closeCart(){drawer?.classList.remove('open');back?.classList.remove('open');document.body.style.overflow=''}document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',openCart));document.querySelectorAll('[data-close-cart]').forEach(b=>b.addEventListener('click',closeCart));back?.addEventListener('click',closeCart);
document.querySelectorAll('[data-add-cart]').forEach(b=>b.addEventListener('click',()=>{const old=b.textContent;b.textContent='Added ✓';openCart();setTimeout(()=>b.textContent=old,1200)}));
document.querySelectorAll('.faqquestion').forEach(b=>b.addEventListener('click',()=>{const i=b.closest('.faqitem');i.classList.toggle('open');b.querySelector('span:last-child').textContent=i.classList.contains('open')?'−':'+'}));
document.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('.opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
document.querySelectorAll('[data-plus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Number(i.value||1)+1}));document.querySelectorAll('[data-minus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Math.max(1,Number(i.value||1)-1)}));
const sel=document.getElementById('method'),ttl=document.getElementById('arttitle'),lst=document.getElementById('artlist');const rules={'Sublimation':['Vector preferred: AI, EPS, SVG or PDF','PNG/JPG accepted at 300 DPI','Transparent background','Avoid small or thin text'],'Heat Transfer':['Vector preferred or high-resolution PNG','300 DPI and transparent background','Fonts outlined','$60 redraw fee may apply'],'Embroidery':['Vector preferred or clean high-resolution PNG','Minimum line thickness 1.5–2mm','Minimum text height 5–6mm','No gradients or photographic detail'],'Screen Printing':['Vector mandatory for multi-colour artwork','High-resolution PNG only for single colour','No JPG, screenshots or gradients','Use the design-brief journey']};function update(){if(!sel||!lst)return;ttl.textContent=sel.value+' artwork checklist';lst.innerHTML=rules[sel.value].map(x=>'<li>'+x+'</li>').join('')}sel?.addEventListener('change',update);update();


/* =========================================================
   GSAP MOTION + SMOOTH INTERACTIONS
   ========================================================= */
(function(){
  const hasGSAP = typeof window.gsap !== 'undefined';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('.header');
  const updateHeader = () => {
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, {passive:true});

  if(!hasGSAP || prefersReduced) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease:'power3.out',
    duration:.9
  });

  /* Initial header and hero entrance */
  gsap.from('.trustbar', {
    y:-35,
    opacity:0,
    duration:.55,
    ease:'power2.out'
  });

  gsap.from('.header', {
    y:-65,
    opacity:0,
    duration:.75,
    delay:.08
  });

  const heroItems = gsap.utils.toArray('[data-hero-item]');
  if(heroItems.length){
    gsap.from(heroItems, {
      y:52,
      opacity:0,
      stagger:.11,
      duration:1,
      delay:.2
    });
  }

  if(document.querySelector('[data-hero-visual]')){
    gsap.from('[data-hero-visual]', {
      x:70,
      opacity:0,
      scale:.94,
      duration:1.15,
      delay:.28,
      ease:'power4.out'
    });

    gsap.from('[data-float-card]', {
      y:34,
      opacity:0,
      stagger:.16,
      duration:.8,
      delay:.85
    });

    gsap.to('[data-parallax]', {
      yPercent:7,
      ease:'none',
      scrollTrigger:{
        trigger:'.homehero-v2',
        start:'top top',
        end:'bottom top',
        scrub:true
      }
    });
  }

  /* Generic reveal blocks */
  gsap.utils.toArray('[data-reveal]').forEach((el)=>{
    gsap.from(el, {
      y:46,
      opacity:0,
      duration:.9,
      scrollTrigger:{
        trigger:el,
        start:'top 84%',
        toggleActions:'play none none reverse'
      }
    });
  });

  /*
   * Keep the two core homepage grids visible even when ScrollTrigger has not
   * refreshed yet (for example, on a hard reload or a slow CDN response).
   * The cards still retain their hover interaction, but content is never
   * hidden behind a scroll animation.
   */

  const methodCards = gsap.utils.toArray('[data-method-card]');
  if(methodCards.length){
    gsap.from(methodCards, {
      y:55,
      opacity:0,
      stagger:.11,
      scrollTrigger:{
        trigger:'.method-teaser-grid',
        start:'top 83%'
      }
    });
  }

  if(document.querySelector('[data-image-reveal]')){
    gsap.from('[data-image-reveal]', {
      x:-65,
      opacity:0,
      clipPath:'inset(0 100% 0 0 round 32px)',
      duration:1.2,
      scrollTrigger:{
        trigger:'.trust-story-section',
        start:'top 78%'
      }
    });
  }

  const workCards = gsap.utils.toArray('[data-work-card]');
  if(workCards.length){
    gsap.from(workCards, {
      y:60,
      opacity:0,
      stagger:.14,
      scrollTrigger:{
        trigger:'.featured-work-grid',
        start:'top 84%'
      }
    });
  }

  /* Animated stats */
  document.querySelectorAll('[data-count]').forEach((el)=>{
    const endValue = Number(el.dataset.count || 0);
    const counter = {value:0};

    gsap.to(counter, {
      value:endValue,
      duration:1.4,
      ease:'power2.out',
      scrollTrigger:{
        trigger:el,
        start:'top 88%',
        once:true
      },
      onUpdate:()=>{
        el.textContent = Math.round(counter.value);
      }
    });
  });

  /* Subtle card tilt */
  document.querySelectorAll('.category-tilt, .interactive-card').forEach((card)=>{
    card.addEventListener('mousemove',(event)=>{
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - .5) * 5;
      const rotateX = ((y / rect.height) - .5) * -5;

      gsap.to(card,{
        rotateX,
        rotateY,
        transformPerspective:900,
        duration:.35,
        ease:'power2.out'
      });
    });

    card.addEventListener('mouseleave',()=>{
      gsap.to(card,{
        rotateX:0,
        rotateY:0,
        duration:.55,
        ease:'elastic.out(1,.55)'
      });
    });
  });

  /* Magnetic buttons */
  document.querySelectorAll('.magnetic-btn').forEach((button)=>{
    button.addEventListener('mousemove',(event)=>{
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width/2;
      const y = event.clientY - rect.top - rect.height/2;
      gsap.to(button,{x:x*.12,y:y*.16,duration:.28,ease:'power2.out'});
    });

    button.addEventListener('mouseleave',()=>{
      gsap.to(button,{x:0,y:0,duration:.5,ease:'elastic.out(1,.45)'});
    });
  });

  /* Cart drawer motion enhancement */
  const drawerEl = document.querySelector('.drawer');
  const backdropEl = document.querySelector('.backdrop');

  document.querySelectorAll('[data-open-cart]').forEach((button)=>{
    button.addEventListener('click',()=>{
      if(!drawerEl) return;
      gsap.fromTo(drawerEl,{x:80},{x:0,duration:.48,ease:'power4.out'});
      gsap.from('.cartitem',{
        x:35,
        opacity:0,
        stagger:.08,
        delay:.13,
        duration:.5
      });
      gsap.from('.drawerfoot',{
        y:25,
        opacity:0,
        delay:.24,
        duration:.5
      });
    });
  });

  document.querySelectorAll('[data-close-cart]').forEach((button)=>{
    button.addEventListener('click',()=>{
      if(backdropEl){
        gsap.fromTo(backdropEl,{opacity:1},{opacity:0,duration:.22});
      }
    });
  });
})();
