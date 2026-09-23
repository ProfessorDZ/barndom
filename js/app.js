/*
 * Barndom — shared app logic
 * --------------------------------
 * Renders the header/footer/mini-cart on every page, wires up the
 * language switcher, mobile menu and search, and renders whichever page
 * is active based on document.body.dataset.page
 * ("home" | "catalog" | "product" | "cart").
 *
 * No build step, no frameworks: this file runs directly in the browser
 * once index.html/catalog.html/product.html/cart.html load it with a
 * plain <script src="js/app.js">.
 */
(function () {
  "use strict";

  var LOCALE_BY_LANG = { uk: "uk-UA", pl: "pl-PL", en: "en-GB", sv: "sv-SE" };

  // ---------- small utilities ----------

  function qs(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  function qsAll(name) {
    var raw = qs(name);
    if (!raw) return [];
    return raw
      .split(",")
      .map(function (v) {
        return v.trim();
      })
      .filter(Boolean);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function formatPrice(amount) {
    var lang = window.BD_getLang();
    var locale = LOCALE_BY_LANG[lang] || "en-GB";
    var currency = (window.BD_CONFIG && window.BD_CONFIG.currency) || "PLN";
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency: currency }).format(amount);
    } catch (e) {
      return amount + " " + currency;
    }
  }

  function shopName() {
    return (window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barndom";
  }

  function setTitle(pageTitle) {
    document.title = pageTitle + " — " + shopName();
  }

  function getProductById(id) {
    var list = window.BD_PRODUCTS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function getProductsByType(type) {
    return (window.BD_PRODUCTS || []).filter(function (p) {
      return p.type === type;
    });
  }

  function getBestsellers(limit) {
    var list = (window.BD_PRODUCTS || []).filter(function (p) {
      return p.bestseller && !isComingSoonType(p.type);
    });
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }

  function isValidType(type) {
    return (window.BD_PRODUCT_TYPES || []).some(function (t) {
      return t.id === type;
    });
  }

  // The unit-study section is still in development. Its single
  // "comingSoon: true" flag (set on its entry in window.BD_PRODUCT_TYPES,
  // in js/products.js) drives all of this: it disappears from navigation
  // and from bestsellers/search/related, and its catalog page shows a
  // friendly "coming soon" message instead of a product grid. Flip that
  // one flag back to false/remove it once the section is ready.
  function isComingSoonType(typeId) {
    var type = (window.BD_PRODUCT_TYPES || []).filter(function (t) {
      return t.id === typeId;
    })[0];
    return !!(type && type.comingSoon);
  }

  function localizedText(field) {
    var lang = window.BD_getLang();
    return (field && (field[lang] || field.uk)) || "";
  }

  function getProductImages(product) {
    if (product.images && product.images.length) return product.images;
    return [product.image];
  }

  function el(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  }

  function orderedTypes() {
    // velcro-books is the shop's flagship product, so it always leads.
    var types = (window.BD_PRODUCT_TYPES || []).slice();
    types.sort(function (a, b) {
      if (a.id === "velcro-books") return -1;
      if (b.id === "velcro-books") return 1;
      return 0;
    });
    return types;
  }

  // ---------- inline line icons ----------

  var ICONS = {
    handmade:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11V7a2 2 0 0 1 4 0"></path><path d="M11 11V5.5a2 2 0 0 1 4 0V11"></path><path d="M15 11V7a2 2 0 0 1 4 0v7c0 3.3-2.7 6-6 6h-2c-2 0-3.2-.6-4.4-1.9l-3.3-3.6a1.5 1.5 0 0 1 2.1-2.1L7 14"></path></svg>',
    shield:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg>',
    tag: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 12.3 12.7 20a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7V4.5A1.5 1.5 0 0 1 4.5 3h6.8c.3 0 .5.1.7.3l8.6 8.6a1 1 0 0 1 0 1.4Z"></path><circle cx="8" cy="8" r="1.5"></circle></svg>',
    truck:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7h11v9H2z"></path><path d="M13 10h4l4 3.5V16h-8z"></path><circle cx="6.5" cy="18" r="1.7"></circle><circle cx="17" cy="18" r="1.7"></circle></svg>',
    check:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>',
    lock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>',
    clock:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3.5 2"></path></svg>',
    search:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>',
    cart: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    chevronDown:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
    grid: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.2" cy="6.8" r="1"></circle></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M15 8h-2a2 2 0 0 0-2 2v10M9 13h5"></path><circle cx="12" cy="12" r="9"></circle></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5"></path><path d="M14 4c.5 2.2 2 3.6 4 4"></path></svg>',
  };

  // ---------- overlay panel helper (mobile menu / drawers) ----------

  function makeOverlay(overlayEl, panelEl) {
    var lastFocused = null;

    function getFocusable() {
      return Array.prototype.slice.call(
        panelEl.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );
    }

    function onKeydown(evt) {
      if (evt.key === "Escape") {
        evt.preventDefault();
        close();
        return;
      }
      if (evt.key === "Tab") {
        var focusable = getFocusable();
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (evt.shiftKey && document.activeElement === first) {
          evt.preventDefault();
          last.focus();
        } else if (!evt.shiftKey && document.activeElement === last) {
          evt.preventDefault();
          first.focus();
        }
      }
    }

    function open() {
      lastFocused = document.activeElement;
      overlayEl.classList.add("is-open");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeydown);
      var focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
    }

    function close() {
      overlayEl.classList.remove("is-open");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    overlayEl.addEventListener("click", function (evt) {
      if (evt.target === overlayEl) close();
    });

    return { open: open, close: close };
  }

  // ---------- toast (small non-blocking confirmations) ----------

  function showToast(message) {
    var existing = document.getElementById("bd-toast");
    if (existing) existing.parentNode.removeChild(existing);
    var toast = el(
      '<div id="bd-toast" class="bd-toast" role="status" aria-live="polite">' + escapeHtml(message) + "</div>"
    );
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2600);
  }

  // ---------- mini-cart drawer ----------

  var miniCartOverlay = null;

  function miniCartLineHtml(line, product) {
    var metaBits = [];
    if (line.productLanguage) metaBits.push(window.BD_T("langName." + line.productLanguage));
    if (line.personalized) metaBits.push(window.BD_T("cart.tableChildName") + ": " + line.childName);
    return (
      '<div class="mini-cart-line" data-line-id="' +
      line.lineId +
      '">' +
      '<img class="mini-cart-line__image" src="' +
      (product.thumb || product.image) +
      '" alt="" width="56" height="56" loading="lazy" decoding="async">' +
      '<div class="mini-cart-line__body">' +
      '<div class="mini-cart-line__row">' +
      '<p class="mini-cart-line__name">' +
      escapeHtml(localizedText(product.name)) +
      "</p>" +
      '<button type="button" class="mini-cart-line__remove" aria-label="' +
      escapeHtml(window.BD_T("cart.removeAria")) +
      '">&times;</button>' +
      "</div>" +
      (metaBits.length ? '<p class="mini-cart-line__meta">' + escapeHtml(metaBits.join(" · ")) + "</p>" : "") +
      '<div class="mini-cart-line__foot">' +
      '<div class="quantity-stepper mini-cart-line__qty">' +
      '<button type="button" class="mini-cart-qty-dec" aria-label="' +
      escapeHtml(window.BD_T("cart.decreaseAria")) +
      '">&minus;</button>' +
      '<input type="number" class="mini-cart-qty-input" value="' +
      line.quantity +
      '" min="1" max="99" inputmode="numeric" aria-label="' +
      escapeHtml(window.BD_T("cart.tableQuantity")) +
      '">' +
      '<button type="button" class="mini-cart-qty-inc" aria-label="' +
      escapeHtml(window.BD_T("cart.increaseAria")) +
      '">+</button>' +
      "</div>" +
      '<p class="mini-cart-line__price">' +
      formatPrice(line.unitPrice * line.quantity) +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  /**
   * Moves focus to something sensible after a mini-cart line was added,
   * changed or removed via re-render (renderMiniCart replaces the whole
   * body/foot markup each time, so whatever control was clicked is a
   * detached node afterwards — this picks a live replacement instead of
   * letting focus silently fall back to <body>).
   *
   * focusInfo (optional):
   *   { lineId, selector }        — quantity was changed, refocus the same
   *                                  control on the same line if it's still there
   *   { removed: true, index }    — a line was removed; focus the remove
   *                                  button of the line that is now at that
   *                                  index, or the "continue shopping"
   *                                  button when the cart is now empty
   */
  function focusMiniCart(focusInfo, cart) {
    if (!focusInfo) return;
    var body = document.getElementById("bd-minicart-body");
    var foot = document.getElementById("bd-minicart-foot");
    if (!body || !foot) return;

    if (focusInfo.lineId && !focusInfo.removed) {
      var sameControl = body.querySelector('.mini-cart-line[data-line-id="' + focusInfo.lineId + '"] ' + focusInfo.selector);
      if (sameControl) {
        sameControl.focus();
        return;
      }
    }

    if (focusInfo.removed) {
      if (!cart.length) {
        var continueBtn = foot.querySelector("[data-drawer-close]");
        if (continueBtn) {
          continueBtn.focus();
          return;
        }
      } else {
        var lines = body.querySelectorAll(".mini-cart-line");
        var idx = Math.min(typeof focusInfo.index === "number" ? focusInfo.index : 0, lines.length - 1);
        var target = lines[idx] && lines[idx].querySelector(".mini-cart-line__remove");
        if (target) {
          target.focus();
          return;
        }
      }
    }

    // Fallback: keep focus inside the dialog rather than losing it.
    var closeBtn = document.getElementById("bd-minicart-close");
    if (closeBtn) closeBtn.focus();
  }

  function wireMiniCartLine(lineEl) {
    var lineId = lineEl.getAttribute("data-line-id");
    var qtyInput = lineEl.querySelector(".mini-cart-qty-input");

    lineEl.querySelector(".mini-cart-qty-dec").addEventListener("click", function () {
      var next = (parseInt(qtyInput.value, 10) || 1) - 1;
      var index = Array.prototype.indexOf.call(lineEl.parentElement.children, lineEl);
      window.BD_CART.updateQuantity(lineId, next);
      updateCartCount();
      if (next <= 0) {
        renderMiniCart({ removed: true, index: index });
      } else {
        renderMiniCart({ lineId: lineId, selector: ".mini-cart-qty-dec" });
      }
    });
    lineEl.querySelector(".mini-cart-qty-inc").addEventListener("click", function () {
      var next = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
      window.BD_CART.updateQuantity(lineId, next);
      updateCartCount();
      renderMiniCart({ lineId: lineId, selector: ".mini-cart-qty-inc" });
    });
    qtyInput.addEventListener("change", function () {
      var next = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
      window.BD_CART.updateQuantity(lineId, next);
      updateCartCount();
      renderMiniCart({ lineId: lineId, selector: ".mini-cart-qty-input" });
    });
    lineEl.querySelector(".mini-cart-line__remove").addEventListener("click", function () {
      var index = Array.prototype.indexOf.call(lineEl.parentElement.children, lineEl);
      window.BD_CART.removeLine(lineId);
      updateCartCount();
      renderMiniCart({ removed: true, index: index });
    });
  }

  function renderMiniCart(focusInfo) {
    var body = document.getElementById("bd-minicart-body");
    var foot = document.getElementById("bd-minicart-foot");
    if (!body || !foot) return;
    var cart = window.BD_CART.read();

    if (!cart.length) {
      body.innerHTML =
        '<div class="mini-cart__empty">' +
        '<img src="assets/brand/astronaut-star-tight.webp" alt="" width="88" height="119" style="object-fit: contain;">' +
        "<p>" +
        escapeHtml(window.BD_T("miniCart.empty")) +
        "</p>" +
        "</div>";
      foot.innerHTML =
        '<div class="mini-cart__actions">' +
        '<button type="button" class="btn btn--primary btn--large" data-drawer-close>' +
        escapeHtml(window.BD_T("miniCart.continueShopping")) +
        "</button>" +
        "</div>";
    } else {
      body.innerHTML = cart
        .map(function (line) {
          var product = getProductById(line.productId);
          return product ? miniCartLineHtml(line, product) : "";
        })
        .join("");
      var total = window.BD_CART.total(cart);
      foot.innerHTML =
        '<div class="mini-cart__subtotal"><span>' +
        escapeHtml(window.BD_T("miniCart.subtotal")) +
        "</span><span>" +
        formatPrice(total) +
        "</span></div>" +
        '<div class="mini-cart__actions">' +
        '<a class="btn btn--primary btn--large" href="cart.html">' +
        escapeHtml(window.BD_T("miniCart.goToCart")) +
        "</a>" +
        '<button type="button" class="btn btn--secondary" data-drawer-close>' +
        escapeHtml(window.BD_T("miniCart.continueShopping")) +
        "</button>" +
        "</div>";
    }

    Array.prototype.forEach.call(body.querySelectorAll("[data-drawer-close]"), function (btn) {
      btn.addEventListener("click", function () {
        if (miniCartOverlay) miniCartOverlay.close();
      });
    });
    Array.prototype.forEach.call(foot.querySelectorAll("[data-drawer-close]"), function (btn) {
      btn.addEventListener("click", function () {
        if (miniCartOverlay) miniCartOverlay.close();
      });
    });
    Array.prototype.forEach.call(body.querySelectorAll(".mini-cart-line"), wireMiniCartLine);

    focusMiniCart(focusInfo, cart);
  }

  function openMiniCart() {
    renderMiniCart();
    if (miniCartOverlay) miniCartOverlay.open();
  }

  function renderMiniCartShell() {
    if (document.getElementById("bd-minicart-overlay")) return;
    var shell = el(
      '<div class="drawer-overlay" id="bd-minicart-overlay">' +
      '<aside class="mini-cart" role="dialog" aria-modal="true" aria-label="' +
      escapeHtml(window.BD_T("miniCart.title")) +
      '">' +
      '<div class="mini-cart__head">' +
      "<h2>" +
      escapeHtml(window.BD_T("miniCart.title")) +
      "</h2>" +
      '<button type="button" class="mini-cart__close" id="bd-minicart-close" aria-label="' +
      escapeHtml(window.BD_T("common.close")) +
      '">&times;</button>' +
      "</div>" +
      '<div class="mini-cart__body" id="bd-minicart-body"></div>' +
      '<div class="mini-cart__foot" id="bd-minicart-foot"></div>' +
      "</aside>" +
      "</div>"
    );
    document.body.appendChild(shell);
    var overlayEl = document.getElementById("bd-minicart-overlay");
    var panelEl = overlayEl.querySelector(".mini-cart");
    miniCartOverlay = makeOverlay(overlayEl, panelEl);
    document.getElementById("bd-minicart-close").addEventListener("click", function () {
      miniCartOverlay.close();
    });
  }

  // ---------- header / footer ----------

  // The unit-study section (comingSoon: true) is left out of every nav
  // menu — it isn't ready yet, so there's nothing useful to click through
  // to. It still gets its own row (as plain text) in the footer.
  function navTypes() {
    return orderedTypes().filter(function (type) {
      return !isComingSoonType(type.id);
    });
  }

  function typesForDropdown() {
    return navTypes()
      .map(function (type) {
        return (
          '<a class="categories-dropdown__link" href="catalog.html?type=' +
          encodeURIComponent(type.id) +
          '">' +
          escapeHtml(window.BD_T("type." + type.id)) +
          "</a>"
        );
      })
      .join("");
  }

  function renderAnnouncementBar() {
    var mount = document.getElementById("bd-announcement");
    if (!mount) return;
    mount.className = "announcement-bar";
    var key = (window.BD_CONFIG && window.BD_CONFIG.announcementKey) || "announcement.text";
    mount.innerHTML = '<div class="container"><p class="announcement-bar__inner">' + escapeHtml(window.BD_T(key)) + "</p></div>";
  }

  function searchFormHtml(idSuffix) {
    return (
      '<form class="header-search-form" data-search-form role="search">' +
      '<label class="visually-hidden" for="bd-search-' +
      idSuffix +
      '">' +
      escapeHtml(window.BD_T("header.searchAria")) +
      "</label>" +
      '<input type="search" id="bd-search-' +
      idSuffix +
      '" name="q" placeholder="' +
      escapeHtml(window.BD_T("header.searchPlaceholder")) +
      '">' +
      '<button type="submit" aria-label="' +
      escapeHtml(window.BD_T("header.searchSubmitAria")) +
      '">' +
      ICONS.search +
      "</button>" +
      "</form>"
    );
  }

  function renderHeader() {
    var mount = document.getElementById("bd-header");
    if (!mount) return;
    var lang = window.BD_getLang();
    var cartCount = window.BD_CART ? window.BD_CART.count() : 0;

    var langOptionsDesktop = (window.BD_LANGS || [])
      .map(function (l) {
        return (
          '<button type="button" class="lang-dropdown__option' +
          (l.code === lang ? " is-active" : "") +
          '" data-lang="' +
          l.code +
          '">' +
          '<span class="lang-dropdown__code">' +
          l.code.toUpperCase() +
          "</span><span>" +
          escapeHtml(l.nativeName) +
          "</span></button>"
        );
      })
      .join("");

    var langOptionsMobile = (window.BD_LANGS || [])
      .map(function (l) {
        return (
          '<button type="button" class="lang-dropdown__option' +
          (l.code === lang ? " is-active" : "") +
          '" data-lang="' +
          l.code +
          '">' +
          '<span class="lang-dropdown__code">' +
          l.code.toUpperCase() +
          "</span><span>" +
          escapeHtml(l.nativeName) +
          "</span></button>"
        );
      })
      .join("");

    var mobileTypeLinks = navTypes()
      .map(function (type) {
        return '<a href="catalog.html?type=' + encodeURIComponent(type.id) + '">' + escapeHtml(window.BD_T("type." + type.id)) + "</a>";
      })
      .join("");

    // The home page IS the 6 big tiles, so it skips the second "small
    // category menu" row entirely — other pages keep a simple one, as
    // requested. The search box is always small in the header; on phones
    // it moves into the slide-in menu instead of a second header row.
    var isHome = document.body.getAttribute("data-page") === "home";
    var subnavHtml = isHome
      ? ""
      : '<nav class="subnav container" aria-label="' +
        escapeHtml(window.BD_T("nav.menu")) +
        '">' +
        '<div class="categories-dropdown" id="bd-categories-dropdown">' +
        '<button type="button" class="categories-dropdown__toggle" id="bd-categories-toggle" aria-haspopup="true" aria-expanded="false">' +
        ICONS.grid +
        escapeHtml(window.BD_T("header.categories")) +
        ICONS.chevronDown +
        "</button>" +
        '<div class="categories-dropdown__panel" role="menu">' +
        typesForDropdown() +
        "</div>" +
        "</div>" +
        '<a class="subnav__link" href="cart.html">' +
        escapeHtml(window.BD_T("nav.cart")) +
        "</a>" +
        "</nav>";

    mount.innerHTML =
      '<div class="container header-row">' +
      '<a class="brand" href="index.html">' +
      '<img class="brand__logo" src="assets/brand/logo-horizontal-tight.webp" alt="' +
      escapeHtml(shopName()) +
      '" width="135" height="40">' +
      "</a>" +
      '<div class="header-search header-search--desktop">' +
      searchFormHtml("desktop") +
      "</div>" +
      '<div class="header-actions">' +
      '<div class="lang-dropdown" id="bd-lang-dropdown">' +
      '<button type="button" class="lang-dropdown__toggle" id="bd-lang-toggle" aria-haspopup="true" aria-expanded="false" aria-label="' +
      escapeHtml(window.BD_T("lang.switcherLabel")) +
      '">' +
      lang.toUpperCase() +
      ICONS.chevronDown +
      "</button>" +
      '<div class="lang-dropdown__panel" role="menu">' +
      langOptionsDesktop +
      "</div>" +
      "</div>" +
      '<a class="cart-link" id="bd-cart-link" href="cart.html" aria-label="' +
      escapeHtml(window.BD_T("cart.itemsCountAria", { count: cartCount })) +
      '">' +
      ICONS.cart +
      '<span class="cart-count" id="bd-cart-count">' +
      cartCount +
      "</span>" +
      "</a>" +
      '<button type="button" class="menu-toggle" id="bd-menu-toggle" aria-expanded="false" aria-label="' +
      escapeHtml(window.BD_T("header.openMenu")) +
      '">' +
      '<span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      subnavHtml +
      '<div class="mobile-menu-overlay" id="bd-mobile-menu-overlay">' +
      '<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="' +
      escapeHtml(window.BD_T("nav.menu")) +
      '">' +
      '<div class="mobile-menu__top">' +
      '<button type="button" class="mobile-menu__close" id="bd-mobile-menu-close" aria-label="' +
      escapeHtml(window.BD_T("header.closeMenu")) +
      '">&times;</button>' +
      "</div>" +
      '<div class="mobile-menu__search">' +
      searchFormHtml("mobile") +
      "</div>" +
      '<div>' +
      '<p class="mobile-menu__group-title">' +
      escapeHtml(window.BD_T("header.categories")) +
      "</p>" +
      '<nav class="mobile-menu__links">' +
      mobileTypeLinks +
      '<a href="cart.html">' +
      escapeHtml(window.BD_T("nav.cart")) +
      "</a>" +
      "</nav>" +
      "</div>" +
      '<div>' +
      '<p class="mobile-menu__group-title">' +
      escapeHtml(window.BD_T("lang.switcherLabel")) +
      "</p>" +
      '<div class="lang-grid">' +
      langOptionsMobile +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    // language dropdowns (desktop toggle + mobile grid) share the same
    // click handler for setting the language.
    Array.prototype.forEach.call(mount.querySelectorAll(".lang-dropdown__option"), function (btn) {
      btn.addEventListener("click", function () {
        window.BD_setLang(btn.getAttribute("data-lang"));
        window.location.reload();
      });
    });

    // search forms (desktop + mobile) both go to the same place.
    Array.prototype.forEach.call(mount.querySelectorAll("[data-search-form]"), function (form) {
      form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        var value = form.querySelector("input[name=q]").value.trim();
        if (!value) return;
        window.location.href = "catalog.html?q=" + encodeURIComponent(value);
      });
    });

    var langDropdown = document.getElementById("bd-lang-dropdown");
    var langToggle = document.getElementById("bd-lang-toggle");
    langToggle.addEventListener("click", function (evt) {
      evt.stopPropagation();
      var open = langDropdown.classList.toggle("is-open");
      langToggle.setAttribute("aria-expanded", open ? "true" : "false");
      closeCategoriesDropdown();
    });

    // The home page has no subnav (its 6 tiles ARE the navigation), so
    // these elements only exist on other pages — guard every use.
    var categoriesDropdown = document.getElementById("bd-categories-dropdown");
    var categoriesToggle = document.getElementById("bd-categories-toggle");
    function closeCategoriesDropdown() {
      if (!categoriesDropdown || !categoriesToggle) return;
      categoriesDropdown.classList.remove("is-open");
      categoriesToggle.setAttribute("aria-expanded", "false");
    }
    function closeLangDropdown() {
      langDropdown.classList.remove("is-open");
      langToggle.setAttribute("aria-expanded", "false");
    }
    if (categoriesToggle) {
      categoriesToggle.addEventListener("click", function (evt) {
        evt.stopPropagation();
        var open = categoriesDropdown.classList.toggle("is-open");
        categoriesToggle.setAttribute("aria-expanded", open ? "true" : "false");
        closeLangDropdown();
      });
    }
    document.addEventListener("click", function () {
      closeCategoriesDropdown();
      closeLangDropdown();
    });
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        closeCategoriesDropdown();
        closeLangDropdown();
      }
    });

    var menuToggle = document.getElementById("bd-menu-toggle");
    var mobileOverlay = document.getElementById("bd-mobile-menu-overlay");
    var mobileMenuHandle = makeOverlay(mobileOverlay, mobileOverlay.querySelector(".mobile-menu"));
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      mobileMenuHandle.open();
    });
    document.getElementById("bd-mobile-menu-close").addEventListener("click", function () {
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenuHandle.close();
    });
    mobileOverlay.addEventListener("click", function (evt) {
      if (evt.target === mobileOverlay) {
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    renderMiniCartShell();
    var cartLink = document.getElementById("bd-cart-link");
    cartLink.addEventListener("click", function (evt) {
      if (document.body.getAttribute("data-page") === "cart") return;
      evt.preventDefault();
      openMiniCart();
    });
  }

  function renderFooter() {
    var mount = document.getElementById("bd-footer");
    if (!mount) return;
    var email = (window.BD_CONFIG && window.BD_CONFIG.contactEmail) || "";
    var phone = (window.BD_CONFIG && window.BD_CONFIG.contactPhone) || "";

    // Every section is listed, but a "comingSoon" one (see js/products.js)
    // is plain text with a small badge instead of a link — there is
    // nothing to click through to yet.
    var shopLinks = orderedTypes()
      .map(function (type) {
        if (isComingSoonType(type.id)) {
          return (
            '<li class="footer-comingsoon">' +
            escapeHtml(window.BD_T("type." + type.id)) +
            '<span class="footer-comingsoon__badge">' +
            escapeHtml(window.BD_T("badge.comingSoon")) +
            "</span></li>"
          );
        }
        return (
          '<li><a href="catalog.html?type=' +
          encodeURIComponent(type.id) +
          '">' +
          escapeHtml(window.BD_T("type." + type.id)) +
          "</a></li>"
        );
      })
      .join("");

    mount.innerHTML =
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-col">' +
      '<p class="footer-brand__name">' +
      '<img class="footer-brand__logo" src="assets/brand/logo-horizontal-tight.webp" alt="' +
      escapeHtml(shopName()) +
      '" width="122" height="36">' +
      "</p>" +
      '<p class="footer-brand__tagline">' +
      escapeHtml(window.BD_T("footer.tagline")) +
      "</p>" +
      '<div class="footer-social" aria-label="' +
      escapeHtml(window.BD_T("footer.socialAria")) +
      '">' +
      '<a href="#" aria-label="Instagram">' +
      ICONS.instagram +
      "</a>" +
      '<a href="#" aria-label="Facebook">' +
      ICONS.facebook +
      "</a>" +
      '<a href="#" aria-label="TikTok">' +
      ICONS.tiktok +
      "</a>" +
      "</div>" +
      "</div>" +
      '<div class="footer-col">' +
      '<p class="footer-col__title">' +
      escapeHtml(window.BD_T("footer.shopTitle")) +
      "</p>" +
      '<ul class="footer-col__links">' +
      shopLinks +
      "</ul>" +
      "</div>" +
      '<div class="footer-col">' +
      '<p class="footer-col__title">' +
      escapeHtml(window.BD_T("footer.contactTitle")) +
      "</p>" +
      '<ul class="footer-col__links">' +
      '<li><a href="mailto:' +
      encodeURIComponent(email) +
      '">' +
      escapeHtml(email) +
      "</a></li>" +
      '<li><a href="tel:' +
      escapeHtml(phone.replace(/\s+/g, "")) +
      '">' +
      escapeHtml(phone) +
      "</a></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      '<p class="footer-bottom">' +
      escapeHtml(window.BD_T("footer.rights", { year: new Date().getFullYear() })) +
      "</p>" +
      "</div>";
  }

  function updateCartCount() {
    var badge = document.getElementById("bd-cart-count");
    if (badge && window.BD_CART) badge.textContent = window.BD_CART.count();
    var cartLink = document.getElementById("bd-cart-link");
    if (cartLink && window.BD_CART) {
      cartLink.setAttribute("aria-label", window.BD_T("cart.itemsCountAria", { count: window.BD_CART.count() }));
    }
  }

  // ---------- shared: product card + type tile ----------

  function productBadgesHtml(p) {
    var badges = "";
    if (p.bestseller) badges += '<span class="badge badge--bestseller">' + escapeHtml(window.BD_T("badge.bestseller")) + "</span>";
    if (p.isNew) badges += '<span class="badge badge--new">' + escapeHtml(window.BD_T("badge.new")) + "</span>";
    return badges;
  }

  function productAgeLabel(p) {
    if (p.type !== "velcro-books" || !p.ages || !p.ages.length) return "";
    // "ageLabel" lets a product override the displayed text (e.g. show
    // "4+" for a product tagged ages: ["3"] for filtering purposes).
    // It's the same in every language, so no translation lookup here.
    if (p.ageLabel) return p.ageLabel;
    return p.ages
      .map(function (a) {
        return window.BD_T("age." + a);
      })
      .join(", ");
  }

  function productCardHtml(p) {
    var ageLabel = productAgeLabel(p);
    // Coloring-book covers are portrait photos (about 3:4), not the
    // square type icons other products use — give them a taller image
    // box so the cover isn't squeezed into a square with empty space.
    var isPortrait = p.type === "coloring";
    var cardW = 220;
    var cardH = isPortrait ? 293 : 220;
    return (
      '<article class="product-card">' +
      '<a class="product-card__image' +
      (isPortrait ? " product-card__image--portrait" : "") +
      '" href="product.html?id=' +
      encodeURIComponent(p.id) +
      '">' +
      (productBadgesHtml(p) ? '<span class="product-card__badges">' + productBadgesHtml(p) + "</span>" : "") +
      '<img src="' +
      (p.thumb || p.image) +
      '" alt="" width="' +
      cardW +
      '" height="' +
      cardH +
      '" loading="lazy" decoding="async">' +
      "</a>" +
      (ageLabel ? '<p class="product-card__age">' + escapeHtml(ageLabel) + "</p>" : "") +
      '<h3 class="product-card__name">' +
      '<a href="product.html?id=' +
      encodeURIComponent(p.id) +
      '">' +
      escapeHtml(localizedText(p.name)) +
      "</a>" +
      "</h3>" +
      '<p class="product-card__price">' +
      formatPrice(p.price) +
      "</p>" +
      '<a class="btn btn--secondary product-card__cta" href="product.html?id=' +
      encodeURIComponent(p.id) +
      '">' +
      escapeHtml(window.BD_T("catalog.viewProduct")) +
      "</a>" +
      "</article>"
    );
  }

  // One big, equal-size tile per product type — this IS the site's main
  // navigation (home page, and the "pick a category" fallback on
  // catalog.html). Five types are plain clickable links, each with its
  // own soft pastel background (from "pastel" in js/products.js); the
  // comingSoon one (unit-study) renders as a disabled, greyed-out tile
  // with a small badge instead, per its "comingSoon" flag.
  function typeTileHtml(type) {
    if (type.comingSoon) {
      return (
        '<div class="type-tile type-tile--disabled" aria-disabled="true">' +
        '<span class="type-tile__image">' +
        '<img src="' +
        type.image +
        '" alt="" width="96" height="96" loading="lazy">' +
        "</span>" +
        '<span class="type-tile__name">' +
        escapeHtml(window.BD_T("type." + type.id)) +
        "</span>" +
        '<span class="type-tile__soon">' +
        escapeHtml(window.BD_T("badge.comingSoon")) +
        "</span>" +
        "</div>"
      );
    }
    return (
      '<a class="type-tile type-tile--' +
      (type.pastel || "lilac") +
      '" href="catalog.html?type=' +
      encodeURIComponent(type.id) +
      '">' +
      '<span class="type-tile__image">' +
      '<img src="' +
      type.image +
      '" alt="" width="96" height="96" loading="lazy">' +
      "</span>" +
      '<span class="type-tile__name">' +
      escapeHtml(window.BD_T("type." + type.id)) +
      "</span>" +
      "</a>"
    );
  }

  function tileGridHtml() {
    return '<div class="tile-grid" id="bd-tiles">' + orderedTypes().map(typeTileHtml).join("") + "</div>";
  }

  function breadcrumbsHtml(items) {
    // items: [{label, href?}] — the last item has no href (current page).
    var parts = items.map(function (item, i) {
      var isLast = i === items.length - 1;
      var content = item.href && !isLast ? '<a href="' + item.href + '">' + escapeHtml(item.label) + "</a>" : '<span class="breadcrumbs__current">' + escapeHtml(item.label) + "</span>";
      return content;
    });
    return '<nav class="breadcrumbs container" aria-label="Breadcrumb">' + parts.join('<span class="breadcrumbs__sep">/</span>') + "</nav>";
  }

  // ---------- home page ----------

  // The home page is deliberately short and calm: a one-line warm greeting
  // next to a small friendly illustration, then the 6 big tiles — which
  // ARE the site's navigation. No hero banner, no benefit strip, no
  // bestsellers grid, no trust block.
  function renderHome() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    setTitle(window.BD_T("home.sectionTitle"));

    mount.innerHTML =
      '<section class="home-greeting container">' +
      '<div class="home-greeting__inner">' +
      '<div class="home-greeting__text">' +
      "<h1>" +
      escapeHtml(window.BD_T("home.heroTitle")) +
      "</h1>" +
      "<p>" +
      escapeHtml(window.BD_T("home.heroSubtitle")) +
      "</p>" +
      "</div>" +
      '<div class="home-greeting__image">' +
      '<img src="assets/brand/astronaut-hello-tight.webp" alt="" width="180" height="268" loading="lazy">' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section container">' +
      '<h2 class="section-title section-title--center">' +
      escapeHtml(window.BD_T("home.sectionTitle")) +
      "</h2>" +
      '<p class="section-lede section-lede--center">' +
      escapeHtml(window.BD_T("home.chooserSubtitle")) +
      "</p>" +
      '<div style="margin-top: 24px;">' +
      tileGridHtml() +
      "</div>" +
      "</section>";
  }

  // ---------- catalog page ----------

  var catalogState = { ages: [], categories: [], sort: "recommended" };
  var mobileFiltersOverlayHandle = null;

  function sortLabel(code) {
    var map = {
      recommended: "catalog.sortRecommended",
      "price-asc": "catalog.sortPriceAsc",
      "price-desc": "catalog.sortPriceDesc",
      "name-asc": "catalog.sortNameAsc",
    };
    return window.BD_T(map[code] || map.recommended);
  }

  function readCatalogStateFromURL() {
    var sort = qs("sort");
    return {
      ages: qsAll("age"),
      categories: qsAll("category"),
      sort: ["price-asc", "price-desc", "name-asc"].indexOf(sort) !== -1 ? sort : "recommended",
    };
  }

  function writeCatalogStateToURL() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (catalogState.ages.length) params.set("age", catalogState.ages.join(","));
      else params.delete("age");
      if (catalogState.categories.length) params.set("category", catalogState.categories.join(","));
      else params.delete("category");
      if (catalogState.sort && catalogState.sort !== "recommended") params.set("sort", catalogState.sort);
      else params.delete("sort");
      var newUrl = window.location.pathname + "?" + params.toString();
      window.history.replaceState(null, "", newUrl.replace(/\?$/, ""));
    } catch (e) {
      /* URL API unavailable — filters still work in-memory */
    }
  }

  function countFor(products, group, value) {
    return products.filter(function (p) {
      return (p[group] || []).indexOf(value) !== -1;
    }).length;
  }

  // An option with 0 matching products is hidden — unless it's the option
  // currently selected, so a shopper can still see it (and untick it). If
  // that leaves a group with fewer than 2 options, the whole group is
  // hidden (no point showing a filter with just one, always-checked box).
  function visibleFilterValues(group, values, allProductsOfType) {
    return values.filter(function (value) {
      var count = countFor(allProductsOfType, group, value);
      var checked = catalogState[group].indexOf(value) !== -1;
      return count > 0 || checked;
    });
  }

  function filterOptionHtml(group, value, allProductsOfType) {
    var count = countFor(allProductsOfType, group, value);
    var checked = catalogState[group].indexOf(value) !== -1;
    var label = window.BD_T((group === "ages" ? "age." : "category.") + value);
    return (
      '<label class="filter-option' +
      (count === 0 ? " is-zero" : "") +
      '">' +
      '<input type="checkbox" data-group="' +
      group +
      '" data-value="' +
      value +
      '"' +
      (checked ? " checked" : "") +
      ">" +
      '<span class="filter-option__label">' +
      escapeHtml(label) +
      "</span>" +
      '<span class="filter-option__count">' +
      count +
      "</span>" +
      "</label>"
    );
  }

  function filterGroupHtml(titleKey, group, values, allProductsOfType) {
    var visible = visibleFilterValues(group, values, allProductsOfType);
    if (visible.length < 2) return "";
    return (
      '<div class="filter-group">' +
      '<p class="filter-group__title">' +
      escapeHtml(window.BD_T(titleKey)) +
      "</p>" +
      '<div class="filter-option-list" data-filter-group="' +
      group +
      '">' +
      visible
        .map(function (value) {
          return filterOptionHtml(group, value, allProductsOfType);
        })
        .join("") +
      "</div>" +
      "</div>"
    );
  }

  function filtersPanelInnerHtml(allProductsOfType) {
    return (
      filterGroupHtml("catalog.filtersAge", "ages", window.BD_AGES || [], allProductsOfType) +
      filterGroupHtml("catalog.filtersCategory", "categories", window.BD_CATEGORIES || [], allProductsOfType)
    );
  }

  function activeFilterCount() {
    return catalogState.ages.length + catalogState.categories.length;
  }

  function filteredProducts(type) {
    var products = getProductsByType(type);
    if (type === "velcro-books") {
      if (catalogState.ages.length) {
        products = products.filter(function (p) {
          return p.ages.some(function (a) {
            return catalogState.ages.indexOf(a) !== -1;
          });
        });
      }
      if (catalogState.categories.length) {
        products = products.filter(function (p) {
          return p.categories.some(function (c) {
            return catalogState.categories.indexOf(c) !== -1;
          });
        });
      }
    }
    return sortProducts(products);
  }

  function sortProducts(products) {
    var sorted = products.slice();
    if (catalogState.sort === "price-asc") sorted.sort(function (a, b) { return a.price - b.price; });
    else if (catalogState.sort === "price-desc") sorted.sort(function (a, b) { return b.price - a.price; });
    else if (catalogState.sort === "name-asc") {
      sorted.sort(function (a, b) {
        return localizedText(a.name).localeCompare(localizedText(b.name));
      });
    }
    return sorted;
  }

  function syncFilterCheckboxes() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-group]"), function (input) {
      var group = input.getAttribute("data-group");
      var value = input.getAttribute("data-value");
      input.checked = catalogState[group].indexOf(value) !== -1;
    });
  }

  function renderActiveFilterChips(type) {
    var mount = document.getElementById("bd-active-filters");
    if (!mount) return;
    if (type !== "velcro-books" || !activeFilterCount()) {
      mount.innerHTML = "";
      return;
    }
    var chips = [];
    catalogState.ages.forEach(function (a) {
      chips.push({ group: "ages", value: a, label: window.BD_T("age." + a) });
    });
    catalogState.categories.forEach(function (c) {
      chips.push({ group: "categories", value: c, label: window.BD_T("category." + c) });
    });
    mount.innerHTML =
      '<div class="active-filters">' +
      chips
        .map(function (chip) {
          return (
            '<button type="button" class="filter-chip" data-remove-group="' +
            chip.group +
            '" data-remove-value="' +
            chip.value +
            '" aria-label="' +
            escapeHtml(window.BD_T("catalog.removeFilterAria", { label: chip.label })) +
            '">' +
            escapeHtml(chip.label) +
            '<span class="filter-chip__x" aria-hidden="true">&times;</span>' +
            "</button>"
          );
        })
        .join("") +
      '<button type="button" class="clear-all-link" id="bd-clear-all">' +
      escapeHtml(window.BD_T("catalog.clearAll")) +
      "</button>" +
      "</div>";

    Array.prototype.forEach.call(mount.querySelectorAll(".filter-chip"), function (chip) {
      chip.addEventListener("click", function () {
        var group = chip.getAttribute("data-remove-group");
        var value = chip.getAttribute("data-remove-value");
        var idx = catalogState[group].indexOf(value);
        if (idx !== -1) catalogState[group].splice(idx, 1);
        onFiltersChanged(type);
      });
    });
    var clearAll = document.getElementById("bd-clear-all");
    if (clearAll) {
      clearAll.addEventListener("click", function () {
        catalogState.ages = [];
        catalogState.categories = [];
        onFiltersChanged(type);
      });
    }
  }

  function updateMobileFilterButton() {
    var showBtn = document.getElementById("bd-mobile-filters-show");
    var toggleCount = document.getElementById("bd-filters-toggle-count");
    var type = qs("type");
    if (showBtn) {
      var count = filteredProducts(type).length;
      showBtn.textContent = window.BD_T("catalog.showResults", { count: count });
    }
    if (toggleCount) {
      var active = activeFilterCount();
      toggleCount.textContent = active;
      toggleCount.hidden = active === 0;
    }
  }

  function onFiltersChanged(type) {
    syncFilterCheckboxes();
    writeCatalogStateToURL();
    renderActiveFilterChips(type);
    updateMobileFilterButton();
    renderProductGrid(type);
  }

  function wireFilterInputs(root, type) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-group]"), function (input) {
      input.addEventListener("change", function () {
        var group = input.getAttribute("data-group");
        var value = input.getAttribute("data-value");
        var list = catalogState[group];
        var idx = list.indexOf(value);
        if (input.checked && idx === -1) list.push(value);
        else if (!input.checked && idx !== -1) list.splice(idx, 1);
        onFiltersChanged(type);
      });
    });
  }

  function renderCatalog() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    var type = qs("type");
    var query = qs("q");

    if (query) {
      renderSearchResults(query);
      return;
    }

    if (!isValidType(type)) {
      setTitle(window.BD_T("catalog.allTitle"));
      mount.innerHTML =
        breadcrumbsHtml([{ label: window.BD_T("catalog.breadcrumbHome"), href: "index.html" }, { label: window.BD_T("catalog.allTitle") }]) +
        '<section class="section container">' +
        '<h1 class="section-title">' +
        escapeHtml(window.BD_T("home.sectionTitle")) +
        "</h1>" +
        '<div>' +
        tileGridHtml() +
        "</div>" +
        "</section>";
      return;
    }

    // The type exists but isn't launched yet (see "comingSoon" on it in
    // js/products.js) — show a friendly message instead of an empty/odd
    // product grid, whether someone got here from a link or typed the URL.
    if (isComingSoonType(type)) {
      setTitle(window.BD_T("catalog.comingSoonTitle"));
      mount.innerHTML =
        breadcrumbsHtml([{ label: window.BD_T("catalog.breadcrumbHome"), href: "index.html" }, { label: window.BD_T("catalog.comingSoonTitle") }]) +
        '<section class="coming-soon container">' +
        '<img src="assets/brand/rocket-tight.webp" alt="" width="94" height="150" loading="lazy">' +
        "<h1>" +
        escapeHtml(window.BD_T("catalog.comingSoonTitle")) +
        "</h1>" +
        "<p>" +
        escapeHtml(window.BD_T("catalog.comingSoonText")) +
        "</p>" +
        '<a class="btn btn--primary" href="index.html">' +
        escapeHtml(window.BD_T("catalog.comingSoonCta")) +
        "</a>" +
        "</section>";
      return;
    }

    setTitle(window.BD_T("type." + type));
    catalogState = readCatalogStateFromURL();
    var allOfType = getProductsByType(type);
    // Options with 0 matches are hidden (see filterGroupHtml), and a group
    // left with fewer than 2 options is hidden too — so with very few
    // products, filtersHtml can end up empty. When it does, there is
    // nothing to filter by, so skip the whole filters UI (sidebar toggle,
    // panel and mobile overlay) instead of showing an empty box.
    var filtersHtml = type === "velcro-books" ? filtersPanelInnerHtml(allOfType) : "";
    var showFilters = filtersHtml !== "";

    var sortSelectHtml =
      '<label class="visually-hidden" for="bd-sort">' +
      escapeHtml(window.BD_T("catalog.sortLabel")) +
      "</label>" +
      '<select class="sort-select" id="bd-sort">' +
      ["recommended", "price-asc", "price-desc", "name-asc"]
        .map(function (code) {
          return '<option value="' + code + '"' + (catalogState.sort === code ? " selected" : "") + ">" + escapeHtml(sortLabel(code)) + "</option>";
        })
        .join("") +
      "</select>";

    var sidebarHtml = showFilters
      ? '<aside class="catalog__sidebar" aria-label="' +
        escapeHtml(window.BD_T("catalog.filtersTitle")) +
        '">' +
        '<div class="filters__panel-inner" id="bd-desktop-filters">' +
        filtersHtml +
        "</div>" +
        "</aside>"
      : "";

    var mobileFiltersToggleHtml = showFilters
      ? '<button type="button" class="filters__toggle" id="bd-mobile-filters-open">' +
        escapeHtml(window.BD_T("catalog.filtersToggle")) +
        ' <span class="filters__count" id="bd-filters-toggle-count" hidden>0</span>' +
        "</button>"
      : "";

    mount.innerHTML =
      breadcrumbsHtml([
        { label: window.BD_T("catalog.breadcrumbHome"), href: "index.html" },
        { label: window.BD_T("type." + type) },
      ]) +
      '<section class="catalog container">' +
      '<div class="catalog__header">' +
      "<h1>" +
      escapeHtml(window.BD_T("type." + type)) +
      "</h1>" +
      "</div>" +
      '<div class="catalog__layout">' +
      sidebarHtml +
      '<div class="catalog__main">' +
      mobileFiltersToggleHtml +
      '<div id="bd-active-filters"></div>' +
      '<div class="catalog__meta-row">' +
      '<p class="catalog__count" id="bd-catalog-count"></p>' +
      '<div class="catalog__controls">' +
      sortSelectHtml +
      "</div>" +
      "</div>" +
      '<div class="product-grid' +
      (showFilters ? " product-grid--sidebar" : "") +
      '" id="bd-product-grid"></div>' +
      "</div>" +
      "</div>" +
      "</section>" +
      (showFilters
        ? '<div class="filters-mobile-overlay" id="bd-filters-mobile-overlay">' +
          '<div class="filters-mobile-panel" role="dialog" aria-modal="true" aria-label="' +
          escapeHtml(window.BD_T("catalog.filtersTitle")) +
          '">' +
          '<div class="filters-mobile-panel__head">' +
          "<h2>" +
          escapeHtml(window.BD_T("catalog.filtersTitle")) +
          "</h2>" +
          '<button type="button" class="mini-cart__close" id="bd-mobile-filters-close" aria-label="' +
          escapeHtml(window.BD_T("common.close")) +
          '">&times;</button>' +
          "</div>" +
          '<div class="filters-mobile-panel__body" id="bd-mobile-filters-body">' +
          filtersHtml +
          "</div>" +
          '<div class="filters-mobile-panel__foot">' +
          '<button type="button" class="btn btn--secondary" id="bd-mobile-filters-clear">' +
          escapeHtml(window.BD_T("catalog.clearFilters")) +
          "</button>" +
          '<button type="button" class="btn btn--primary" id="bd-mobile-filters-show"></button>' +
          "</div>" +
          "</div>" +
          "</div>"
        : "");

    if (showFilters) {
      wireFilterInputs(document.getElementById("bd-desktop-filters"), type);
      wireFilterInputs(document.getElementById("bd-mobile-filters-body"), type);

      var openBtn = document.getElementById("bd-mobile-filters-open");
      var closeBtn = document.getElementById("bd-mobile-filters-close");
      var showBtn = document.getElementById("bd-mobile-filters-show");
      var clearBtn = document.getElementById("bd-mobile-filters-clear");
      var overlayEl = document.getElementById("bd-filters-mobile-overlay");
      mobileFiltersOverlayHandle = makeOverlay(overlayEl, overlayEl.querySelector(".filters-mobile-panel"));

      openBtn.addEventListener("click", function () {
        mobileFiltersOverlayHandle.open();
      });
      closeBtn.addEventListener("click", function () {
        mobileFiltersOverlayHandle.close();
      });
      showBtn.addEventListener("click", function () {
        mobileFiltersOverlayHandle.close();
      });
      clearBtn.addEventListener("click", function () {
        catalogState.ages = [];
        catalogState.categories = [];
        onFiltersChanged(type);
      });

      renderActiveFilterChips(type);
      updateMobileFilterButton();
    }

    document.getElementById("bd-sort").addEventListener("change", function (evt) {
      catalogState.sort = evt.target.value;
      writeCatalogStateToURL();
      renderProductGrid(type);
    });

    renderProductGrid(type);
  }

  function renderProductGrid(type) {
    var grid = document.getElementById("bd-product-grid");
    var countEl = document.getElementById("bd-catalog-count");
    if (!grid) return;

    var products = filteredProducts(type);
    if (countEl) countEl.textContent = window.BD_T("catalog.count", { count: products.length });
    updateMobileFilterButton();

    if (!products.length) {
      grid.innerHTML = '<p class="catalog__empty">' + escapeHtml(window.BD_T("catalog.empty")) + "</p>";
      return;
    }

    grid.innerHTML = products.map(productCardHtml).join("");
  }

  function renderSearchResults(query) {
    var mount = document.getElementById("bd-page");
    setTitle(window.BD_T("catalog.searchTitle"));
    var lang = window.BD_getLang();
    var needle = query.toLowerCase();
    var matches = (window.BD_PRODUCTS || []).filter(function (p) {
      if (isComingSoonType(p.type)) return false;
      var name = (p.name[lang] || p.name.uk || "").toLowerCase();
      var desc = (p.shortDescription[lang] || p.shortDescription.uk || "").toLowerCase();
      return name.indexOf(needle) !== -1 || desc.indexOf(needle) !== -1;
    });
    matches = sortProducts(matches);

    mount.innerHTML =
      breadcrumbsHtml([{ label: window.BD_T("catalog.breadcrumbHome"), href: "index.html" }, { label: window.BD_T("catalog.searchTitle") }]) +
      '<section class="catalog container">' +
      "<h1>" +
      escapeHtml(window.BD_T("catalog.searchFor", { query: query })) +
      "</h1>" +
      '<p class="catalog__count">' +
      escapeHtml(window.BD_T("catalog.count", { count: matches.length })) +
      "</p>" +
      (matches.length
        ? '<div class="product-grid">' + matches.map(productCardHtml).join("") + "</div>"
        : '<p class="catalog__empty">' + escapeHtml(window.BD_T("catalog.empty")) + "</p>") +
      "</section>";
  }

  // ---------- product page ----------

  var currentProductState = null;

  function computeUnitPrice(product) {
    var personalizationPrice = (window.BD_CONFIG && window.BD_CONFIG.personalizationPrice) || 0;
    return product.price + (currentProductState.personalized ? personalizationPrice : 0);
  }

  function updateProductPrices(product) {
    var unit = computeUnitPrice(product);
    var qty = currentProductState.quantity;
    var priceEls = document.querySelectorAll("[data-live-price]");
    Array.prototype.forEach.call(priceEls, function (elx) {
      elx.textContent = formatPrice(unit * qty);
    });
    var stickyPrice = document.getElementById("bd-sticky-price");
    if (stickyPrice) stickyPrice.textContent = formatPrice(unit * qty);
  }

  function accordionHtml(product) {
    var ageLabel = productAgeLabel(product);
    // "ageNote" is an optional, localized bit of extra text shown right
    // after the age-filter label in the Details tab (e.g. a product tagged
    // "3+" for filtering purposes but whose box actually recommends 4+).
    // See js/products.js for an example. Skipped when "ageLabel" already
    // overrides the displayed text (e.g. "4+") — appending the note there
    // would just repeat the same age back ("4+ (recommended from 4 years)").
    if (ageLabel && product.ageNote && !product.ageLabel) {
      ageLabel += " (" + localizedText(product.ageNote) + ")";
    }
    var categoryLabels = (product.categories || [])
      .map(function (c) {
        return window.BD_T("category." + c);
      })
      .join(", ");
    var languageLabels = (product.availableLanguages || [])
      .map(function (c) {
        return window.BD_T("langName." + c);
      })
      .join(", ");

    var items = [
      { title: window.BD_T("product.tabDescription"), body: "<p>" + escapeHtml(localizedText(product.description)) + "</p>", open: true },
    ];

    // Only show the "Details" tab when there's actually something to put
    // in it — a product with no ages, no categories and no language
    // choice (like the coloring books) would otherwise show an empty box.
    if (ageLabel || categoryLabels || languageLabels) {
      items.push({
        title: window.BD_T("product.tabDetails"),
        body:
          "<dl>" +
          (ageLabel ? "<dt>" + escapeHtml(window.BD_T("product.detailsAgeLabel")) + "</dt><dd>" + escapeHtml(ageLabel) + "</dd>" : "") +
          (categoryLabels
            ? "<dt>" + escapeHtml(window.BD_T("product.detailsCategoriesLabel")) + "</dt><dd>" + escapeHtml(categoryLabels) + "</dd>"
            : "") +
          (languageLabels
            ? "<dt>" + escapeHtml(window.BD_T("product.detailsLanguagesLabel")) + "</dt><dd>" + escapeHtml(languageLabels) + "</dd>"
            : "") +
          "</dl>",
        open: false,
      });
    }

    items.push({ title: window.BD_T("product.tabDelivery"), body: "<p>" + escapeHtml(window.BD_T("product.deliveryText")) + "</p>", open: false });

    return (
      '<div class="accordion">' +
      items
        .map(function (item, i) {
          return (
            '<div class="accordion__item' +
            (item.open ? " is-open" : "") +
            '" data-accordion-item>' +
            '<button type="button" class="accordion__trigger" aria-expanded="' +
            (item.open ? "true" : "false") +
            '" aria-controls="bd-accordion-panel-' +
            i +
            '">' +
            "<span>" +
            escapeHtml(item.title) +
            "</span>" +
            '<span class="accordion__icon">' +
            ICONS.chevronDown +
            "</span>" +
            "</button>" +
            '<div class="accordion__panel" id="bd-accordion-panel-' +
            i +
            '">' +
            item.body +
            "</div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function wireAccordion(root) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-accordion-item]"), function (item) {
      var trigger = item.querySelector(".accordion__trigger");
      trigger.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function relatedProductsHtml(product) {
    if (isComingSoonType(product.type)) return "";
    var related = getProductsByType(product.type)
      .filter(function (p) {
        return p.id !== product.id;
      })
      .slice(0, 4);
    if (!related.length) return "";
    return (
      '<section class="related">' +
      '<h2 class="section-title">' +
      escapeHtml(window.BD_T("product.relatedTitle")) +
      "</h2>" +
      '<div class="product-grid" style="margin-top: 20px;">' +
      related.map(productCardHtml).join("") +
      "</div>" +
      "</section>"
    );
  }

  function handleAddToCart(product) {
    // Coloring books (and any product with "personalizable: false") skip
    // the "child's name on the cover" option entirely — there's no name
    // field on the page to read or validate for them.
    var personalizable = product.personalizable !== false;
    var childName = "";

    if (personalizable) {
      var nameInput = document.getElementById("bd-child-name");
      var nameError = document.getElementById("bd-child-name-error");
      var childNameWrap = document.getElementById("bd-child-name-wrap");
      childName = nameInput.value.trim();
      if (currentProductState.personalized && (!childName || childName.length > 20)) {
        nameError.textContent = window.BD_T("product.nameRequired");
        nameError.hidden = false;
        childNameWrap.classList.add("has-error");
        nameInput.focus();
        return;
      }
      nameError.hidden = true;
      childNameWrap.classList.remove("has-error");
    }

    var unitPrice = computeUnitPrice(product);
    var personalized = personalizable && currentProductState.personalized;

    window.BD_CART.add({
      productId: product.id,
      productLanguage: currentProductState.language || "",
      personalized: personalized,
      childName: personalized ? childName.slice(0, 20) : "",
      quantity: currentProductState.quantity,
      unitPrice: unitPrice,
    });

    updateCartCount();
    openMiniCart();
  }

  function renderProduct() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    var id = qs("id");
    var product = getProductById(id);

    if (!product) {
      setTitle(window.BD_T("product.notFoundTitle"));
      mount.innerHTML =
        '<section class="container not-found">' +
        '<img src="assets/brand/astronaut-star-tight.webp" alt="" width="103" height="139" style="object-fit: contain;">' +
        "<h1>" +
        escapeHtml(window.BD_T("product.notFoundTitle")) +
        "</h1>" +
        "<p>" +
        escapeHtml(window.BD_T("product.notFoundMessage")) +
        "</p>" +
        '<a class="btn btn--primary" href="index.html">' +
        escapeHtml(window.BD_T("product.backHome")) +
        "</a>" +
        "</section>";
      return;
    }

    setTitle(localizedText(product.name));
    // Some products (e.g. coloring books) don't offer a book-language
    // choice or the "child's name on the cover" option — hasLanguages
    // and personalizable below decide whether those controls show up
    // at all, so nothing gets shown (or later validated / saved to the
    // cart) for a product that doesn't actually support it.
    var hasLanguages = !!(product.availableLanguages && product.availableLanguages.length);
    var personalizable = product.personalizable !== false;
    currentProductState = {
      language: hasLanguages ? product.availableLanguages[0] : "",
      personalized: false,
      quantity: 1,
    };

    var personalizationPrice = (window.BD_CONFIG && window.BD_CONFIG.personalizationPrice) || 0;
    var images = getProductImages(product);

    var languageOptions = hasLanguages
      ? product.availableLanguages
          .map(function (code, i) {
            return (
              '<label class="radio-pill">' +
              '<input type="radio" name="bd-product-lang" value="' +
              code +
              '"' +
              (i === 0 ? " checked" : "") +
              ' required>' +
              "<span>" +
              escapeHtml(window.BD_T("langName." + code)) +
              "</span>" +
              "</label>"
            );
          })
          .join("")
      : "";

    var galleryThumbs =
      images.length > 1
        ? '<div class="gallery__thumbs">' +
          images
            .map(function (src, i) {
              return (
                '<button type="button" class="gallery__thumb' +
                (i === 0 ? " is-active" : "") +
                '" data-thumb="' +
                i +
                '" aria-label="' +
                escapeHtml(window.BD_T("product.galleryThumbAria", { num: i + 1 })) +
                '"><img src="' +
                src +
                '" alt="" width="64" height="64"></button>'
              );
            })
            .join("") +
          "</div>"
        : "";

    mount.innerHTML =
      breadcrumbsHtml([
        { label: window.BD_T("catalog.breadcrumbHome"), href: "index.html" },
        { label: window.BD_T("type." + product.type), href: "catalog.html?type=" + encodeURIComponent(product.type) },
        { label: localizedText(product.name) },
      ]) +
      '<section class="product-page container">' +
      '<div class="product-layout">' +
      '<div class="product-layout__media">' +
      '<div class="gallery__main"><img id="bd-gallery-main-img" src="' +
      images[0] +
      '" alt="" width="420" height="420"></div>' +
      galleryThumbs +
      "</div>" +
      '<div class="product-layout__info">' +
      (productBadgesHtml(product) ? '<div class="product-layout__badges">' + productBadgesHtml(product) + "</div>" : "") +
      "<h1>" +
      escapeHtml(localizedText(product.name)) +
      "</h1>" +
      '<p class="product-page__price" data-live-price>' +
      formatPrice(product.price) +
      "</p>" +
      '<p class="product-page__desc">' +
      escapeHtml(localizedText(product.shortDescription)) +
      "</p>" +
      '<form id="bd-add-to-cart-form" novalidate>' +
      (hasLanguages
        ? '<fieldset class="form-field">' +
          "<legend>" +
          escapeHtml(window.BD_T("product.languageLabel")) +
          " *</legend>" +
          '<div class="radio-pill-row">' +
          languageOptions +
          "</div>" +
          "</fieldset>"
        : "") +
      (personalizable
        ? '<div class="form-field form-field--checkbox">' +
          '<label class="checkbox-field">' +
          '<input type="checkbox" id="bd-personalize-check">' +
          "<span>" +
          escapeHtml(window.BD_T("product.personalizationLabel")) +
          ' <span class="checkbox-field__price">(' +
          window.BD_T("product.extraPrice", { price: formatPrice(personalizationPrice) }) +
          ")</span></span>" +
          "</label>" +
          '<div class="form-field" id="bd-child-name-wrap" hidden>' +
          '<label for="bd-child-name" class="visually-hidden">' +
          escapeHtml(window.BD_T("product.namePlaceholder")) +
          "</label>" +
          '<input type="text" id="bd-child-name" maxlength="20" placeholder="' +
          escapeHtml(window.BD_T("product.namePlaceholder")) +
          '">' +
          '<p class="form-error" id="bd-child-name-error" hidden></p>' +
          "</div>" +
          "</div>"
        : "") +
      '<div class="form-field">' +
      '<label for="bd-quantity">' +
      escapeHtml(window.BD_T("product.quantityLabel")) +
      "</label>" +
      '<div class="quantity-stepper">' +
      '<button type="button" id="bd-qty-dec" aria-label="' +
      escapeHtml(window.BD_T("product.decreaseAria")) +
      '">&minus;</button>' +
      '<input type="number" id="bd-quantity" value="1" min="1" max="99" inputmode="numeric">' +
      '<button type="button" id="bd-qty-inc" aria-label="' +
      escapeHtml(window.BD_T("product.increaseAria")) +
      '">+</button>' +
      "</div>" +
      "</div>" +
      '<button type="submit" class="btn btn--primary btn--large">' +
      escapeHtml(window.BD_T("product.addToCart")) +
      " — " +
      '<span data-live-price>' +
      formatPrice(product.price) +
      "</span></button>" +
      "</form>" +
      '<div class="trust-lines">' +
      '<div class="trust-lines__item">' +
      ICONS.handmade +
      "<span>" +
      escapeHtml(window.BD_T("product.trustHandmade")) +
      "</span></div>" +
      '<div class="trust-lines__item">' +
      ICONS.clock +
      "<span>" +
      escapeHtml(window.BD_T("product.trustDelivery")) +
      "</span></div>" +
      '<div class="trust-lines__item">' +
      ICONS.lock +
      "<span>" +
      escapeHtml(window.BD_T("product.trustPayment")) +
      "</span></div>" +
      "</div>" +
      accordionHtml(product) +
      "</div>" +
      "</div>" +
      relatedProductsHtml(product) +
      "</section>" +
      '<div class="sticky-buybar">' +
      '<span class="sticky-buybar__price" id="bd-sticky-price">' +
      formatPrice(product.price) +
      "</span>" +
      '<button type="button" class="btn btn--primary" id="bd-sticky-add">' +
      escapeHtml(window.BD_T("product.addToCart")) +
      "</button>" +
      "</div>";

    wireAccordion(mount);

    // gallery thumbnails
    Array.prototype.forEach.call(mount.querySelectorAll(".gallery__thumb"), function (thumb) {
      thumb.addEventListener("click", function () {
        var idx = parseInt(thumb.getAttribute("data-thumb"), 10);
        document.getElementById("bd-gallery-main-img").src = images[idx];
        Array.prototype.forEach.call(mount.querySelectorAll(".gallery__thumb"), function (t) {
          t.classList.toggle("is-active", t === thumb);
        });
      });
    });

    // language pills (only present when the product has a language choice)
    if (hasLanguages) {
      Array.prototype.forEach.call(mount.querySelectorAll('input[name="bd-product-lang"]'), function (input) {
        input.addEventListener("change", function () {
          if (input.checked) currentProductState.language = input.value;
        });
      });
    }

    // personalization checkbox (only present when the product allows it)
    if (personalizable) {
      var checkbox = document.getElementById("bd-personalize-check");
      var nameWrap = document.getElementById("bd-child-name-wrap");
      var nameInput = document.getElementById("bd-child-name");
      var nameError = document.getElementById("bd-child-name-error");
      checkbox.addEventListener("change", function () {
        currentProductState.personalized = checkbox.checked;
        nameWrap.hidden = !checkbox.checked;
        if (!checkbox.checked) {
          nameInput.value = "";
          nameError.hidden = true;
        }
        updateProductPrices(product);
      });
    }

    var qtyInput = document.getElementById("bd-quantity");
    function setQty(next) {
      next = Math.max(1, Math.min(99, next));
      qtyInput.value = next;
      currentProductState.quantity = next;
      updateProductPrices(product);
    }
    document.getElementById("bd-qty-dec").addEventListener("click", function () {
      setQty((parseInt(qtyInput.value, 10) || 1) - 1);
    });
    document.getElementById("bd-qty-inc").addEventListener("click", function () {
      setQty((parseInt(qtyInput.value, 10) || 1) + 1);
    });
    qtyInput.addEventListener("change", function () {
      setQty(parseInt(qtyInput.value, 10) || 1);
    });

    document.getElementById("bd-add-to-cart-form").addEventListener("submit", function (evt) {
      evt.preventDefault();
      handleAddToCart(product);
    });
    document.getElementById("bd-sticky-add").addEventListener("click", function () {
      handleAddToCart(product);
    });
  }

  // ---------- cart page ----------

  var checkoutSubmitted = false;

  function stepIndicatorHtml() {
    // Step 1 is active as soon as you land on the cart page; steps 2-3
    // only light up once the order form has been submitted (checkout).
    var steps = [
      { key: "stepCart", active: true },
      { key: "stepDetails", active: checkoutSubmitted },
      { key: "stepPayment", active: checkoutSubmitted },
    ];
    return (
      '<div class="step-indicator">' +
      steps
        .map(function (step, i) {
          return (
            (i > 0 ? '<span class="step-indicator__arrow">&rarr;</span>' : "") +
            '<span class="step-indicator__step' +
            (step.active ? " is-active" : "") +
            '"><span class="step-indicator__num">' +
            (i + 1) +
            "</span>" +
            escapeHtml(window.BD_T("cart." + step.key)) +
            "</span>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderCartLines() {
    var cart = window.BD_CART.read();
    var listMount = document.getElementById("bd-cart-list");
    var summaryMount = document.getElementById("bd-cart-summary");
    var formSection = document.getElementById("bd-order-section");
    var emptyMount = document.getElementById("bd-cart-empty");
    var layoutMount = document.getElementById("bd-cart-layout");
    if (!listMount) return;

    if (!cart.length) {
      listMount.innerHTML = "";
      if (summaryMount) summaryMount.innerHTML = "";
      if (formSection) formSection.hidden = true;
      // Nothing to show a summary or order form for — hide the whole
      // two-column layout so no empty boxes are left floating around.
      if (layoutMount) layoutMount.hidden = true;
      if (emptyMount) {
        emptyMount.hidden = false;
        emptyMount.innerHTML =
          '<img src="assets/brand/astronaut-star-tight.webp" alt="" width="103" height="139" style="object-fit: contain;">' +
          "<p>" +
          escapeHtml(window.BD_T("cart.emptyMessage")) +
          "</p>" +
          '<a class="btn btn--primary" href="index.html#bd-chooser">' +
          escapeHtml(window.BD_T("cart.emptyCta")) +
          "</a>";
      }
      return;
    }

    if (emptyMount) emptyMount.hidden = true;
    if (layoutMount) layoutMount.hidden = false;
    if (formSection) formSection.hidden = false;

    listMount.innerHTML =
      '<ul class="cart-lines">' +
      cart
        .map(function (line) {
          var product = getProductById(line.productId);
          if (!product) return "";
          return (
            '<li class="cart-line" data-line-id="' +
            line.lineId +
            '">' +
            '<img class="cart-line__image" src="' +
            (product.thumb || product.image) +
            '" alt="" width="90" height="90" loading="lazy" decoding="async">' +
            '<div class="cart-line__info">' +
            '<p class="cart-line__name">' +
            escapeHtml(localizedText(product.name)) +
            "</p>" +
            (line.productLanguage
              ? '<p class="cart-line__meta">' +
                escapeHtml(window.BD_T("cart.tableLanguage")) +
                ": " +
                escapeHtml(window.BD_T("langName." + line.productLanguage)) +
                "</p>"
              : "") +
            (line.personalized
              ? '<p class="cart-line__meta">' +
                escapeHtml(window.BD_T("cart.tableChildName")) +
                ": " +
                escapeHtml(line.childName) +
                "</p>"
              : "") +
            '<p class="cart-line__price">' +
            formatPrice(line.unitPrice) +
            "</p>" +
            "</div>" +
            '<div class="cart-line__qty quantity-stepper">' +
            '<button type="button" class="cart-qty-dec" aria-label="' +
            escapeHtml(window.BD_T("cart.decreaseAria")) +
            '">&minus;</button>' +
            '<input type="number" class="cart-qty-input" value="' +
            line.quantity +
            '" min="1" max="99" inputmode="numeric" aria-label="' +
            escapeHtml(window.BD_T("cart.tableQuantity")) +
            '">' +
            '<button type="button" class="cart-qty-inc" aria-label="' +
            escapeHtml(window.BD_T("cart.increaseAria")) +
            '">+</button>' +
            "</div>" +
            '<button type="button" class="cart-line__remove" aria-label="' +
            escapeHtml(window.BD_T("cart.removeAria")) +
            '">' +
            escapeHtml(window.BD_T("cart.tableRemove")) +
            "</button>" +
            "</li>"
          );
        })
        .join("") +
      "</ul>";

    var total = window.BD_CART.total(cart);
    if (summaryMount) {
      summaryMount.innerHTML =
        '<div class="cart-summary__row"><span>' +
        escapeHtml(window.BD_T("cart.subtotal")) +
        "</span><span>" +
        formatPrice(total) +
        "</span></div>" +
        '<div class="cart-summary__row"><span>' +
        escapeHtml(window.BD_T("cart.deliveryLabel")) +
        "</span><span>" +
        escapeHtml(window.BD_T("cart.deliveryCalculated")) +
        "</span></div>" +
        '<div class="cart-summary__row cart-summary__row--total"><span>' +
        escapeHtml(window.BD_T("cart.total")) +
        "</span><span>" +
        formatPrice(total) +
        "</span></div>";
    }

    Array.prototype.forEach.call(listMount.querySelectorAll(".cart-line"), function (lineEl) {
      var lineId = lineEl.getAttribute("data-line-id");
      var qtyInput = lineEl.querySelector(".cart-qty-input");
      lineEl.querySelector(".cart-qty-dec").addEventListener("click", function () {
        var next = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        window.BD_CART.updateQuantity(lineId, next);
        renderCartLines();
        updateCartCount();
      });
      lineEl.querySelector(".cart-qty-inc").addEventListener("click", function () {
        var next = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
        window.BD_CART.updateQuantity(lineId, next);
        renderCartLines();
        updateCartCount();
      });
      qtyInput.addEventListener("change", function () {
        var next = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
        window.BD_CART.updateQuantity(lineId, next);
        renderCartLines();
        updateCartCount();
      });
      lineEl.querySelector(".cart-line__remove").addEventListener("click", function () {
        window.BD_CART.removeLine(lineId);
        renderCartLines();
        updateCartCount();
      });
    });
  }

  function validateOrderForm(fields) {
    var errors = {};
    if (!fields.fullName.trim()) errors.fullName = window.BD_T("cart.errorRequired");
    if (!fields.email.trim()) {
      errors.email = window.BD_T("cart.errorRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      errors.email = window.BD_T("cart.errorEmail");
    }
    if (!fields.phone.trim()) {
      errors.phone = window.BD_T("cart.errorRequired");
    } else if (!/^[0-9+()\s-]{7,20}$/.test(fields.phone.trim())) {
      errors.phone = window.BD_T("cart.errorPhone");
    }
    if (!fields.address.trim()) errors.address = window.BD_T("cart.errorRequired");
    if (!fields.city.trim()) errors.city = window.BD_T("cart.errorRequired");
    if (!fields.postalCode.trim()) errors.postalCode = window.BD_T("cart.errorRequired");
    if (!fields.country.trim()) errors.country = window.BD_T("cart.errorRequired");
    return errors;
  }

  function renderCart() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    setTitle(window.BD_T("cart.title"));
    checkoutSubmitted = false;

    mount.innerHTML =
      '<section class="cart-page container">' +
      "<h1>" +
      escapeHtml(window.BD_T("cart.title")) +
      "</h1>" +
      '<div id="bd-step-indicator">' +
      stepIndicatorHtml() +
      "</div>" +
      '<div class="cart-empty" id="bd-cart-empty" hidden></div>' +
      '<div class="cart-layout" id="bd-cart-layout">' +
      '<div class="cart-layout__main">' +
      '<div id="bd-cart-list"></div>' +
      '<section class="order-section" id="bd-order-section">' +
      "<h2>" +
      escapeHtml(window.BD_T("cart.orderFormTitle")) +
      "</h2>" +
      '<form id="bd-order-form" novalidate>' +
      '<div class="form-field">' +
      '<label for="bd-order-name">' +
      escapeHtml(window.BD_T("cart.fullName")) +
      " *</label>" +
      '<input type="text" id="bd-order-name" name="fullName" autocomplete="name">' +
      '<p class="form-error" data-error-for="fullName" hidden></p>' +
      "</div>" +
      '<div class="form-row form-row--2">' +
      '<div class="form-field">' +
      '<label for="bd-order-email">' +
      escapeHtml(window.BD_T("cart.email")) +
      " *</label>" +
      '<input type="email" id="bd-order-email" name="email" autocomplete="email">' +
      '<p class="form-error" data-error-for="email" hidden></p>' +
      "</div>" +
      '<div class="form-field">' +
      '<label for="bd-order-phone">' +
      escapeHtml(window.BD_T("cart.phone")) +
      " *</label>" +
      '<input type="tel" id="bd-order-phone" name="phone" autocomplete="tel">' +
      '<p class="form-error" data-error-for="phone" hidden></p>' +
      "</div>" +
      "</div>" +
      '<div class="form-field">' +
      '<label for="bd-order-address">' +
      escapeHtml(window.BD_T("cart.address")) +
      " *</label>" +
      '<input type="text" id="bd-order-address" name="address" autocomplete="street-address">' +
      '<p class="form-error" data-error-for="address" hidden></p>' +
      "</div>" +
      '<div class="form-row form-row--2">' +
      '<div class="form-field">' +
      '<label for="bd-order-city">' +
      escapeHtml(window.BD_T("cart.city")) +
      " *</label>" +
      '<input type="text" id="bd-order-city" name="city" autocomplete="address-level2">' +
      '<p class="form-error" data-error-for="city" hidden></p>' +
      "</div>" +
      '<div class="form-field">' +
      '<label for="bd-order-postal">' +
      escapeHtml(window.BD_T("cart.postalCode")) +
      " *</label>" +
      '<input type="text" id="bd-order-postal" name="postalCode" autocomplete="postal-code">' +
      '<p class="form-error" data-error-for="postalCode" hidden></p>' +
      "</div>" +
      "</div>" +
      '<div class="form-field">' +
      '<label for="bd-order-country">' +
      escapeHtml(window.BD_T("cart.country")) +
      " *</label>" +
      '<select id="bd-order-country" name="country" autocomplete="country-name">' +
      '<option value="">' +
      escapeHtml(window.BD_T("cart.selectCountry")) +
      "</option>" +
      '<option value="PL">' +
      escapeHtml(window.BD_T("cart.countryPoland")) +
      "</option>" +
      '<option value="UA">' +
      escapeHtml(window.BD_T("cart.countryUkraine")) +
      "</option>" +
      '<option value="SE">' +
      escapeHtml(window.BD_T("cart.countrySweden")) +
      "</option>" +
      '<option value="other">' +
      escapeHtml(window.BD_T("cart.countryOther")) +
      "</option>" +
      "</select>" +
      '<p class="form-error" data-error-for="country" hidden></p>' +
      "</div>" +
      '<div class="form-field">' +
      '<label for="bd-order-comment">' +
      escapeHtml(window.BD_T("cart.comment")) +
      " (" +
      escapeHtml(window.BD_T("cart.commentOptional")) +
      ")</label>" +
      '<textarea id="bd-order-comment" name="comment" rows="3"></textarea>' +
      "</div>" +
      '<p class="form-error" id="bd-order-cart-error" hidden></p>' +
      '<button type="submit" class="btn btn--primary btn--large">' +
      escapeHtml(window.BD_T("cart.submit")) +
      "</button>" +
      "</form>" +
      '<div class="order-confirmation" id="bd-order-confirmation" hidden></div>' +
      "</section>" +
      "</div>" +
      '<div class="cart-layout__side">' +
      '<div class="cart-summary" id="bd-cart-summary"></div>' +
      "</div>" +
      "</div>" +
      "</section>";

    renderCartLines();

    document.getElementById("bd-order-form").addEventListener("submit", function (evt) {
      evt.preventDefault();
      var cart = window.BD_CART.read();
      var cartErrorEl = document.getElementById("bd-order-cart-error");
      if (!cart.length) {
        cartErrorEl.textContent = window.BD_T("cart.errorCart");
        cartErrorEl.hidden = false;
        return;
      }
      cartErrorEl.hidden = true;

      var fields = {
        fullName: document.getElementById("bd-order-name").value,
        email: document.getElementById("bd-order-email").value,
        phone: document.getElementById("bd-order-phone").value,
        address: document.getElementById("bd-order-address").value,
        city: document.getElementById("bd-order-city").value,
        postalCode: document.getElementById("bd-order-postal").value,
        country: document.getElementById("bd-order-country").value,
        comment: document.getElementById("bd-order-comment").value,
      };
      var errors = validateOrderForm(fields);

      Array.prototype.forEach.call(evt.target.querySelectorAll(".form-error"), function (errEl) {
        if (errEl.id === "bd-order-cart-error") return;
        errEl.hidden = true;
        errEl.textContent = "";
      });
      Array.prototype.forEach.call(evt.target.querySelectorAll(".form-field"), function (fieldEl) {
        fieldEl.classList.remove("has-error");
      });

      var firstInvalid = null;
      var fieldElementId = { fullName: "name", email: "email", phone: "phone", address: "address", city: "city", postalCode: "postal", country: "country" };
      Object.keys(errors).forEach(function (field) {
        var errEl = evt.target.querySelector('[data-error-for="' + field + '"]');
        if (errEl) {
          errEl.textContent = errors[field];
          errEl.hidden = false;
          if (errEl.parentElement) errEl.parentElement.classList.add("has-error");
        }
        if (!firstInvalid) firstInvalid = document.getElementById("bd-order-" + fieldElementId[field]);
      });

      if (Object.keys(errors).length) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var order = {
        fullName: fields.fullName.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        address: fields.address.trim(),
        city: fields.city.trim(),
        postalCode: fields.postalCode.trim(),
        country: fields.country,
        comment: fields.comment.trim(),
        cart: cart,
        total: window.BD_CART.total(cart),
      };

      window.BD_CART.startCheckout(order);

      checkoutSubmitted = true;
      document.getElementById("bd-step-indicator").innerHTML = stepIndicatorHtml();
      var confirmation = document.getElementById("bd-order-confirmation");
      confirmation.hidden = false;
      confirmation.innerHTML =
        "<h3>" +
        escapeHtml(window.BD_T("cart.paymentTitle")) +
        "</h3><p>" +
        escapeHtml(window.BD_T("cart.paymentMessage")) +
        "</p>";
      confirmation.setAttribute("tabindex", "-1");
      confirmation.focus();
    });
  }

  // ---------- init ----------

  function init() {
    document.documentElement.lang = window.BD_getLang();
    renderAnnouncementBar();
    renderHeader();
    renderFooter();

    var page = document.body.getAttribute("data-page");
    if (page === "home") renderHome();
    else if (page === "catalog") renderCatalog();
    else if (page === "product") renderProduct();
    else if (page === "cart") renderCart();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.BD_APP = { formatPrice: formatPrice, escapeHtml: escapeHtml, qs: qs };
})();
