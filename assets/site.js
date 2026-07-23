
const menu=document.querySelector('.menubtn'),nav=document.querySelector('.nav');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
document.querySelectorAll('.nav').forEach((navigation,navIndex)=>{
  const originalLinks=[...navigation.querySelectorAll('a')];
  if(!originalLinks.length)return;
  const tabMenu=document.createElement('div');
  tabMenu.className='ss-tab-menu';
  const activeIndex=Math.max(0,originalLinks.findIndex((link)=>link.classList.contains('active')));
  const tabs=[];

  originalLinks.forEach((original,index)=>{
    const radio=document.createElement('input');
    radio.className='ss-tab-radio';radio.type='radio';radio.name=`ss-nav-${navIndex}`;radio.id=`ss-nav-${navIndex}-${index}`;radio.checked=index===activeIndex;
    const link=document.createElement('a');
    link.className='ss-tab-label';link.href=original.getAttribute('href')||'#';link.textContent=original.textContent.trim();
    link.addEventListener('click',()=>{radio.checked=true;navigation.classList.remove('open')});
    tabMenu.append(radio,link);tabs.push({link,radio});
  });

  const bar=document.createElement('span');bar.className='ss-tab-bar';
  const slidebar=document.createElement('span');slidebar.className='ss-tab-slidebar';
  tabMenu.append(bar,slidebar);
  navigation.replaceChildren(tabMenu);navigation.classList.add('ss-tab-nav');

  const setTab=(index)=>{
    const tab=tabs[index];if(!tab)return;
    tab.radio.checked=true;
    const menuRect=tabMenu.getBoundingClientRect(),linkRect=tab.link.getBoundingClientRect();
    tabMenu.style.setProperty('--tab-x',`${linkRect.left-menuRect.left+tabMenu.scrollLeft}px`);
    tabMenu.style.setProperty('--tab-width',`${linkRect.width}px`);
    tabs.forEach((item,itemIndex)=>item.link.classList.toggle('is-current',itemIndex===index));
  };
  tabs.forEach((tab,index)=>{tab.link.addEventListener('pointerenter',()=>setTab(index));tab.link.addEventListener('focus',()=>setTab(index))});
  navigation.addEventListener('pointerleave',()=>setTab(activeIndex));
  requestAnimationFrame(()=>setTab(activeIndex));
  window.addEventListener('resize',()=>{const current=tabs.findIndex((tab)=>tab.link.classList.contains('is-current'));setTab(current<0?activeIndex:current)},{passive:true});
});
const drawer=document.querySelector('.drawer'),back=document.querySelector('.backdrop');function openCart(){drawer?.style.removeProperty('transform');back?.style.removeProperty('opacity');drawer?.classList.add('open');back?.classList.add('open');document.body.style.overflow='hidden'}function closeCart(){drawer?.classList.remove('open');back?.classList.remove('open');drawer?.style.removeProperty('transform');back?.style.removeProperty('opacity');document.body.style.overflow=''}

