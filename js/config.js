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

  // Contact email placeholder shown in the footer.
  contactEmail: "hello@barndom.example",
};
