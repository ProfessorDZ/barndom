/*
 * Barn Dom — shared app logic
 * --------------------------------
 * Renders the header/footer on every page, wires up the language
 * switcher and mobile menu, and renders whichever page is active based
 * on document.body.dataset.page ("home" | "catalog" | "product" | "cart").
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

  function isValidType(type) {
    return (window.BD_PRODUCT_TYPES || []).some(function (t) {
      return t.id === type;
    });
  }

  function localizedText(field) {
    var lang = window.BD_getLang();
    return field[lang] || field.uk || "";
  }

  function el(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  }

  // ---------- toast ----------

  function showToast(message) {
    var existing = document.getElementById("bd-toast");
    if (existing) existing.parentNode.removeChild(existing);
    var toast = el(
      '<div id="bd-toast" class="bd-toast" role="status" aria-live="polite">' +
        escapeHtml(message) +
        "</div>"
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

  // ---------- header / footer ----------

  function typeCardsHtml(compact) {
    return (window.BD_PRODUCT_TYPES || [])
      .map(function (type) {
        return (
          '<a class="type-card' +
          (compact ? " type-card--compact" : "") +
          '" href="catalog.html?type=' +
          encodeURIComponent(type.id) +
          '">' +
          '<span class="type-card__image"><img src="' +
          type.image +
          '" alt="" width="120" height="120" loading="lazy"></span>' +
          '<span class="type-card__name">' +
          escapeHtml(window.BD_T("type." + type.id)) +
          "</span>" +
          '<span class="type-card__tagline">' +
          escapeHtml(window.BD_T("typeTagline." + type.id)) +
          "</span>" +
          '<span class="type-card__cta">' +
          escapeHtml(window.BD_T("home.cardView")) +
          " &rarr;</span>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderHeader() {
    var mount = document.getElementById("bd-header");
    if (!mount) return;
    var lang = window.BD_getLang();
    var shopName = (window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom";
    var cartCount = window.BD_CART ? window.BD_CART.count() : 0;

    var navLinks = (window.BD_PRODUCT_TYPES || [])
      .map(function (type) {
        return (
          '<a class="main-nav__link" href="catalog.html?type=' +
          encodeURIComponent(type.id) +
          '">' +
          escapeHtml(window.BD_T("type." + type.id)) +
          "</a>"
        );
      })
      .join("");

    var langButtons = (window.BD_LANGS || [])
      .map(function (l) {
        return (
          '<button type="button" class="lang-btn' +
          (l.code === lang ? " is-active" : "") +
          '" data-lang="' +
          l.code +
          '" aria-pressed="' +
          (l.code === lang ? "true" : "false") +
          '" aria-label="' +
          escapeHtml(l.nativeName) +
          '">' +
          l.code.toUpperCase() +
          "</button>"
        );
      })
      .join("");

    mount.innerHTML =
      '<div class="container header-inner">' +
      '<a class="brand" href="index.html">' +
      '<img src="assets/brand/logo.svg" alt="" width="44" height="44">' +
      '<span class="brand__name">' +
      escapeHtml(shopName) +
      "</span>" +
      "</a>" +
      '<button type="button" class="menu-toggle" id="bd-menu-toggle" aria-expanded="false" aria-controls="bd-main-nav">' +
      '<span class="visually-hidden">' +
      escapeHtml(window.BD_T("nav.menu")) +
      "</span>" +
      '<span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span>' +
      "</button>" +
      '<nav class="main-nav" id="bd-main-nav" aria-label="' +
      escapeHtml(window.BD_T("nav.menu")) +
      '">' +
      navLinks +
      "</nav>" +
      '<div class="header-actions">' +
      '<div class="lang-switcher" role="group" aria-label="' +
      escapeHtml(window.BD_T("lang.switcherLabel")) +
      '">' +
      langButtons +
      "</div>" +
      '<a class="cart-link" href="cart.html" aria-label="' +
      escapeHtml(window.BD_T("cart.itemsCountAria", { count: cartCount })) +
      '">' +
      '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>' +
      '<span class="cart-count" id="bd-cart-count">' +
      cartCount +
      "</span>" +
      "</a>" +
      "</div>" +
      "</div>";

    var toggle = document.getElementById("bd-menu-toggle");
    var nav = document.getElementById("bd-main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.classList.toggle("is-open", isOpen);
      });
    }

    Array.prototype.forEach.call(mount.querySelectorAll(".lang-btn"), function (btn) {
      btn.addEventListener("click", function () {
        window.BD_setLang(btn.getAttribute("data-lang"));
        window.location.reload();
      });
    });
  }

  function renderFooter() {
    var mount = document.getElementById("bd-footer");
    if (!mount) return;
    var shopName = (window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom";
    var email = (window.BD_CONFIG && window.BD_CONFIG.contactEmail) || "";
    mount.innerHTML =
      '<div class="container footer-inner">' +
      '<p class="footer__brand">' +
      escapeHtml(shopName) +
      "</p>" +
      '<p class="footer__tagline">' +
      escapeHtml(window.BD_T("footer.tagline")) +
      "</p>" +
      '<p class="footer__contact">' +
      escapeHtml(window.BD_T("footer.contactLabel")) +
      ' <a href="mailto:' +
      encodeURIComponent(email) +
      '">' +
      escapeHtml(email) +
      "</a></p>" +
      '<nav class="footer__links" aria-label="' +
      escapeHtml(window.BD_T("nav.menu")) +
      '">' +
      '<a href="index.html">' +
      escapeHtml(window.BD_T("nav.home")) +
      "</a>" +
      '<a href="cart.html">' +
      escapeHtml(window.BD_T("nav.cart")) +
      "</a>" +
      "</nav>" +
      '<p class="footer__rights">' +
      escapeHtml(window.BD_T("footer.rights", { year: new Date().getFullYear() })) +
      "</p>" +
      "</div>";
  }

  function updateCartCount() {
    var badge = document.getElementById("bd-cart-count");
    if (badge && window.BD_CART) badge.textContent = window.BD_CART.count();
    var cartLink = document.querySelector(".cart-link");
    if (cartLink && window.BD_CART) {
      cartLink.setAttribute("aria-label", window.BD_T("cart.itemsCountAria", { count: window.BD_CART.count() }));
    }
  }

  // ---------- home page ----------

  function renderHome() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    document.title = ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom") + " — " + window.BD_T("home.sectionTitle");
    mount.innerHTML =
      '<section class="hero container">' +
      '<div class="hero__text">' +
      "<h1>" +
      escapeHtml(window.BD_T("home.heroTitle")) +
      "</h1>" +
      "<p>" +
      escapeHtml(window.BD_T("home.heroSubtitle")) +
      "</p>" +
      '<a class="btn btn--primary" href="#bd-types">' +
      escapeHtml(window.BD_T("home.heroCta")) +
      "</a>" +
      "</div>" +
      '<div class="hero__image">' +
      '<img src="assets/brand/astronaut-rocket.svg" alt="" width="420" height="420">' +
      "</div>" +
      "</section>" +
      '<section class="types-section container" id="bd-types">' +
      "<h2>" +
      escapeHtml(window.BD_T("home.sectionTitle")) +
      "</h2>" +
      '<div class="type-grid">' +
      typeCardsHtml(false) +
      "</div>" +
      "</section>";
  }

  // ---------- catalog page ----------

  var catalogState = { ages: [], categories: [] };

  function renderCatalog() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    var type = qs("type");

    if (!isValidType(type)) {
      document.title = window.BD_T("catalog.allTitle") + " — " + ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom");
      mount.innerHTML =
        '<section class="types-section container">' +
        "<h1>" +
        escapeHtml(window.BD_T("catalog.allTitle")) +
        "</h1>" +
        "<h2>" +
        escapeHtml(window.BD_T("home.sectionTitle")) +
        "</h2>" +
        '<div class="type-grid">' +
        typeCardsHtml(false) +
        "</div>" +
        "</section>";
      return;
    }

    document.title = window.BD_T("type." + type) + " — " + ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom");

    var showFilters = type === "velcro-books";
    var filtersHtml = "";
    if (showFilters) {
      filtersHtml =
        '<div class="filters">' +
        '<button type="button" class="filters__toggle" id="bd-filters-toggle" aria-expanded="false" aria-controls="bd-filters-panel">' +
        escapeHtml(window.BD_T("catalog.filtersToggle")) +
        "</button>" +
        '<div class="filters__panel" id="bd-filters-panel">' +
        '<div class="filter-group">' +
        '<h3 class="filter-group__title">' +
        escapeHtml(window.BD_T("catalog.filtersAge")) +
        "</h3>" +
        '<div class="chip-row" data-filter-group="ages">' +
        (window.BD_AGES || [])
          .map(function (age) {
            return (
              '<button type="button" class="chip" data-value="' +
              age +
              '" aria-pressed="false">' +
              escapeHtml(window.BD_T("age." + age)) +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        '<div class="filter-group">' +
        '<h3 class="filter-group__title">' +
        escapeHtml(window.BD_T("catalog.filtersCategory")) +
        "</h3>" +
        '<div class="chip-row chip-row--scroll" data-filter-group="categories">' +
        (window.BD_CATEGORIES || [])
          .map(function (cat) {
            return (
              '<button type="button" class="chip" data-value="' +
              cat +
              '" aria-pressed="false">' +
              escapeHtml(window.BD_T("category." + cat)) +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        '<button type="button" class="btn btn--ghost" id="bd-clear-filters">' +
        escapeHtml(window.BD_T("catalog.clearFilters")) +
        "</button>" +
        "</div>" +
        "</div>";
    }

    mount.innerHTML =
      '<section class="catalog container">' +
      '<a class="back-link" href="index.html">&larr; ' +
      escapeHtml(window.BD_T("catalog.backToTypes")) +
      "</a>" +
      "<h1>" +
      escapeHtml(window.BD_T("type." + type)) +
      "</h1>" +
      filtersHtml +
      '<p class="catalog__count" id="bd-catalog-count"></p>' +
      '<div class="product-grid" id="bd-product-grid"></div>' +
      "</section>";

    if (showFilters) {
      catalogState = { ages: [], categories: [] };
      wireFilterChips();
      var toggle = document.getElementById("bd-filters-toggle");
      var panel = document.getElementById("bd-filters-panel");
      if (toggle && panel) {
        toggle.addEventListener("click", function () {
          var open = panel.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
      }
      var clearBtn = document.getElementById("bd-clear-filters");
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          catalogState = { ages: [], categories: [] };
          Array.prototype.forEach.call(mount.querySelectorAll(".chip"), function (chip) {
            chip.classList.remove("is-active");
            chip.setAttribute("aria-pressed", "false");
          });
          renderProductGrid(type);
        });
      }
    }

    renderProductGrid(type);
  }

  function wireFilterChips() {
    Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (chip) {
      chip.addEventListener("click", function () {
        var group = chip.closest("[data-filter-group]").getAttribute("data-filter-group");
        var value = chip.getAttribute("data-value");
        var list = catalogState[group];
        var idx = list.indexOf(value);
        if (idx === -1) {
          list.push(value);
          chip.classList.add("is-active");
          chip.setAttribute("aria-pressed", "true");
        } else {
          list.splice(idx, 1);
          chip.classList.remove("is-active");
          chip.setAttribute("aria-pressed", "false");
        }
        renderProductGrid(qs("type"));
      });
    });
  }

  function renderProductGrid(type) {
    var grid = document.getElementById("bd-product-grid");
    var countEl = document.getElementById("bd-catalog-count");
    if (!grid) return;

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

    if (countEl) countEl.textContent = window.BD_T("catalog.count", { count: products.length });

    if (!products.length) {
      grid.innerHTML = '<p class="catalog__empty">' + escapeHtml(window.BD_T("catalog.empty")) + "</p>";
      return;
    }

    grid.innerHTML = products
      .map(function (p) {
        return (
          '<article class="product-card">' +
          '<a class="product-card__image" href="product.html?id=' +
          encodeURIComponent(p.id) +
          '">' +
          '<img src="' +
          p.image +
          '" alt="" width="220" height="220" loading="lazy">' +
          "</a>" +
          '<h2 class="product-card__name">' +
          '<a href="product.html?id=' +
          encodeURIComponent(p.id) +
          '">' +
          escapeHtml(localizedText(p.name)) +
          "</a>" +
          "</h2>" +
          '<p class="product-card__desc">' +
          escapeHtml(localizedText(p.shortDescription)) +
          "</p>" +
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
      })
      .join("");
  }

  // ---------- product page ----------

  function renderProduct() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;
    var id = qs("id");
    var product = getProductById(id);

    if (!product) {
      document.title = window.BD_T("product.notFoundTitle") + " — " + ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom");
      mount.innerHTML =
        '<section class="container not-found">' +
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

    document.title = localizedText(product.name) + " — " + ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom");

    var personalizationPrice = (window.BD_CONFIG && window.BD_CONFIG.personalizationPrice) || 0;

    var languageOptions = (product.availableLanguages || [])
      .map(function (code, i) {
        return (
          '<label class="radio-pill">' +
          '<input type="radio" name="bd-product-lang" value="' +
          code +
          '"' +
          (i === 0 ? " checked" : "") +
          ">" +
          "<span>" +
          escapeHtml(window.BD_T("langName." + code)) +
          "</span>" +
          "</label>"
        );
      })
      .join("");

    mount.innerHTML =
      '<section class="product-page container">' +
      '<div class="product-page__media">' +
      '<img src="' +
      product.image +
      '" alt="" width="420" height="420">' +
      "</div>" +
      '<div class="product-page__info">' +
      "<h1>" +
      escapeHtml(localizedText(product.name)) +
      "</h1>" +
      '<p class="product-page__price" id="bd-product-price">' +
      formatPrice(product.price) +
      "</p>" +
      '<p class="product-page__desc">' +
      escapeHtml(localizedText(product.description)) +
      "</p>" +
      '<form id="bd-add-to-cart-form" novalidate>' +
      '<fieldset class="form-field">' +
      "<legend>" +
      escapeHtml(window.BD_T("product.languageLabel")) +
      " *</legend>" +
      '<div class="radio-pill-row">' +
      languageOptions +
      "</div>" +
      "</fieldset>" +
      '<div class="form-field form-field--checkbox">' +
      '<label class="checkbox-field">' +
      '<input type="checkbox" id="bd-personalize-check">' +
      "<span>" +
      escapeHtml(window.BD_T("product.personalizationLabel")) +
      " (" +
      window.BD_T("product.extraPrice", { price: formatPrice(personalizationPrice) }) +
      ")</span>" +
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
      "</div>" +
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
      "</button>" +
      "</form>" +
      "</div>" +
      "</section>";

    var checkbox = document.getElementById("bd-personalize-check");
    var nameWrap = document.getElementById("bd-child-name-wrap");
    var nameInput = document.getElementById("bd-child-name");
    var nameError = document.getElementById("bd-child-name-error");
    checkbox.addEventListener("change", function () {
      nameWrap.hidden = !checkbox.checked;
      if (!checkbox.checked) {
        nameInput.value = "";
        nameError.hidden = true;
      }
    });

    var qtyInput = document.getElementById("bd-quantity");
    document.getElementById("bd-qty-dec").addEventListener("click", function () {
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
    });
    document.getElementById("bd-qty-inc").addEventListener("click", function () {
      qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
    });

    document.getElementById("bd-add-to-cart-form").addEventListener("submit", function (evt) {
      evt.preventDefault();
      var personalized = checkbox.checked;
      var childName = nameInput.value.trim();
      if (personalized && (!childName || childName.length > 20)) {
        nameError.textContent = window.BD_T("product.nameRequired");
        nameError.hidden = false;
        nameInput.focus();
        return;
      }
      nameError.hidden = true;

      var langInput = mount.querySelector('input[name="bd-product-lang"]:checked');
      var productLanguage = langInput ? langInput.value : product.availableLanguages[0];
      var quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      var unitPrice = product.price + (personalized ? personalizationPrice : 0);

      window.BD_CART.add({
        productId: product.id,
        productLanguage: productLanguage,
        personalized: personalized,
        childName: personalized ? childName.slice(0, 20) : "",
        quantity: quantity,
        unitPrice: unitPrice,
      });

      updateCartCount();
      showToast(window.BD_T("product.addedToast"));
    });
  }

  // ---------- cart page ----------

  function renderCartLines() {
    var cart = window.BD_CART.read();
    var listMount = document.getElementById("bd-cart-list");
    var summaryMount = document.getElementById("bd-cart-summary");
    var formSection = document.getElementById("bd-order-section");
    if (!listMount) return;

    if (!cart.length) {
      listMount.innerHTML =
        '<div class="cart-empty">' +
        "<p>" +
        escapeHtml(window.BD_T("cart.emptyMessage")) +
        "</p>" +
        '<a class="btn btn--primary" href="index.html">' +
        escapeHtml(window.BD_T("cart.emptyCta")) +
        "</a>" +
        "</div>";
      if (summaryMount) summaryMount.innerHTML = "";
      if (formSection) formSection.hidden = true;
      return;
    }

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
            product.image +
            '" alt="" width="90" height="90">' +
            '<div class="cart-line__info">' +
            '<p class="cart-line__name">' +
            escapeHtml(localizedText(product.name)) +
            "</p>" +
            '<p class="cart-line__meta">' +
            escapeHtml(window.BD_T("cart.tableLanguage")) +
            ": " +
            escapeHtml(window.BD_T("langName." + line.productLanguage)) +
            "</p>" +
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
            '">&times;</button>' +
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
    return errors;
  }

  function renderCart() {
    var mount = document.getElementById("bd-page");
    if (!mount) return;

    document.title = window.BD_T("cart.title") + " — " + ((window.BD_CONFIG && window.BD_CONFIG.shopName) || "Barn Dom");

    mount.innerHTML =
      '<section class="cart-page container">' +
      "<h1>" +
      escapeHtml(window.BD_T("cart.title")) +
      "</h1>" +
      '<div id="bd-cart-list"></div>' +
      '<div class="cart-summary" id="bd-cart-summary"></div>' +
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
      '<div class="form-field">' +
      '<label for="bd-order-address">' +
      escapeHtml(window.BD_T("cart.address")) +
      " *</label>" +
      '<input type="text" id="bd-order-address" name="address" autocomplete="street-address">' +
      '<p class="form-error" data-error-for="address" hidden></p>' +
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
        comment: document.getElementById("bd-order-comment").value,
      };
      var errors = validateOrderForm(fields);

      Array.prototype.forEach.call(evt.target.querySelectorAll(".form-error"), function (errEl) {
        errEl.hidden = true;
        errEl.textContent = "";
      });

      var firstInvalid = null;
      Object.keys(errors).forEach(function (field) {
        var errEl = evt.target.querySelector('[data-error-for="' + field + '"]');
        if (errEl) {
          errEl.textContent = errors[field];
          errEl.hidden = false;
        }
        if (!firstInvalid) firstInvalid = document.getElementById("bd-order-" + field.replace("fullName", "name"));
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
        comment: fields.comment.trim(),
        cart: cart,
        total: window.BD_CART.total(cart),
      };

      window.BD_CART.startCheckout(order);

      evt.target.hidden = true;
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

      renderCartLines();
      updateCartCount();
    });
  }

  // ---------- init ----------

  function init() {
    document.documentElement.lang = window.BD_getLang();
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
