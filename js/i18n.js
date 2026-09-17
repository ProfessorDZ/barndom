/*
 * Barn Dom — translations (UI text)
 * --------------------------------
 * All interface text lives here in 4 languages: Ukrainian (uk, default),
 * Polish (pl), English (en) and Swedish (sv).
 *
 * How it works:
 *  - window.BD_I18N holds the text, grouped by language then by section.
 *  - window.BD_T(key, vars) looks a key up for the CURRENT language
 *    (e.g. BD_T('cart.total')) and falls back to Ukrainian, then to the
 *    key itself, if something is missing. It never throws.
 *  - Use {{name}} placeholders in strings and pass vars = { name: '...' }.
 *
 * To add a 5th language: copy one of the blocks below (e.g. "en"), give
 * it a new language code, translate every value, then add the code to
 * window.BD_LANGS. Keep the same keys in every language block.
 */
(function () {
  var LANGS = [
    { code: "uk", nativeName: "Українська" },
    { code: "pl", nativeName: "Polski" },
    { code: "en", nativeName: "English" },
    { code: "sv", nativeName: "Svenska" },
  ];

  var I18N = {
    uk: {
      nav: { home: "Головна", cart: "Кошик", menu: "Меню" },
      lang: { switcherLabel: "Мова сайту" },
      type: {
        "velcro-books": "Заламіновані книжечки на липучках",
        coloring: "Розмальовки",
        "spot-it": "Гра Spot It!",
        playdough: "Ігри з пластиліном",
        "wipe-clean": "Робочі зошити пиши-стирай",
        "unit-study": "Тематичні зошити (unit study)",
      },
      typeTagline: {
        "velcro-books": "Розвиваючі книжечки з липучками для маленьких рук",
        coloring: "Розмальовки на улюблені теми",
        "spot-it": "Весела гра на уважність для всієї родини",
        playdough: "Килимки та картки для творчості з пластиліном",
        "wipe-clean": "Пиши, стирай і тренуйся знову й знову",
        "unit-study": "Тематичні зошити для занурення в одну тему",
      },
      home: {
        heroTitle: "Розвиваючі іграшки та зошити, зроблені з любов'ю",
        heroSubtitle:
          "Barn Dom — маленька майстерня хендмейд-продуктів для навчання й гри. Ми створюємо іграшки, якими хочеться користуватись знову і знову.",
        heroCta: "Обрати категорію",
        sectionTitle: "Що ви шукаєте?",
        cardView: "Переглянути",
      },
      catalog: {
        allTitle: "Каталог",
        filtersAge: "Вік",
        filtersCategory: "Категорія",
        clearFilters: "Очистити фільтри",
        filtersToggle: "Фільтри",
        count: "Знайдено товарів: {{count}}",
        empty: "На жаль, за обраними фільтрами нічого не знайдено.",
        viewProduct: "Переглянути",
        backToTypes: "Усі категорії",
      },
      age: { "6m": "6 міс+", "1": "1+", "3": "3+", "5": "5+", "10": "10+" },
      category: {
        animals: "Тваринки",
        "colors-shapes": "Кольори і фігури",
        "albums-all-topics": "Альбоми на всі теми",
        transport: "Транспорт",
        "human-body": "Тіло людини",
        professions: "Професії",
        logic: "Логіка",
        food: "Їжа",
        space: "Космос",
        dinosaurs: "Динозаври",
        numbers: "Цифри",
        christmas: "Різдво",
        superheroes: "Супергерої",
        english: "Англійська",
        speech: "Мовлення",
        polish: "Польська",
        geography: "Географія",
        dolls: "Ляльки",
      },
      product: {
        notFoundTitle: "Товар не знайдено",
        notFoundMessage: "Схоже, такого товару вже немає або посилання невірне.",
        backHome: "На головну",
        price: "Ціна",
        languageLabel: "Мова видання",
        languageRequiredNote: "Оберіть мову видання",
        personalizationLabel: "Додати ім'я дитини на обкладинку",
        namePlaceholder: "Ім'я дитини (до 20 символів)",
        nameRequired: "Введіть ім'я дитини (до 20 символів)",
        extraPrice: "+{{price}}",
        quantityLabel: "Кількість",
        decreaseAria: "Зменшити кількість",
        increaseAria: "Збільшити кількість",
        addToCart: "Додати в кошик",
        addedToast: "Додано в кошик!",
        viewCart: "Перейти в кошик",
        descriptionTitle: "Опис",
      },
      cart: {
        title: "Кошик",
        emptyMessage: "Ваш кошик поки порожній.",
        emptyCta: "До покупок",
        tableProduct: "Товар",
        tableLanguage: "Мова",
        tableChildName: "Ім'я на обкладинці",
        tablePrice: "Ціна",
        tableQuantity: "Кількість",
        tableRemove: "Видалити",
        removeAria: "Видалити товар з кошика",
        decreaseAria: "Зменшити кількість",
        increaseAria: "Збільшити кількість",
        subtotal: "Проміжний підсумок",
        total: "Разом до сплати",
        noPersonalization: "—",
        orderFormTitle: "Оформлення замовлення",
        fullName: "Повне ім'я",
        email: "Електронна пошта",
        phone: "Телефон",
        address: "Адреса доставки",
        comment: "Коментар",
        commentOptional: "необов'язково",
        submit: "Оплатити і замовити",
        errorRequired: "Це поле обов'язкове",
        errorEmail: "Введіть коректну електронну адресу",
        errorPhone: "Введіть коректний номер телефону",
        errorCart: "Ваш кошик порожній — спочатку додайте товари.",
        paymentTitle: "Дякуємо за замовлення!",
        paymentMessage:
          "Онлайн-оплату скоро буде підключено. Ми зв'яжемося з вами, щоб узгодити оплату та доставку.",
        itemsCountAria: "Кошик, товарів: {{count}}",
      },
      footer: {
        tagline: "Розвиваючі хендмейд-товари для дітей, зроблені з турботою.",
        contactLabel: "Напишіть нам:",
        rights: "© {{year}} Barn Dom. Усі права захищені.",
      },
      common: { skipToContent: "Перейти до вмісту", close: "Закрити" },
      langName: { uk: "Українська", pl: "Польська", en: "Англійська", sv: "Шведська" },
    },

    pl: {
      nav: { home: "Strona główna", cart: "Koszyk", menu: "Menu" },
      lang: { switcherLabel: "Język strony" },
      type: {
        "velcro-books": "Zalaminowane książeczki na rzepy",
        coloring: "Kolorowanki",
        "spot-it": "Gra Spot It!",
        playdough: "Zabawy z plasteliną",
        "wipe-clean": "Zeszyty do pisania i wycierania",
        "unit-study": "Zeszyty tematyczne (unit study)",
      },
      typeTagline: {
        "velcro-books": "Edukacyjne książeczki na rzepy dla małych rączek",
        coloring: "Kolorowanki na ulubione tematy",
        "spot-it": "Wesoła gra na spostrzegawczość dla całej rodziny",
        playdough: "Maty i karty do zabaw z plasteliną",
        "wipe-clean": "Pisz, wycieraj i ćwicz od nowa",
        "unit-study": "Zeszyty tematyczne do zgłębiania jednego tematu",
      },
      home: {
        heroTitle: "Edukacyjne zabawki i zeszyty zrobione z miłością",
        heroSubtitle:
          "Barn Dom to mała pracownia produktów handmade do nauki i zabawy. Tworzymy zabawki, po które chce się sięgać wciąż na nowo.",
        heroCta: "Wybierz kategorię",
        sectionTitle: "Czego szukasz?",
        cardView: "Zobacz",
      },
      catalog: {
        allTitle: "Katalog",
        filtersAge: "Wiek",
        filtersCategory: "Kategoria",
        clearFilters: "Wyczyść filtry",
        filtersToggle: "Filtry",
        count: "Znaleziono produktów: {{count}}",
        empty: "Niestety nie znaleziono produktów dla wybranych filtrów.",
        viewProduct: "Zobacz",
        backToTypes: "Wszystkie kategorie",
      },
      age: { "6m": "6 mies.+", "1": "1+", "3": "3+", "5": "5+", "10": "10+" },
      category: {
        animals: "Zwierzątka",
        "colors-shapes": "Kolory i kształty",
        "albums-all-topics": "Albumy na wszystkie tematy",
        transport: "Transport",
        "human-body": "Ciało człowieka",
        professions: "Zawody",
        logic: "Logika",
        food: "Jedzenie",
        space: "Kosmos",
        dinosaurs: "Dinozaury",
        numbers: "Liczby",
        christmas: "Święta Bożego Narodzenia",
        superheroes: "Superbohaterowie",
        english: "Angielski",
        speech: "Mowa",
        polish: "Polski",
        geography: "Geografia",
        dolls: "Lalki",
      },
      product: {
        notFoundTitle: "Nie znaleziono produktu",
        notFoundMessage: "Wygląda na to, że tego produktu już nie ma albo link jest nieprawidłowy.",
        backHome: "Strona główna",
        price: "Cena",
        languageLabel: "Język wydania",
        languageRequiredNote: "Wybierz język wydania",
        personalizationLabel: "Dodaj imię dziecka na okładce",
        namePlaceholder: "Imię dziecka (do 20 znaków)",
        nameRequired: "Podaj imię dziecka (do 20 znaków)",
        extraPrice: "+{{price}}",
        quantityLabel: "Ilość",
        decreaseAria: "Zmniejsz ilość",
        increaseAria: "Zwiększ ilość",
        addToCart: "Dodaj do koszyka",
        addedToast: "Dodano do koszyka!",
        viewCart: "Przejdź do koszyka",
        descriptionTitle: "Opis",
      },
      cart: {
        title: "Koszyk",
        emptyMessage: "Twój koszyk jest jeszcze pusty.",
        emptyCta: "Do zakupów",
        tableProduct: "Produkt",
        tableLanguage: "Język",
        tableChildName: "Imię na okładce",
        tablePrice: "Cena",
        tableQuantity: "Ilość",
        tableRemove: "Usuń",
        removeAria: "Usuń produkt z koszyka",
        decreaseAria: "Zmniejsz ilość",
        increaseAria: "Zwiększ ilość",
        subtotal: "Suma częściowa",
        total: "Do zapłaty",
        noPersonalization: "—",
        orderFormTitle: "Składanie zamówienia",
        fullName: "Imię i nazwisko",
        email: "Adres e-mail",
        phone: "Telefon",
        address: "Adres dostawy",
        comment: "Komentarz",
        commentOptional: "opcjonalnie",
        submit: "Zapłać i zamów",
        errorRequired: "To pole jest wymagane",
        errorEmail: "Podaj poprawny adres e-mail",
        errorPhone: "Podaj poprawny numer telefonu",
        errorCart: "Twój koszyk jest pusty — najpierw dodaj produkty.",
        paymentTitle: "Dziękujemy za zamówienie!",
        paymentMessage:
          "Płatności online wkrótce zostaną uruchomione. Skontaktujemy się, aby ustalić płatność i dostawę.",
        itemsCountAria: "Koszyk, liczba produktów: {{count}}",
      },
      footer: {
        tagline: "Edukacyjne produkty handmade dla dzieci, robione z troską.",
        contactLabel: "Napisz do nas:",
        rights: "© {{year}} Barn Dom. Wszelkie prawa zastrzeżone.",
      },
      common: { skipToContent: "Przejdź do treści", close: "Zamknij" },
      langName: { uk: "Ukraiński", pl: "Polski", en: "Angielski", sv: "Szwedzki" },
    },

    en: {
      nav: { home: "Home", cart: "Cart", menu: "Menu" },
      lang: { switcherLabel: "Site language" },
      type: {
        "velcro-books": "Laminated Velcro Books",
        coloring: "Coloring Books",
        "spot-it": "Spot It! Game",
        playdough: "Playdough Activities",
        "wipe-clean": "Wipe-Clean Workbooks",
        "unit-study": "Unit Study Notebooks",
      },
      typeTagline: {
        "velcro-books": "Educational velcro books for little hands",
        coloring: "Coloring pages on favorite themes",
        "spot-it": "A fun attention game for the whole family",
        playdough: "Mats and cards for playdough creativity",
        "wipe-clean": "Write, wipe and practice again",
        "unit-study": "Themed notebooks to dive into one topic",
      },
      home: {
        heroTitle: "Educational toys and workbooks, made with love",
        heroSubtitle:
          "Barn Dom is a small handmade workshop for learning and play. We create toys kids want to reach for again and again.",
        heroCta: "Choose a category",
        sectionTitle: "What are you looking for?",
        cardView: "View",
      },
      catalog: {
        allTitle: "Catalog",
        filtersAge: "Age",
        filtersCategory: "Category",
        clearFilters: "Clear filters",
        filtersToggle: "Filters",
        count: "Products found: {{count}}",
        empty: "Sorry, no products match the selected filters.",
        viewProduct: "View",
        backToTypes: "All categories",
      },
      age: { "6m": "6 mo+", "1": "1+", "3": "3+", "5": "5+", "10": "10+" },
      category: {
        animals: "Animals",
        "colors-shapes": "Colors & shapes",
        "albums-all-topics": "Albums on all topics",
        transport: "Transport",
        "human-body": "Human body",
        professions: "Professions",
        logic: "Logic",
        food: "Food",
        space: "Space",
        dinosaurs: "Dinosaurs",
        numbers: "Numbers",
        christmas: "Christmas",
        superheroes: "Superheroes",
        english: "English",
        speech: "Speech development",
        polish: "Polish",
        geography: "Geography",
        dolls: "Dolls",
      },
      product: {
        notFoundTitle: "Product not found",
        notFoundMessage: "It looks like this product no longer exists, or the link is wrong.",
        backHome: "Go home",
        price: "Price",
        languageLabel: "Book language",
        languageRequiredNote: "Choose the book language",
        personalizationLabel: "Add child's name on the cover",
        namePlaceholder: "Child's name (max 20 characters)",
        nameRequired: "Enter the child's name (max 20 characters)",
        extraPrice: "+{{price}}",
        quantityLabel: "Quantity",
        decreaseAria: "Decrease quantity",
        increaseAria: "Increase quantity",
        addToCart: "Add to cart",
        addedToast: "Added to cart!",
        viewCart: "Go to cart",
        descriptionTitle: "Description",
      },
      cart: {
        title: "Cart",
        emptyMessage: "Your cart is empty for now.",
        emptyCta: "Start shopping",
        tableProduct: "Product",
        tableLanguage: "Language",
        tableChildName: "Name on cover",
        tablePrice: "Price",
        tableQuantity: "Quantity",
        tableRemove: "Remove",
        removeAria: "Remove item from cart",
        decreaseAria: "Decrease quantity",
        increaseAria: "Increase quantity",
        subtotal: "Subtotal",
        total: "Total due",
        noPersonalization: "—",
        orderFormTitle: "Checkout",
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        address: "Delivery address",
        comment: "Comment",
        commentOptional: "optional",
        submit: "Pay and order",
        errorRequired: "This field is required",
        errorEmail: "Enter a valid email address",
        errorPhone: "Enter a valid phone number",
        errorCart: "Your cart is empty — please add products first.",
        paymentTitle: "Thank you for your order!",
        paymentMessage:
          "Online payment is being connected soon. We'll contact you to arrange payment and delivery.",
        itemsCountAria: "Cart, items: {{count}}",
      },
      footer: {
        tagline: "Handmade educational products for kids, made with care.",
        contactLabel: "Write to us:",
        rights: "© {{year}} Barn Dom. All rights reserved.",
      },
      common: { skipToContent: "Skip to content", close: "Close" },
      langName: { uk: "Ukrainian", pl: "Polish", en: "English", sv: "Swedish" },
    },

    sv: {
      nav: { home: "Hem", cart: "Varukorg", menu: "Meny" },
      lang: { switcherLabel: "Webbplatsens språk" },
      type: {
        "velcro-books": "Laminerade kardborreböcker",
        coloring: "Målarböcker",
        "spot-it": "Spot It!-spel",
        playdough: "Lekdeg-aktiviteter",
        "wipe-clean": "Skriv-och-sudda-block",
        "unit-study": "Temaböcker (unit study)",
      },
      typeTagline: {
        "velcro-books": "Pedagogiska kardborreböcker för små händer",
        coloring: "Målarbilder med älskade teman",
        "spot-it": "Ett roligt uppmärksamhetsspel för hela familjen",
        playdough: "Mattor och kort för lekdegskreativitet",
        "wipe-clean": "Skriv, sudda och öva igen",
        "unit-study": "Temaböcker för att fördjupa sig i ett ämne",
      },
      home: {
        heroTitle: "Pedagogiska leksaker och arbetsböcker, gjorda med kärlek",
        heroSubtitle:
          "Barn Dom är en liten handgjord verkstad för lek och lärande. Vi skapar leksaker som barn vill återvända till om och om igen.",
        heroCta: "Välj en kategori",
        sectionTitle: "Vad letar du efter?",
        cardView: "Visa",
      },
      catalog: {
        allTitle: "Katalog",
        filtersAge: "Ålder",
        filtersCategory: "Kategori",
        clearFilters: "Rensa filter",
        filtersToggle: "Filter",
        count: "Antal produkter: {{count}}",
        empty: "Tyvärr hittades inga produkter för de valda filtren.",
        viewProduct: "Visa",
        backToTypes: "Alla kategorier",
      },
      age: { "6m": "6 mån+", "1": "1+", "3": "3+", "5": "5+", "10": "10+" },
      category: {
        animals: "Djur",
        "colors-shapes": "Färger och former",
        "albums-all-topics": "Album om alla ämnen",
        transport: "Transport",
        "human-body": "Människokroppen",
        professions: "Yrken",
        logic: "Logik",
        food: "Mat",
        space: "Rymden",
        dinosaurs: "Dinosaurier",
        numbers: "Siffror",
        christmas: "Jul",
        superheroes: "Superhjältar",
        english: "Engelska",
        speech: "Språkutveckling",
        polish: "Polska",
        geography: "Geografi",
        dolls: "Dockor",
      },
      product: {
        notFoundTitle: "Produkten hittades inte",
        notFoundMessage: "Det verkar som att produkten inte längre finns, eller att länken är fel.",
        backHome: "Till startsidan",
        price: "Pris",
        languageLabel: "Bokens språk",
        languageRequiredNote: "Välj bokens språk",
        personalizationLabel: "Lägg till barnets namn på omslaget",
        namePlaceholder: "Barnets namn (max 20 tecken)",
        nameRequired: "Ange barnets namn (max 20 tecken)",
        extraPrice: "+{{price}}",
        quantityLabel: "Antal",
        decreaseAria: "Minska antal",
        increaseAria: "Öka antal",
        addToCart: "Lägg i varukorgen",
        addedToast: "Tillagd i varukorgen!",
        viewCart: "Gå till varukorgen",
        descriptionTitle: "Beskrivning",
      },
      cart: {
        title: "Varukorg",
        emptyMessage: "Din varukorg är tom just nu.",
        emptyCta: "Börja handla",
        tableProduct: "Produkt",
        tableLanguage: "Språk",
        tableChildName: "Namn på omslaget",
        tablePrice: "Pris",
        tableQuantity: "Antal",
        tableRemove: "Ta bort",
        removeAria: "Ta bort produkt från varukorgen",
        decreaseAria: "Minska antal",
        increaseAria: "Öka antal",
        subtotal: "Delsumma",
        total: "Att betala",
        noPersonalization: "—",
        orderFormTitle: "Beställning",
        fullName: "Fullständigt namn",
        email: "E-post",
        phone: "Telefon",
        address: "Leveransadress",
        comment: "Kommentar",
        commentOptional: "valfritt",
        submit: "Betala och beställ",
        errorRequired: "Detta fält är obligatoriskt",
        errorEmail: "Ange en giltig e-postadress",
        errorPhone: "Ange ett giltigt telefonnummer",
        errorCart: "Din varukorg är tom — lägg till produkter först.",
        paymentTitle: "Tack för din beställning!",
        paymentMessage:
          "Onlinebetalning kopplas snart in. Vi kontaktar dig för att komma överens om betalning och leverans.",
        itemsCountAria: "Varukorg, antal produkter: {{count}}",
      },
      footer: {
        tagline: "Handgjorda pedagogiska produkter för barn, gjorda med omsorg.",
        contactLabel: "Skriv till oss:",
        rights: "© {{year}} Barn Dom. Alla rättigheter förbehållna.",
      },
      common: { skipToContent: "Hoppa till innehåll", close: "Stäng" },
      langName: { uk: "Ukrainska", pl: "Polska", en: "Engelska", sv: "Svenska" },
    },
  };

  function getByPath(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== "object" || !(parts[i] in cur)) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{\{\s*(\w+)\s*\}\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : match;
    });
  }

  function getLang() {
    try {
      var saved = window.localStorage.getItem("bd_lang");
      if (saved && I18N[saved]) return saved;
    } catch (e) {
      /* localStorage unavailable (private mode, file://, etc.) — ignore */
    }
    return (window.BD_CONFIG && window.BD_CONFIG.defaultLanguage) || "uk";
  }

  function setLang(code) {
    if (!I18N[code]) return;
    try {
      window.localStorage.setItem("bd_lang", code);
    } catch (e) {
      /* ignore */
    }
  }

  function t(key, vars) {
    var lang = getLang();
    var value = getByPath(I18N[lang], key);
    if (value === undefined) value = getByPath(I18N.uk, key);
    if (value === undefined) return key;
    return interpolate(value, vars);
  }

  window.BD_I18N = I18N;
  window.BD_LANGS = LANGS;
  window.BD_T = t;
  window.BD_getLang = getLang;
  window.BD_setLang = setLang;
})();
