# Barndom — shop website

This is the website for **Barndom**, a small shop selling handmade
educational products for kids. Right now it actually sells two kinds of
products — books on velcro, and coloring books — with four more kinds
(games, playdough activities, wipe-clean workbooks and themed
notebooks) planned but not for sale yet (see "The 'coming soon'
sections" below). The site looks and works like a real online shop: a
header with search and a shopping cart, a home page where visitors
pick what they're looking for, a filterable catalog, product pages
with a mini-cart, and a full cart/checkout page.

It is a plain website — just HTML, CSS and JavaScript files. There is
nothing to install and nothing to "build". You can open it directly on
your computer or put it on any basic web host.

## How to open the site

**Option 1 — just double-click it**
Open the `index.html` file in this folder with your web browser
(double-click it, or right-click → Open with → your browser). The
whole site works this way, including the cart.

**Option 2 — with a local server** (recommended while making changes,
some browsers are stricter about files opened directly)
If you have Claude Code set up with the "barndom" launch configuration,
just start it and it will open the site at `http://localhost:8000`.
Otherwise, from a terminal in this folder you can run:
```
python3 -m http.server 8000
```
and then open `http://localhost:8000` in your browser.

## What's on each page

- `index.html` — the home page: a short warm welcome next to a small
  illustration, then the 6 big tiles ("What are you looking for?").
  Those tiles ARE the site's navigation — there is no other menu of
  categories on the home page. Two tiles ("Velcro games" and "Coloring
  books") are the sections that actually sell something today; the
  other four are greyed out with a "Coming soon" badge because those
  sections aren't ready yet — see "The 'coming soon' sections" below.
- `catalog.html` — the list of products for one category, or for a
  search (opened by typing in the search box). Sorting is available
  everywhere; for the velcro-book category there are also filters by
  age and by topic (with a sidebar on desktop and a slide-in panel on
  phones).
- `product.html` — a single product's page: photo(s), the price, the
  book-language choice, adding a name for personalization, quantity,
  and the "Add to cart" button. A small cart preview panel slides in
  from the right after adding something.
- `cart.html` — the shopping cart and the order form.

Online payment is not connected yet — when someone places an order,
they see a message saying payment is coming soon. Nobody is charged,
nothing is saved anywhere, and the cart is not emptied, so the visitor
can still see what they were ordering.

## How to add or edit products and prices

Open the file `js/products.js` in any text editor. There is a big
comment at the top explaining exactly how to add a new product or
change an existing one — mainly: copy an existing product block,
change its `id`, `price`, `image`, and fill in its name/description in
all 4 languages (Ukrainian, Polish, English, Swedish).

**Every product has one price per currency, not one price overall.**
The shop shows PLN, EUR or SEK depending on the site's language (see
"Which language shows which currency" below), and each of those is
just a plain number you type in yourself — there is no automatic
conversion between them, on purpose, so the site keeps working as
plain files with no internet connection needed. A price looks like
this in `js/products.js`:
```
price: { PLN: 21, EUR: 5, SEK: 55 },
```
To change the price of an existing product, find it in that file (you
can search for its name) and change the number after the currency you
want to change — for example, change `EUR: 5` to `EUR: 6` to raise only
the euro price. The other two currencies are left exactly as they were.
Every product should have all three (PLN, EUR and SEK) filled in; if
one is ever missing, that one product will show the shop's fallback
currency instead (see below) rather than a broken price.

## Which language shows which currency

- Ukrainian and Polish → **PLN** (zł)
- English → **EUR** (€)
- Swedish → **SEK** (kr)

This is set in `js/config.js`, in `currencyByLanguage`. To change which
currency a language uses, edit that one line (for example, to show EUR
for Polish too). `defaultCurrency` right below it is only a safety net
— it's the currency shown for one product if that product is ever
missing a price for the currency its language normally uses.

Extra things you can add to any product:
- `bestseller: true` — shows the product in the "Bestsellers" row on
  the home page, and adds a small "Bestseller" badge on its card.
- `isNew: true` — adds a small "New" badge on its card.
- `images: [...]` — once you have real product photos, list them here
  (e.g. `images: ["assets/products/my-photo-1.jpg", "assets/products/my-photo-2.jpg"]`)
  and the product page will show them as a photo gallery with clickable
  thumbnails. If you leave this out, the single `image` picture is used
  everywhere instead — nothing else needs to change.
- `thumb: "..."` — a smaller, faster-loading copy of the product's
  picture. The small copy is used everywhere except the product's own
  page (catalog cards, "you may also like", cart lines), so those pages
  load faster when there are a lot of products with big photos. If you
  leave this out, the full-size `image` is used everywhere instead —
  it still works, just a little slower to load.
- `availableLanguages: []` (or leave it out) — for a product that only
  comes in one version, this removes the "book language" choice from
  its page and the "Language" line from the cart. Only add
  `availableLanguages: ["uk", "pl", ...]` for products that really do
  come in different printed languages.
- `personalizable: false` — hides the "add child's name on the cover"
  option on the product's page, and the "Name" line in the cart.
  Leave this out and the option shows up normally — it's only meant
  for products where adding a name isn't offered, like the coloring
  books.
- `ageLabel: "4+"` — for a velcro book whose age doesn't match any of
  the site's age filter options (6 mo+ / 1+ / 3+ / 5+ / 10+) exactly.
  It changes only the age text shown to shoppers (the product card,
  "you may also like", and the Details tab on the product's page) —
  it does not change which filter the product shows up under, that
  still comes from `ages`. Leave it out and the label is worked out
  from `ages` as usual. The same text works for all 4 languages, no
  translation needed.

## The "coming soon" sections

Four sections are not ready to sell yet: **Spot It! games**,
**playdough mats**, **wipe-clean workbooks** and **themed notebooks
(unit study)**. None of them have real products — there is nothing in
`js/products.js` for them, only the switch described below. Only
**velcro games** and **coloring books** are real, sellable sections
today.

Each of the four not-ready sections is controlled by a single switch:
open `js/products.js`, find its entry inside `window.BD_PRODUCT_TYPES`
(near the top of the file), and look for `comingSoon: true` on that
section's line — for example:
```
{ id: "spot-it", image: "assets/types/spot-it.svg", pastel: "sun", comingSoon: true },
```
While that's there for a section:
- it disappears from the header menu and the footer's list of sections
  (the footer still names it, but as plain text with a small "Coming
  soon" badge, not a link);
- its home-page tile is shown greyed out, with the same "Coming soon"
  badge, and isn't clickable;
- if someone opens its catalog link directly anyway (for example
  `catalog.html?type=spot-it`), they see a friendly "coming soon"
  message instead of an empty product list;
- nothing of that type can ever show up in search results, in
  "Bestsellers", or in "You may also like", because there are no
  products of that type yet.

**To turn a section back on once it has real products to sell:**
1. Add the real products to `window.BD_PRODUCTS` in `js/products.js`
   (see "How to add or edit products and prices" above for the
   step-by-step — copy an existing product block, give it a unique
   `id`, set its `type` to the section you're launching, fill in the
   price and picture, and write the name/description in all 4
   languages).
2. In that section's entry inside `window.BD_PRODUCT_TYPES`, delete
   the `comingSoon: true` part (or change it to `comingSoon: false`).
That's it — the tile turns colorful and clickable, the section
reappears in the header/footer menus, and its products start showing
up in search, "Bestsellers" and "You may also like" by themselves,
nothing else needs to change.

## How to change the currency

See "Which language shows which currency" above — that's the setting
to change. There is no single shop-wide currency any more; it always
follows the visitor's chosen language.

## How to change the shop name, contacts, or personalization price

Also in `js/config.js`:
- `shopName` — the name shown in the header, footer and browser tab.
- `contactEmail` — the email shown in the footer.
- `contactPhone` — the phone number shown in the footer.
- `personalizationPrice` — the extra cost for adding a child's name to
  a product's cover, entered the same way as a product price: one
  number per currency (`{ PLN: 10, EUR: 2.5, SEK: 25 }`).
- `announcementKey` — which line of text (from `js/i18n.js`) shows in
  the thin bar at the very top of every page. To change what that bar
  actually *says*, edit the `announcement.text` entry in `js/i18n.js`
  (in all 4 languages) — this setting only points to which text to use.

## How to change or add website text / translations

Open `js/i18n.js`. All the buttons, labels and messages on the site
(in all 4 languages) live there, organized in sections. Find the text
you want to change, in the language you want to change it in, and
edit it — no other file needs to change.

## Images

Illustrations live in the `assets/` folder:
- `assets/brand/` — the logo (in a few layouts), favicon, and the
  astronaut/rocket character pictures used on the home page and on
  empty-cart/"coming soon" states. The `-tight.webp` files are just
  closely-cropped versions of the originals (so they don't look tiny
  inside a small header or icon) — if you replace an original file,
  make a matching cropped version the same way, or just point the code
  in `js/app.js` back at the original.
- `assets/types/` — one picture per product category, shown on the
  home page's 6 tiles, also used as a placeholder photo for every
  product until real product photos are ready.
- `assets/products/coloring/` — the real coloring-book covers, with a
  `thumbs/` folder inside holding smaller, faster-loading copies of the
  same pictures (used everywhere except the product's own page — see
  the `thumb` field above).

To use a real photo for a specific product, put the image file
somewhere in `assets/` and change that product's `image:` path in
`js/products.js`. If you also make a smaller copy for faster loading,
point `thumb:` at it too.