/* Shopify-style header actions: search, account, wishlist and cart drawer. */
const icon={search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.2 4.2"/></svg>',account:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.7"/><path d="M4.5 20c.9-4 3.5-6.1 7.5-6.1s6.6 2.1 7.5 6.1"/></svg>',heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 5.8a5 5 0 0 0-7.1 0L12 7.1l-1.3-1.3a5 5 0 1 0-7.1 7.1L12 21l8.4-8.1a5 5 0 0 0 0-7.1Z"/></svg>',bag:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',trash:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 13h10l1-13"/></svg>'};
const pagePath=location.pathname.includes('/pages/')?'':'pages/';
const footerIcons={facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.5c-.5-.1-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9V12H6.4v3.9h3.1V22h4.1v-6.1h3.2l.5-3.9H13.6V9.6c0-1.1.3-1.6 1.4-1.6Z"/></svg>',instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.7" cy="6.5" r=".8"/></svg>',linkedin:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 9.2V18M6.2 6.1v.1M10.2 18v-5c0-2.5 3.8-2.7 3.8 0v5M13.9 13c0-4.2 5.2-4.6 5.2 0v5"/></svg>',arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>'};
document.querySelectorAll('.footer').forEach((footer)=>{
  footer.innerHTML=`<div class="footer-shell"><div class="footer-main"><section class="footer-intro"><a class="brand" href="${pagePath}index.html"><span class="brandmark"></span><span class="brandtext"><span>Sport</span><span>Sense</span></span></a><p>Custom teamwear, promotional products, screen printing and awards made simple for clubs, schools and businesses.</p><span class="footer-location">Brendale, Queensland · Australia-wide</span></section><section class="footer-contact"><h3>Office</h3><p>18 Kremzow Road<br>Brendale QLD 4500<br>Australia</p><a href="mailto:hello@sportsense.com.au">hello@sportsense.com.au</a><a href="tel:+61732050000">+61 7 3205 0000</a></section><nav class="footer-links" aria-label="Footer links"><h3>Explore</h3><a href="${pagePath}apparel.html">Apparel</a><a href="${pagePath}promotional-products.html">Promotional Products</a><a href="${pagePath}screen-printing.html">Screen Printing</a><a href="${pagePath}trophies.html">Trophies & Awards</a><a href="${pagePath}contact.html">Contact</a></nav><section class="footer-newsletter"><h3>Stay in the loop</h3><p>New teamwear ideas, product drops and practical ordering tips.</p><form class="footer-signup"><label class="sr-only" for="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Enter your email" required><button type="submit" aria-label="Subscribe">${footerIcons.arrow}</button></form><div class="footer-socials"><a href="#" aria-label="Facebook">${footerIcons.facebook}</a><a href="#" aria-label="Instagram">${footerIcons.instagram}</a><a href="#" aria-label="LinkedIn">${footerIcons.linkedin}</a></div></section></div><div class="footer-bottom"><span>© 2026 SportSense. All rights reserved.</span><span>Built for clubs, schools & teams.</span></div></div>`;
  footer.querySelector('.footer-signup')?.addEventListener('submit',(event)=>{event.preventDefault();event.currentTarget.classList.add('is-subscribed');event.currentTarget.querySelector('input').value='Thanks — you’re on the list!'});
});
const sportSenseLogo='https://sportsense.com.au/cdn/shop/files/SportSense_Logo.png?v=1701154538&width=200';
document.querySelectorAll('.brand').forEach((brand)=>{
  brand.innerHTML=`<img class="brand-logo" src="${sportSenseLogo}" alt="SportSense">`;
});
const pageLoader=document.createElement('div');
pageLoader.className='page-loader';
pageLoader.setAttribute('role','status');
pageLoader.setAttribute('aria-label','Loading SportSense');
pageLoader.innerHTML='<div class="page-loader__mark" aria-hidden="true"><span class="page-loader__ball" style="--delay:0s"></span><span class="page-loader__ball" style="--delay:.14s"></span><span class="page-loader__ball" style="--delay:.28s"></span><span class="page-loader__shadow" style="--delay:0s"></span><span class="page-loader__shadow" style="--delay:.14s"></span><span class="page-loader__shadow" style="--delay:.28s"></span></div>';
document.body.prepend(pageLoader);
let pageLoaderDismissed=false;
const dismissPageLoader=()=>{
  if(pageLoaderDismissed) return;
  pageLoaderDismissed=true;
  pageLoader.classList.add('is-ready');
  setTimeout(()=>pageLoader.remove(),450);
};
const loaderFallback=setTimeout(dismissPageLoader,3000);
window.addEventListener('load',()=>{
  clearTimeout(loaderFallback);
  setTimeout(dismissPageLoader,1500);
},{once:true});
document.querySelectorAll('.hactions').forEach((actions)=>{
  actions.innerHTML=`<button class="header-action" type="button" aria-label="Search" data-search-toggle>${icon.search}</button><a class="header-action" href="${pagePath}portal.html" aria-label="Your account">${icon.account}</a><button class="header-action" type="button" aria-label="Wishlist" aria-pressed="false" data-wishlist-toggle>${icon.heart}<span class="action-tooltip">Wishlist</span></button><button class="header-action cart-action" type="button" aria-label="Open cart" data-open-cart>${icon.bag}<span class="cartcount">0</span><span class="action-tooltip">Cart</span></button>`;
});
if(drawer){
  drawer.innerHTML=`<div class="drawerhead selection-head"><div><span class="cart-kicker">Cart</span><h2>Your selection</h2></div><button class="closecart" type="button" aria-label="Close cart" data-close-cart>${icon.close}</button></div><div class="drawerbody selection-body"><div class="shipping-status"><strong>You unlocked free shipping</strong><div><span></span></div></div><article class="selection-item" data-cart-line><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80" alt="Club Performance Tee"><div class="selection-copy"><h3>Club Performance Tee</h3><p>Black / Large / Embroidery</p><button class="line-remove" type="button" aria-label="Remove Club Performance Tee" data-remove-cart>${icon.trash}</button><div class="selection-bottom"><div class="qty"><button data-minus aria-label="Decrease quantity">−</button><input value="12" aria-label="Quantity"><button data-plus aria-label="Increase quantity">+</button></div><strong>Quote <small>after review</small></strong></div></div></article><article class="selection-item" data-cart-line><img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80" alt="Branded Bottle"><div class="selection-copy"><h3>Branded Bottle</h3><p>Orange / Logo print</p><button class="line-remove" type="button" aria-label="Remove Branded Bottle" data-remove-cart>${icon.trash}</button><div class="selection-bottom"><div class="qty"><button data-minus aria-label="Decrease quantity">−</button><input value="25" aria-label="Quantity"><button data-plus aria-label="Increase quantity">+</button></div><strong>Quote <small>after review</small></strong></div></div></article></div><div class="drawerfoot selection-foot"><div class="selection-total"><span>Estimated subtotal</span><strong>Quote on request</strong></div><p>Final pricing is confirmed after artwork, quantity and supplier availability are reviewed.</p><button class="btn primary" style="width:100%">Proceed to checkout</button></div>`;
}
const shippingStatus=drawer?.querySelector('.shipping-status');if(shippingStatus)shippingStatus.innerHTML='<div class="shipping-status-head"><strong>Free shipping progress</strong><span>Almost there</span></div><div class="shipping-progress"><span></span></div><p>Add one more eligible item to unlock free shipping.</p>';
const demoPrices={'Club Performance Tee':24.95,'Team Hoodie':54.95,'Club Polo':39.95,'Training Shorts':29.95,'Branded Bottle':18.95,'Promotional Tote':12.95,'Corporate Mug':16.95,'Victory Cup':49.95,'Crystal Peak Award':79.95,'Classic Medal':7.95,'Prestige Award':69.95,'Silver Champion Cup':44.95};document.querySelectorAll('.product').forEach((card)=>{const name=card.querySelector('h3')?.textContent.trim(),price=demoPrices[name]??29.95;card.dataset.demoPrice=price;const priceLabel=card.querySelector('.ptop strong');if(priceLabel)priceLabel.textContent=`From $${price.toFixed(2)}`});
const updateCartCount=()=>{const lines=[...document.querySelectorAll('[data-cart-line]')],count=lines.length,progress=Math.min(count*34,100),total=lines.reduce((sum,line)=>sum+(Number(line.dataset.price||0)*Number(line.querySelector('input')?.value||1)),0);document.querySelectorAll('.cartcount').forEach((badge)=>badge.textContent=count);const bar=drawer?.querySelector('.shipping-progress span'),state=drawer?.querySelector('.shipping-status-head span'),message=drawer?.querySelector('.shipping-status>p'),subtotal=drawer?.querySelector('.selection-total strong');if(bar)bar.style.width=progress+'%';if(state)state.textContent=progress===100?'Free shipping unlocked':count?'Almost there':'Add items';if(message)message.textContent=progress===100?'Your order qualifies for free shipping.':count?'Add more eligible items to unlock free shipping.':'Add eligible items to unlock free shipping.';if(subtotal)subtotal.textContent=total?`$${total.toFixed(2)}`:'$0.00';return count};
const showEmptyCart=()=>{const body=drawer?.querySelector('.selection-body');if(!body||body.querySelector('.cart-empty'))return;body.insertAdjacentHTML('beforeend','<p class="cart-empty">Your cart is empty. Add a product to start your order.</p>')};
drawer?.querySelectorAll('[data-cart-line]').forEach((line)=>line.remove());updateCartCount();showEmptyCart();
const addCartProduct=(trigger)=>{const body=drawer?.querySelector('.selection-body');if(!body)return;const source=trigger.closest('.product')||document.querySelector('.pinfo');const title=source?.querySelector('h3,h1')?.textContent.trim()||'Selected product',price=Number(source?.dataset.demoPrice||demoPrices[title]||29.95);const image=source?.querySelector('img')?.src||'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80';const details=document.querySelector('.pinfo')?'Selected options / Artwork review':'Selected for quote';body.querySelector('.cart-empty')?.remove();body.insertAdjacentHTML('beforeend',`<article class="selection-item" data-cart-line data-price="${price}"><img src="${image}" alt="${title}"><div class="selection-copy"><h3>${title}</h3><p>${details}</p><button class="line-remove" type="button" aria-label="Remove ${title}" data-remove-cart>${icon.trash}</button><div class="selection-bottom"><div class="qty"><button data-minus aria-label="Decrease quantity">−</button><input value="1" aria-label="Quantity"><button data-plus aria-label="Increase quantity">+</button></div><strong>$${price.toFixed(2)} <small>per unit</small></strong></div></div></article>`);updateCartCount()};
document.body.insertAdjacentHTML('beforeend',`<section class="site-search" aria-hidden="true"><div class="site-search-backdrop" data-search-close></div><div class="site-search-panel" role="dialog" aria-modal="true" aria-label="Search SportSense"><button class="search-close" type="button" aria-label="Close search" data-search-close>${icon.close}</button><span class="eyebrow">Search SportSense</span><label class="search-field"><span>${icon.search}</span><input type="search" autofocus placeholder="Search apparel, drinkware, trophies…"></label><div class="search-suggestions"><span>Popular searches</span><a href="${pagePath}apparel.html">Club polos</a><a href="${pagePath}promotional-products.html">Branded bottles</a><a href="${pagePath}trophies.html">Team trophies</a></div></div></section>`);
const searchPanel=document.querySelector('.site-search');const closeSearch=()=>{searchPanel?.classList.remove('open');searchPanel?.setAttribute('aria-hidden','true');document.body.style.overflow=''};document.querySelectorAll('[data-search-toggle]').forEach((button)=>button.addEventListener('click',()=>{searchPanel?.classList.add('open');searchPanel?.setAttribute('aria-hidden','false');searchPanel?.querySelector('input')?.focus();document.body.style.overflow='hidden'}));document.querySelectorAll('[data-search-close]').forEach((button)=>button.addEventListener('click',closeSearch));document.addEventListener('keydown',(event)=>{if(event.key==='Escape')closeSearch()});document.querySelectorAll('[data-wishlist-toggle]').forEach((button)=>button.addEventListener('click',()=>{const active=button.getAttribute('aria-pressed')==='true';button.setAttribute('aria-pressed',String(!active));button.setAttribute('aria-label',active?'Wishlist':'Wishlist, 1 saved item')}));
document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',openCart));document.querySelectorAll('[data-close-cart]').forEach(b=>b.addEventListener('click',closeCart));back?.addEventListener('click',closeCart);
document.addEventListener('click',(event)=>{if(!drawer?.classList.contains('open'))return;if(drawer.contains(event.target)||event.target.closest('[data-open-cart]'))return;closeCart()});
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&drawer?.classList.contains('open'))closeCart()});
drawer?.addEventListener('click',(event)=>{if(event.target.closest('[data-close-cart]')){closeCart();return}const remove=event.target.closest('[data-remove-cart]');if(remove){event.stopPropagation();remove.closest('[data-cart-line]')?.remove();if(!updateCartCount())showEmptyCart();return}const quantityButton=event.target.closest('[data-plus],[data-minus]');if(!quantityButton)return;const input=quantityButton.closest('.qty')?.querySelector('input');if(!input)return;input.value=quantityButton.hasAttribute('data-plus')?Number(input.value||1)+1:Math.max(1,Number(input.value||1)-1);updateCartCount()});
document.querySelectorAll('.cartitem>strong').forEach((price)=>price.textContent='Quote required');
document.querySelectorAll('.drawerfoot .total span:last-child').forEach((total)=>total.textContent='After review');
document.querySelectorAll('[data-add-cart]').forEach(b=>b.addEventListener('click',()=>{addCartProduct(b);const old=b.textContent;b.textContent='Added ✓';openCart();setTimeout(()=>b.textContent=old,1200)}));
document.querySelectorAll('.faqquestion').forEach(b=>b.addEventListener('click',()=>{const i=b.closest('.faqitem');i.classList.toggle('open');b.querySelector('span:last-child').textContent=i.classList.contains('open')?'−':'+'}));
document.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('.opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
document.querySelectorAll('[data-plus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Number(i.value||1)+1}));document.querySelectorAll('[data-minus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Math.max(1,Number(i.value||1)-1)}));
const sel=document.getElementById('method'),ttl=document.getElementById('arttitle'),lst=document.getElementById('artlist');const rules={'Sublimation':['Vector preferred: AI, EPS, SVG or PDF','PNG/JPG accepted at 300 DPI','Transparent background','Avoid small or thin text'],'Heat Transfer':['Vector preferred or high-resolution PNG','300 DPI and transparent background','Fonts outlined','$60 redraw fee may apply'],'Embroidery':['Vector preferred or clean high-resolution PNG','Minimum line thickness 1.5–2mm','Minimum text height 5–6mm','No gradients or photographic detail'],'Screen Printing':['Vector mandatory for multi-colour artwork','High-resolution PNG only for single colour','No JPG, screenshots or gradients','Use the design-brief journey']};function update(){if(!sel||!lst)return;ttl.textContent=sel.value+' artwork checklist';lst.innerHTML=rules[sel.value].map(x=>'<li>'+x+'</li>').join('')}sel?.addEventListener('change',update);update();

