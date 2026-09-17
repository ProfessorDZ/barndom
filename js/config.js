/*
 * Barn Dom — shop configuration
 * --------------------------------
 * Change shop-wide settings here. This file only sets a global object
 * (window.BD_CONFIG) — it does not use import/export so it works both
 * from a local double-clicked file and from a web server.
 */
window.BD_CONFIG = {
  // Shown in the header, footer and browser tab title.
  shopName: "Barn Dom",

  // ISO currency code used everywhere prices are shown.
  // Change this ONE value to switch the whole shop to another currency
  // (e.g. "UAH", "EUR", "USD"). Prices themselves (in js/products.js)
  // are plain numbers in this currency.
  currency: "PLN",

  // Extra cost (in the currency above) for adding a child's name to the
  // cover of a product ("Personalization").
  personalizationPrice: 10,

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
