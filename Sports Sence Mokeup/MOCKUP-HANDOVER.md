# Sport Sense mockup — build handover

এই document-এ mockup-এর page structure, image কোথায় ব্যবহার হয়েছে, user flow এবং responsive behaviour লেখা আছে।

## 1. Project structure

```text
/
├── index.html                       # Home page — Vercel-এর main entry
├── pages/
│   ├── collections.html              # Collection / all awards page
│   ├── product-victory-cup.html      # Product detail page (PDP)
│   └── about.html                    # About page
├── assets/                           # Local product, category, logo ও banner images
├── custom-trophies-redesign-notes.md # আগের design direction / review notes
└── MOCKUP-HANDOVER.md                # এই handover note
```

সব page relative link দিয়ে connected রাখা হয়েছে। Horizon theme-এ নেওয়ার সময় এগুলো Shopify route / Liquid URL দিয়ে replace করতে হবে।

## 2. Page flow

```text
Home (index.html)
  ├─ Header: logo + navigation + cart
  ├─ Hero: “Big Wins. Best Awards.”
  ├─ New Arrivals: product hover → Add to cart / product click → PDP
  ├─ Built to Honor: Explore Collection → Collections page
  ├─ Shop by Category: category cards → Collections page
  ├─ Why Choose Sport Sense: trust cards
  ├─ Footer: newsletter, shop, policy, contact links
  └─ Cart drawer: add-to-cart করলে ডান পাশে cart drawer open

Collections (pages/collections.html)
  ├─ Collection hero
  ├─ Filter + sort UI
  ├─ Product grid
  └─ Product click → pages/product-victory-cup.html

Product detail / PDP (pages/product-victory-cup.html)
  ├─ Product gallery / thumbnails
  ├─ Title, rating, price, size choices
  ├─ Quantity + Add to cart
  └─ Related / complete-the-collection products

About (pages/about.html)
  ├─ Brand story hero
  ├─ Stats
  ├─ Purpose / story
  ├─ Values
  └─ CTA → Collections
```

## 3. Links and navigation

| From | Action | Goes to |
|---|---|---|
| Logo / Home | click | `index.html` |
| Trophies & Awards menu | click | `pages/collections.html` |
| Explore Collection | click | `pages/collections.html` |
| Product cards | click | `pages/product-victory-cup.html` |
| About Us link | click | `pages/about.html` |
| Page logo | click | Home page |

`#` দেওয়া links এখন placeholder: Promotional Products, Apparel & Headwear, Signage, Catalogues, policy pages এবং checkout। এগুলোর live page তৈরি হলে শুধু `href` বদলালেই হবে।

## 4. Asset map

| Asset | কোথায় ব্যবহার |
|---|---|
| `assets/sportsense-logo.png` | Header / standard logo |
| `assets/sportsense-hero-transparent.png` | Home hero, About hero-এর award composition |
| `assets/sportsense-built-to-honor.png` | “Built to Honor” black section background |
| `assets/sportsense-feature-banner-awards.png` | Award feature banner artwork |
| `assets/product-gold-cup.png` | Victory Cup / trophy cards |
| `assets/product-silver-cup.png` | Silver Champ Cup |
| `assets/product-crystal-peak.png` | Crystal Peak Award |
| `assets/product-classic-medal.png` | Classic Medal |
| `assets/product-prestige-award.png` | Prestige Award |
| `assets/category-gold-trophy.png` | Trophies category / collection hero |
| `assets/category-gold-medal.png` | Medals category |
| `assets/category-plaque.png` | Cups / plaque category |
| `assets/category-crystal-award.png` | Plaques / crystal category |
| `assets/category-soccer-trophy.png` | Custom awards category / PDP image |
| `assets/category-gift-box.png` | Corporate awards category / About collage |

সব image local `assets/` folder থেকে load হয়। অন্য server বা external image URL-এর উপর depend করে না।

## 5. Design system

- Primary orange: `#ff5a00` (CTA, active state, price, accent)
- Dark ink / black: `#151515` (heading, dark banner, cart button)
- Soft background: warm off-white (`#f7f5f2` / related shades)
- Border: light warm grey (`#e8e3de`)
- Heading style: heavy, uppercase, condensed visual treatment
- Body copy: minimum 14px; main paragraph generally 16px

