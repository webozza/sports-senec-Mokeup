# Sport Sense — Horizon brand setup

Ei note-ta mockup-er exact visual system follow kore banano. Horizon theme-e build korar shomoy ei font, size ar colour use korba.

## 1. Font family

### Body, paragraph, product text, menu, button, form, footer

```css
font-family: Arial, Helvetica, sans-serif;
```

### Main display heading

```css
font-family: "Arial Black", Impact, Arial, sans-serif;
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.055em;
line-height: .9;
```

Ei display heading use hoise Home hero, New Arrivals, Shop by Category, collection hero, PDP title, About heading ar Built to Honor copy-te.

Horizon-er font picker-e `Arial Black` na thakle closest heavy/condensed heading font use korba. Exact feel-er jonno theme custom CSS-e uparer stack add korba.

## 2. Font size guide

| Element | Desktop | Mobile | Weight / rule |
|---|---:|---:|---|
| Body default | 14px | 14px | Arial 400 |
| Main paragraph | 16px | 14px | Arial 400 |
| Supporting text | 14px | 14px | Arial 400 |
| Announcement bar | 11px–14px | 12px | Arial 800/900, uppercase |
| Header menu | 11px–14px | 14px drawer-e | Arial 800/900, uppercase |
| Eyebrow / label | 10px–14px | 10px–14px | Arial 900, uppercase |
| Buttons | 11px–14px | 12px–14px | Arial 900, uppercase |
| Product title / price | 14px–16px | 14px | Arial 900 |
| Small card title | 16px–17px | 16px | Arial 900, uppercase |
| H4 | 24px–32px | 24px–28px | Arial Black / Impact |
| Section heading | 34px–43px | 28px–36px | Arial Black / Impact |
| Collection / About heading | 52px–64px | 40px–48px | Arial Black / Impact |
| Home H1 | `clamp(56px, 4.8vw, 76px)` | `clamp(39px, 11vw, 48px)` | Arial Black / Impact |

**Rule:** Full website-e body text 14px-er niche jabe na. Main paragraph 16px; mobile-e 14px use korba.

## 3. Colour system

| Role | Hex | Use |
|---|---|---|
| Brand orange | `#FF5A00` | Primary CTA, active nav, price, highlighted word, icon accent |
| Orange hover | `#DB4B00` | Primary CTA hover |
| Main ink | `#111111` | Heading, dark icon, black CTA |
| Near black | `#151515` | Built to Honor, footer, dark add-to-cart |
| White | `#FFFFFF` | Main background / dark section text |
| Soft cream | `#F7F5F2` | Nav pill, light section, engraving panel |
| Image card cream | `#F2EEEA` | Product/category image background |
| Border | `#E9E5E1` | Card, input, divider |
| Muted text | `#6B6B6B` | Description / secondary copy |
| Dark section muted | `#AAAAAA` | Footer / dark banner supporting copy |

### Colour use rule

1. Ek section-e shudhu ekta primary orange CTA thakbe.
2. Secondary CTA white background + border hobe.
3. Heading-er ekta keyword orange kora jabe; pura heading orange hobe na.
4. Price always orange.
5. Footer ar Built to Honor near-black hobe.
6. Extra blue, green ba notun accent colour use kora jabe na.

## 3.1 Container rule

Desktop design-er main content container hobe **1800px max-width**.

```css
--ss-container: 1800px;
```

Use hobe header, hero, product grid, category slider, feature section ar footer-er main content-e. Background / full-width section edge-to-edge thakbe, kintu content 1800px-er vitore aligned thakbe.

Mobile-e container fixed 1800px hobe na; Horizon-er normal responsive side padding use korbe.

## 4. Horizon Theme Settings-e setup

Shopify Admin → **Online Store → Themes → Customize → Theme settings**

### Typography

- Body font: Horizon-e clean sans-serif select koro (Work Sans bhalo fallback)
- Paragraph: **16px**
- Heading: heavy/Impact-er closest font
- H1/H2/H3: uppercase, tight letter spacing
- Mobile paragraph: **14px**

### Colours

| Horizon setting | Value |
|---|---|
| Light background | `#FFFFFF` |
| Main text / foreground | `#111111` |
| Accent / primary button | `#FF5A00` |
| Accent hover | `#DB4B00` |
| Light secondary background | `#F7F5F2` |
| Border / subtle | `#E9E5E1` |
| Dark scheme background | `#151515` |
| Dark scheme text | `#FFFFFF` |
| Dark scheme muted text | `#AAAAAA` |

### Logo

Theme settings → **Logo and favicon** theke `assets/sportsense-logo.png` upload korba.

## 5. Section recipe

| Section | Background | Typography / component |
|---|---|---|
| Header | White, menu pill `#F7F5F2` | 11–14px uppercase menu; active orange |
| Hero | White → soft cream | H1 Arial Black; eyebrow orange line; main CTA orange |
| Product card | `#F2EEEA` → white image area | 14px bold title, orange price, dark hover Add to Cart |
| Built to Honor | `#151515` | White heading, orange highlight/icons, muted `#AAAAAA` copy |
| Categories | White / soft cream | 4 cards desktop, slider mobile |
| Why Choose | White cards, warm border | fixed equal card height, orange outline SVG |
| Footer | `#151515` | Large transparent logo, 14px links / newsletter |

## 6. Custom CSS variables

Horizon-er custom CSS ba dedicated Sport Sense stylesheet-e use koro:

```css
:root {
  --ss-orange: #ff5a00;
  --ss-orange-dark: #db4b00;
  --ss-ink: #111111;
  --ss-dark: #151515;
  --ss-soft: #f7f5f2;
  --ss-image-soft: #f2eeea;
  --ss-line: #e9e5e1;
  --ss-muted: #6b6b6b;
  --ss-muted-on-dark: #aaaaaa;
  --ss-radius: 18px;
  --ss-container: 1800px;
}

h1, h2, h3, .sport-sense-display {
  font-family: "Arial Black", Impact, Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: .9;
  text-transform: uppercase;
}
```

`--ss-*` naming use korle Horizon-er native variable-er sathe clash korbe na.

## 7. Pulled Horizon theme review

Current theme: **Horizon 4.1.3**. Base hisebe bhalo, karon already ache:

- Announcement bar, header, mobile drawer
- Native cart drawer / AJAX cart support
- Product form, variant picker, quantity selector
- Product card ar quick add
- Collection filter ar sort
- Hero, product list, collection list, carousel, marquee, media-with-content
- Footer newsletter, policy ar social blocks
- Product recommendations

Current `templates/index.json`-e default ache:

```text
1. Hero
2. Product list
```

Sport Sense homepage banate lagbe:

```text
1. Custom Sport Sense Hero
2. New Arrivals — native product-list customize kora jabe
3. Built to Honor promo banner
4. Shop by Category collection slider
5. Why Choose Sport Sense icon cards
6. Sport Sense custom footer styling
```

## 8. Production rule

1. `index.html` shudhu visual reference; live build static HTML diye hobe na.
2. Horizon-er native product, cart, filter, variant, collection ar navigation use korba.
3. Product name/price/image Shopify product data theke ashbe; hard-code kora jabe na.
4. Header ar footer Theme Editor + Shopify Navigation diye manage korba.
5. Engraving field product form-er **line item property** hisebe add korte hobe.
6. Static page links production-e Shopify URL / Liquid route diye replace korte hobe.
