/*
 * Barn Dom — shopping cart logic
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
 *   productId: "vb-farm-animals",
 *   productLanguage: "uk",   // language of the printed product
 *   personalized: true,      // whether a name was added to the cover
 *   childName: "Олеся",      // only meaningful when personalized
 *   quantity: 2,
 *   unitPrice: 49            // product price + personalization if any
 * }
 *
 * The SAME product with DIFFERENT chosen options becomes a separate line.
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
   * Runs the checkout for a validated order.
   * Payments are not connected yet — this only stores the order intent
   * locally, clears the cart and tells startCheckout's caller that it
   * finished so the page can show a "payment coming soon" message.
   *
   * order = { fullName, email, phone, address, comment, cart, total }
   */
  function startCheckout(order) {
    // TODO: connect payment provider here (e.g. redirect to a payment
    // page or call a payment API) once the shop is ready to take real
    // payments. For now we just record the order intent and clear the
    // cart so the visitor sees a clean confirmation.
    try {
      var pending = JSON.parse(window.localStorage.getItem("bd_last_order") || "null") || [];
      if (!Array.isArray(pending)) pending = [];
      pending.push({ order: order, createdAt: new Date().toISOString() });
      window.localStorage.setItem("bd_last_order", JSON.stringify(pending.slice(-5)));
    } catch (e) {
      /* ignore storage errors */
    }
    clearCart();
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
    startCheckout: startCheckout,
  };
})();