### Repeated interactions

- Product and category cards: image scale / hover state এবং `Add to cart` / `Quick add` button show।
- Header nav: orange active state and hover background.
- Cart: item quantity increase / decrease / remove এবং subtotal update।
- Mobile footer: Shop, Policy এবং Contact accordion open/close।
- Mobile menu: hamburger click করলে drawer খুলে; menu link বা outside area click করলে close হয়।

## 6. Responsive behaviour

### Desktop: 1600px and above

- Full horizontal navigation visible.
- Multi-column product, category, feature ও footer layout visible.

### Below 1600px

- Full nav hide থাকে।
- Hamburger icon visible থাকে।
- Hamburger click করলে right-side white menu drawer smooth animation-এ open হয়।
- Drawer open হওয়ার আগে menu display হয় না; off-screen menu রাখা হয় না—এতে horizontal scroll হওয়ার কথা নয়।

### Mobile

- Hero image content-এর আগে full width দেখানো হয়।
- Product and category grids smaller screen অনুযায়ী fewer columns-এ যায়।
- “Built to Honor” feature list 2-column layout-এ যায়।
- Footer links accordion হয়, যাতে page ছোট এবং readable থাকে।

## 7. Cart flow

```text
Hover product card
  → Add to cart / Quick add
  → item cart state-এ add
  → cart badge number update
  → cart drawer open
  → quantity +/- অথবা remove
  → subtotal update
```

এটি mockup-level front-end cart। Refresh করার পরে cart persist করবে না এবং Shopify checkout-এ যায় না। Live Shopify integration-এর সময় Shopify AJAX Cart API / theme cart endpoint লাগবে।

## 8. Shopify Horizon theme implementation

এই mockup হলো visual blueprint। Production build হবে **Shopify Horizon theme**-এ। তাই static HTML-এর look, structure, assets এবং interaction Horizon-এর sections / blocks / Liquid-এ map করতে হবে।

| Mockup part | Horizon implementation |
|---|---|
| Header + announcement bar | Theme header / announcement section settings |
| Hero | Custom hero section with image, eyebrow, heading, CTA blocks |
| New Arrivals | Featured collection section; product source Shopify collection |
| Add to cart + cart drawer | Horizon product form + built-in/AJAX cart drawer |
| Built to Honor banner | Custom image-with-text / promo section |
| Shop by Category | Collection list section, four-card slider on mobile |
| Why Choose Sport Sense | Custom multi-column icon section |
| Footer | Theme footer blocks: newsletter, shop, policy, contact |
| Collection page | Shopify collection template with native filters / sorting |
| PDP | Shopify product template, variants, engraving input line-item property |
| About | Custom page template with reusable story, stats and values sections |

### Shopify routes to use

- Home: `/`
- Collection: `/collections/all` or a dedicated trophies collection handle
- Product: `/products/victory-cup` (actual product handle)
- About: `/pages/about-us`

Relative `.html` paths are only for this mockup. Horizon implementation-এর সময় এগুলো Liquid URL filter / Shopify routes দিয়ে বদলাতে হবে।

## 9. Future edit guide

- Product name, price, copy: সংশ্লিষ্ট HTML page-এ product card / details markup edit করুন।
- Image বদলাতে: `assets/`-এ নতুন file রাখুন, তারপর relevant `<img src="...">` path বদলান।
- New page: Shopify Admin থেকে page তৈরি করে relevant Horizon page template assign করুন।
- Header menu link: Shopify Navigation থেকে menu manage করুন; hard-coded HTML link ব্যবহার করবেন না।
- Brand color: page-এর CSS `:root` variables থেকে change করুন; `--orange`, `--ink`, `--soft`, `--line` মূল variables।
- Breakpoint: full menu 1600px-এর উপরে; menu-related CSS পরিবর্তনের আগে সব 4টি HTML file-এ একই update দিন।

## 10. Important limitation

এটি final visual/front-end mockup। Product inventory, real filters, search, customer account, payment, order এবং email subscription এখনও connected নয়। এগুলো Horizon theme এবং Shopify-এর native features/app integration দিয়ে production build-এর সময় যুক্ত করতে হবে।
