/*
 * Barndom — product catalog
 * --------------------------------
 * HOW TO ADD OR EDIT A PRODUCT
 * 1. Copy one of the objects inside window.BD_PRODUCTS below.
 * 2. Give it a unique "id" (lowercase, dashes, no spaces — it is used
 *    in the product page URL: product.html?id=your-id).
 * 3. Set "type" to one of: velcro-books, coloring, spot-it, playdough,
 *    wipe-clean, unit-study.
 * 4. Set "price" (a plain number, in the currency set in js/config.js)
 *    and "image" (the full-size picture, shown on the product page).
 *    You can also add "thumb" — a smaller, faster-loading version of
 *    the same picture, used everywhere else (catalog cards, "you may
 *    also like", cart lines). Leave "thumb" out and the full-size
 *    "image" is used everywhere instead — nothing breaks, it's just a
 *    bit slower to load on pages with many products.
 * 5. "ages" and "categories" only really matter for velcro-books
 *    (they power the catalog filters there) but every product can have
 *    them. Use the ids listed in window.BD_AGES / window.BD_CATEGORIES.
 * 6. "availableLanguages" lists which printed-book languages a customer
 *    can choose on the product page: any of "uk", "pl", "en", "sv".
 *    Leave it out (or leave it empty) for a product that only comes in
 *    one version — its product page then shows no language choice at
 *    all, and no "Language" line in the cart (that's what the coloring
 *    books below do).
 * 7. Fill in "name", "shortDescription" and "description" for all 4
 *    languages (uk / pl / en / sv) — these are shown to the visitor.
 * 8. Optional flags:
 *    - "bestseller: true" shows the product in the homepage bestsellers
 *      row and adds a "Bestseller" badge on its card.
 *    - "isNew: true" adds a "New" badge on its card.
 *    - "personalizable: false" hides the "add child's name on the
 *      cover" option on the product page (and the "Name" line in the
 *      cart). Every product is personalizable unless you add this —
 *      the coloring books below turn it off because that option isn't
 *      offered for them.
 *    - "images: [...]" — a list of image paths for a photo gallery on
 *      the product page (main photo + clickable thumbnails). Leave it
 *      out and the single "image" is used everywhere instead. Once real
 *      product photos exist, this is the only thing you need to add.
 * That's it — the new product will automatically show up in its
 * catalog page and can be linked to directly.
 */
