
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

/* Product-category shortcuts live below the two catalogue tabs on desktop. */
const categorySubnavigation={
  'apparel.html':[['Tees','apparel.html?type=tees'],['Polos','apparel.html?type=polos'],['Hoodies','apparel.html?type=hoodies'],['Shorts','apparel.html?type=shorts'],['Teamwear','apparel.html?type=teamwear']],
  'promotional-products.html':[['Drinkware','promotional-products.html?type=drinkware'],['Bags','promotional-products.html?type=bags'],['Mugs','promotional-products.html?type=mugs'],['Headwear','promotional-products.html?type=headwear'],['Pens & office','promotional-products.html?type=office']]
};
const subnavBasePath=location.pathname.includes('/pages/')?'':'pages/';
document.querySelectorAll('.nav.ss-tab-nav').forEach((navigation)=>{
  const header=navigation.closest('.header');
  const tabMenu=navigation.querySelector('.ss-tab-menu');
  if(!header||!tabMenu)return;
  const menus=[];
  navigation.querySelectorAll('.ss-tab-label').forEach((link)=>{
    const key=(link.getAttribute('href')||'').split('?')[0].split('/').pop();
    const entries=categorySubnavigation[key];
    if(!entries)return;
    const panel=document.createElement('div');
    panel.className='ss-category-subnav';
    panel.setAttribute('aria-label',`${link.textContent.trim()} categories`);
    panel.innerHTML=entries.map(([label,href])=>`<a href="${subnavBasePath}${href}">${label}</a>`).join('');
    tabMenu.append(panel);menus.push(panel);
    let closeTimer;
    const open=()=>{
      clearTimeout(closeTimer);
      const menuRect=tabMenu.getBoundingClientRect(),linkRect=link.getBoundingClientRect();
      panel.style.setProperty('--submenu-x',`${linkRect.left-menuRect.left}px`);
      menus.forEach((menu)=>menu.classList.toggle('is-open',menu===panel));
      tabMenu.classList.add('has-submenu');
    };
    const close=()=>{closeTimer=setTimeout(()=>{
      panel.classList.remove('is-open');
      if(!menus.some((menu)=>menu.classList.contains('is-open')))tabMenu.classList.remove('has-submenu');
    },120)};
    link.addEventListener('pointerenter',open);
    link.addEventListener('focus',open);
    link.addEventListener('pointerleave',close);
    panel.addEventListener('pointerenter',()=>clearTimeout(closeTimer));
    panel.addEventListener('pointerleave',close);
  });
  header.addEventListener('pointerleave',()=>{
    menus.forEach((menu)=>menu.classList.remove('is-open'));
    tabMenu.classList.remove('has-submenu');
  });
});
document.querySelectorAll('.trustbar-in').forEach((bar)=>{
  const items=[...bar.querySelectorAll('.trustitem')];
  if(items.length<2)return;
  bar.classList.add('trust-carousel');
  const arrowIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>';
  const previousButton=document.createElement('button');
  previousButton.className='trust-carousel-control trust-carousel-control--previous';
  previousButton.type='button';
  previousButton.setAttribute('aria-label','Show previous announcement');
  previousButton.innerHTML=arrowIcon;
  const nextButton=document.createElement('button');
  nextButton.className='trust-carousel-control trust-carousel-control--next';
  nextButton.type='button';
  nextButton.setAttribute('aria-label','Show next announcement');
  nextButton.innerHTML=arrowIcon;
  bar.append(previousButton,nextButton);
  let active=0,timer;
  const show=(index)=>{
    const next=(index+items.length)%items.length;
    if(next===active)return;
    const previous=active;
    active=next;
    items.forEach((item,itemIndex)=>{
      item.classList.toggle('is-active',itemIndex===active);
      item.classList.toggle('is-leaving',itemIndex===previous);
    });
  };
  const start=()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    clearInterval(timer);
    timer=setInterval(()=>show(active+1),3200);
  };
  items[0].classList.add('is-active');start();
  previousButton.addEventListener('click',()=>{show(active-1);start()});
  nextButton.addEventListener('click',()=>{show(active+1);start()});
  bar.addEventListener('pointerenter',()=>clearInterval(timer));
  bar.addEventListener('pointerleave',start);
});
const drawer=document.querySelector('.drawer'),back=document.querySelector('.backdrop');function openCart(){drawer?.style.removeProperty('transform');back?.style.removeProperty('opacity');drawer?.classList.add('open');back?.classList.add('open');document.body.style.overflow='hidden'}function closeCart(){drawer?.classList.remove('open');back?.classList.remove('open');drawer?.style.removeProperty('transform');back?.style.removeProperty('opacity');document.body.style.overflow=''}

