# Barn Dom — shop website

This is the website for **Barn Dom**, a small shop selling handmade
educational products for kids (books on velcro, coloring books, games,
playdough activities, wipe-clean workbooks and themed notebooks). The
site looks and works like a real online shop: a header with search and
a shopping cart, a home page where visitors pick what they're looking
for, a filterable catalog, product pages with a mini-cart, and a full
cart/checkout page.

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

- `index.html` — the home page: a welcome banner, four short "why buy
  from us" points, the 6 big category cards ("What are you looking
  for?"), a row of bestselling products, and a short "why parents
  choose us" section.
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

To change the price of an existing product, find it in that file (you
can search for its name) and change the `price:` number.

Two extra things you can add to any product:
- `bestseller: true` — shows the product in the "Bestsellers" row on
  the home page, and adds a small "Bestseller" badge on its card.
- `isNew: true` — adds a small "New" badge on its card.
- `images: [...]` — once you have real product photos, list them here
  (e.g. `images: ["assets/products/my-photo-1.jpg", "assets/products/my-photo-2.jpg"]`)
  and the product page will show them as a photo gallery with clickable
  thumbnails. If you leave this out, the single `image` picture is used
  everywhere instead — nothing else needs to change.

## How to change the currency

Open `js/config.js` and change the `currency:` value (for example from
`"PLN"` to `"UAH"` or `"EUR"`). That one change updates the price
display everywhere on the site — you do not need to touch anything
else.

## How to change the shop name, contacts, or personalization price

Also in `js/config.js`:
- `shopName` — the name shown in the header, footer and browser tab.
- `contactEmail` — the email shown in the footer.
- `contactPhone` — the phone number shown in the footer.
- `personalizationPrice` — the extra cost for adding a child's name to
  a product's cover.
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
- `assets/brand/` — logo, favicon, and the homepage astronaut picture.
- `assets/types/` — one picture per product category, also used as a
  placeholder photo for every product until real product photos are
  ready.

To use a real photo for a specific product, put the image file
somewhere in `assets/` and change that product's `image:` path in
`js/products.js`.