/* =========================================================
   BRIEF-CRITICAL PROTOTYPE STATES
   These UI states make the customer journey explicit while the real Shopify,
   supplier API and customiser integrations are connected in development.
   ========================================================= */
(function(){
  /* Decoration education and About remain accessible in the footer, not as
     primary product-routing navigation. */
  document.querySelectorAll('.nav a[href="decoration-methods.html"], .nav a[href="about.html"]').forEach((link)=>link.classList.add('nav-support-link'));

  document.querySelectorAll('.nav a[href="screen-printing.html"]').forEach((link)=>{
    link.textContent='Screen Printing / Custom Design';
  });

  const productCta=document.querySelector('.pinfo .productcta');
  if(productCta){
    productCta.insertAdjacentHTML('beforebegin',[
      '<button class="btn dark customiser-entry" type="button" data-customiser-entry>',
      'Customise & preview your design <span>→</span>',
      '</button>',
      '<p class="integration-note">The confirmed customiser app opens at this step for sublimation, heat transfer and embroidery.</p>'
    ].join(''));

    const primaryAction=productCta.querySelector('.btn.primary');
    const screenBriefLink=document.querySelector('.pinfo a[href="screen-printing.html"]');
    const refreshProductJourney=()=>{
      if(!sel || !primaryAction || !screenBriefLink)return;
      const isScreenPrint=sel.value==='Screen Printing';
      primaryAction.textContent=isScreenPrint?'Start your design brief':'Add to cart';
      primaryAction.dataset.addCart=isScreenPrint?'false':'true';
      screenBriefLink.hidden=isScreenPrint;
      document.querySelector('.customiser-entry').hidden=isScreenPrint;
      document.querySelector('.integration-note').hidden=isScreenPrint;
    };
    sel?.addEventListener('change',refreshProductJourney);
    refreshProductJourney();

    document.querySelector('[data-customiser-entry]')?.addEventListener('click',()=>{
      const note=document.createElement('div');
      note.className='customiser-toast';
      note.textContent='Customiser hand-off point — connect the confirmed app here before launch.';
      document.body.append(note);
      requestAnimationFrame(()=>note.classList.add('show'));
      setTimeout(()=>note.remove(),3600);
    });
  }

  /* Screen printing is a service page with a selectable garment pathway—not
     an instant-cart product. */
  if(document.title.includes('Screen Printing')){
    const journey=document.querySelector('main > section:nth-of-type(2)');
    journey?.insertAdjacentHTML('afterend',[
      '<section class="section screen-garment-section">',
      '<div class="container">',
      '<div class="section-head"><div><span class="eyebrow">Garments for this pathway</span><h2>Choose the base garment, then start the brief.</h2></div>',
      '<p>Garments are supplied through Bocini. MOQ and lead time are returned from the partner feed before SportSense confirms production.</p></div>',
      '<div class="screen-garment-grid">',
      '<a class="screen-garment card" href="apparel.html"><strong>Team tees</strong><span>Lightweight club and event tees</span><b>View garment options →</b></a>',
      '<a class="screen-garment card" href="apparel.html"><strong>Polos & workwear</strong><span>Staff, school and corporate uniforms</span><b>View garment options →</b></a>',
      '<a class="screen-garment card" href="apparel.html"><strong>Hoodies & outerwear</strong><span>Warm layers for teams and events</span><b>View garment options →</b></a>',
      '<a class="screen-garment card" href="apparel.html"><strong>Shorts & activewear</strong><span>Training and performance pieces</span><b>View garment options →</b></a>',
      '</div></div></section>'
    ].join(''));

    const briefFields=document.querySelector('.contactform .formgrid');
    briefFields?.insertAdjacentHTML('beforeend',[
      '<div class="field"><label>Garment pathway</label><select><option>Choose a garment type</option><option>Team tees</option><option>Polos & workwear</option><option>Hoodies & outerwear</option><option>Shorts & activewear</option></select></div>',
      '<div class="field"><label>Reference images / artwork</label><input type="file" accept=".ai,.eps,.svg,.pdf,.png" multiple></div>',
      '<div class="field full"><label>Production details</label><textarea placeholder="Print locations, colours, garment sizes, due date and any other production details."></textarea></div>'
    ].join(''));
  }

  /* Make the distinct SportSense hand-off visible in the portal example. */
  document.querySelectorAll('.table tbody tr').forEach((row)=>{
    if(row.textContent.includes('Screen Printing') && document.title.includes('Portal')){
      const status=row.querySelectorAll('td')[1];
      if(status)status.textContent='With SportSense for dispatch';
    }
  });
})();


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

  /* Brand-colour sweep follows the side the pointer enters from. */
  if(!prefersReduced){
    const getPointerSide = (element, event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      if(Math.abs(x) > Math.abs(y)) return x < 0 ? 'left' : 'right';
      return y < 0 ? 'top' : 'bottom';
    };

    document.querySelectorAll('[data-method-card], .directional-hover').forEach((element)=>{
      element.addEventListener('pointerenter',(event)=>{
        element.dataset.hoverDirection = getPointerSide(element, event);
        element.classList.remove('is-directional-hover');
        requestAnimationFrame(()=>{
          if(element.matches(':hover')) element.classList.add('is-directional-hover');
        });
      });

      element.addEventListener('pointerleave',(event)=>{
        element.dataset.hoverDirection = getPointerSide(element, event);
        element.classList.remove('is-directional-hover');
      });
    });
  }

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
