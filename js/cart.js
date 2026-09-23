/*
 * Barndom — shopping cart logic
 * --------------------------------
 * The cart is a plain array of "line" objects stored in the browser's
 * localStorage (key "bd_cart"). Every read/write is wrapped in
 * try/catch so the site still works if storage is unavailable
 * (private browsing, opened straight from disk, etc.) — it just won't
 * remember the cart between page loads in that case.
 *
 * A line looks like:
 * {
 *   lineId: "abc123",        // internal unique id
 *   productId: "vb-little-traveller",
 *   productLanguage: "uk",   // language of the printed product
 *   personalized: true,      // whether a name was added to the cover
 *   childName: "Олеся",      // only meaningful when personalized
 *   quantity: 2,
 *   unitPrice: 49,           // product price + personalization if any
 *   currency: "PLN"          // which currency "unitPrice" is in
 * }
 *
 * The SAME product with DIFFERENT chosen options becomes a separate line.
 *
 * "currency" is stored on the line because the shop's currency depends on
 * the site language (see js/config.js), and a visitor can switch language
 * after adding something to the cart. js/app.js calls reprice() (below) on
 * every page load to recompute "unitPrice"/"currency" for the CURRENT
 * language from the product data — cart.js itself never converts between
 * currencies, it only stores whatever it's told.
 */
(function () {
  var STORAGE_KEY = "bd_cart";

  function readCart() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(cart) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      /* storage unavailable — cart just won't persist */
    }
  }

  function makeLineId() {
    return "l" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function findMatchingLine(cart, item) {
    for (var i = 0; i < cart.length; i++) {
      var line = cart[i];
      if (
        line.productId === item.productId &&
        line.productLanguage === item.productLanguage &&
        !!line.personalized === !!item.personalized &&
        (line.childName || "") === (item.childName || "")
      ) {
        return line;
      }
    }
    return null;
  }

  /**
   * Add an item to the cart. If a line with the exact same product +
   * options already exists, its quantity is increased instead of
   * creating a duplicate line.
   */
  function addToCart(item) {
    var cart = readCart();
    var existing = findMatchingLine(cart, item);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push({
        lineId: makeLineId(),
        productId: item.productId,
        productLanguage: item.productLanguage,
        personalized: !!item.personalized,
        childName: item.personalized ? item.childName || "" : "",
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        currency: item.currency,
      });
    }
    writeCart(cart);
    return cart;
  }

  function updateQuantity(lineId, quantity) {
    var cart = readCart();
    var next = [];
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].lineId === lineId) {
        if (quantity > 0) {
          cart[i].quantity = quantity;
          next.push(cart[i]);
        }
        // quantity <= 0 removes the line
      } else {
        next.push(cart[i]);
      }
    }
    writeCart(next);
    return next;
  }

  function removeLine(lineId) {
    var cart = readCart().filter(function (line) {
      return line.lineId !== lineId;
    });
    writeCart(cart);
    return cart;
  }

  function clearCart() {
    writeCart([]);
  }

  function cartCount(cart) {
    var list = cart || readCart();
    var total = 0;
    for (var i = 0; i < list.length; i++) total += list[i].quantity;
    return total;
  }

  function cartTotal(cart) {
    var list = cart || readCart();
    var total = 0;
    for (var i = 0; i < list.length; i++) total += list[i].quantity * list[i].unitPrice;
    return total;
  }

  /**
   * Recomputes "unitPrice"/"currency" on every line, using whatever
   * "priceForLine(line)" returns for it — this is how a language (and so
   * a currency) switch also re-prices whatever is already in the cart,
   * instead of leaving stale amounts behind in the old currency. cart.js
   * itself has no idea what a "product" or a "currency" is; js/app.js
   * passes in the actual lookup (see repriceCartToCurrentCurrency there).
   *
   * priceForLine(line) returns { amount, currency }, or null/undefined to
   * leave that one line exactly as it is (e.g. its product no longer
   * exists — nothing sensible to re-price it from).
   */
  function reprice(priceForLine) {
    var cart = readCart();
    var changed = false;
    for (var i = 0; i < cart.length; i++) {
      var priced = priceForLine(cart[i]);
      if (!priced) continue;
      if (cart[i].unitPrice !== priced.amount || cart[i].currency !== priced.currency) {
        cart[i].unitPrice = priced.amount;
        cart[i].currency = priced.currency;
        changed = true;
      }
    }
    if (changed) writeCart(cart);
    return cart;
  }

  /**
   * Runs the checkout for a validated order.
   * Online payment is not connected yet, so this does not charge anyone,
   * does not save the order anywhere, and does NOT clear the cart or the
   * order form — the visitor just sees a message that online ordering is
   * coming soon, and can safely try again later without re-typing
   * anything or losing their cart.
   *
   * order = { fullName, email, phone, address, city, postalCode, country,
   *           comment, cart, total }
   */
  function startCheckout(order) {
    // TODO: connect payment provider here (e.g. redirect to a payment
    // page or call a payment API) once the shop is ready to take real
    // payments. Once that's wired up, this is also the place to actually
    // record/send the order and to clear the cart on success.
    return { ok: true };
  }

  window.BD_CART = {
    read: readCart,
    add: addToCart,
    updateQuantity: updateQuantity,
    removeLine: removeLine,
    clear: clearCart,
    count: cartCount,
    total: cartTotal,
    reprice: reprice,
    startCheckout: startCheckout,
  };
})();