/* Shopify-style header actions: search, account, wishlist and cart drawer. */
const icon={search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.2 4.2"/></svg>',account:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.7"/><path d="M4.5 20c.9-4 3.5-6.1 7.5-6.1s6.6 2.1 7.5 6.1"/></svg>',heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 5.8a5 5 0 0 0-7.1 0L12 7.1l-1.3-1.3a5 5 0 1 0-7.1 7.1L12 21l8.4-8.1a5 5 0 0 0 0-7.1Z"/></svg>',bag:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',trash:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 13h10l1-13"/></svg>'};
document.querySelectorAll('.pdp-wishlist').forEach((button)=>{button.innerHTML=icon.heart;button.title='Save to wishlist'});
const pagePath=location.pathname.includes('/pages/')?'':'pages/';
const footerIcons={facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.5c-.5-.1-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9V12H6.4v3.9h3.1V22h4.1v-6.1h3.2l.5-3.9H13.6V9.6c0-1.1.3-1.6 1.4-1.6Z"/></svg>',youtube:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12c0 2.9-.3 4.7-.8 5.6-.4.7-1 1.1-1.8 1.2-1.5.2-4 .2-6.4.2s-4.9 0-6.4-.2c-.8-.1-1.4-.5-1.8-1.2C3.3 16.7 3 14.9 3 12s.3-4.7.8-5.6c.4-.7 1-1.1 1.8-1.2C7.1 5 9.6 5 12 5s4.9 0 6.4.2c.8.1 1.4.5 1.8 1.2.5.9.8 2.7.8 5.6Z"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg>',instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.7" cy="6.5" r=".8"/></svg>',tiktok:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4c.5 2.7 2.1 4.3 4.5 4.7v3.1c-1.7 0-3.2-.5-4.5-1.4v5.7a5 5 0 1 1-4.3-5v3.1a2 2 0 1 0 1.3 1.9V4h3Z"/></svg>',arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>'};
document.querySelectorAll('.footer').forEach((footer)=>{
  footer.innerHTML=`<div class="footer-shell"><div class="footer-main"><section class="footer-intro"><a class="brand" href="${pagePath}index.html"><span class="brandmark"></span><span class="brandtext"><span>Sport</span><span>Sense</span></span></a><p>Custom teamwear, promotional products, screen printing and awards made simple for clubs, schools and businesses.</p><span class="footer-location">Brendale, Queensland · Australia-wide</span></section><section class="footer-contact"><h3>Office</h3><p>18 Kremzow Road<br>Brendale QLD 4500<br>Australia</p><a href="mailto:hello@sportsense.com.au">hello@sportsense.com.au</a><a href="tel:+61732050000">+61 7 3205 0000</a></section><nav class="footer-links" aria-label="Footer links"><h3>Explore</h3><a href="${pagePath}apparel.html">Apparel</a><a href="${pagePath}promotional-products.html">Promotional Products</a><a href="${pagePath}screen-printing.html">Screen Printing</a><a href="${pagePath}trophies.html">Trophies & Awards</a><a href="${pagePath}contact.html">Contact</a></nav><section class="footer-newsletter"><h3>Stay in the loop</h3><p>New teamwear ideas, product drops and practical ordering tips.</p><form class="footer-signup"><label class="sr-only" for="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Enter your email" required><button type="submit" aria-label="Subscribe">${footerIcons.arrow}</button></form><div class="footer-socials"><a href="#" aria-label="Facebook">${footerIcons.facebook}</a><a href="#" aria-label="YouTube">${footerIcons.youtube}</a><a href="#" aria-label="Instagram">${footerIcons.instagram}</a><a href="#" aria-label="TikTok">${footerIcons.tiktok}</a></div></section></div><div class="footer-bottom"><span>© 2026 SportSense. All rights reserved.</span><span>Built for clubs, schools & teams.</span></div></div>`;
  const importantLinks=footer.querySelector('.footer-links');
  if(importantLinks)importantLinks.innerHTML=`<h3>Important Stuff</h3><a href="${pagePath}decoration-methods.html">Decoration Methods Explained</a><a href="${pagePath}ordering-lead-times.html">Ordering & Lead Times</a><a href="${pagePath}faq.html">FAQs</a><a href="${pagePath}screen-printing.html">Screen Printing / Custom Design</a><a href="${pagePath}contact.html">Contact</a>`;
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
  drawer.innerHTML=`<div class="drawerhead selection-head"><div><span class="cart-kicker">Cart</span><h2>Your selection</h2></div><button class="closecart" type="button" aria-label="Close cart" data-close-cart>${icon.close}</button></div><div class="drawerbody selection-body"><div class="shipping-status"><strong>Minimum order guidance</strong><div><span></span></div></div><article class="selection-item" data-cart-line><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80" alt="Club Performance Tee"><div class="selection-copy"><h3>Club Performance Tee</h3><p>Black / Large / Embroidery</p><button class="line-remove" type="button" aria-label="Remove Club Performance Tee" data-remove-cart>${icon.trash}</button><div class="selection-bottom"><div class="qty"><button data-minus aria-label="Decrease quantity">−</button><input value="12" aria-label="Quantity"><button data-plus aria-label="Increase quantity">+</button></div><strong>Quote <small>after review</small></strong></div></div></article><article class="selection-item" data-cart-line><img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80" alt="Branded Bottle"><div class="selection-copy"><h3>Branded Bottle</h3><p>Orange / Logo print</p><button class="line-remove" type="button" aria-label="Remove Branded Bottle" data-remove-cart>${icon.trash}</button><div class="selection-bottom"><div class="qty"><button data-minus aria-label="Decrease quantity">−</button><input value="25" aria-label="Quantity"><button data-plus aria-label="Increase quantity">+</button></div><strong>Quote <small>after review</small></strong></div></div></article></div><div class="drawerfoot selection-foot"><div class="selection-total"><span>Estimated subtotal</span><strong>Quote on request</strong></div><p>Final pricing is confirmed after artwork, quantity and supplier availability are reviewed.</p><button class="btn primary" style="width:100%">Proceed to checkout</button></div>`;
}
const shippingStatus=drawer?.querySelector('.shipping-status');if(shippingStatus)shippingStatus.innerHTML='<div class="shipping-status-head"><strong>Minimum order progress</strong><span>Almost there</span></div><div class="shipping-progress"><span></span></div><p>Add one more eligible item to unlock free shipping.</p>';
const demoPrices={'Club Performance Tee':24.95,'Team Hoodie':54.95,'Club Polo':39.95,'Training Shorts':29.95,'Branded Bottle':18.95,'Promotional Tote':12.95,'Corporate Mug':16.95,'Victory Cup':49.95,'Crystal Peak Award':79.95,'Classic Medal':7.95,'Prestige Award':69.95,'Silver Champion Cup':44.95};document.querySelectorAll('.product').forEach((card)=>{const name=card.querySelector('h3')?.textContent.trim(),price=demoPrices[name]??29.95;card.dataset.demoPrice=price;const priceLabel=card.querySelector('.ptop strong');if(priceLabel)priceLabel.textContent=`From $${price.toFixed(2)}`});
const updateCartCount=()=>{const lines=[...document.querySelectorAll('[data-cart-line]')],count=lines.length,quantity=lines.reduce((sum,line)=>sum+Number(line.querySelector('input')?.value||1),0),progress=Math.min(quantity/12*100,100),total=lines.reduce((sum,line)=>sum+(Number(line.dataset.price||0)*Number(line.querySelector('input')?.value||1)),0);document.querySelectorAll('.cartcount').forEach((badge)=>{badge.textContent=count;badge.hidden=count===0});const bar=drawer?.querySelector('.shipping-progress span'),state=drawer?.querySelector('.shipping-status-head span'),message=drawer?.querySelector('.shipping-status>p'),subtotal=drawer?.querySelector('.selection-total strong');if(bar)bar.style.width=progress+'%';if(state)state.textContent=progress===100?'MOQ met':quantity?'Add items':'No items yet';if(message)message.textContent=progress===100?'Minimum order reached — ready for artwork review.':quantity?'Add '+Math.max(12-quantity,0)+' more units to reach the 12-unit MOQ.':'Add items to begin the 12-unit MOQ progress.';if(subtotal)subtotal.textContent=total?`$${total.toFixed(2)}`:'$0.00';return count};
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
document.querySelectorAll('[data-add-cart]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.designBrief==='true')return;addCartProduct(b);const old=b.textContent;b.textContent='Added ✓';openCart();setTimeout(()=>b.textContent=old,1200)}));
document.addEventListener('click',(event)=>{const button=event.target.closest('[data-featured-add-cart]');if(!button)return;if(button.closest('[data-has-variants="true"]'))return;event.preventDefault();addCartProduct(button);openCart();const old=button.textContent;button.textContent='Added ✓';setTimeout(()=>button.textContent=old,1200)});
/* Variant products use a small option picker instead of adding a guessed size/colour. */
const quickVariantProducts={
  'Club Performance Tee':{colours:['Black','White','Navy'],sizes:['S','M','L','XL']},
  'Team Hoodie':{colours:['Grey','Black','Navy'],sizes:['S','M','L','XL']},
  'Performance Polo':{colours:['Black','White','Navy'],sizes:['S','M','L','XL']},
  'Training Singlet':{colours:['Black','White','Navy'],sizes:['S','M','L','XL']},
  'Coaches Jacket':{colours:['Black','Navy'],sizes:['S','M','L','XL']}
};
const quickVariantDialog=document.createElement('section');
quickVariantDialog.className='quick-variant-dialog';
quickVariantDialog.setAttribute('aria-hidden','true');
quickVariantDialog.innerHTML='<div class="quick-variant-backdrop" data-quick-variant-close></div><div class="quick-variant-panel" role="dialog" aria-modal="true" aria-label="Select product options"><button class="quick-variant-close" type="button" aria-label="Close" data-quick-variant-close>×</button><span class="eyebrow">Quick add</span><h2 data-quick-variant-title></h2><div class="quick-variant-group"><span>Colour</span><div data-quick-variant-colours></div></div><div class="quick-variant-group"><span>Size</span><div data-quick-variant-sizes></div></div><div class="quick-variant-actions"><label>Qty <input type="number" min="1" value="1" data-quick-variant-quantity></label><button class="btn primary" type="button" data-quick-variant-confirm>Add to cart</button></div></div>';
document.body.append(quickVariantDialog);
let quickVariantTrigger=null;
const closeQuickVariantDialog=()=>{
  quickVariantDialog.classList.remove('open');
  quickVariantDialog.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
};
const optionButtons=(values,group)=>values.map((value,index)=>`<button type="button" class="quick-variant-option${index===0?' is-selected':''}" data-quick-variant-option data-value="${value}">${value}</button>`).join('');
const openQuickVariantDialog=(trigger)=>{
  const card=trigger.closest('.product');
  const title=card?.querySelector('h3')?.textContent.trim()||'Product';
  const options=quickVariantProducts[title];
  if(!options)return;
  quickVariantTrigger=trigger;
  quickVariantDialog.querySelector('[data-quick-variant-title]').textContent=title;
  quickVariantDialog.querySelector('[data-quick-variant-colours]').innerHTML=optionButtons(options.colours,'colour');
  quickVariantDialog.querySelector('[data-quick-variant-sizes]').innerHTML=optionButtons(options.sizes,'size');
  quickVariantDialog.querySelector('[data-quick-variant-quantity]').value='1';
  quickVariantDialog.classList.add('open');
  quickVariantDialog.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
};
document.querySelectorAll('[data-featured-add-cart]').forEach((button)=>{
  const title=button.closest('.product')?.querySelector('h3')?.textContent.trim();
  if(!quickVariantProducts[title])return;
  button.closest('.product')?.setAttribute('data-has-variants','true');
  button.textContent='Select options';
  button.setAttribute('aria-label',`Select options for ${title}`);
});
document.addEventListener('click',(event)=>{
  const variantButton=event.target.closest('[data-featured-add-cart]');
  if(variantButton?.closest('[data-has-variants="true"]')){event.preventDefault();openQuickVariantDialog(variantButton);return}
  if(event.target.closest('[data-quick-variant-close]')){closeQuickVariantDialog();return}
  const option=event.target.closest('[data-quick-variant-option]');
  if(option){option.parentElement.querySelectorAll('[data-quick-variant-option]').forEach((item)=>item.classList.toggle('is-selected',item===option));return}
  if(event.target.closest('[data-quick-variant-confirm]')&&quickVariantTrigger){
    const selected=[...quickVariantDialog.querySelectorAll('.quick-variant-group')].map((group)=>group.querySelector('.quick-variant-option.is-selected')?.dataset.value).filter(Boolean);
    const quantity=Math.max(1,Number(quickVariantDialog.querySelector('[data-quick-variant-quantity]')?.value||1));
    addCartProduct(quickVariantTrigger);
    const newLine=[...drawer?.querySelectorAll('[data-cart-line]')||[]].at(-1);
    if(newLine){
      const details=newLine.querySelector('.selection-copy>p'),input=newLine.querySelector('.qty input');
      if(details)details.textContent=selected.join(' / ')||'Selected options';
      if(input)input.value=quantity;
      updateCartCount();
    }
    closeQuickVariantDialog();
    openCart();
  }
});
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&quickVariantDialog.classList.contains('open'))closeQuickVariantDialog()});
const openFeaturedProductPage=(card)=>{const url=card?.dataset.productPdp;if(url)window.location.href=url};
document.addEventListener('click',(event)=>{const card=event.target.closest('[data-product-pdp]');if(!card||event.target.closest('[data-featured-add-cart]'))return;openFeaturedProductPage(card)});
document.addEventListener('keydown',(event)=>{const card=event.target.closest('[data-product-pdp]');if(!card||event.target.closest('[data-featured-add-cart]')||!['Enter',' '].includes(event.key))return;event.preventDefault();openFeaturedProductPage(card)});
document.querySelectorAll('.faqquestion').forEach(b=>b.addEventListener('click',()=>{const i=b.closest('.faqitem'),willOpen=!i.classList.contains('open');document.querySelectorAll('.faqitem.open').forEach(item=>{item.classList.remove('open');const button=item.querySelector('.faqquestion');if(button){button.querySelector('span:last-child').textContent='+';button.setAttribute('aria-expanded','false');button.title='Click to expand'}});i.classList.toggle('open',willOpen);b.querySelector('span:last-child').textContent=willOpen?'−':'+'}));
document.querySelectorAll('.faqquestion').forEach((button)=>{
  button.type='button';
  button.title='Click to expand';
  button.setAttribute('aria-expanded',String(button.closest('.faqitem')?.classList.contains('open')));
  button.addEventListener('click',()=>{
    button.setAttribute('aria-expanded',String(button.closest('.faqitem')?.classList.contains('open')));
    button.title=button.closest('.faqitem')?.classList.contains('open')?'Click to close':'Click to expand';
  });
});
const collectionGrid=document.querySelector('[data-collection-grid]');
if(collectionGrid){
  const collectionCards=[...collectionGrid.querySelectorAll('.product')];
  const collectionFilters=[...document.querySelectorAll('[data-filter]')];
  const collectionCount=document.querySelector('[data-collection-count]');
  const collectionEmpty=document.querySelector('.collection-empty');
  const updateCollection=()=>{
    const selectedByGroup=[...document.querySelectorAll('.collection--refined .fgroup')].map(group=>[...group.querySelectorAll('[data-filter]:checked')].map(input=>input.dataset.filter)).filter(group=>group.length);
    let shown=0;
    collectionCards.forEach(card=>{
      const categories=(card.dataset.categories||'').split(' ');
      const matches=selectedByGroup.every(group=>group.some(filter=>categories.includes(filter)));
      card.hidden=!matches;
      if(matches)shown++;
    });
    if(collectionCount)collectionCount.textContent=`${shown} product${shown===1?'':'s'}`;
    if(collectionEmpty)collectionEmpty.hidden=shown!==0;
  };
  collectionFilters.forEach(input=>input.addEventListener('change',updateCollection));
  document.querySelector('[data-clear-filters]')?.addEventListener('click',()=>{collectionFilters.forEach(input=>input.checked=false);updateCollection()});
  document.querySelector('[data-collection-sort]')?.addEventListener('change',(event)=>{
    const value=event.target.value;
    if(value==='featured')return;
    collectionCards.sort((a,b)=>value==='price-low'?Number(a.dataset.price)-Number(b.dataset.price):Number(b.dataset.price)-Number(a.dataset.price)).forEach(card=>collectionGrid.append(card));
  });
}
document.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('.opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
document.querySelectorAll('[data-product-thumb]').forEach((thumb)=>thumb.addEventListener('click',()=>{const main=document.querySelector('[data-product-main-image]');if(!main)return;main.src=thumb.dataset.image||main.src;main.alt=thumb.dataset.alt||main.alt;document.querySelectorAll('[data-product-thumb]').forEach((item)=>item.classList.toggle('is-selected',item===thumb))}));
document.querySelectorAll('[data-colour]').forEach((swatch)=>swatch.addEventListener('click',()=>{const selected=document.querySelector('[data-selected-colour]');if(selected)selected.textContent=swatch.dataset.colour||''}));
document.querySelectorAll('.product-size').forEach((size)=>size.addEventListener('click',()=>{const selected=document.querySelector('[data-selected-size]');if(selected)selected.textContent=size.textContent.trim()}));
document.querySelectorAll('[data-plus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Number(i.value||1)+1}));document.querySelectorAll('[data-minus]').forEach(b=>b.addEventListener('click',()=>{const i=b.parentElement.querySelector('input');i.value=Math.max(1,Number(i.value||1)-1)}));
const sel=document.getElementById('method'),ttl=document.getElementById('arttitle'),lst=document.getElementById('artlist'),artworkFile=document.getElementById('artwork-file'),artworkUploadHint=document.getElementById('artwork-upload-hint'),artworkUploadStatus=document.getElementById('artwork-upload-status');
const rules={'Sublimation':['Vector preferred: AI, EPS, SVG or PDF','PNG/JPG accepted at 300 DPI','Transparent background','Avoid small or thin text'],'Heat Transfer':['Vector preferred or high-resolution PNG','300 DPI and transparent background','Fonts outlined','$60 redraw fee may apply'],'Embroidery':['Vector preferred or clean high-resolution PNG','Minimum line thickness 1.5–2mm','Minimum text height 5–6mm','No gradients or photographic detail'],'Screen Printing':['Vector mandatory for multi-colour artwork','High-resolution PNG only for single colour','No JPG, screenshots or gradients','Use the design-brief journey']};
const artworkRequirements={
  'Sublimation':{accept:'.ai,.eps,.svg,.pdf,.png,.jpg,.jpeg',hint:'Vector files are preferred. PNG/JPG must be 300 DPI with a transparent background where possible.'},
  'Heat Transfer':{accept:'.ai,.eps,.svg,.pdf,.png',hint:'Use vector artwork or a 300 DPI PNG. Fonts must be outlined; a $60 redraw fee may apply.'},
  'Embroidery':{accept:'.ai,.eps,.svg,.pdf,.png',hint:'Use vector artwork or a clean high-resolution PNG. Avoid gradients and very small detail.'},
  'Screen Printing':{accept:'.ai,.eps,.svg,.pdf,.png',hint:'Screen printing starts with a design brief. Upload reference files on the design-brief page.'}
};
function update(){
  if(!sel||!lst)return;
  const method=sel.value,requirements=artworkRequirements[method];
  ttl.textContent=method+' artwork checklist';
  lst.innerHTML=rules[method].map(x=>'<li>'+x+'</li>').join('');
  if(artworkFile&&requirements){
    const isScreenPrinting=method==='Screen Printing';
    artworkFile.accept=requirements.accept;
    artworkFile.disabled=isScreenPrinting;
    artworkUploadHint.textContent=requirements.hint;
    artworkUploadStatus.textContent=isScreenPrinting?'Continue to the design brief to add reference images and production details.':'No file selected — we will review every file before production.';
  }
}
artworkFile?.addEventListener('change',()=>{
  const file=artworkFile.files?.[0];
  if(artworkUploadStatus)artworkUploadStatus.textContent=file?`${file.name} selected — artwork will be checked before production.`:'No file selected — we will review every file before production.';
});
sel?.addEventListener('change',update);update();

/* Keep the product-page CTA aligned with the selected decoration journey. */
const productMethod=document.getElementById('method');
const productPrimaryCta=document.querySelector('.pdp-add-button');
const productSecondaryCta=document.querySelector('.pdp-buy-button');
const syncProductJourney=()=>{
  if(!productMethod||!productPrimaryCta)return;
  const isScreenPrinting=productMethod.value==='Screen Printing';
  productPrimaryCta.dataset.designBrief=String(isScreenPrinting);
  productPrimaryCta.textContent=isScreenPrinting?'Start your design brief':'Add to cart';
  productPrimaryCta.setAttribute('aria-label',isScreenPrinting?'Start your screen-printing design brief':'Add product to cart');
  if(productSecondaryCta)productSecondaryCta.hidden=isScreenPrinting;
};
productMethod?.addEventListener('change',syncProductJourney);
productPrimaryCta?.addEventListener('click',(event)=>{
  if(productMethod?.value!=='Screen Printing')return;
  event.preventDefault();
  window.location.href='screen-printing.html#design-brief';
});
syncProductJourney();
if(document.title.includes('Screen Printing'))document.querySelector('.contactform')?.setAttribute('id','design-brief');

/* Visible mock states for the eventual supplier feed and artwork review. */
const planningBlock=document.querySelector('.pdp-planning');
if(planningBlock){
  planningBlock.insertAdjacentHTML('beforebegin','<section class="live-product-state" aria-live="polite"><div><span>Supplier feed</span><strong data-live-feed-status>Checking Bocini availability…</strong></div><div><span>MOQ</span><strong data-live-moq>—</strong></div><div><span>Lead time</span><strong data-live-lead>—</strong></div><button type="button" data-refresh-live-state>Refresh</button></section>');
  const refreshLiveState=()=>{
    const status=document.querySelector('[data-live-feed-status]'),moq=document.querySelector('[data-live-moq]'),lead=document.querySelector('[data-live-lead]');
    if(status)status.textContent='Checking Bocini availability…';
    if(moq)moq.textContent='—';
    if(lead)lead.textContent='—';
    setTimeout(()=>{if(status)status.textContent='Available to order';if(moq)moq.textContent='12 units';if(lead)lead.textContent='7–10 business days'},650);
  };
  document.querySelector('[data-refresh-live-state]')?.addEventListener('click',refreshLiveState);
  refreshLiveState();
}
artworkFile?.addEventListener('change',()=>{
  const file=artworkFile.files?.[0];
  if(!artworkUploadStatus)return;
  artworkUploadStatus.classList.toggle('is-ready',Boolean(file));
  artworkUploadStatus.textContent=file?`${file.name} received — ready for the artwork review queue.`:'No file selected — we will review every file before production.';
});
const productAvailability={'Club Performance Tee':'Available to order','Team Hoodie':'Made to order · 7–10 days','Branded Bottle':'In stock · 2-day dispatch','Victory Cup':'Season stock · quote required'};
document.querySelectorAll('.product').forEach((card)=>{
  const title=card.querySelector('h3')?.textContent.trim(),label=productAvailability[title];
  if(!label||card.querySelector('.product-live-state'))return;
  const supplier=card.querySelector('.supplier,.featured-product-supplier');
  if(!supplier)return;
  const state=document.createElement('span');
  state.className='product-live-state';
  state.textContent=label;
  supplier.insertAdjacentElement('afterend',state);
});

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

  if(document.title.includes('Screen Printing')){
    const briefForm=document.querySelector('.contactform');
    briefForm?.addEventListener('submit',(event)=>{
      event.preventDefault();
      if(briefForm.querySelector('.brief-success'))return;
      briefForm.classList.add('is-submitted');
      briefForm.insertAdjacentHTML('beforeend','<div class="brief-success" role="status"><strong>Design brief received</strong><span>Reference files and production details are now queued for the SportSense team. We will contact you before any production starts.</span></div>');
    });
  }

  if(document.title.includes('Portal')){
    const screenRow=[...document.querySelectorAll('.table tbody tr')].find((row)=>row.textContent.includes('Screen Printing'));
    const orderCard=screenRow?.closest('.portalcard');
    if(screenRow&&orderCard){
      orderCard.insertAdjacentHTML('afterbegin','<div class="portal-status-demo"><div><span>Order status preview</span><strong>#SS-0995 · Screen Printing</strong></div><div><button type="button" data-portal-status="With supplier">Supplier</button><button type="button" data-portal-status="With printer">Printer</button><button type="button" class="is-selected" data-portal-status="With SportSense for dispatch">SportSense</button><button type="button" data-portal-status="Dispatched">Dispatched</button></div></div>');
      orderCard.querySelectorAll('[data-portal-status]').forEach((button)=>button.addEventListener('click',()=>{
        const status=screenRow.querySelectorAll('td')[1];
        if(status)status.textContent=button.dataset.portalStatus||'';
        orderCard.querySelectorAll('[data-portal-status]').forEach((item)=>item.classList.toggle('is-selected',item===button));
      }));
    }
  }
})();

/* Animated homepage CTAs, adapted from the supplied Uiverse button treatment. */
const heroActions=document.querySelector('.hero-copy-block .actions');
if(heroActions){
  const makeHeroLetters=(text,className)=>[...text].map((letter,index)=>`<span style="--i:${index + 1}">${letter===' ' ? '&nbsp;' : letter}</span>`).join('');
  const makeHeroCta=(href,label,hoverLabel,variant)=>`<a class="uiverse-hero-cta uiverse-hero-cta--${variant}" href="${href}" aria-label="${label}"><span class="uv-wave"></span><span class="uv-glow"></span><span class="uv-glow-out"></span><span class="uv-shadow uv-shadow--hard"></span><span class="uv-shadow uv-shadow--soft"></span><span class="uv-button"><span class="uv-main-text">${makeHeroLetters(label,'main')}</span><span class="uv-hover-text">${makeHeroLetters(hoverLabel,'hover')}</span></span></a>`;
  heroActions.classList.add('uiverse-actions');
  heroActions.innerHTML=makeHeroCta('pages/apparel.html','Start order','Shop now','order')+makeHeroCta('#process','How it works','Explore','process');
}


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

})();
