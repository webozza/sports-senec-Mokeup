SportSense Full Prototype V2

Main improvements:
- Homepage follows the exact brief section order
- Decoration methods teaser added
- Family-owned / Brendale trust section added
- Featured club/school work section added
- GSAP + ScrollTrigger entrance and scroll animations
- Stagger, parallax, counter, tilt and magnetic button interactions
- Improved hover effects and overall smoothness
- Product page duplicate title banner removed
- Cart drawer made more compact and polished

Start with:
index.html

Note:
GSAP is loaded from cdnjs. An internet connection is required for GSAP animations.
The site remains fully usable without GSAP.




SportSense Website Build Brief
Prepared by Zone Five for the SportSense development team Status: For development — outstanding items flagged where confirmation is still needed


1. Overview
SportSense is a family-owned sports apparel, headwear, bags, drinkware, trophies and promotional merchandise business based in Brendale, QLD.

Store: sportsense.com.au
Platform: Shopify (handle sportsenseaustralia)

This brief covers the website build: site architecture, page requirements, navigation, and how the site interfaces with fulfilment partner data and the customisation app. It does not re-scope the customisation app itself, that is a separate, already-confirmed engagement with your team.


2. Audience Priority
Build and design priority, in order:

Sporting clubs — primary revenue driver. Season uniform cycles, committee-based buying decisions, high sensitivity to lead time and minimum order quantities (MOQ).
Promotional product buyers — corporate/business buyers purchasing branded merchandise via PromoBrands.
Schools — similar buying pattern to clubs, with procurement/compliance considerations (POs, quotes).

Homepage hero and top-level messaging should lead with the sporting club use case, but promotional products and schools need genuine presence further down the page, not token treatment.


3. Fulfilment Partners
Partner
Category
Integration
Bocini (bocini.com.au)
Apparel — all decoration methods
API available. Reference and integrate, including pulling product imagery.
PromoBrands (promobrands.com.au)
Promotional products (pens, bottles, bags, mugs, headwear, drinkware)
API available. Reference and integrate, including pulling product imagery.


Not live yet — do not build assuming these exist: Trophies & Awards supplier integration, Signage/Banners. Site should be structured extensibly so these can be added later without a nav/architecture rebuild.

Build note: PromoBrands' own catalogue includes some apparel items. SportSense uses Bocini exclusively for apparel to avoid two partners offering the same product type with conflicting routing, pricing or lead times. When building the PromoBrands product feed/import, actively exclude apparel categories — do not import the PromoBrands catalogue wholesale.


4. Apparel Decoration Methods (via Bocini)
Four decoration methods, each with a different fulfilment path. This affects category structure, product page logic, and order status tracking.

Method
Fulfilment Path
Customer Journey
Ships
Sublimation
Bocini (full custom design process)
Self-serve via customiser app
Direct to customer, SportSense-tagged
Heat Transfer
Bocini in-house
Self-serve via customiser app
Direct to customer
Embroidery
Bocini garment → Bocini embroidery
Self-serve via customiser app
Direct to customer
Screen Printing
Bocini garment → Southern Cross (print) → SportSense collects, packs, dispatches
Design-brief led (see section 6, not self-serve)
Via SportSense, not direct


Build requirement: Screen printing is the only method where SportSense physically handles fulfilment. Order status tracking needs a distinct state for this (e.g. "with SportSense for dispatch"), separate from "with supplier."

MOQ and lead time: to be pulled live from partner APIs and surfaced at both collection/tile level and product-page level, not buried in policy pages or treated as static content. This is a trust factor for club buyers planning against a season start date.


5. Artwork & File Requirements
Each decoration method has different technical requirements. The customisation app enforces these; the website needs to communicate them clearly at the point of upload.

Method
File Types
Key Requirements
Sublimation
Vector preferred (AI/EPS/SVG/PDF), PNG/JPG accepted
300 DPI, transparent background, no small/thin text
Heat Transfer
Vector preferred, PNG accepted
300 DPI, transparent background, fonts outlined. $60 redraw fee if artwork unusable — disclose this on-site
Embroidery
Vector preferred, high-res PNG (clean edges)
Min line thickness 1.5–2mm, min text height 5–6mm, no gradients/photographic detail
Screen Printing
Vector mandatory (multi-colour); high-res PNG only if single colour, crisp edges
No JPG/screenshots/gradients accepted


Build requirement: a plain-English "artwork checklist" component at the upload step, specific to the method being used, so customers self-correct before submitting rather than finding out via a rejected order.


6. Screen Printing — Design-Led Service (Not Self-Serve)
Screen printing is not a logo-upload product. It is a full custom design service and needs its own distinct page and journey, separate from the self-serve customiser used for the other three methods.

Customer journey:

Customer submits a design brief (colours, reference images, concept, all production detail) via a dedicated intake form
SportSense contacts the customer to talk through the brief
SportSense designs the concept
Customer reviews and approves, or requests revisions
SportSense finalises and approves the design internally
Design sent to Southern Cross for print (garment supplied by Bocini)
Finished garments returned to SportSense for collection, packing and dispatch

Page build requirements:

Standalone top-level page — not a product page, not folded into the Apparel customiser flow
Clear explanation of the process and what to expect at each stage
Full catalogue of garments available through this pathway (not just a generic enquiry form)
MOQ and lead time information for this method
Primary CTA: "Start your design brief", not "Add to cart" — must read clearly as starting a conversation, not placing an instant order

⚠️ Confirm with Zone Five before finalising this page: number of revision rounds included, and total turnaround time to communicate (currently TBC).


7. Site Architecture
Reference site for structure and layout pattern: mercha.com.au, rebranded to SportSense identity (see section 9) and rebalanced for SportSense's audience priority (clubs first — Mercha's audience is broader/more general).
7.1 Navigation
Top-level navigation is mapped to fulfilment partner catalogues, so site structure mirrors backend order routing:

Apparel (Bocini catalogue) — sub-nav by garment type (tees, polos, hoodies, shorts etc., per Bocini's actual range)
Promotional Products (PromoBrands catalogue) — sub-nav by product type (pens, bottles, bags, mugs, headwear, drinkware etc.)
Screen Printing / Custom Design — standalone top-level page (see section 6)
Trophies & Awards — existing page, stays top-level

Navigation is by product/service category, not by decoration method. Decoration method is surfaced within category/product pages and via a dedicated education page, not used as primary navigation.
7.2 Homepage
Build in this order:

Trust stat bar above the hero (placeholder for now — real stat to follow once available)
Hero — sporting club use case/imagery leads, single clear CTA
Numbered "how it works" process — extend the existing Trophies page 5-step pattern site-wide
Category grid: Apparel / Promotional Products / Screen Printing & Custom Design / Trophies & Awards
Decoration methods teaser, linking to a full education page
Trust section (family-owned, Brendale-based) — build to accommodate placeholder content initially; real team photo and case studies not yet available
Featured/recent club and school work — deferred until case studies/photography exist; use partner API product imagery in the meantime
Footer "Important Stuff" block: Decoration Methods Explained, Ordering & Lead Times, FAQs, Screen Printing / Custom Design info
7.3 Category / Landing Pages
Apparel, Promotional Products, Screen Printing / Custom Design, Trophies & Awards as described in 7.1
7.4 Product Pages
Variant selection (size, colour, garment style)
MOQ and lead time visible immediately — on the product tile in collection views and on the product page itself
Entry point into customiser app (logo upload / text / preview) for self-serve methods
Artwork checklist relevant to the product's decoration method
Pricing/quantity calculator: deferred. Not part of this brief — being scoped separately with the dev team directly, do not build unless separately confirmed.
7.5 Customer Portal
To be confirmed with dev team — scope not yet finalised. Under consideration:

Order history
Reorder function
Saved artwork/logos
7.6 Supporting Pages
About / Trust (family-owned, Brendale-based, club/school credibility)
Decoration Methods Explained (education page)
Ordering, Shipping & Lead Times
FAQ
Contact / Enquiry


8. Content & SEO
Zone Five supplies homepage/category/FAQ copy, positioning and trust messaging — after wireframes are built
Dev team builds page structure, technical SEO foundations (schema markup, meta tag structure, alt text fields, page speed, mobile responsiveness) and content placeholders — not final copy


9. Brand & Design Direction
Confirmed direction: lighter, white-space-led, closer to mercha.com.au's use of colour — the previous dark-dominant theme has been ruled out as too heavy for this audience.

Background: white or soft off-white — light and open
Orange #F5A623: retained as the accent colour — CTAs, highlights, icons, key trust stats
Near-black #1a1a1a: retained but as a supporting colour only (body text, footer, nav bar), not a dominant background
Logo: SportSense logo retained as-is
Overall feel: clean, spacious, professional, lots of white space — not a busy or generic sports-retail template look
Zakeke may be referenced as a UX benchmark only for customiser interaction feel — not the platform being built on

⚠️ Confirm with Zone Five: the existing live Trophies & Awards page uses the original dark theme. If restyling is not included in this build, that page will look visually inconsistent with the rest of the site until updated separately.


10. Outstanding Items — Confirm Before Build Sign-Off
Customer portal scope for phase one — confirm with dev team
Screen printing turnaround time and revision rounds — TBC
Real case studies / club and school photography — not yet available; build trust/featured-work sections to accommodate placeholder content now, real content to follow
Trophies & Awards page — restyle to match new lighter theme as part of this build, or handle as a later phase?

Deferred (explicitly not part of this brief):

Pricing/quantity calculator — being scoped directly with the dev team, separate conversation



This brief reflects information current as of Bocini fulfilment documentation and confirmed direction from Zone Five. Outstanding items above should be resolved before final build sign-off.

