/*
 * Barndom — shop configuration
 * --------------------------------
 * Change shop-wide settings here. This file only sets a global object
 * (window.BD_CONFIG) — it does not use import/export so it works both
 * from a local double-clicked file and from a web server.
 */
window.BD_CONFIG = {
  // Shown in the header, footer and browser tab title.
  shopName: "Barndom",

  // Which currency is shown depends on the site's language — not on
  // where the visitor happens to be. Change any value below to switch
  // that language to a different currency (must be an ISO currency code
  // that Intl.NumberFormat knows, e.g. "PLN", "EUR", "SEK", "UAH", "USD").
  // "defaultCurrency" is only a safety net: it's used if a product (or
  // the personalization surcharge below) is ever missing a price for the
  // currency a language maps to here — see js/products.js for where
  // product prices are entered, one number per currency.
  currencyByLanguage: {
    uk: "PLN",
    pl: "PLN",
    en: "EUR",
    sv: "SEK",
  },
  defaultCurrency: "PLN",

  // Extra cost for adding a child's name to the cover ("Personalization").
  // Entered the same way as a product price (see js/products.js) — one
  // plain number per currency, no automatic conversion between them.
  personalizationPrice: {
    PLN: 10,
    EUR: 2.5,
    SEK: 25,
  },

  // Default site language if nothing is saved yet in the visitor's browser.
  defaultLanguage: "uk",

  // Contact details shown in the footer (and used for the "mailto" link).
  // These are placeholders — replace them with the shop's real contacts.
  contactEmail: "hello@barndom.example",
  contactPhone: "+48 000 000 000",

  // Which translation key (from js/i18n.js) is shown in the thin bar at
  // the very top of every page. To change the announcement text, edit
  // that key ("announcement.text") in js/i18n.js in all 4 languages —
  // this setting only controls WHICH key is displayed.
  announcementKey: "announcement.text",
};
