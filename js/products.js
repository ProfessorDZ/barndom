/*
 * Barn Dom — product catalog (sample data)
 * --------------------------------
 * HOW TO ADD OR EDIT A PRODUCT
 * 1. Copy one of the objects inside window.BD_PRODUCTS below.
 * 2. Give it a unique "id" (lowercase, dashes, no spaces — it is used
 *    in the product page URL: product.html?id=your-id).
 * 3. Set "type" to one of: velcro-books, coloring, spot-it, playdough,
 *    wipe-clean, unit-study.
 * 4. Set "price" (a plain number, in the currency set in js/config.js)
 *    and "image" (path to a picture — for now we reuse the type
 *    illustration in assets/types/, real photos can replace it later).
 * 5. "ages" and "categories" only really matter for velcro-books
 *    (they power the catalog filters there) but every product can have
 *    them. Use the ids listed in window.BD_AGES / window.BD_CATEGORIES.
 * 6. "availableLanguages" lists which printed-book languages a customer
 *    can choose on the product page: any of "uk", "pl", "en", "sv".
 * 7. Fill in "name", "shortDescription" and "description" for all 4
 *    languages (uk / pl / en / sv) — these are shown to the visitor.
 * 8. Optional flags:
 *    - "bestseller: true" shows the product in the homepage bestsellers
 *      row and adds a "Bestseller" badge on its card.
 *    - "isNew: true" adds a "New" badge on its card.
 *    - "images: [...]" — a list of image paths for a photo gallery on
 *      the product page (main photo + clickable thumbnails). Leave it
 *      out and the single "image" is used everywhere instead. Once real
 *      product photos exist, this is the only thing you need to add.
 * That's it — the new product will automatically show up in its
 * catalog page and can be linked to directly.
 */
(function () {
  // The 6 product types shown on the home page and in the header menu.
  window.BD_PRODUCT_TYPES = [
    { id: "velcro-books", image: "assets/types/velcro-books.svg" },
    { id: "coloring", image: "assets/types/coloring.svg" },
    { id: "spot-it", image: "assets/types/spot-it.svg" },
    { id: "playdough", image: "assets/types/playdough.svg" },
    { id: "wipe-clean", image: "assets/types/wipe-clean.svg" },
    { id: "unit-study", image: "assets/types/unit-study.svg" },
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
    {
      id: "col-animals",
      type: "coloring",
      price: 18,
      image: "assets/types/coloring.svg",
      bestseller: true,
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Розмальовка «Тваринки»",
        pl: "Kolorowanka „Zwierzątka”",
        en: "Coloring Book: Animals",
        sv: "Målarbok: Djur",
      },
      shortDescription: {
        uk: "Великі контури тваринок для перших розмальовок.",
        pl: "Duże kontury zwierzątek do pierwszych kolorowanek.",
        en: "Large animal outlines for first coloring experiences.",
        sv: "Stora djurkonturer för de första målarstunderna.",
      },
      description: {
        uk: "Збірка сторінок-розмальовок із великими та простими контурами тваринок. Ідеально підходить для перших спроб малювання та розвитку дрібної моторики.",
        pl: "Zbiór stron do kolorowania z dużymi, prostymi konturami zwierzątek. Idealny na pierwsze próby rysowania i rozwój małej motoryki.",
        en: "A collection of coloring pages with large, simple animal outlines. Perfect for first drawing attempts and fine motor development.",
        sv: "En samling målarsidor med stora, enkla djurkonturer. Perfekt för de första ritförsöken och finmotorisk utveckling.",
      },
    },
    {
      id: "col-space",
      type: "coloring",
      price: 18,
      image: "assets/types/coloring.svg",
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en"],
      name: {
        uk: "Розмальовка «Космос»",
        pl: "Kolorowanka „Kosmos”",
        en: "Coloring Book: Space",
        sv: "Målarbok: Rymden",
      },
      shortDescription: {
        uk: "Ракети, планети й зорельоти для юних мрійників.",
        pl: "Rakiety, planety i statki kosmiczne dla młodych marzycieli.",
        en: "Rockets, planets and spaceships for young dreamers.",
        sv: "Raketer, planeter och rymdskepp för unga drömmare.",
      },
      description: {
        uk: "Космічна розмальовка з ракетами, планетами та астронавтами. Розвиває фантазію та охайність під час розфарбовування деталей.",
        pl: "Kosmiczna kolorowanka z rakietami, planetami i astronautami. Rozwija wyobraźnię i staranność podczas kolorowania detali.",
        en: "A space-themed coloring book with rockets, planets and astronauts. Builds imagination and neatness while coloring in the details.",
        sv: "En rymdtemamålarbok med raketer, planeter och astronauter. Utvecklar fantasi och noggrannhet när detaljerna målas.",
      },
    },
    {
      id: "col-fairytale",
      type: "coloring",
      price: 18,
      image: "assets/types/coloring.svg",
      ages: ["3", "5"],
      categories: [],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Розмальовка «Казковий ліс»",
        pl: "Kolorowanka „Baśniowy las”",
        en: "Coloring Book: Fairytale Forest",
        sv: "Målarbok: Sagoskogen",
      },
      shortDescription: {
        uk: "Ельфи, гриби-будиночки та лісові звірята.",
        pl: "Elfy, grzybowe domki i leśne zwierzątka.",
        en: "Elves, mushroom houses and forest creatures.",
        sv: "Alver, svamphus och skogsdjur.",
      },
      description: {
        uk: "Чарівна розмальовка з мешканцями казкового лісу. Розвиває уяву й дарує затишні хвилини творчості разом із дитиною.",
        pl: "Magiczna kolorowanka z mieszkańcami baśniowego lasu. Rozwija wyobraźnię i daje przytulne chwile twórczości z dzieckiem.",
        en: "A magical coloring book featuring fairytale-forest characters. Sparks imagination and offers cozy creative time with your child.",
        sv: "En magisk målarbok med sagoskogens invånare. Väcker fantasin och ger mysiga stunder av skapande tillsammans med barnet.",
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