(function () {
  // The 6 product types shown on the home page (as big tiles) and in the
  // header/footer menus. "pastel" picks one of the soft accent colors
  // (defined in css/styles.css) for that type's home-page tile.
  window.BD_PRODUCT_TYPES = [
    { id: "velcro-books", image: "assets/types/velcro-books.svg", pastel: "peach" },
    { id: "coloring", image: "assets/types/coloring.svg", pastel: "mint" },
    { id: "playdough", image: "assets/types/playdough.svg", pastel: "sky" },
    { id: "spot-it", image: "assets/types/spot-it.svg", pastel: "sun" },
    { id: "wipe-clean", image: "assets/types/wipe-clean.svg", pastel: "lilac" },
    // "comingSoon: true" is the ONE switch for this whole section: while
    // it's true, the site hides it from navigation (header menu, footer
    // links) and from bestsellers/search/"you may also like", and shows a
    // friendly "coming soon" page instead of a product grid if someone
    // opens its catalog link directly. Its sample products stay in the
    // list below so everything is ready — set this back to false (or
    // remove the line) the day the section is ready to launch.
    { id: "unit-study", image: "assets/types/unit-study.svg", comingSoon: true },
  ];

  // Age filter options (velcro-books catalog only).
  window.BD_AGES = ["6m", "1", "3", "5", "10"];

  // Category filter options (velcro-books catalog only).
  window.BD_CATEGORIES = [
    "animals",
    "colors-shapes",
    "albums-all-topics",
    "transport",
    "human-body",
    "professions",
    "logic",
    "food",
    "space",
    "dinosaurs",
    "numbers",
    "christmas",
    "superheroes",
    "english",
    "speech",
    "polish",
    "geography",
    "dolls",
  ];

  window.BD_PRODUCTS = [
    // ---------- velcro-books (~13 products) ----------
    {
      id: "vb-farm-animals",
      type: "velcro-books",
      price: 39,
      image: "assets/types/velcro-books.svg",
      bestseller: true,
      ages: ["1"],
      categories: ["animals"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Заламінована книжечка «Ферма: тваринки»",
        pl: "Zalaminowana książeczka „Zwierzątka z farmy”",
        en: "Farm Animals Velcro Book",
        sv: "Kardborrebok: Bondgårdsdjur",
      },
      shortDescription: {
        uk: "Липучки з тваринками ферми для перших пазликів малюка.",
        pl: "Rzepy ze zwierzątkami z farmy na pierwsze układanki malucha.",
        en: "Velcro farm-animal pieces for baby's first matching puzzles.",
        sv: "Kardborrebitar med bondgårdsdjur för bebisens första matchningspussel.",
      },
      description: {
        uk: "Яскрава заламінована книжечка з тваринками ферми на липучках. Дитина відриває і приклеює зображення, тренуючи дрібну моторику та вивчаючи перших тваринок. Витримує вологе прибирання і багато років гри.",
        pl: "Kolorowa, zalaminowana książeczka ze zwierzątkami z farmy na rzepy. Dziecko odrywa i przykleja obrazki, ćwicząc małą motorykę i poznając pierwsze zwierzęta. Wytrzymuje wilgotne czyszczenie i lata zabawy.",
        en: "A bright, laminated book with farm-animal velcro pieces. Your child peels and sticks the pictures, building fine motor skills while learning first animal names. Wipes clean and lasts for years of play.",
        sv: "En färgglad, laminerad bok med kardborrebitar med bondgårdsdjur. Barnet lossar och fäster bilderna, tränar finmotorik och lär sig sina första djur. Tål avtorkning och håller i många år.",
      },
    },
    {
      id: "vb-wild-animals",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      bestseller: true,
      ages: ["3"],
      categories: ["animals", "geography"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Дикі тварини світу",
        pl: "Dzikie zwierzęta świata",
        en: "Wild Animals of the World",
        sv: "Vilda djur i världen",
      },
      shortDescription: {
        uk: "Мандруємо континентами й знайомимось із дикими тваринками.",
        pl: "Podróżujemy po kontynentach i poznajemy dzikie zwierzęta.",
        en: "Travel the continents and meet wild animals along the way.",
        sv: "Res genom kontinenterna och möt vilda djur på vägen.",
      },
      description: {
        uk: "Книжечка на липучках із дикими тваринами різних континентів — від лева до панди. Допомагає вивчати географію та тваринний світ у грайливій формі, розвиваючи мовлення і пам'ять.",
        pl: "Książeczka na rzepy z dzikimi zwierzętami z różnych kontynentów — od lwa po pandę. Pomaga poznawać geografię i świat zwierząt w zabawny sposób, rozwijając mowę i pamięć.",
        en: "A velcro book with wild animals from every continent, from lions to pandas. It introduces geography and the animal kingdom in a playful way, building vocabulary and memory.",
        sv: "En kardborrebok med vilda djur från olika kontinenter, från lejon till pandor. Den introducerar geografi och djurriket på ett lekfullt sätt och tränar ordförråd och minne.",
      },
    },
    {
      id: "vb-colors-shapes",
      type: "velcro-books",
      price: 35,
      image: "assets/types/velcro-books.svg",
      ages: ["1"],
      categories: ["colors-shapes"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Кольори і фігури",
        pl: "Kolory i kształty",
        en: "Colors and Shapes",
        sv: "Färger och former",
      },
      shortDescription: {
        uk: "Перше знайомство з кольорами та формами на липучках.",
        pl: "Pierwsze poznawanie kolorów i kształtów na rzepy.",
        en: "A first introduction to colors and shapes with velcro pieces.",
        sv: "En första introduktion till färger och former med kardborrebitar.",
      },
      description: {
        uk: "Проста та яскрава книжечка допомагає малюку вивчити основні кольори та геометричні фігури. Великі деталі на липучках зручно тримати навіть найменшим пальчикам.",
        pl: "Prosta i kolorowa książeczka pomaga maluchowi poznać podstawowe kolory i kształty geometryczne. Duże elementy na rzepy są wygodne nawet dla najmniejszych rączek.",
        en: "A simple, colorful book that helps toddlers learn basic colors and shapes. The large velcro pieces are easy even for the smallest fingers to handle.",
        sv: "En enkel och färgglad bok som hjälper småbarn att lära sig grundfärger och former. De stora kardborrebitarna är lätta att hantera även för de minsta fingrarna.",
      },
    },
    {
      id: "vb-transport",
      type: "velcro-books",
      price: 39,
      image: "assets/types/velcro-books.svg",
      ages: ["1", "3"],
      categories: ["transport"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Транспорт",
        pl: "Transport",
        en: "Transport",
        sv: "Fordon",
      },
      shortDescription: {
        uk: "Машинки, потяги й літаки — все про транспорт для малят.",
        pl: "Samochody, pociągi i samoloty — wszystko o transporcie dla maluchów.",
        en: "Cars, trains and planes — everything about transport for little ones.",
        sv: "Bilar, tåg och flygplan — allt om fordon för de minsta.",
      },
      description: {
        uk: "Книжечка на липучках із наземним, водним і повітряним транспортом. Діти вчаться називати види транспорту та групувати їх за середовищем пересування.",
        pl: "Książeczka na rzepy z transportem lądowym, wodnym i powietrznym. Dzieci uczą się nazywać środki transportu i grupować je według środowiska.",
        en: "A velcro book featuring land, water and air transport. Children learn to name vehicles and group them by where they travel.",
        sv: "En kardborrebok med fordon på land, vatten och i luften. Barnen lär sig namnge fordon och gruppera dem efter var de färdas.",
      },
    },
    {
      id: "vb-space-explorer",
      type: "velcro-books",
      price: 45,
      image: "assets/types/velcro-books.svg",
      bestseller: true,
      ages: ["5", "10"],
      categories: ["space", "logic"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Космічний дослідник",
        pl: "Kosmiczny odkrywca",
        en: "Space Explorer",
        sv: "Rymdupptäckare",
      },
      shortDescription: {
        uk: "Планети, ракети й логічні завдання про космос.",
        pl: "Planety, rakiety i zadania logiczne o kosmosie.",
        en: "Planets, rockets and logic puzzles about outer space.",
        sv: "Planeter, raketer och logikuppgifter om rymden.",
      },
      description: {
        uk: "Тематична книжечка на липучках про космос: планети Сонячної системи, ракети та логічні завдання «знайди пару» і «що зайве». Розвиває логічне мислення і розширює кругозір.",
        pl: "Tematyczna książeczka na rzepy o kosmosie: planety Układu Słonecznego, rakiety oraz zadania logiczne „znajdź parę” i „co nie pasuje”. Rozwija myślenie logiczne i poszerza wiedzę.",
        en: "A themed velcro book about space: the planets of our solar system, rockets, and logic tasks like matching pairs and spot-the-odd-one-out. Builds logical thinking and general knowledge.",
        sv: "En temabok med kardborre om rymden: solsystemets planeter, raketer och logikuppgifter som att hitta par och udda djur ut. Utvecklar logiskt tänkande och allmänbildning.",
      },
    },
    {
      id: "vb-dino-world",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      bestseller: true,
      ages: ["3", "5"],
      categories: ["dinosaurs"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Світ динозаврів",
        pl: "Świat dinozaurów",
        en: "Dinosaur World",
        sv: "Dinosauriernas värld",
      },
      shortDescription: {
        uk: "Тіранозаври, трицератопси й інші улюбленці малечі.",
        pl: "Tyranozaury, triceratopsy i inni ulubieńcy maluchów.",
        en: "T-rexes, triceratops and other kids' favorites.",
        sv: "T-rex, triceratops och andra barnfavoriter.",
      },
      description: {
        uk: "Яскраві динозаври на липучках познайомлять дитину з доісторичним світом. Кожна фігурка підписана назвою, що допомагає вивчати нові слова.",
        pl: "Kolorowe dinozaury na rzepy wprowadzą dziecko w prehistoryczny świat. Każda figurka podpisana jest nazwą, co pomaga poznawać nowe słowa.",
        en: "Colorful velcro dinosaurs introduce your child to the prehistoric world. Each figure is labeled with its name, helping to build new vocabulary.",
        sv: "Färgglada kardborredinosaurier introducerar barnet till förhistorien. Varje figur är märkt med sitt namn, vilket hjälper till att bygga ordförråd.",
      },
    },
    {
      id: "vb-human-body",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      ages: ["5", "10"],
      categories: ["human-body"],
      availableLanguages: ["uk", "en"],
      name: {
        uk: "Тіло людини",
        pl: "Ciało człowieka",
        en: "Human Body",
        sv: "Människokroppen",
      },
      shortDescription: {
        uk: "Будова тіла людини у простих та наочних картинках.",
        pl: "Budowa ciała człowieka w prostych i przejrzystych obrazkach.",
        en: "The human body explained through simple, clear pictures.",
        sv: "Människokroppen förklarad med enkla, tydliga bilder.",
      },
      description: {
        uk: "Книжечка допомагає дитині вивчити частини тіла та органи людини у доступній грайливій формі. Чудово підходить для підготовки до школи.",
        pl: "Książeczka pomaga dziecku poznać części ciała i narządy człowieka w przystępny, zabawowy sposób. Świetnie sprawdza się w przygotowaniu do szkoły.",
        en: "This book helps children learn body parts and organs in an accessible, playful way. Great for school readiness preparation.",
        sv: "Boken hjälper barn att lära sig kroppsdelar och organ på ett tillgängligt, lekfullt sätt. Perfekt för skolförberedelse.",
      },
    },
    {
      id: "vb-professions-heroes",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      ages: ["5"],
      categories: ["professions", "superheroes"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Професії та супергерої",
        pl: "Zawody i superbohaterowie",
        en: "Professions and Superheroes",
        sv: "Yrken och superhjältar",
      },
      shortDescription: {
        uk: "Ким стати, коли виросту: від лікаря до супергероя.",
        pl: "Kim zostać, gdy dorosnę: od lekarza po superbohatera.",
        en: "What to be when I grow up: from doctor to superhero.",
        sv: "Vad ska jag bli när jag blir stor: från läkare till superhjälte.",
      },
      description: {
        uk: "Книжечка розповідає про різні професії та захопливий світ супергероїв. Розвиває уяву дитини та розширює словниковий запас про професії дорослих.",
        pl: "Książeczka opowiada o różnych zawodach i ekscytującym świecie superbohaterów. Rozwija wyobraźnię dziecka i poszerza słownictwo związane z zawodami dorosłych.",
        en: "This book explores different professions alongside the exciting world of superheroes. It sparks imagination and expands vocabulary about grown-up jobs.",
        sv: "Boken utforskar olika yrken tillsammans med superhjältarnas spännande värld. Den väcker fantasin och utökar ordförrådet kring vuxnas yrken.",
      },
    },
    {
      id: "vb-yummy-food",
      type: "velcro-books",
      price: 39,
      image: "assets/types/velcro-books.svg",
      ages: ["1", "3"],
      categories: ["food"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Смачна їжа",
        pl: "Pyszne jedzenie",
        en: "Yummy Food",
        sv: "God mat",
      },
      shortDescription: {
        uk: "Овочі, фрукти й улюблені страви на липучках.",
        pl: "Warzywa, owoce i ulubione dania na rzepy.",
        en: "Fruits, vegetables and favorite meals with velcro pieces.",
        sv: "Frukt, grönsaker och favoriträtter med kardborrebitar.",
      },
      description: {
        uk: "Книжечка з їжею допомагає дитині вивчати назви продуктів, розрізняти корисну їжу та розвиває апетит до пізнання нового.",
        pl: "Książeczka o jedzeniu pomaga dziecku poznawać nazwy produktów, odróżniać zdrowe jedzenie i rozwija apetyt na nową wiedzę.",
        en: "This food-themed book helps children learn food names, recognize healthy choices, and build an appetite for learning.",
        sv: "Denna matinspirerade bok hjälper barn att lära sig matnamn, känna igen hälsosamma val och bygga en aptit för lärande.",
      },
    },
    {
      id: "vb-numbers-logic",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      ages: ["5", "10"],
      categories: ["numbers", "logic"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Цифри та логіка",
        pl: "Liczby i logika",
        en: "Numbers and Logic",
        sv: "Siffror och logik",
      },
      shortDescription: {
        uk: "Рахуємо, порівнюємо і тренуємо логічне мислення.",
        pl: "Liczymy, porównujemy i ćwiczymy myślenie logiczne.",
        en: "Counting, comparing and training logical thinking.",
        sv: "Räkna, jämför och träna logiskt tänkande.",
      },
      description: {
        uk: "Тренажер із цифрами від 0 до 10 та логічними завданнями на встановлення послідовностей і відповідностей. Готує дитину до вивчення математики в школі.",
        pl: "Trener z liczbami od 0 do 10 oraz zadaniami logicznymi na ustalanie sekwencji i dopasowań. Przygotowuje dziecko do nauki matematyki w szkole.",
        en: "A number trainer covering 0–10 with logic tasks on sequences and matching. Prepares children for learning math at school.",
        sv: "En sifferövning som täcker 0–10 med logikuppgifter om sekvenser och matchning. Förbereder barn för att lära sig matematik i skolan.",
      },
    },
    {
      id: "vb-christmas-album",
      type: "velcro-books",
      price: 45,
      image: "assets/types/velcro-books.svg",
      ages: ["3", "5"],
      categories: ["christmas", "albums-all-topics"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Різдвяний альбом",
        pl: "Album świąteczny",
        en: "Christmas Album",
        sv: "Julalbum",
      },
      shortDescription: {
        uk: "Святковий настрій та зимові традиції у книжечці на липучках.",
        pl: "Świąteczny nastrój i zimowe tradycje w książeczce na rzepy.",
        en: "Festive mood and winter traditions in a velcro book.",
        sv: "Julstämning och vintertraditioner i en kardborrebok.",
      },
      description: {
        uk: "Різдвяна тематична книжечка з ялинками, подарунками та символами свята. Чудовий спосіб створити передсвяткову атмосферу разом із дитиною.",
        pl: "Świąteczna książeczka tematyczna z choinkami, prezentami i symbolami świąt. Świetny sposób na stworzenie przedświątecznej atmosfery z dzieckiem.",
        en: "A Christmas-themed book with trees, gifts and holiday symbols. A lovely way to build festive anticipation together with your child.",
        sv: "En jultemabok med granar, presenter och julsymboler. Ett fint sätt att bygga julstämning tillsammans med barnet.",
      },
    },
    {
      id: "vb-first-words",
      type: "velcro-books",
      price: 42,
      image: "assets/types/velcro-books.svg",
      ages: ["3", "5"],
      categories: ["english", "polish", "speech"],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Перші слова: англійська та польська",
        pl: "Pierwsze słowa: angielski i polski",
        en: "First Words: English and Polish",
        sv: "Första orden: engelska och polska",
      },
      shortDescription: {
        uk: "Картки для перших слів іноземною мовою та розвитку мовлення.",
        pl: "Karty do pierwszych słów w obcym języku i rozwoju mowy.",
        en: "Flashcards for first foreign words and speech development.",
        sv: "Flashkort för första främmande ord och språkutveckling.",
      },
      description: {
        uk: "Двомовні картки на липучках допомагають дитині вивчати перші слова англійською та польською, а вправи на називання розвивають мовлення.",
        pl: "Dwujęzyczne karty na rzepy pomagają dziecku poznawać pierwsze słowa po angielsku i po polsku, a ćwiczenia nazywania rozwijają mowę.",
        en: "Bilingual velcro flashcards help children learn their first English and Polish words, while naming exercises support speech development.",
        sv: "Tvåspråkiga kardborrekort hjälper barn att lära sig sina första ord på engelska och polska, medan namngivningsövningar stödjer språkutvecklingen.",
      },
    },
    {
      id: "vb-dolls-dressup",
      type: "velcro-books",
      price: 39,
      image: "assets/types/velcro-books.svg",
      ages: ["3"],
      categories: ["dolls", "colors-shapes"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Одягаємо ляльку",
        pl: "Ubieramy lalkę",
        en: "Dress-Up Doll",
        sv: "Klä på dockan",
      },
      shortDescription: {
        uk: "Змінне вбрання для ляльки: кольори, візерунки і фантазія.",
        pl: "Zmienne stroje dla lalki: kolory, wzory i fantazja.",
        en: "Changeable doll outfits: colors, patterns and imagination.",
        sv: "Utbytbara dockkläder: färger, mönster och fantasi.",
      },
      description: {
        uk: "Лялька на липучках із набором одягу різних кольорів і візерунків. Дитина фантазує, створюючи образи, і водночас закріплює кольори та форми.",
        pl: "Lalka na rzepy z zestawem ubrań w różnych kolorach i wzorach. Dziecko tworzy stylizacje, jednocześnie utrwalając kolory i kształty.",
        en: "A velcro doll with a set of outfits in different colors and patterns. Children create looks while reinforcing colors and shapes.",
        sv: "En kardborredocka med ett set kläder i olika färger och mönster. Barnen skapar looks samtidigt som de befäster färger och former.",
      },
    },

    // ---------- coloring ----------
    // Coloring books do NOT have a language choice and do NOT have the
    // "child's name on the cover" option (that's what "personalizable:
    // false" means below, and why there is no "availableLanguages" line).
    //
    // HOW TO ADD ANOTHER COLORING BOOK:
    // 1. Save the new cover picture in assets/products/coloring/, and
    //    (if you can) a smaller version in assets/products/coloring/thumbs/
    //    — the small version loads faster in the catalog. If you skip
    //    the small version, just remove the "thumb" line below and the
    //    site will use the full picture everywhere instead.
    // 2. Copy one whole block below (from "{" to the matching "},").
    // 3. Give it a new, unique "id".
    // 4. Point "image" (and "thumb") at the new picture's file name.
    // 5. Change "price" if it's different.
    // 6. Fill in "name", "shortDescription" and "description" in all 4
    //    languages (uk / pl / en / sv).
    {
      id: "col-christmas-magic",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/christmas-magic.webp",
      thumb: "assets/products/coloring/thumbs/christmas-magic.jpg",
      personalizable: false,
      name: {
        uk: "Різдвяна магія та затишні свята",
        pl: "Bożonarodzeniowa magia i przytulne święta",
        en: "Christmas Magic and Cozy Holidays",
        sv: "Julmagi och mysiga högtider",
      },
      shortDescription: {
        uk: "Різдвяний настрій, ялинка та подарунки для затишного розфарбовування.",
        pl: "Świąteczny nastrój, choinka i prezenty do przytulnego kolorowania.",
        en: "A festive mood with a decorated tree and gifts for cozy coloring time.",
        sv: "Julstämning med gran och paket för mysig målarstund.",
      },
      description: {
        uk: "На сторінках — діти прикрашають ялинку, готують подарунки та милуються сніжною зимою. У наборі розмальовка, олівці та наклейки, тож можна одразу починати творити святковий настрій.",
        pl: "Na stronach dzieci ozdabiają choinkę, przygotowują prezenty i podziwiają śnieżną zimę. W zestawie znajdziesz kolorowankę, kredki i naklejki, więc od razu można zacząć tworzyć świąteczny nastrój.",
        en: "On these pages, children decorate the tree, wrap gifts and admire the snowy winter outside. The set includes the coloring book, pencils and stickers, so your child can start creating festive magic right away.",
        sv: "På sidorna pyntar barnen granen, slår in paket och beundrar den snöiga vintern. I setet ingår målarboken, färgpennor och klistermärken, så det går att sätta igång direkt med julmagin.",
      },
    },
    {
      id: "col-magical-world-of-books",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/magical-world-of-books.webp",
      thumb: "assets/products/coloring/thumbs/magical-world-of-books.jpg",
      personalizable: false,
      name: {
        uk: "Чарівний світ книжок і читання",
        pl: "Magiczny świat książek i czytania",
        en: "The Magical World of Books and Reading",
        sv: "Böckernas magiska värld och läsning",
      },
      shortDescription: {
        uk: "Затишна бібліотека та маленькі читачі, які люблять історії.",
        pl: "Przytulna biblioteka i mali czytelnicy, którzy kochają historie.",
        en: "A cozy library and little readers who love a good story.",
        sv: "Ett mysigt bibliotek och små läsare som älskar berättelser.",
      },
      description: {
        uk: "Тут малюки читають книжки серед стосів томів і затишних куточків бібліотеки. У наборі розмальовка, олівці та наклейки — чудовий привід влаштувати спільний вечір читання й малювання.",
        pl: "Tutaj maluchy czytają książki wśród stosów tomów i przytulnych kącików biblioteki. W zestawie kolorowanka, kredki i naklejki — świetny pretekst na wspólny wieczór czytania i rysowania.",
        en: "Here little ones read books among tall stacks and cozy library corners. The set includes the coloring book, pencils and stickers — a lovely reason for a shared evening of reading and coloring.",
        sv: "Här läser barnen böcker bland höga bokstaplar och mysiga hörn i biblioteket. I setet ingår målarboken, färgpennor och klistermärken — en fin anledning till en gemensam kväll med läsning och målning.",
      },
    },
    {
      id: "col-pirates-treasure-islands",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/pirates-treasure-islands.webp",
      thumb: "assets/products/coloring/thumbs/pirates-treasure-islands.jpg",
      personalizable: false,
      name: {
        uk: "Пірати та острови скарбів",
        pl: "Piraci i wyspy skarbów",
        en: "Pirates and Treasure Islands",
        sv: "Pirater och skattöar",
      },
      shortDescription: {
        uk: "Піратський корабель, скриня зі скарбами й пригоди на морі.",
        pl: "Piracki statek, skrzynia ze skarbami i przygody na morzu.",
        en: "A pirate ship, a treasure chest and adventures on the high seas.",
        sv: "Ett piratskepp, en skattkista och äventyr till havs.",
      },
      description: {
        uk: "На сторінках — піратський корабель пливе до острова, де чекає скриня зі скарбами, а поруч сидить папуга. У наборі розмальовка, олівці та наклейки для справжньої піратської пригоди.",
        pl: "Na stronach piracki statek płynie ku wyspie, gdzie czeka skrzynia ze skarbami, a obok siedzi papuga. W zestawie kolorowanka, kredki i naklejki na prawdziwą piracką przygodę.",
        en: "On these pages, a pirate ship sails toward an island where a treasure chest waits, with a parrot perched nearby. The set includes the coloring book, pencils and stickers for a real pirate adventure.",
        sv: "På sidorna seglar ett piratskepp mot en ö där en skattkista väntar, med en papegoja i närheten. I setet ingår målarboken, färgpennor och klistermärken för ett riktigt piratäventyr.",
      },
    },
    {
      id: "col-candy-store",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/candy-store.webp",
      thumb: "assets/products/coloring/thumbs/candy-store.jpg",
      personalizable: false,
      name: {
        uk: "Подорож до крамниці солодощів",
        pl: "Wyprawa do sklepu ze słodyczami",
        en: "A Trip to the Candy Store",
        sv: "En resa till godisaffären",
      },
      shortDescription: {
        uk: "Цукерки, льодяники та солодкий настрій крамниці.",
        pl: "Cukierki, lizaki i słodki nastrój sklepiku.",
        en: "Candy, lollipops and the sweet mood of a candy shop.",
        sv: "Godis, klubbor och den söta stämningen i godisaffären.",
      },
      description: {
        uk: "У цій розмальовці — вітрина з цукерками, барвисті льодяники та затишна крамниця солодощів. У наборі розмальовка, олівці та наклейки для найсолодшого творчого дня.",
        pl: "W tej kolorowance znajdziesz witrynę pełną cukierków, kolorowe lizaki i przytulny sklepik ze słodyczami. W zestawie kolorowanka, kredki i naklejki na najsłodszy dzień pełen twórczości.",
        en: "This coloring book features a candy display, colorful lollipops and a cozy little sweet shop. The set includes the coloring book, pencils and stickers for the sweetest creative day.",
        sv: "Den här målarboken visar en godisdisk, färgglada klubbor och en mysig liten godisaffär. I setet ingår målarboken, färgpennor och klistermärken för den sötaste skapardagen.",
      },
    },
    {
      id: "col-magical-forest",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/magical-forest-a.webp",
      thumb: "assets/products/coloring/thumbs/magical-forest-a.jpg",
      personalizable: false,
      name: {
        uk: "Чарівний ліс",
        pl: "Zaczarowany las",
        en: "Magical Forest and Enchanted Trees",
        sv: "Den magiska skogen",
      },
      shortDescription: {
        uk: "Дівчинка читає казку серед чарівного лісу.",
        pl: "Dziewczynka czyta bajkę w zaczarowanym lesie.",
        en: "A girl reading a story deep in an enchanted forest.",
        sv: "En flicka som läser en saga i den förtrollade skogen.",
      },
      description: {
        uk: "На сторінці дівчинка вмостилася з книжкою серед дерев чарівного лісу, оточена таємничою природою. У наборі розмальовка, олівці та наклейки для спокійного творчого відпочинку.",
        pl: "Na stronie dziewczynka usadowiła się z książką wśród drzew zaczarowanego lasu, otoczona tajemniczą przyrodą. W zestawie kolorowanka, kredki i naklejki na spokojny, twórczy odpoczynek.",
        en: "On this page, a girl settles in with a book among the trees of an enchanted forest, surrounded by mysterious nature. The set includes the coloring book, pencils and stickers for calm, creative downtime.",
        sv: "På sidan har en flicka slagit sig ner med en bok bland träden i den förtrollade skogen, omgiven av mystisk natur. I setet ingår målarboken, färgpennor och klistermärken för en lugn och kreativ stund.",
      },
    },
    {
      id: "col-magical-forest-2",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/magical-forest-b.webp",
      thumb: "assets/products/coloring/thumbs/magical-forest-b.jpg",
      personalizable: false,
      name: {
        uk: "Чарівний ліс. Частина 2",
        pl: "Zaczarowany las. Część 2",
        en: "Magical Forest and Enchanted Trees. Part 2",
        sv: "Den magiska skogen. Del 2",
      },
      shortDescription: {
        uk: "Двоє дітей вирушають на прогулянку чарівним лісом.",
        pl: "Dwoje dzieci wyrusza na spacer po zaczarowanym lesie.",
        en: "Two children set off on a walk through the enchanted forest.",
        sv: "Två barn ger sig ut på en promenad genom den förtrollade skogen.",
      },
      description: {
        uk: "Продовження улюбленої теми: двоє дітей крокують стежкою чарівного лісу серед дерев і таємничих затінків. У наборі розмальовка, олівці та наклейки для нової порції пригод.",
        pl: "Kontynuacja ulubionego motywu: dwoje dzieci idzie ścieżką przez zaczarowany las, wśród drzew i tajemniczych cieni. W zestawie kolorowanka, kredki i naklejki na kolejną porcję przygód.",
        en: "A continuation of the favorite theme: two children walk a path through the enchanted forest, among trees and mysterious shadows. The set includes the coloring book, pencils and stickers for another round of adventures.",
        sv: "En fortsättning på den älskade sagovärlden: två barn vandrar längs en stig genom den förtrollade skogen, bland träd och mystiska skuggor. I setet ingår målarboken, färgpennor och klistermärken för ännu fler äventyr.",
      },
    },
    {
      id: "col-cities-of-the-future",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/cities-of-the-future.webp",
      thumb: "assets/products/coloring/thumbs/cities-of-the-future.jpg",
      personalizable: false,
      name: {
        uk: "Міста майбутнього",
        pl: "Miasta przyszłości",
        en: "Cities of the Future",
        sv: "Framtidens städer",
      },
      shortDescription: {
        uk: "Футуристичне місто з літаючим транспортом.",
        pl: "Futurystyczne miasto z latającym transportem.",
        en: "A futuristic city with flying vehicles overhead.",
        sv: "En futuristisk stad med flygande fordon.",
      },
      description: {
        uk: "На сторінках — місто майбутнього з високими будівлями та транспортом, що літає прямо між ними. У наборі розмальовка, олівці та наклейки для мандрівки у світ фантазії.",
        pl: "Na stronach miasto przyszłości z wysokimi budynkami i pojazdami latającymi tuż między nimi. W zestawie kolorowanka, kredki i naklejki na podróż do świata fantazji.",
        en: "These pages show a future city with tall buildings and vehicles flying right between them. The set includes the coloring book, pencils and stickers for a journey into a world of imagination.",
        sv: "Sidorna visar en framtidsstad med höga byggnader och fordon som flyger rakt mellan dem. I setet ingår målarboken, färgpennor och klistermärken för en resa in i fantasins värld.",
      },
    },
    {
      id: "col-robots-future-world",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/robots-future-world-a.webp",
      thumb: "assets/products/coloring/thumbs/robots-future-world-a.jpg",
      personalizable: false,
      name: {
        uk: "Роботи та світ майбутнього",
        pl: "Roboty i świat przyszłości",
        en: "Robots and Future World",
        sv: "Robotar och framtidens värld",
      },
      shortDescription: {
        uk: "Дружній робот і діти, які з ним товаришують.",
        pl: "Przyjazny robot i dzieci, które się z nim zaprzyjaźniają.",
        en: "A friendly robot and the children who become its friends.",
        sv: "En vänlig robot och barnen som blir dess vänner.",
      },
      description: {
        uk: "На малюнку діти граються поруч із дружнім роботом із світу майбутнього. У наборі розмальовка, олівці та наклейки для веселого знайомства з технологіями майбутнього.",
        pl: "Na rysunku dzieci bawią się obok przyjaznego robota ze świata przyszłości. W zestawie kolorowanka, kredki i naklejki na wesołe spotkanie z technologią przyszłości.",
        en: "The picture shows children playing alongside a friendly robot from a future world. The set includes the coloring book, pencils and stickers for a fun introduction to tomorrow's technology.",
        sv: "Bilden visar barn som leker tillsammans med en vänlig robot från framtidens värld. I setet ingår målarboken, färgpennor och klistermärken för ett roligt möte med morgondagens teknik.",
      },
    },
    {
      id: "col-robots-future-world-2",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/robots-future-world-b.webp",
      thumb: "assets/products/coloring/thumbs/robots-future-world-b.jpg",
      personalizable: false,
      name: {
        uk: "Роботи та світ майбутнього. Частина 2",
        pl: "Roboty i świat przyszłości. Część 2",
        en: "Robots and Future World. Part 2",
        sv: "Robotar och framtidens värld. Del 2",
      },
      shortDescription: {
        uk: "Ціле місто роботів чекає на розфарбовування.",
        pl: "Całe miasto robotów czeka na pokolorowanie.",
        en: "A whole city of robots waiting to be colored in.",
        sv: "En hel robotstad väntar på att målas.",
      },
      description: {
        uk: "Друга частина переносить у місто роботів із високими механічними будівлями та цікавими деталями. У наборі розмальовка, олівці та наклейки для продовження пригоди.",
        pl: "Druga część przenosi do miasta robotów z wysokimi, mechanicznymi budynkami i ciekawymi detalami. W zestawie kolorowanka, kredki i naklejki na kontynuację przygody.",
        en: "This second part takes your child into a city of robots, full of tall mechanical buildings and fun details. The set includes the coloring book, pencils and stickers to continue the adventure.",
        sv: "Del två tar med barnet till en robotstad, full av höga mekaniska byggnader och roliga detaljer. I setet ingår målarboken, färgpennor och klistermärken för att fortsätta äventyret.",
      },
    },
    {
      id: "col-jungle-safari",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/jungle-safari.webp",
      thumb: "assets/products/coloring/thumbs/jungle-safari.jpg",
      personalizable: false,
      name: {
        uk: "Сафарі в джунглях",
        pl: "Safari w dżungli",
        en: "Jungle Safari Adventure",
        sv: "Safariäventyr i djungeln",
      },
      shortDescription: {
        uk: "Джип вирушає у сафарі серед джунглевих тварин.",
        pl: "Jeep wyrusza na safari wśród zwierząt dżungli.",
        en: "A jeep sets off on safari among the animals of the jungle.",
        sv: "En jeep ger sig ut på safari bland djungelns djur.",
      },
      description: {
        uk: "На сторінках — сафарі-джип їде через густі джунглі, а навколо ховаються різні тварини. У наборі розмальовка, олівці та наклейки для справжньої пригоди в джунглях.",
        pl: "Na stronach jeep safari jedzie przez gęstą dżunglę, a wokół czają się różne zwierzęta. W zestawie kolorowanka, kredki i naklejki na prawdziwą przygodę w dżungli.",
        en: "These pages show a safari jeep driving through dense jungle, with animals peeking out all around. The set includes the coloring book, pencils and stickers for a real jungle adventure.",
        sv: "Sidorna visar en safarijeep som kör genom tät djungel, med djur som tittar fram överallt. I setet ingår målarboken, färgpennor och klistermärken för ett riktigt djungeläventyr.",
      },
    },
    {
      id: "col-snowy-rainy-days",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/snowy-rainy-days.webp",
      thumb: "assets/products/coloring/thumbs/snowy-rainy-days.jpg",
      personalizable: false,
      name: {
        uk: "Сніжні та дощові дні",
        pl: "Śnieżne i deszczowe dni",
        en: "Snowy Day Activities, Rainy Days and Puddles",
        sv: "Snöiga och regniga dagar",
      },
      shortDescription: {
        uk: "Сніговик, санчата й веселі калюжі під парасолькою.",
        pl: "Bałwanek, sanki i wesołe kałuże pod parasolem.",
        en: "A snowman, a sledge and cheerful puddles under an umbrella.",
        sv: "En snögubbe, en pulka och glada pölar under paraplyet.",
      },
      description: {
        uk: "Тут — сніговик і санчата для зимових забав, а поруч дощові калюжі й парасолька для дощової пори. У наборі розмальовка, олівці та наклейки для будь-якої погоди за вікном.",
        pl: "Tutaj bałwanek i sanki na zimowe zabawy, a obok kałuże i parasol na deszczowe dni. W zestawie kolorowanka, kredki i naklejki na każdą pogodę za oknem.",
        en: "Here you'll find a snowman and a sledge for winter fun, alongside rain puddles and an umbrella for rainy days. The set includes the coloring book, pencils and stickers for whatever the weather brings.",
        sv: "Här finns en snögubbe och en pulka för vinterlek, tillsammans med regnpölar och ett paraply för regniga dagar. I setet ingår målarboken, färgpennor och klistermärken oavsett vädret utanför.",
      },
    },
    {
      id: "col-beach-day-sandcastles",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/beach-day-sandcastles.webp",
      thumb: "assets/products/coloring/thumbs/beach-day-sandcastles.jpg",
      personalizable: false,
      name: {
        uk: "День на пляжі та замки з піску",
        pl: "Dzień na plaży i zamki z piasku",
        en: "Beach Day and Sand Castles",
        sv: "En dag på stranden och sandslott",
      },
      shortDescription: {
        uk: "Замок із піску, море та пляжні іграшки.",
        pl: "Zamek z piasku, morze i plażowe zabawki.",
        en: "A sandcastle, the sea and beach toys.",
        sv: "Ett sandslott, havet och strandleksaker.",
      },
      description: {
        uk: "На сторінках — замок із піску на березі моря, а поруч пляжні відерця та лопатки. У наборі розмальовка, олівці та наклейки, щоб відчути літній настрій у будь-яку пору року.",
        pl: "Na stronach zamek z piasku nad brzegiem morza, a obok plażowe wiaderka i łopatki. W zestawie kolorowanka, kredki i naklejki, by poczuć letni nastrój o każdej porze roku.",
        en: "These pages show a sandcastle by the sea, along with beach buckets and spades. The set includes the coloring book, pencils and stickers to bring summer mood any time of year.",
        sv: "Sidorna visar ett sandslott vid havet, tillsammans med strandhinkar och spadar. I setet ingår målarboken, färgpennor och klistermärken för att fånga sommarkänslan när som helst på året.",
      },
    },
    {
      id: "col-insects-and-bugs",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/insects-and-bugs.webp",
      thumb: "assets/products/coloring/thumbs/insects-and-bugs.jpg",
      personalizable: false,
      name: {
        uk: "Комахи та жучки",
        pl: "Owady i robaczki",
        en: "Insects and Bugs",
        sv: "Insekter och kryp",
      },
      shortDescription: {
        uk: "Бджілка, сонечко, бабка та равлик у одній розмальовці.",
        pl: "Pszczółka, biedronka, ważka i ślimak w jednej kolorowance.",
        en: "A bee, a ladybird, a dragonfly and a snail in one coloring book.",
        sv: "En bi, en nyckelpiga, en trollslända och en snigel i en och samma målarbok.",
      },
      description: {
        uk: "Тут дитина зустріне бджілку, сонечко, бабку та равлика — маленьких, але цікавих мешканців саду. У наборі розмальовка, олівці та наклейки для знайомства зі світом комах.",
        pl: "Tu dziecko spotka pszczółkę, biedronkę, ważkę i ślimaka — małych, ale ciekawych mieszkańców ogrodu. W zestawie kolorowanka, kredki i naklejki na poznanie świata owadów.",
        en: "Here your child will meet a bee, a ladybird, a dragonfly and a snail — small but fascinating garden dwellers. The set includes the coloring book, pencils and stickers for exploring the world of insects.",
        sv: "Här möter barnet ett bi, en nyckelpiga, en trollslända och en snigel — små men fascinerande invånare i trädgården. I setet ingår målarboken, färgpennor och klistermärken för att utforska insekternas värld.",
      },
    },
    {
      id: "col-farm-animals",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/farm-animals.webp",
      thumb: "assets/products/coloring/thumbs/farm-animals.jpg",
      personalizable: false,
      name: {
        uk: "Тваринки на фермі",
        pl: "Zwierzątka na farmie",
        en: "Farm Animals and Life",
        sv: "Djuren på bondgården",
      },
      shortDescription: {
        uk: "Корівка, овечка, коник, порося й курчата на фермі.",
        pl: "Krówka, owieczka, konik, świnka i kurczaczki na farmie.",
        en: "A cow, a sheep, a horse, a pig and chickens on the farm.",
        sv: "En ko, ett får, en häst, en gris och kycklingar på gården.",
      },
      description: {
        uk: "На сторінках — корівка, овечка, коник, порося та курчата, які живуть на затишній фермі. У наборі розмальовка, олівці та наклейки для перших знайомств із тваринками ферми.",
        pl: "Na stronach krówka, owieczka, konik, świnka i kurczaczki, które mieszkają na przytulnej farmie. W zestawie kolorowanka, kredki i naklejki na pierwsze spotkania ze zwierzątkami z farmy.",
        en: "These pages feature a cow, a sheep, a horse, a pig and chickens living on a cozy farm. The set includes the coloring book, pencils and stickers for a first meeting with farm animals.",
        sv: "Sidorna visar en ko, ett får, en häst, en gris och kycklingar som bor på en mysig bondgård. I setet ingår målarboken, färgpennor och klistermärken för ett första möte med gårdens djur.",
      },
    },
    {
      id: "col-sports-outdoor",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/sports-outdoor.webp",
      thumb: "assets/products/coloring/thumbs/sports-outdoor.jpg",
      personalizable: false,
      name: {
        uk: "Спорт та активний відпочинок",
        pl: "Sport i aktywny wypoczynek",
        en: "Sports and Outdoor Activities",
        sv: "Sport och utomhusaktiviteter",
      },
      shortDescription: {
        uk: "Велосипед, м'яч, намет і скелелазіння для активних днів.",
        pl: "Rower, piłka, namiot i wspinaczka na aktywne dni.",
        en: "A bike, a ball, a tent and climbing for active days.",
        sv: "Cykel, boll, tält och klättring för aktiva dagar.",
      },
      description: {
        uk: "Тут — велосипед, м'яч, намет для походу та скелелазіння для найактивніших днів. У наборі розмальовка, олівці та наклейки, що надихають рухатися й досліджувати світ.",
        pl: "Tutaj rower, piłka, namiot na wyprawę i wspinaczka na najbardziej aktywne dni. W zestawie kolorowanka, kredki i naklejki, które zachęcają do ruchu i odkrywania świata.",
        en: "Here you'll find a bike, a ball, a camping tent and climbing for the most active days. The set includes the coloring book, pencils and stickers that inspire moving and exploring the world.",
        sv: "Här finns en cykel, en boll, ett tält för utflykter och klättring för de mest aktiva dagarna. I setet ingår målarboken, färgpennor och klistermärken som inspirerar till rörelse och upptäckter.",
      },
    },
    {
      id: "col-under-the-sea",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/under-the-sea.webp",
      thumb: "assets/products/coloring/thumbs/under-the-sea.jpg",
      personalizable: false,
      name: {
        uk: "Підводний світ",
        pl: "Podwodny świat",
        en: "Under the Sea: Marine Life",
        sv: "Under havet: havets liv",
      },
      shortDescription: {
        uk: "Кит, восьминіг, підводний човен і корали в глибині моря.",
        pl: "Wieloryb, ośmiornica, łódź podwodna i koralowce w głębinach morza.",
        en: "A whale, an octopus, a submarine and corals deep in the sea.",
        sv: "En val, en bläckfisk, en ubåt och koraller djupt i havet.",
      },
      description: {
        uk: "На сторінках — кит, восьминіг і підводний човен пропливають повз барвисті корали. У наборі розмальовка, олівці та наклейки для занурення у підводний світ.",
        pl: "Na stronach wieloryb, ośmiornica i łódź podwodna przepływają obok kolorowych koralowców. W zestawie kolorowanka, kredki i naklejki na zanurzenie się w podwodnym świecie.",
        en: "These pages show a whale, an octopus and a submarine passing by colorful coral reefs. The set includes the coloring book, pencils and stickers for diving into the underwater world.",
        sv: "Sidorna visar en val, en bläckfisk och en ubåt som passerar färgglada korallrev. I setet ingår målarboken, färgpennor och klistermärken för en dykning ner i havets värld.",
      },
    },
    {
      id: "col-dragons-mythical-beasts",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/dragons-mythical-beasts.webp",
      thumb: "assets/products/coloring/thumbs/dragons-mythical-beasts.jpg",
      personalizable: false,
      name: {
        uk: "Дракони та міфічні істоти",
        pl: "Smoki i mityczne stworzenia",
        en: "Dragons and Mythical Beasts",
        sv: "Drakar och mytiska varelser",
      },
      shortDescription: {
        uk: "Дракони, єдинороги й грифон біля старовинного замку.",
        pl: "Smoki, jednorożce i gryf przy starym zamku.",
        en: "Dragons, unicorns and a griffin near an ancient castle.",
        sv: "Drakar, enhörningar och ett gripdjur nära ett gammalt slott.",
      },
      description: {
        uk: "На сторінках оживають дракони, єдинороги та грифон на тлі величного старовинного замку. У наборі розмальовка, олівці та наклейки для мандрівки у світ казкових істот.",
        pl: "Na stronach ożywają smoki, jednorożce i gryf na tle okazałego, starego zamku. W zestawie kolorowanka, kredki i naklejki na podróż do świata baśniowych stworzeń.",
        en: "On these pages, dragons, unicorns and a griffin come to life against the backdrop of a grand old castle. The set includes the coloring book, pencils and stickers for a journey into a world of legendary creatures.",
        sv: "På sidorna får drakar, enhörningar och ett gripdjur liv mot bakgrunden av ett ståtligt gammalt slott. I setet ingår målarboken, färgpennor och klistermärken för en resa in i de mytiska varelsernas värld.",
      },
    },
    {
      id: "col-alphabet-adventures",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/alphabet-adventures.webp",
      thumb: "assets/products/coloring/thumbs/alphabet-adventures.jpg",
      personalizable: false,
      name: {
        uk: "Пригоди з абеткою",
        pl: "Przygody z alfabetem",
        en: "Alphabet Adventures",
        sv: "Äventyr med alfabetet",
      },
      shortDescription: {
        uk: "Літери, тваринки й розгорнута книжка для перших букв.",
        pl: "Litery, zwierzątka i otwarta książka na pierwsze litery.",
        en: "Letters, animals and an open book for learning first letters.",
        sv: "Bokstäver, djur och en uppslagen bok för de första bokstäverna.",
      },
      description: {
        uk: "На сторінках — літери абетки поруч із тваринками та розгорнутою книжкою. У наборі розмальовка, олівці та наклейки для веселого знайомства з буквами.",
        pl: "Na stronach litery alfabetu obok zwierzątek i otwartej książki. W zestawie kolorowanka, kredki i naklejki na wesołe poznawanie liter.",
        en: "These pages feature the letters of the alphabet alongside animals and an open storybook. The set includes the coloring book, pencils and stickers for a fun first meeting with letters.",
        sv: "Sidorna visar alfabetets bokstäver tillsammans med djur och en uppslagen bok. I setet ingår målarboken, färgpennor och klistermärken för ett roligt möte med bokstäverna.",
      },
    },
    {
      id: "col-numbers-shapes-nature",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/numbers-shapes-nature.webp",
      thumb: "assets/products/coloring/thumbs/numbers-shapes-nature.jpg",
      personalizable: false,
      name: {
        uk: "Цифри та форми в природі",
        pl: "Liczby i kształty w przyrodzie",
        en: "Numbers and Shapes in Nature",
        sv: "Siffror och former i naturen",
      },
      shortDescription: {
        uk: "Цифри від 1 до 8 і фігури серед природних мотивів.",
        pl: "Liczby od 1 do 8 i kształty wśród motywów przyrody.",
        en: "Numbers from 1 to 8 and shapes set among nature motifs.",
        sv: "Siffrorna 1 till 8 och former bland naturmotiv.",
      },
      description: {
        uk: "На сторінках цифри від 1 до 8 та різні геометричні фігури переплітаються з мотивами природи. У наборі розмальовка, олівці та наклейки для веселого вивчення цифр і форм.",
        pl: "Na stronach liczby od 1 do 8 oraz różne kształty geometryczne przeplatają się z motywami przyrody. W zestawie kolorowanka, kredki i naklejki na wesołą naukę liczb i kształtów.",
        en: "These pages weave numbers from 1 to 8 and various geometric shapes together with nature motifs. The set includes the coloring book, pencils and stickers for a fun way to learn numbers and shapes.",
        sv: "Sidorna väver samman siffrorna 1 till 8 och olika geometriska former med naturmotiv. I setet ingår målarboken, färgpennor och klistermärken för ett roligt sätt att lära sig siffror och former.",
      },
    },
    {
      id: "col-a-day-at-the-zoo",
      type: "coloring",
      price: 21,
      image: "assets/products/coloring/a-day-at-the-zoo.webp",
      thumb: "assets/products/coloring/thumbs/a-day-at-the-zoo.jpg",
      personalizable: false,
      name: {
        uk: "День у зоопарку",
        pl: "Dzień w zoo",
        en: "A Day at the Zoo",
        sv: "En dag i djurparken",
      },
      shortDescription: {
        uk: "Лев, жирафа, слон, панда й мавпочка чекають у зоопарку.",
        pl: "Lew, żyrafa, słoń, panda i małpka czekają w zoo.",
        en: "A lion, a giraffe, an elephant, a panda and a monkey at the zoo.",
        sv: "Ett lejon, en giraff, en elefant, en panda och en apa i djurparken.",
      },
      description: {
        uk: "На сторінках — лев, жирафа, слон, панда та мавпочка, які чекають на зустріч у зоопарку. У наборі розмальовка, олівці та наклейки для веселої мандрівки зоопарком.",
        pl: "Na stronach lew, żyrafa, słoń, panda i małpka czekają na spotkanie w zoo. W zestawie kolorowanka, kredki i naklejki na wesołą wyprawę do zoo.",
        en: "These pages bring a lion, a giraffe, an elephant, a panda and a monkey ready to meet at the zoo. The set includes the coloring book, pencils and stickers for a fun trip to the zoo.",
        sv: "Sidorna bjuder på ett lejon, en giraff, en elefant, en panda och en apa som väntar på att hälsas på i djurparken. I setet ingår målarboken, färgpennor och klistermärken för ett roligt besök i djurparken.",
      },
    },

    // ---------- spot-it ----------
    {
      id: "spot-it-animals",
      type: "spot-it",
      price: 49,
      image: "assets/types/spot-it.svg",
      bestseller: true,
      ages: ["5", "10"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Гра Spot It! «Тваринки»",
        pl: "Gra Spot It! „Zwierzątka”",
        en: "Spot It! Game: Animals",
        sv: "Spot It!-spel: Djur",
      },
      shortDescription: {
        uk: "Знайди однакову тваринку швидше за суперника!",
        pl: "Znajdź to samo zwierzątko szybciej niż przeciwnik!",
        en: "Spot the matching animal faster than your opponent!",
        sv: "Hitta samma djur snabbare än din motståndare!",
      },
      description: {
        uk: "Кожна картка містить кілька тваринок, і на будь-яких двох картках завжди є рівно один спільний символ. Гра розвиває швидкість реакції та увагу, підходить для родинних вечорів.",
        pl: "Każda karta zawiera kilka zwierzątek, a na dowolnych dwóch kartach zawsze jest dokładnie jeden wspólny symbol. Gra rozwija refleks i uwagę, świetna na rodzinne wieczory.",
        en: "Every card shows several animals, and any two cards always share exactly one matching symbol. This game builds quick reflexes and focus — great for family game nights.",
        sv: "Varje kort visar flera djur, och två kort delar alltid exakt en gemensam symbol. Spelet tränar snabba reflexer och fokus — perfekt för familjekvällar.",
      },
    },
    {
      id: "spot-it-numbers",
      type: "spot-it",
      price: 49,
      image: "assets/types/spot-it.svg",
      ages: ["5", "10"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Гра Spot It! «Цифри»",
        pl: "Gra Spot It! „Liczby”",
        en: "Spot It! Game: Numbers",
        sv: "Spot It!-spel: Siffror",
      },
      shortDescription: {
        uk: "Весела гра на уважність із цифрами та фігурками.",
        pl: "Wesoła gra na spostrzegawczość z liczbami i figurkami.",
        en: "A fun attention game with numbers and little figures.",
        sv: "Ett roligt uppmärksamhetsspel med siffror och figurer.",
      },
      description: {
        uk: "Варіант улюбленої гри з цифрами замість малюнків — чудово підходить для тренування рахунку в ігровій формі разом із класичною механікою пошуку пари.",
        pl: "Wariant ulubionej gry z liczbami zamiast obrazków — świetny do ćwiczenia liczenia w formie zabawy, z klasyczną mechaniką szukania pary.",
        en: "A number-based twist on the classic matching game — a fun way to practice counting alongside the familiar spot-the-match mechanic.",
        sv: "En sifferversion av det klassiska matchningsspelet — ett roligt sätt att öva räkning tillsammans med den bekanta hitta-paret-mekaniken.",
      },
    },

    // ---------- playdough ----------
    {
      id: "playdough-shapes-mats",
      type: "playdough",
      price: 28,
      image: "assets/types/playdough.svg",
      bestseller: true,
      ages: ["1", "3"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Килимки для пластиліну «Фігури»",
        pl: "Maty do plasteliny „Kształty”",
        en: "Playdough Mats: Shapes",
        sv: "Lekdegsmattor: Former",
      },
      shortDescription: {
        uk: "Ліпимо фігури й тренуємо дрібну моторику.",
        pl: "Lepimy kształty i ćwiczymy małą motorykę.",
        en: "Sculpt shapes and build fine motor skills.",
        sv: "Forma former och träna finmotorik.",
      },
      description: {
        uk: "Заламіновані килимки з контурами геометричних фігур для ліплення з пластиліну. Розвивають дрібну моторику, творчість і знання форм.",
        pl: "Zalaminowane maty z konturami figur geometrycznych do lepienia z plasteliny. Rozwijają małą motorykę, kreatywność i znajomość kształtów.",
        en: "Laminated mats with geometric shape outlines for playdough sculpting. Builds fine motor skills, creativity and shape recognition.",
        sv: "Laminerade mattor med geometriska formkonturer för lekdegsmodellering. Tränar finmotorik, kreativitet och formigenkänning.",
      },
    },
    {
      id: "playdough-alphabet-mats",
      type: "playdough",
      price: 28,
      image: "assets/types/playdough.svg",
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Килимки для пластиліну «Літери»",
        pl: "Maty do plasteliny „Litery”",
        en: "Playdough Mats: Alphabet",
        sv: "Lekdegsmattor: Alfabetet",
      },
      shortDescription: {
        uk: "Ліпимо літери та вчимо алфавіт весело.",
        pl: "Lepimy litery i uczymy się alfabetu w zabawny sposób.",
        en: "Sculpt letters and learn the alphabet the fun way.",
        sv: "Forma bokstäver och lär dig alfabetet på ett roligt sätt.",
      },
      description: {
        uk: "Килимки з контурами літер допомагають дитині запам'ятати алфавіт через дотик і ліплення з пластиліну. Чудова підготовка до письма.",
        pl: "Maty z konturami liter pomagają dziecku zapamiętać alfabet poprzez dotyk i lepienie z plasteliny. Świetne przygotowanie do pisania.",
        en: "Mats with letter outlines help children memorize the alphabet through touch and playdough sculpting. Great preparation for writing.",
        sv: "Mattor med bokstavskonturer hjälper barn att minnas alfabetet genom beröring och lekdegsmodellering. Ett bra sätt att förbereda för skrivning.",
      },
    },

    // ---------- wipe-clean ----------
    {
      id: "wipe-clean-numbers",
      type: "wipe-clean",
      price: 32,
      image: "assets/types/wipe-clean.svg",
      bestseller: true,
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Пиши-стирай «Цифри та рахунок»",
        pl: "Pisz i wycieraj „Liczby i liczenie”",
        en: "Wipe-Clean Workbook: Numbers and Counting",
        sv: "Skriv-och-sudda: Siffror och räkning",
      },
      shortDescription: {
        uk: "Тренуємось писати цифри й рахувати знову й знову.",
        pl: "Ćwiczymy pisanie liczb i liczenie w kółko.",
        en: "Practice writing numbers and counting again and again.",
        sv: "Öva att skriva siffror och räkna om och om igen.",
      },
      description: {
        uk: "Зошит із ламінованими сторінками для тренування написання цифр і рахунку маркером, який легко стирається. Можна використовувати безліч разів.",
        pl: "Zeszyt z laminowanymi stronami do ćwiczenia pisania liczb i liczenia pisakiem, który łatwo się ściera. Można używać wielokrotnie.",
        en: "A workbook with laminated pages for practicing number writing and counting with an easy-wipe marker. Reusable again and again.",
        sv: "En arbetsbok med laminerade sidor för att öva sifferskrivning och räkning med en penna som lätt suddas bort. Återanvändbar om och om igen.",
      },
    },
    {
      id: "wipe-clean-letters",
      type: "wipe-clean",
      price: 32,
      image: "assets/types/wipe-clean.svg",
      ages: ["5", "10"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Пиши-стирай «Літери та слова»",
        pl: "Pisz i wycieraj „Litery i słowa”",
        en: "Wipe-Clean Workbook: Letters and Words",
        sv: "Skriv-och-sudda: Bokstäver och ord",
      },
      shortDescription: {
        uk: "Пишемо літери і перші слова маркером для пиши-стирай.",
        pl: "Piszemy litery i pierwsze słowa pisakiem do wycierania.",
        en: "Practice letters and first words with a wipe-clean marker.",
        sv: "Öva bokstäver och första ord med en skriv-och-sudda-penna.",
      },
      description: {
        uk: "Ламінований зошит для тренування написання літер і перших слів. Ідеальний інструмент для підготовки руки дитини до письма.",
        pl: "Laminowany zeszyt do ćwiczenia pisania liter i pierwszych słów. Idealne narzędzie do przygotowania ręki dziecka do pisania.",
        en: "A laminated workbook for practicing letters and first words. The perfect tool to prepare a child's hand for writing.",
        sv: "En laminerad arbetsbok för att öva bokstäver och första ord. Det perfekta verktyget för att förbereda barnets hand för skrivning.",
      },
    },

    // ---------- unit-study ----------
    {
      id: "unit-space",
      type: "unit-study",
      price: 48,
      image: "assets/types/unit-study.svg",
      ages: ["5", "10"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Тематичний зошит «Космос»",
        pl: "Zeszyt tematyczny „Kosmos”",
        en: "Unit Study Notebook: Space",
        sv: "Temabok: Rymden",
      },
      shortDescription: {
        uk: "Занурення в тему космосу через завдання й факти.",
        pl: "Zanurzenie w temat kosmosu poprzez zadania i ciekawostki.",
        en: "A deep dive into space through activities and facts.",
        sv: "En djupdykning i rymden genom aktiviteter och fakta.",
      },
      description: {
        uk: "Тематичний зошит зібрав завдання, розмальовки й цікаві факти про космос в одному місці. Підходить для домашнього навчання та занять у групі.",
        pl: "Zeszyt tematyczny zebrał zadania, kolorowanki i ciekawostki o kosmosie w jednym miejscu. Idealny do edukacji domowej i zajęć grupowych.",
        en: "This unit study notebook brings together activities, coloring pages and fun facts about space in one place. Great for homeschooling and group lessons.",
        sv: "Denna temabok samlar aktiviteter, målarsidor och roliga fakta om rymden på ett ställe. Perfekt för hemundervisning och grupplektioner.",
      },
    },
    {
      id: "unit-dinosaurs",
      type: "unit-study",
      price: 48,
      image: "assets/types/unit-study.svg",
      isNew: true,
      ages: ["5", "10"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Тематичний зошит «Динозаври»",
        pl: "Zeszyt tematyczny „Dinozaury”",
        en: "Unit Study Notebook: Dinosaurs",
        sv: "Temabok: Dinosaurier",
      },
      shortDescription: {
        uk: "Все про динозаврів в одному тематичному зошиті.",
        pl: "Wszystko o dinozaurach w jednym zeszycie tematycznym.",
        en: "Everything about dinosaurs in one unit study notebook.",
        sv: "Allt om dinosaurier i en temabok.",
      },
      description: {
        uk: "Зошит із завданнями, фактами та розмальовками про різні види динозаврів. Розвиває допитливість та любов до природничих наук.",
        pl: "Zeszyt z zadaniami, ciekawostkami i kolorowankami o różnych gatunkach dinozaurów. Rozwija ciekawość i miłość do nauk przyrodniczych.",
        en: "A notebook full of activities, facts and coloring pages about different dinosaur species. Builds curiosity and a love of natural science.",
        sv: "En bok full av aktiviteter, fakta och målarsidor om olika dinosauriearter. Väcker nyfikenhet och kärlek till naturvetenskap.",
      },
    },
    {
      id: "unit-seasons",
      type: "unit-study",
      price: 45,
      image: "assets/types/unit-study.svg",
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Тематичний зошит «Пори року»",
        pl: "Zeszyt tematyczny „Pory roku”",
        en: "Unit Study Notebook: Seasons",
        sv: "Temabok: Årstiderna",
      },
      shortDescription: {
        uk: "Спостерігаємо за природою протягом усього року.",
        pl: "Obserwujemy przyrodę przez cały rok.",
        en: "Observing nature through all four seasons.",
        sv: "Observera naturen genom alla fyra årstiderna.",
      },
      description: {
        uk: "Зошит про весну, літо, осінь і зиму із завданнями на спостережливість і творчі вправи. Допомагає дитині зрозуміти природні цикли.",
        pl: "Zeszyt o wiośnie, lecie, jesieni i zimie z zadaniami na spostrzegawczość i ćwiczeniami twórczymi. Pomaga dziecku zrozumieć cykle przyrody.",
        en: "A notebook covering spring, summer, autumn and winter with observation tasks and creative exercises. Helps children understand nature's cycles.",
        sv: "En bok som täcker vår, sommar, höst och vinter med observationsuppgifter och kreativa övningar. Hjälper barn förstå naturens kretslopp.",
      },
    },
  ];
})();
