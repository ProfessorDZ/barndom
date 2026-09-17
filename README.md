# Barn Dom — shop website

This is the website for **Barn Dom**, a small shop selling handmade
educational products for kids (books on velcro, coloring books, games,
playdough activities, wipe-clean workbooks and themed notebooks).

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

- `index.html` — the home page, with the 6 big category cards.
- `catalog.html` — the list of products for one category (opened by
  clicking a category card).
- `product.html` — a single product's page, where a customer picks the
  book language, adds a name for personalization, and adds it to cart.
- `cart.html` — the shopping cart and the order form.

Online payment is not connected yet — when someone places an order,
they see a message saying payment is coming soon. Nobody is charged.

## How to add or edit products and prices

Open the file `js/products.js` in any text editor. There is a big
comment at the top explaining exactly how to add a new product or
change an existing one — mainly: copy an existing product block,
change its `id`, `price`, `image`, and fill in its name/description in
all 4 languages (Ukrainian, Polish, English, Swedish).

To change the price of an existing product, find it in that file (you
can search for its name) and change the `price:` number.

## How to change the currency

Open `js/config.js` and change the `currency:` value (for example from
`"PLN"` to `"UAH"` or `"EUR"`). That one change updates the price
display everywhere on the site — you do not need to touch anything
else.

## How to change the shop name, contact email, or personalization price

Also in `js/config.js`:
- `shopName` — the name shown in the header, footer and browser tab.
- `contactEmail` — the email shown in the footer.
- `personalizationPrice` — the extra cost for adding a child's name to
  a product's cover.

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
