/*
 * Barndom — product catalog
 * --------------------------------
 * HOW TO ADD OR EDIT A PRODUCT
 * 1. Copy one of the objects inside window.BD_PRODUCTS below.
 * 2. Give it a unique "id" (lowercase, dashes, no spaces — it is used
 *    in the product page URL: product.html?id=your-id).
 * 3. Set "type" to one of: velcro-books, coloring, spot-it, playdough,
 *    wipe-clean, unit-study.
 * 4. Set "price" and "image" (the full-size picture, shown on the
 *    product page).
 *
 *    PRICES AND CURRENCIES — READ THIS FIRST
 *    The site shows PLN, EUR or SEK depending on which language the
 *    visitor has picked (see "currencyByLanguage" in js/config.js) — NOT
 *    one currency for the whole shop. So "price" is not a single number
 *    any more, it's one plain number PER currency:
 *      price: { PLN: 21, EUR: 5, SEK: 55 }
 *    There is no automatic conversion between them — nothing here is
 *    calculated from anything else, so you can enter whatever round
 *    number makes sense for shoppers paying in that currency. To change
 *    what a product costs in one currency, just edit that one number
 *    (e.g. change EUR: 5 to EUR: 6) — the other currencies are untouched.
 *    Every product must have all 3: PLN, EUR and SEK, or a shopper using
 *    that language will see the shop's fallback currency ("defaultCurrency"
 *    in js/config.js) instead for that one product.
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
 *    - "ageLabel: "4+"" overrides the age text shown to visitors
 *      (product card, related products, and the Details tab on the
 *      product page) without changing which age filter the product
 *      matches — that still comes from "ages". Use this when the age
 *      filter has no option that matches the box exactly (see
 *      "vb-little-traveller" below, tagged ages: ["3"] but shown as
 *      "4+"). Leave it out and the label is built from "ages" as
 *      before. The same text is used in all 4 languages, so no
 *      translation is needed.
 * That's it — the new product will automatically show up in its
 * catalog page and can be linked to directly.
 */
(function () {
  // The 6 product types shown on the home page (as big tiles) and in the
  // header/footer menus. "pastel" picks one of the soft accent colors
  // (defined in css/styles.css) for that type's home-page tile — it only
  // has any effect while the type is NOT "comingSoon" (see below), since a
  // comingSoon tile always renders grey no matter what "pastel" says.
  //
  // "comingSoon: true" is the ONE switch for a whole section: while it's
  // true, the site hides it from navigation (header menu, footer links)
  // and from bestsellers/search/"you may also like", and shows a friendly
  // "coming soon" page instead of a product grid if someone opens its
  // catalog link directly. Right now only velcro-books and coloring have
  // real products, so every other section below is marked comingSoon —
  // set a section's flag back to false (or remove the line) once it has
  // real products in window.BD_PRODUCTS, see README.md for the full
  // step-by-step.
  window.BD_PRODUCT_TYPES = [
    { id: "velcro-books", image: "assets/types/velcro-books.svg", pastel: "peach" },
    { id: "coloring", image: "assets/types/coloring.svg", pastel: "mint" },
    { id: "playdough", image: "assets/types/playdough.svg", pastel: "sky", comingSoon: true },
    { id: "spot-it", image: "assets/types/spot-it.svg", pastel: "sun", comingSoon: true },
    { id: "wipe-clean", image: "assets/types/wipe-clean.svg", pastel: "lilac", comingSoon: true },
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
    // ---------- velcro-books (2 real products) ----------
    // NOTE on "ages": the site's age filter only has 6m / 1+ / 3+ / 5+ /
    // 10+ — there is no "4+" option. This book's own box says "from 4
    // years" (see the description and "ageNote" below), but it's tagged
    // ages: ["3"] on purpose so it still shows up under the 3+ filter.
    // Please don't "fix" this to ["5"] — that would just hide it from
    // shoppers browsing 3+. The card, related products and Details tab
    // instead show "4+" to visitors via "ageLabel" below, which only
    // changes the displayed text — it does not affect the 3+ filter.
    {
      id: "vb-little-traveller",
      type: "velcro-books",
      price: { PLN: 240, EUR: 56, SEK: 620 },
      image: "assets/products/velcro/little-traveller-cover.webp",
      images: [
        "assets/products/velcro/little-traveller-cover.webp",
        "assets/products/velcro/little-traveller-poland-sweden.webp",
        "assets/products/velcro/little-traveller-uk-australia.webp",
        "assets/products/velcro/little-traveller-ukraine-finland.webp",
        "assets/products/velcro/little-traveller-israel-georgia.webp",
      ],
      thumb: "assets/products/velcro/thumbs/little-traveller-cover.jpg",
      bestseller: true,
      ages: ["3"],
      ageLabel: "4+",
      ageNote: {
        uk: "рекомендовано від 4 років",
        pl: "zalecane od 4 lat",
        en: "recommended from age 4",
        sv: "rekommenderas från 4 år",
      },
      categories: ["geography"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Little traveller — маленький мандрівник",
        pl: "Little traveller — mały podróżnik",
        en: "Little Traveller",
        sv: "Little traveller — den lilla resenären",
      },
      shortDescription: {
        uk: "Книжка на липучках, що вирушає з дитиною в подорож 32 країнами світу.",
        pl: "Książeczka na rzepy, która zabiera dziecko w podróż przez 32 kraje świata.",
        en: "A velcro activity book that takes your child on a journey through 32 countries of the world.",
        sv: "En kardborrebok som tar barnet med på en resa genom 32 länder i världen.",
      },
      description: {
        uk: "«Little traveller» — розвивальна книжка на липучках про 32 країни світу. На сторінці кожної країни дитина знайомиться з її прапором, столицею, визначними пам'ятками, стравами та традиціями — серед них Польща (Вавель, вареники, журек, вроцлавські гноми, зубр), Швеція (Стокгольм, коник із Даларни, булочки з корицею, тюфтельки з брусничним соусом, Пеппі Довгапанчоха і Карлссон), Україна (Київ, вишиванка, борщ, писанки, замок Любарта), Фінляндія (Мумі-Тролі, Йоулупуккі, корвапуусті, сауна), Велика Британія (Біг-Бен, червоні автобуси, королівські вартові, англійський сніданок), Австралія (оперний театр у Сіднеї, кенгуру, коала, бумеранг), Ізраїль (Єрусалим, хамса, фалафель, хумус, Ханука) та Грузія (Тбілісі, Мати Картлі, хінкалі, хачапурі). Дитина відриває й приклеює липучки просто на сторінках, тренуючи дрібну моторику під час подорожі. Рекомендований вік: від 4 років.",
        pl: "„Little traveller” to rozwijająca książeczka na rzepy o 32 krajach świata. Na stronie każdego kraju dziecko poznaje jego flagę, stolicę, zabytki, potrawy i tradycje — wśród nich Polskę (Wawel, pierogi, żurek, wrocławskie krasnale, żubr), Szwecję (Sztokholm, konik dala, bułeczki cynamonowe, klopsiki z sosem borówkowym, Pippi Pończoszankę i Carlssona), Ukrainę (Kijów, wyszywankę, barszcz, pisanki, zamek Lubarta), Finlandię (Muminki, Joulupukkiego, korvapuusti, saunę), Wielką Brytanię (Big Ben, czerwone autobusy, gwardię królewską, angielskie śniadanie), Australię (Operę w Sydney, kangura, koalę, bumerang), Izrael (Jerozolimę, hamsę, falafel, hummus, Chanukę) oraz Gruzję (Tbilisi, pomnik Matki Kartli, chinkali, chaczapuri). Dziecko odrywa i przykleja rzepy wprost na stronach, ćwicząc małą motorykę podczas podróży. Zalecany wiek: od 4 lat.",
        en: "Little Traveller is a velcro activity book about 32 countries of the world. Each country's page introduces its flag, capital, landmarks, food and traditions — including Poland (Wawel Castle, pierogi, żurek, the Wrocław gnomes, the bison), Sweden (Stockholm, the Dala horse, cinnamon buns, meatballs with lingonberry sauce, Pippi Longstocking and Karlsson), Ukraine (Kyiv, vyshyvanka embroidery, borscht, pysanky, Lubart's Castle), Finland (the Moomins, Joulupukki, korvapuusti buns, sauna), Great Britain (Big Ben, red buses, the royal guards, an English breakfast), Australia (the Sydney Opera House, kangaroos, koalas, boomerangs), Israel (Jerusalem, the hamsa, falafel, hummus, Hanukkah) and Georgia (Tbilisi, the Mother of Kartli monument, khinkali, khachapuri). Your child peels off and attaches the velcro pieces right on the pages while exploring. Recommended age: from 4 years.",
        sv: "„Little traveller” är en kardborreaktivitetsbok om 32 länder i världen. På varje lands sida möter barnet dess flagga, huvudstad, sevärdheter, mat och traditioner — bland dem Polen (Wawel, pierogi, żurek, Wrocławs troll, bisonoxen), Sverige (Stockholm, dalahästen, kanelbullar, köttbullar med lingonsylt, Pippi Långstrump och Karlsson), Ukraina (Kiev, vysjyvanka-broderi, borsjtj, pysanky-ägg, Lubarts slott), Finland (mumintrollen, Joulupukki, korvapuusti, bastu), Storbritannien (Big Ben, röda bussar, den kungliga vakten, engelsk frukost), Australien (Sydneys operahus, känguru, koala, bumerang), Israel (Jerusalem, hamsa, falafel, hummus, Chanukka) och Georgien (Tbilisi, Moder Kartli-monumentet, khinkali, khachapuri). Barnet lossar och fäster kardborrebitarna direkt på sidorna under resans gång. Rekommenderad ålder: från 4 år.",
      },
    },
    {
      id: "vb-dinosaur-album",
      type: "velcro-books",
      price: { PLN: 115, EUR: 27, SEK: 300 },
      image: "assets/products/velcro/dinosaur-album-cover.webp",
      images: [
        "assets/products/velcro/dinosaur-album-cover.webp",
        "assets/products/velcro/dinosaur-album-spread-1.webp",
        "assets/products/velcro/dinosaur-album-spread-2.webp",
        "assets/products/velcro/dinosaur-album-spread-3.webp",
      ],
      thumb: "assets/products/velcro/thumbs/dinosaur-album-cover.jpg",
      bestseller: true,
      ages: ["3"],
      ageLabel: "4+",
      ageNote: {
        uk: "рекомендовано від 4 років",
        pl: "zalecane od 4 lat",
        en: "recommended from age 4",
        sv: "rekommenderas från 4 år",
      },
      categories: ["dinosaurs"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Динозаврознавець — альбом на липучках",
        pl: "Dinozaurolog — album na rzepy",
        en: "Dinosaur Explorer — velcro activity album",
        sv: "Dinosaurolog — kardborrealbum",
      },
      shortDescription: {
        uk: "Альбом на липучках, що перетворює дитину на справжнього юного палеонтолога серед динозаврів.",
        pl: "Album na rzepy, który zamienia dziecko w prawdziwego młodego paleontologa wśród dinozaurów.",
        en: "A velcro activity album that turns your child into a real young palaeontologist among the dinosaurs.",
        sv: "Ett kardborrealbum som förvandlar barnet till en riktig ung paleontolog bland dinosaurier.",
      },
      description: {
        uk: "«Динозаврознавець» — розвивальний альбом на липучках про світ динозаврів, у якому дитина сама стає юним палеонтологом. Малюк розкопує та чистить пензликом череп динозавра, знайомиться з тираннозавром, довгошиим динозавром і птеродактилем, а також спостерігає, як з яйця вилуплюється маленьке динозавреня біля димливого вулкана. Дитина відриває й приклеює липучки просто на сторінках, тренуючи дрібну моторику. Формат А4, 14 сторінок. Рекомендований вік: від 4 років.",
        pl: "„Dinozaurolog” to rozwijający album na rzepy o świecie dinozaurów, w którym dziecko wciela się w młodego paleontologa. Maluch odkopuje i czyści pędzelkiem czaszkę dinozaura, poznaje tyranozaura, dinozaura o długiej szyi i pterodaktyla, a także obserwuje, jak z jajka wykluwa się małe dinozaurątko przy dymiącym wulkanie. Dziecko odrywa i przykleja rzepy wprost na stronach, ćwicząc małą motorykę. Format A4, 14 stron. Zalecany wiek: od 4 lat.",
        en: "Dinosaur Explorer is a velcro activity album about the world of dinosaurs, where your child becomes a young palaeontologist. They dig up and brush clean a dinosaur skull, meet a T-rex, a long-necked dinosaur and a pterodactyl, and watch a baby dinosaur hatch from its egg near a smoking volcano. Your child peels off and attaches the velcro pieces right on the pages, practicing fine motor skills while playing. A4 format, 14 pages. Recommended age: from 4 years.",
        sv: "„Dinosaurolog” är ett kardborrealbum om dinosauriernas värld, där barnet får bli en ung paleontolog. Barnet gräver fram och borstar rent en dinosaurieskalle, möter en T-rex, en långhalsad dinosaurie och en pterodaktyl, och ser en liten dinosaurieunge kläckas ur sitt ägg vid en rykande vulkan. Barnet lossar och fäster kardborrebitarna direkt på sidorna och tränar finmotoriken under lekens gång. Format A4, 14 sidor. Rekommenderad ålder: från 4 år.",
      },
    },

    {
      id: "vb-amazing-colors",
      type: "velcro-books",
      price: { PLN: 135, EUR: 32, SEK: 350 },
      image: "assets/products/velcro/amazing-colors-cover.webp",
      images: [
        "assets/products/velcro/amazing-colors-cover.webp",
        "assets/products/velcro/amazing-colors-spread-1.webp",
        "assets/products/velcro/amazing-colors-spread-2.webp",
        "assets/products/velcro/amazing-colors-spread-3.webp",
        "assets/products/velcro/amazing-colors-spread-4.webp",
        "assets/products/velcro/amazing-colors-spread-5.webp",
        "assets/products/velcro/amazing-colors-spread-6.webp",
        "assets/products/velcro/amazing-colors-spread-7.webp",
        "assets/products/velcro/amazing-colors-spread-8.webp",
      ],
      thumb: "assets/products/velcro/thumbs/amazing-colors-cover.jpg",
      ages: ["1"],
      categories: ["colors-shapes"],
      availableLanguages: ["uk", "pl", "en", "sv"],
      name: {
        uk: "Amazing Colors — альбом на липучках",
        pl: "Amazing Colors — album na rzepy",
        en: "Amazing Colors — velcro busy book",
        sv: "Amazing Colors — kardborrealbum",
      },
      shortDescription: {
        uk: "Яскравий альбом на липучках, що вчить дитину розрізняти й підбирати кольори через гру.",
        pl: "Kolorowy album na rzepy, który uczy dziecko rozróżniać i dobierać kolory poprzez zabawę.",
        en: "A colourful velcro busy book that teaches your child to tell colours apart and match them through play.",
        sv: "Ett färgglatt kardborrealbum som lär barnet att skilja på och matcha färger genom lek.",
      },
      description: {
        uk: "«Amazing Colors» — альбом на липучках, повністю присвячений кольорам. На сторінках дитина сортує різнокольорові цукерки на тортику, добирає ґудзики для сонного кота, підбирає бантики в тон волоссю, розставляє машинки на кольорових смугах дороги, приклеює зірочки й ракети за кольором, годує різнокольорових рибок і збирає букет квітів, а ще шукає олівці потрібного кольору на іменинному торті. Дитина відриває й приклеює липучки просто на сторінках, тренуючи дрібну моторику, поки грається з кольорами.",
        pl: "„Amazing Colors” to album na rzepy poświęcony w całości kolorom. Na stronach dziecko sortuje kolorowe cukierki na torcie, dobiera guziczki dla śpiącego kota, dopasowuje kokardki do koloru włosów, ustawia samochodziki na kolorowych pasach drogi, przykleja gwiazdki i rakiety według koloru, karmi kolorowe rybki i układa bukiet kwiatów, a także szuka kredek w odpowiednim kolorze na urodzinowym torcie. Dziecko odrywa i przykleja rzepy wprost na stronach, ćwicząc małą motorykę podczas zabawy kolorami.",
        en: "Amazing Colors is a velcro busy book all about colours. On its pages, your child sorts colourful candies on a cake stand, matches buttons for a sleepy cat, picks bows to match a hair colour, lines up cars on the coloured lanes of a road, attaches stars and rockets by colour, feeds a pond of colourful fish and arranges a bouquet of flowers, and even finds the right-coloured pencils on a birthday cake. Your child peels off and attaches the velcro pieces right on the pages, practising fine motor skills while playing with colours.",
        sv: "„Amazing Colors” är ett kardborrealbum helt tillägnat färger. På sidorna sorterar barnet färgglada godisbitar på ett tårtfat, matchar knappar till en sömnig katt, väljer rosetter som matchar hårfärgen, ställer upp bilar på vägens färgade körfält, fäster stjärnor och raketer efter färg, matar en damm full av färgglada fiskar och binder en blombukett, och hittar till och med rätt färgs pennor på en födelsedagstårta. Barnet lossar och fäster kardborrebitarna direkt på sidorna och tränar finmotoriken medan det leker med färger.",
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
    // 5. Change "price" if it's different (one number per currency — see
    //    the note about prices near the top of this file).
    // 6. Fill in "name", "shortDescription" and "description" in all 4
    //    languages (uk / pl / en / sv).
    {
      id: "col-christmas-magic",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/magical-forest-b.webp",
      thumb: "assets/products/coloring/thumbs/magical-forest-b.jpg",
      personalizable: false,
      name: {
        uk: "Чарівний ліс",
        pl: "Zaczarowany las",
        en: "Magical Forest and Enchanted Trees",
        sv: "Den magiska skogen",
      },
      shortDescription: {
        uk: "Двоє дітей вирушають на прогулянку чарівним лісом.",
        pl: "Dwoje dzieci wyrusza na spacer po zaczarowanym lesie.",
        en: "Two children set off on a walk through the enchanted forest.",
        sv: "Två barn ger sig ut på en promenad genom den förtrollade skogen.",
      },
      description: {
        uk: "Двоє дітей крокують стежкою чарівного лісу серед високих дерев, таємничих затінків і лісових мешканців. У наборі розмальовка, олівці та наклейки.",
        pl: "Dwoje dzieci idzie ścieżką przez zaczarowany las, wśród wysokich drzew, tajemniczych cieni i leśnych mieszkańców. W zestawie kolorowanka, kredki i naklejki.",
        en: "Two children walk a path through the enchanted forest, among tall trees, mysterious shadows and woodland friends. The set includes the coloring book, pencils and stickers.",
        sv: "Två barn vandrar längs en stig genom den förtrollade skogen, bland höga träd, mystiska skuggor och skogens invånare. I setet ingår målarboken, färgpennor och klistermärken.",
      },
    },
    {
      id: "col-cities-of-the-future",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/robots-future-world-b.webp",
      thumb: "assets/products/coloring/thumbs/robots-future-world-b.jpg",
      personalizable: false,
      name: {
        uk: "Роботи та світ майбутнього",
        pl: "Roboty i świat przyszłości",
        en: "Robots and Future World",
        sv: "Robotar och framtidens värld",
      },
      shortDescription: {
        uk: "Ціле місто роботів чекає на розфарбовування.",
        pl: "Całe miasto robotów czeka na pokolorowanie.",
        en: "A whole city of robots waiting to be colored in.",
        sv: "En hel robotstad väntar på att målas.",
      },
      description: {
        uk: "На малюнку — місто роботів з високими механічними будівлями та цікавими деталями. У наборі розмальовка, олівці та наклейки.",
        pl: "Na rysunku miasto robotów z wysokimi, mechanicznymi budynkami i ciekawymi detalami. W zestawie kolorowanka, kredki i naklejki.",
        en: "The picture shows a city of robots, full of tall mechanical buildings and fun details. The set includes the coloring book, pencils and stickers.",
        sv: "Bilden visar en robotstad, full av höga mekaniska byggnader och roliga detaljer. I setet ingår målarboken, färgpennor och klistermärken.",
      },
    },
    {
      id: "col-jungle-safari",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
      price: { PLN: 21, EUR: 5, SEK: 55 },
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
    {
      id: "col-elements",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/elements-earth-water-fire-air.webp",
      thumb: "assets/products/coloring/thumbs/elements-earth-water-fire-air.jpg",
      personalizable: false,
      name: {
        uk: "Стихії: земля, вода, вогонь і повітря",
        pl: "Żywioły: ziemia, woda, ogień i powietrze",
        en: "Elements: Earth, Water, Fire, Air",
        sv: "Elementen: jord, vatten, eld och luft",
      },
      shortDescription: {
        uk: "Усміхнена планета, краплина води з рибками, вогнище та хмаринка з вітром.",
        pl: "Uśmiechnięta planeta, kropla wody z rybkami, ognisko i chmurka z wiatrem.",
        en: "A smiling planet Earth, a water drop with fish, a campfire and a cloud full of wind.",
        sv: "Ett leende jordklot, en vattendroppe med fiskar, en lägereld och ett moln fullt av vind.",
      },
      description: {
        uk: "На сторінках — усміхнена Земля, крапля води з хвилями та рибками, вогнище з вулканом і хмаринка з вихорами вітру. У наборі розмальовка, олівці та наклейки, щоб веселіше знайомитися зі стихіями природи.",
        pl: "Na stronach uśmiechnięta Ziemia, kropla wody z falami i rybkami, ognisko z wulkanem oraz chmurka z wirami wiatru. W zestawie kolorowanka, kredki i naklejki na wesołe poznawanie żywiołów natury.",
        en: "On these pages, a smiling Earth, a water drop with waves and fish, a campfire beside a volcano and a cloud swirling with wind all come together. The set includes the coloring book, pencils and stickers for a fun introduction to the elements of nature.",
        sv: "På sidorna möts ett leende jordklot, en vattendroppe med vågor och fiskar, en lägereld bredvid en vulkan och ett moln som virvlar av vind. I setet ingår målarboken, färgpennor och klistermärken för en rolig introduktion till naturens element.",
      },
    },
    {
      id: "col-fairy-tales-castles",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/fairy-tales-castles.webp",
      thumb: "assets/products/coloring/thumbs/fairy-tales-castles.jpg",
      personalizable: false,
      name: {
        uk: "Казки та замки",
        pl: "Baśnie i zamki",
        en: "Fairy Tales and Castles",
        sv: "Sagor och slott",
      },
      shortDescription: {
        uk: "Принцеса, принц, єдиноріг і рожевий замок з казковою каретою.",
        pl: "Księżniczka, książę, jednorożec i różowy zamek z bajkową karetą.",
        en: "A princess, a prince, a unicorn and a pink castle with a fairy-tale carriage.",
        sv: "En prinsessa, en prins, en enhörning och ett rosa slott med en sagovagn.",
      },
      description: {
        uk: "На сторінках — принцеса, принц, єдиноріг, жабка з короною та маленька відьмочка з книжкою чекають біля рожевого замку й гарбузової карети. У наборі розмальовка, олівці та наклейки для справжньої казкової подорожі.",
        pl: "Na stronach księżniczka, książę, jednorożec, żabka z koroną i mała czarownica z książką czekają przy różowym zamku i dyniowej karecie. W zestawie kolorowanka, kredki i naklejki na prawdziwą baśniową podróż.",
        en: "On these pages, a princess, a prince, a unicorn, a crowned frog and a little witch with a book gather near a pink castle and a pumpkin carriage. The set includes the coloring book, pencils and stickers for a true fairy-tale journey.",
        sv: "På sidorna samlas en prinsessa, en prins, en enhörning, en krönt groda och en liten häxa med en bok nära ett rosa slott och en pumpavagn. I setet ingår målarboken, färgpennor och klistermärken för en riktig sagoresa.",
      },
    },
    {
      id: "col-rainforest-animals",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/rainforest-animals.webp",
      thumb: "assets/products/coloring/thumbs/rainforest-animals.jpg",
      personalizable: false,
      name: {
        uk: "Тварини тропічного лісу",
        pl: "Zwierzęta lasu tropikalnego",
        en: "Rainforest Animals and Ecosystem",
        sv: "Regnskogens djur",
      },
      shortDescription: {
        uk: "Тукан, папуга, лінивець і ягуар серед тропічного лісу з водоспадом.",
        pl: "Tukan, papuga, leniwiec i jaguar wśród tropikalnego lasu z wodospadem.",
        en: "A toucan, a parrot, a sloth and a jaguar amid the rainforest and a waterfall.",
        sv: "En tukan, en papegoja, en sengångare och en jaguar i regnskogen vid ett vattenfall.",
      },
      description: {
        uk: "На сторінках — тукан, папуга, лінивець, ягуар, тапір, видра та деревна жаба ховаються серед тропічної зелені біля водоспаду. У наборі розмальовка, олівці та наклейки для мандрівки тропічним лісом.",
        pl: "Na stronach tukan, papuga, leniwiec, jaguar, tapir, wydra i żaba drzewna chowają się wśród tropikalnej zieleni przy wodospadzie. W zestawie kolorowanka, kredki i naklejki na wyprawę do tropikalnego lasu.",
        en: "On these pages, a toucan, a parrot, a sloth, a jaguar, a tapir, an otter and a tree frog hide among the tropical greenery near a waterfall. The set includes the coloring book, pencils and stickers for a journey through the rainforest.",
        sv: "På sidorna gömmer sig en tukan, en papegoja, en sengångare, en jaguar, en tapir, en utter och en trädgroda bland det tropiska grönskat vid ett vattenfall. I setet ingår målarboken, färgpennor och klistermärken för en resa genom regnskogen.",
      },
    },
    {
      id: "col-cars-trucks-trains",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/cars-trucks-trains.webp",
      thumb: "assets/products/coloring/thumbs/cars-trucks-trains.jpg",
      personalizable: false,
      name: {
        uk: "Машинки, вантажівки та потяги",
        pl: "Samochody, ciężarówki i pociągi",
        en: "Cars, Trucks and Trains",
        sv: "Bilar, lastbilar och tåg",
      },
      shortDescription: {
        uk: "Машинка, вантажівка, потяг і навіть повітряна куля для маленьких водіїв.",
        pl: "Samochód, ciężarówka, pociąg i balon dla małych kierowców.",
        en: "A car, a dump truck, a train and even a hot-air balloon for little drivers.",
        sv: "En bil, en lastbil, ett tåg och till och med en luftballong för små förare.",
      },
      description: {
        uk: "На сторінках — машинка, вантажівка, трактор, потяг, гелікоптер, літак і повітряна куля зустрічаються біля світлофора. У наборі розмальовка, олівці та наклейки для веселої подорожі транспортом.",
        pl: "Na stronach samochód, ciężarówka, traktor, pociąg, helikopter, samolot i balon spotykają się przy sygnalizatorze. W zestawie kolorowanka, kredki i naklejki na wesołą podróż różnymi pojazdami.",
        en: "On these pages, a car, a dump truck, a tractor, a train, a helicopter, a plane and a hot-air balloon all meet near a traffic light. The set includes the coloring book, pencils and stickers for a fun journey through all kinds of transport.",
        sv: "På sidorna möts en bil, en lastbil, en traktor, ett tåg, en helikopter, ett flygplan och en luftballong vid ett trafikljus. I setet ingår målarboken, färgpennor och klistermärken för en rolig resa med alla möjliga fordon.",
      },
    },
    {
      id: "col-musical-instruments",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/musical-instruments-orchestra.webp",
      thumb: "assets/products/coloring/thumbs/musical-instruments-orchestra.jpg",
      personalizable: false,
      name: {
        uk: "Музичні інструменти та оркестр",
        pl: "Instrumenty muzyczne i orkiestra",
        en: "Musical Instruments and Orchestra",
        sv: "Musikinstrument och orkester",
      },
      shortDescription: {
        uk: "Ведмідь-диригент і звірята-оркестранти зі скрипкою, трубою та барабаном.",
        pl: "Niedźwiedź dyrygent i zwierzęta orkiestry ze skrzypcami, trąbką i bębnem.",
        en: "A bear conductor and an animal orchestra with a violin, a trumpet and a drum.",
        sv: "En björndirigent och en djurorkester med fiol, trumpet och trumma.",
      },
      description: {
        uk: "На сторінках — ведмідь-диригент керує оркестром, де заєць грає на флейті, лисиця на скрипці, слон на трубі, лев на віолончелі, пінгвін на кларнеті, а єнот на барабані, поруч стоять піаніно та арфа. У наборі розмальовка, олівці та наклейки для музичного дня творчості.",
        pl: "Na stronach niedźwiedź dyrygent prowadzi orkiestrę, w której zając gra na flecie, lis na skrzypcach, słoń na trąbce, lew na wiolonczeli, pingwin na klarnecie, a szop na bębnie, obok stoją fortepian i harfa. W zestawie kolorowanka, kredki i naklejki na muzyczny dzień twórczości.",
        en: "On these pages, a bear conductor leads an orchestra where a rabbit plays the flute, a fox the violin, an elephant the trumpet, a lion the cello, a penguin the clarinet and a raccoon the drum, with a piano and a harp nearby. The set includes the coloring book, pencils and stickers for a musical day of creativity.",
        sv: "På sidorna leder en björndirigent en orkester där en kanin spelar flöjt, en räv fiol, en elefant trumpet, ett lejon cello, en pingvin klarinett och en tvättbjörn trumma, med en piano och en harpa i närheten. I setet ingår målarboken, färgpennor och klistermärken för en musikalisk skapardag.",
      },
    },
    {
      id: "col-friendly-monsters",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/friendly-monsters.webp",
      thumb: "assets/products/coloring/thumbs/friendly-monsters.jpg",
      personalizable: false,
      name: {
        uk: "Добрі монстрики",
        pl: "Przyjazne potworki",
        en: "Friendly Monsters and Whimsical Creatures",
        sv: "Snälla monster",
      },
      shortDescription: {
        uk: "Кумедні пухнасті монстрики, один із них читає книжку.",
        pl: "Zabawne, puszyste potworki, jeden z nich czyta książkę.",
        en: "Funny fluffy monsters, one of them curled up with a book.",
        sv: "Roliga luddiga monster, ett av dem sitter och läser en bok.",
      },
      description: {
        uk: "На сторінках — кумедні пухнасті монстрики, один читає книжку біля маленького замку та затишного будиночка, а поруч літає маленький кажан. У наборі розмальовка, олівці та наклейки для дружби з добрими монстриками.",
        pl: "Na stronach zabawne, puszyste potworki, jeden z nich czyta książkę przy małym zamku i przytulnym domku, a obok lata mały nietoperz. W zestawie kolorowanka, kredki i naklejki na przyjaźń z sympatycznymi potworkami.",
        en: "On these pages, funny fluffy monsters gather near a little castle and a cozy cottage, one of them curled up with a book while a small bat flutters nearby. The set includes the coloring book, pencils and stickers for making friends with these gentle monsters.",
        sv: "På sidorna samlas roliga luddiga monster nära ett litet slott och en mysig stuga, ett av dem sitter med en bok medan en liten fladdermus flaxar i närheten. I setet ingår målarboken, färgpennor och klistermärken för att bli vän med de snälla monstren.",
      },
    },
    {
      id: "col-knights-medieval",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/knights-medieval-life.webp",
      thumb: "assets/products/coloring/thumbs/knights-medieval-life.jpg",
      personalizable: false,
      name: {
        uk: "Лицарі та середньовіччя",
        pl: "Rycerze i średniowiecze",
        en: "Knights and Medieval Life",
        sv: "Riddare och medeltiden",
      },
      shortDescription: {
        uk: "Лицар на коні, замок із прапорами та турнірний намет.",
        pl: "Rycerz na koniu, zamek z flagami i turniejowy namiot.",
        en: "A knight on horseback, a castle with flags and a tournament tent.",
        sv: "En riddare till häst, ett slott med flaggor och ett turnertält.",
      },
      description: {
        uk: "На сторінках — лицарі верхи на конях їдуть до замку з прапорами, де напнутий турнірний намет, а неподалік дракон кружляє над кузнею з ковадлом. У наборі розмальовка, олівці та наклейки для лицарських пригод.",
        pl: "Na stronach rycerze na koniach zmierzają do zamku z flagami, gdzie rozstawiono turniejowy namiot, a nieopodal smok krąży nad kuźnią z kowadłem. W zestawie kolorowanka, kredki i naklejki na rycerskie przygody.",
        en: "On these pages, knights on horseback ride toward a castle decked with flags, where a tournament tent stands ready and a dragon circles near a blacksmith's anvil. The set includes the coloring book, pencils and stickers for knightly adventures.",
        sv: "På sidorna rider riddare till häst mot ett slott med flaggor, där ett turnertält står redo och en drake cirklar nära en smeds städ. I setet ingår målarboken, färgpennor och klistermärken för riddaräventyr.",
      },
    },
    {
      id: "col-outer-space",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/outer-space-astronauts.webp",
      thumb: "assets/products/coloring/thumbs/outer-space-astronauts.jpg",
      personalizable: false,
      name: {
        uk: "Космос і космонавти",
        pl: "Kosmos i kosmonauci",
        en: "Outer Space and Astronauts",
        sv: "Rymden och astronauter",
      },
      shortDescription: {
        uk: "Космонавти серед зірок, ракета та інопланетянин на літючій тарілці.",
        pl: "Kosmonauci wśród gwiazd, rakieta i kosmita na latającym talerzu.",
        en: "Astronauts floating among the stars, a rocket and an alien in a flying saucer.",
        sv: "Astronauter som svävar bland stjärnorna, en raket och en utomjording i ett flygande tefat.",
      },
      description: {
        uk: "На сторінках — космонавти пливуть серед зірок біля ракети, місяця та планет, а інопланетянин у літючій тарілці спостерігає за місяцеходом. У наборі розмальовка, олівці та наклейки для космічної пригоди.",
        pl: "Na stronach kosmonauci unoszą się wśród gwiazd obok rakiety, księżyca i planet, a kosmita w latającym talerzu obserwuje łazik księżycowy. W zestawie kolorowanka, kredki i naklejki na kosmiczną przygodę.",
        en: "On these pages, astronauts float among the stars near a rocket, the moon and planets, while an alien in a flying saucer watches a moon rover roll by. The set includes the coloring book, pencils and stickers for a space adventure.",
        sv: "På sidorna svävar astronauter bland stjärnorna nära en raket, månen och planeter, medan en utomjording i ett flygande tefat tittar på en månbil som rullar förbi. I setet ingår målarboken, färgpennor och klistermärken för ett rymdäventyr.",
      },
    },
    {
      id: "col-cooking-baking",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/cooking-baking-fun.webp",
      thumb: "assets/products/coloring/thumbs/cooking-baking-fun.jpg",
      personalizable: false,
      name: {
        uk: "Куховаримо та печемо",
        pl: "Gotowanie i pieczenie",
        en: "Cooking and Baking Fun",
        sv: "Matlagning och bakning",
      },
      shortDescription: {
        uk: "Діти в кухарських ковпаках прикрашають торт і печиво.",
        pl: "Dzieci w kucharskich czapkach ozdabiają tort i ciasteczka.",
        en: "Children in chef hats decorating a cake and a batch of cookies.",
        sv: "Barn i kockmössor som dekorerar en tårta och kakor.",
      },
      description: {
        uk: "На сторінках — діти в кухарських ковпаках прикрашають торт, а поруч чекають кекс, печиво, віночок, качалка та миски для тіста. У наборі розмальовка, олівці та наклейки для смачного дня творчості на кухні.",
        pl: "Na stronach dzieci w kucharskich czapkach ozdabiają tort, a obok czekają babeczka, ciasteczka, trzepaczka, wałek i miski na ciasto. W zestawie kolorowanka, kredki i naklejki na smaczny dzień twórczości w kuchni.",
        en: "On these pages, children in chef hats decorate a cake, with a cupcake, cookies, a whisk, a rolling pin and mixing bowls all close by. The set includes the coloring book, pencils and stickers for a tasty day of kitchen creativity.",
        sv: "På sidorna dekorerar barn i kockmössor en tårta, med en muffin, kakor, en visp, en kavel och bakskålar i närheten. I setet ingår målarboken, färgpennor och klistermärken för en smaskig skapardag i köket.",
      },
    },
    {
      id: "col-princesses-knights",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/princesses-and-knights.webp",
      thumb: "assets/products/coloring/thumbs/princesses-and-knights.jpg",
      personalizable: false,
      name: {
        uk: "Принцеси та лицарі",
        pl: "Księżniczki i rycerze",
        en: "Princesses and Knights",
        sv: "Prinsessor och riddare",
      },
      shortDescription: {
        uk: "Принцеса в рожевій сукні та юний лицар з мечем і щитом.",
        pl: "Księżniczka w różowej sukni i młody rycerz z mieczem i tarczą.",
        en: "A princess in a pink dress and a young knight with a sword and shield.",
        sv: "En prinsessa i rosa klänning och en ung riddare med svärd och sköld.",
      },
      description: {
        uk: "На сторінках — принцеса в рожевій сукні та юний лицар з мечем і щитом стоять біля замку, де на вежі сидить дракон, а поруч пасуться єдиноріг і поні. У наборі розмальовка, олівці та наклейки для казкової пригоди з принцесами й лицарями.",
        pl: "Na stronach księżniczka w różowej sukni i młody rycerz z mieczem i tarczą stoją przy zamku, na którego wieży siedzi smok, a obok pasą się jednorożec i kucyk. W zestawie kolorowanka, kredki i naklejki na baśniową przygodę z księżniczkami i rycerzami.",
        en: "On these pages, a princess in a pink dress and a young knight with a sword and shield stand by a castle, with a dragon perched on its tower and a unicorn and a pony grazing nearby. The set includes the coloring book, pencils and stickers for a fairy-tale adventure with princesses and knights.",
        sv: "På sidorna står en prinsessa i rosa klänning och en ung riddare med svärd och sköld vid ett slott, med en drake på tornet och en enhörning och en ponny som betar i närheten. I setet ingår målarboken, färgpennor och klistermärken för ett sagoäventyr med prinsessor och riddare.",
      },
    },
    {
      id: "col-desert-animals",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/desert-animals.webp",
      thumb: "assets/products/coloring/thumbs/desert-animals.jpg",
      personalizable: false,
      name: {
        uk: "Тварини та краєвиди пустелі",
        pl: "Zwierzęta i krajobrazy pustyni",
        en: "Desert Animals and Landscapes",
        sv: "Öknens djur och landskap",
      },
      shortDescription: {
        uk: "Двоє дітей у сафарі-капелюхах серед верблюда, фенека та черепахи в пустелі.",
        pl: "Dwoje dzieci w kapeluszach safari wśród wielbłąda, fenka i żółwia na pustyni.",
        en: "Two children in safari hats among a camel, a fennec fox and a tortoise in the desert.",
        sv: "Två barn i safarihattar bland en kamel, en fennekräv och en sköldpadda i öknen.",
      },
      description: {
        uk: "На сторінках — двоє дітей у сафарі-капелюхах мандрують пустелею повз верблюда, фенека, черепаху та сурикату, а навколо ростуть кактуси біля оази. У наборі розмальовка, олівці та наклейки для пригоди серед пісків пустелі.",
        pl: "Na stronach dwoje dzieci w kapeluszach safari wędruje przez pustynię obok wielbłąda, fenka, żółwia i surykatki, a wokół rosną kaktusy przy oazie. W zestawie kolorowanka, kredki i naklejki na przygodę wśród pustynnych piasków.",
        en: "On these pages, two children in safari hats wander the desert past a camel, a fennec fox, a tortoise and a meerkat, with cacti growing near an oasis. The set includes the coloring book, pencils and stickers for an adventure among the desert sands.",
        sv: "På sidorna vandrar två barn i safarihattar genom öknen förbi en kamel, en fennekräv, en sköldpadda och en surikat, med kaktusar som växer nära en oas. I setet ingår målarboken, färgpennor och klistermärken för ett äventyr bland öknens sanddyner.",
      },
    },
    {
      id: "col-dinosaurs",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/dinosaurs-prehistoric.webp",
      thumb: "assets/products/coloring/thumbs/dinosaurs-prehistoric.jpg",
      personalizable: false,
      name: {
        uk: "Динозаври та доісторичні тварини",
        pl: "Dinozaury i prehistoryczne stworzenia",
        en: "Dinosaurs and Prehistoric Creatures",
        sv: "Dinosaurier och förhistoriska varelser",
      },
      shortDescription: {
        uk: "Маленькі дослідники з лупою серед тираннозавра, стегозавра та трицератопса.",
        pl: "Mali odkrywcy z lupą wśród tyranozaura, stegozaura i triceratopsa.",
        en: "Little explorers with a magnifying glass among a T-rex, a stegosaurus and a triceratops.",
        sv: "Små upptäckare med förstoringsglas bland en T-rex, en stegosaurus och en triceratops.",
      },
      description: {
        uk: "На сторінках — маленькі дослідники з лупою розглядають тираннозавра, стегозавра, трицератопса й птеродактиля, поки з яйця вилуплюється малюк динозавра на тлі вулкана. У наборі розмальовка, олівці та наклейки для подорожі у доісторичні часи.",
        pl: "Na stronach mali odkrywcy z lupą przyglądają się tyranozaurowi, stegozaurowi, triceratopsowi i pterodaktylowi, gdy z jajka wykluwa się dinozaurzę na tle wulkanu. W zestawie kolorowanka, kredki i naklejki na podróż w czasy prehistoryczne.",
        en: "On these pages, little explorers with a magnifying glass examine a T-rex, a stegosaurus, a triceratops and a pterodactyl, while a baby dinosaur hatches from an egg near a volcano. The set includes the coloring book, pencils and stickers for a journey into prehistoric times.",
        sv: "På sidorna undersöker små upptäckare med förstoringsglas en T-rex, en stegosaurus, en triceratops och en pterodaktyl, medan en babydinosaurie kläcks ur ett ägg nära en vulkan. I setet ingår målarboken, färgpennor och klistermärken för en resa till förhistorisk tid.",
      },
    },
    {
      id: "col-solar-system",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/solar-system-planets.webp",
      thumb: "assets/products/coloring/thumbs/solar-system-planets.jpg",
      personalizable: false,
      name: {
        uk: "Сонячна система та планети",
        pl: "Układ Słoneczny i planety",
        en: "The Solar System and Planets",
        sv: "Solsystemet och planeterna",
      },
      shortDescription: {
        uk: "Двоє космонавтів на Місяці розглядають Сатурн і Землю крізь телескоп.",
        pl: "Dwoje kosmonautów na Księżycu obserwuje Saturna i Ziemię przez teleskop.",
        en: "Two astronauts on the moon look at Saturn and Earth through a telescope.",
        sv: "Två astronauter på månen tittar på Saturnus och jorden genom ett teleskop.",
      },
      description: {
        uk: "На сторінках — двоє космонавтів стоять на Місяці й розглядають крізь телескоп усміхнене сонце, Сатурн та Землю, поки поруч сідає ракета, а маленький інопланетянин визирає з-за каменя. У наборі розмальовка, олівці та наклейки для подорожі Сонячною системою.",
        pl: "Na stronach dwoje kosmonautów stoi na Księżycu i obserwuje przez teleskop uśmiechnięte słońce, Saturna i Ziemię, gdy obok ląduje rakieta, a mały kosmita wygląda zza kamienia. W zestawie kolorowanka, kredki i naklejki na podróż po Układzie Słonecznym.",
        en: "On these pages, two astronauts stand on the moon looking through a telescope at a smiling sun, Saturn and Earth, while a rocket lands nearby and a small alien peeks out from behind a rock. The set includes the coloring book, pencils and stickers for a journey through the solar system.",
        sv: "På sidorna står två astronauter på månen och tittar genom ett teleskop på en leende sol, Saturnus och jorden, medan en raket landar i närheten och en liten utomjording kikar fram bakom en sten. I setet ingår målarboken, färgpennor och klistermärken för en resa genom solsystemet.",
      },
    },
    {
      id: "col-festivals-world",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/festivals-around-the-world.webp",
      thumb: "assets/products/coloring/thumbs/festivals-around-the-world.jpg",
      personalizable: false,
      name: {
        uk: "Свята народів світу",
        pl: "Święta narodów świata",
        en: "Festivals Around the World",
        sv: "Högtider runt om i världen",
      },
      shortDescription: {
        uk: "Діти у святкових костюмах серед китайського дракона, ліхтариків і феєрверків.",
        pl: "Dzieci w strojach świątecznych wśród chińskiego smoka, lampionów i fajerwerków.",
        en: "Children in festive costumes among a Chinese dragon, lanterns and fireworks.",
        sv: "Barn i festkläder bland en kinesisk drake, lyktor och fyrverkerier.",
      },
      description: {
        uk: "На сторінках — діти у святкових костюмах святкують серед китайського дракона, барвистих ліхтариків і феєрверків, а поруч літає різнобарвний порошок і лежить карнавальна маска. У наборі розмальовка, олівці та наклейки для свята культур усього світу.",
        pl: "Na stronach dzieci w strojach świątecznych świętują wśród chińskiego smoka, kolorowych lampionów i fajerwerków, a obok unosi się barwny proszek i leży karnawałowa maska. W zestawie kolorowanka, kredki i naklejki na święto kultur całego świata.",
        en: "On these pages, children in festive costumes celebrate among a Chinese dragon, colorful lanterns and fireworks, with bright powder flying through the air and a carnival mask nearby. The set includes the coloring book, pencils and stickers for a celebration of cultures around the world.",
        sv: "På sidorna firar barn i festkläder bland en kinesisk drake, färgglada lyktor och fyrverkerier, med färgat pulver som virvlar i luften och en karnevalsmask i närheten. I setet ingår målarboken, färgpennor och klistermärken för ett firande av världens kulturer.",
      },
    },
    {
      id: "col-halloween",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/halloween-costumes.webp",
      thumb: "assets/products/coloring/thumbs/halloween-costumes.jpg",
      personalizable: false,
      name: {
        uk: "Гелловін: костюми та страшні будиночки",
        pl: "Halloween: stroje i straszne domki",
        en: "Halloween Costumes and Spooky Houses",
        sv: "Halloweenkostymer och läskiga hus",
      },
      shortDescription: {
        uk: "Діти в костюмах вампіра, відьми та привида біля гарбузів і будиночка з привидами.",
        pl: "Dzieci w strojach wampira, czarownicy i ducha przy dyniach i nawiedzonym domu.",
        en: "Children dressed as a vampire, a witch and a ghost near pumpkins and a haunted house.",
        sv: "Barn utklädda till vampyr, häxa och spöke nära pumpor och ett spökhus.",
      },
      description: {
        uk: "На сторінках — діти в костюмах вампіра, відьми та привида святкують Гелловін біля різьблених гарбузів, чорного кота й кажанів, а вдалині виглядає моторошний будиночок. У наборі розмальовка, олівці та наклейки для веселого й трішки страшного свята.",
        pl: "Na stronach dzieci w strojach wampira, czarownicy i ducha świętują Halloween przy wyrzeźbionych dyniach, czarnym kocie i nietoperzach, a w oddali widać niesamowity domek. W zestawie kolorowanka, kredki i naklejki na wesołe i odrobinę straszne święto.",
        en: "On these pages, children dressed as a vampire, a witch and a ghost celebrate Halloween among carved pumpkins, a black cat and bats, with a spooky house looming in the distance. The set includes the coloring book, pencils and stickers for a fun and slightly spooky celebration.",
        sv: "På sidorna firar barn utklädda till vampyr, häxa och spöke Halloween bland utskurna pumpor, en svart katt och fladdermöss, med ett läskigt hus som skymtar i bakgrunden. I setet ingår målarboken, färgpennor och klistermärken för ett roligt och lite läskigt firande.",
      },
    },
    {
      id: "col-superheroes",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/superheroes-in-action.webp",
      thumb: "assets/products/coloring/thumbs/superheroes-in-action.jpg",
      personalizable: false,
      name: {
        uk: "Супергерої в дії",
        pl: "Superbohaterowie w akcji",
        en: "Superheroes in Action",
        sv: "Superhjältar i aktion",
      },
      shortDescription: {
        uk: "Діти в масках і плащах летять над нічним містом серед написів «БАБАХ» і «БАХ».",
        pl: "Dzieci w maskach i pelerynach lecą nad nocnym miastem wśród napisów „BUM” i „BACH”.",
        en: "Children in masks and capes flying over a night city among \"POW\" and \"ZAP\" signs.",
        sv: "Barn i masker och capes flyger över en nattlig stad bland skyltar med \"POW\" och \"ZAP\".",
      },
      description: {
        uk: "На сторінках — діти в масках і плащах супергероїв летять над нічним містом, а навколо спалахують написи «БАБАХ» і «БАХ», наче справжня комікс-пригода. У наборі розмальовка, олівці та наклейки для дня, коли кожен стає супергероєм.",
        pl: "Na stronach dzieci w maskach i pelerynach superbohaterów lecą nad nocnym miastem, a wokół rozbłyskują napisy „BUM” i „BACH” niczym w prawdziwym komiksie. W zestawie kolorowanka, kredki i naklejki na dzień, w którym każdy staje się superbohaterem.",
        en: "On these pages, children in superhero masks and capes fly over a night city, with \"POW\" and \"ZAP\" signs flashing around them like a real comic book adventure. The set includes the coloring book, pencils and stickers for a day when everyone becomes a superhero.",
        sv: "På sidorna flyger barn i superhjältemasker och capes över en nattlig stad, med \"POW\"- och \"ZAP\"-skyltar som blixtrar runt dem som i en riktig serietidning. I setet ingår målarboken, färgpennor och klistermärken för en dag då alla blir superhjältar.",
      },
    },
    {
      id: "col-arctic-animals",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/arctic-polar-animals.webp",
      thumb: "assets/products/coloring/thumbs/arctic-polar-animals.jpg",
      personalizable: false,
      name: {
        uk: "Арктичні пригоди та полярні тварини",
        pl: "Arktyczne przygody i zwierzęta polarne",
        en: "Arctic Adventures with Polar Animals",
        sv: "Arktiska äventyr med polardjur",
      },
      shortDescription: {
        uk: "Діти в човні серед айсбергів, білий ведмідь, тюлень і нарвал під північним сяйвом.",
        pl: "Dzieci w łódce wśród gór lodowych, niedźwiedź polarny, foka i narwal pod zorzą polarną.",
        en: "Children in a boat among icebergs, a polar bear, a seal and a narwhal under the northern lights.",
        sv: "Barn i en båt bland isberg, en isbjörn, en säl och en narval under norrskenet.",
      },
      description: {
        uk: "На сторінках — діти пливуть у човні серед айсбергів, а навколо плавають білий ведмідь, тюлень, нарвал і білуха, тоді як тупик і полярна сова спостерігають з-під північного сяйва. У наборі розмальовка, олівці та наклейки для арктичної пригоди.",
        pl: "Na stronach dzieci płyną łódką wśród gór lodowych, a obok pływają niedźwiedź polarny, foka, narwal i białucha, podczas gdy maskonur i sowa śnieżna obserwują wszystko pod zorzą polarną. W zestawie kolorowanka, kredki i naklejki na arktyczną przygodę.",
        en: "On these pages, children sail a boat among icebergs, with a polar bear, a seal, a narwhal and a beluga whale swimming nearby, while a puffin and a snowy owl watch from under the northern lights. The set includes the coloring book, pencils and stickers for an arctic adventure.",
        sv: "På sidorna seglar barn en båt bland isberg, med en isbjörn, en säl, en narval och en vitval som simmar i närheten, medan en lunnefågel och en snöuggla ser på under norrskenet. I setet ingår målarboken, färgpennor och klistermärken för ett arktiskt äventyr.",
      },
    },
    {
      id: "col-seasons",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/seasons-of-the-year.webp",
      thumb: "assets/products/coloring/thumbs/seasons-of-the-year.jpg",
      personalizable: false,
      name: {
        uk: "Пори року",
        pl: "Pory roku",
        en: "Seasons of the Year",
        sv: "Årstiderna",
      },
      shortDescription: {
        uk: "Чотири пори року в одній картинці: цвітіння весни, літній пляж, осіннє листя і зимовий сніговик.",
        pl: "Cztery pory roku na jednym obrazku: wiosenne kwiaty, letnia plaża, jesienne liście i zimowy bałwan.",
        en: "All four seasons in one picture: spring blossoms, a summer beach, autumn leaves and a winter snowman.",
        sv: "Alla fyra årstider i en bild: vårens blommor, en sommarstrand, höstlöv och en snögubbe på vintern.",
      },
      description: {
        uk: "На сторінках — весняне цвітіння й парасолька, літній пляж з морозивом, осіннє листя з білочкою та зимовий сніговик із пінгвіном об'єднані в одну картинку пір року. У наборі розмальовка, олівці та наклейки, щоб розфарбувати всі чотири сезони.",
        pl: "Na stronach wiosenne kwiaty i parasolka, letnia plaża z lodami, jesienne liście z wiewiórką oraz zimowy bałwan z pingwinem łączą się w jeden obraz pór roku. W zestawie kolorowanka, kredki i naklejki, by pokolorować wszystkie cztery sezony.",
        en: "On these pages, spring blossoms and an umbrella, a summer beach with ice cream, autumn leaves with a squirrel, and a winter snowman with a penguin all come together in one picture of the seasons. The set includes the coloring book, pencils and stickers to color in all four seasons.",
        sv: "På sidorna möts vårens blommor och ett paraply, en sommarstrand med glass, höstlöv med en ekorre och en snögubbe med en pingvin på vintern i en enda bild av årstiderna. I setet ingår målarboken, färgpennor och klistermärken för att färglägga alla fyra årstider.",
      },
    },
    {
      id: "col-tea-party",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/tea-party-in-the-garden.webp",
      thumb: "assets/products/coloring/thumbs/tea-party-in-the-garden.jpg",
      personalizable: false,
      name: {
        uk: "Чаювання в саду",
        pl: "Podwieczorek w ogrodzie",
        en: "Tea Party in the Garden",
        sv: "Tebjudning i trädgården",
      },
      shortDescription: {
        uk: "Діти в солом'яних капелюшках за садовим столиком з чайником і тістечками.",
        pl: "Dzieci w słomkowych kapeluszach przy ogrodowym stoliku z czajniczkiem i babeczkami.",
        en: "Children in straw hats at a garden table with a teapot and cupcakes.",
        sv: "Barn i halmhattar vid ett trädgårdsbord med en tekanna och muffins.",
      },
      description: {
        uk: "На сторінках — діти в солом'яних капелюшках частують гостей за садовим столиком із чайником і тістечками, а в компанії — кролик, плюшевий ведмедик, їжачок і білочка. У наборі розмальовка, олівці та наклейки для затишного чаювання в саду.",
        pl: "Na stronach dzieci w słomkowych kapeluszach częstują gości przy ogrodowym stoliku z czajniczkiem i babeczkami, a w towarzystwie są królik, pluszowy miś, jeż i wiewiórka. W zestawie kolorowanka, kredki i naklejki na przytulny podwieczorek w ogrodzie.",
        en: "On these pages, children in straw hats host a garden tea party with a teapot and cupcakes, joined by a rabbit, a teddy bear, a hedgehog and a squirrel as guests. The set includes the coloring book, pencils and stickers for a cozy tea party in the garden.",
        sv: "På sidorna bjuder barn i halmhattar på tebjudning i trädgården med en tekanna och muffins, tillsammans med en kanin, en nallebjörn, en igelkott och en ekorre som gäster. I setet ingår målarboken, färgpennor och klistermärken för en mysig tebjudning i trädgården.",
      },
    },
    {
      id: "col-cities-landmarks",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/cities-famous-landmarks.webp",
      thumb: "assets/products/coloring/thumbs/cities-famous-landmarks.jpg",
      personalizable: false,
      name: {
        uk: "Міста та відомі пам'ятки світу",
        pl: "Miasta i słynne zabytki świata",
        en: "Cities and Famous Landmarks Around the World",
        sv: "Städer och kända sevärdheter i världen",
      },
      shortDescription: {
        uk: "Діти-мандрівники з фотоапаратом і мапою біля Ейфелевої вежі та піраміди.",
        pl: "Podróżujące dzieci z aparatem i mapą przy Wieży Eiffla i piramidzie.",
        en: "Traveling children with a camera and a map near the Eiffel Tower and a pyramid.",
        sv: "Resande barn med kamera och karta nära Eiffeltornet och en pyramid.",
      },
      description: {
        uk: "На сторінках — діти-мандрівники з фотоапаратом і мапою в руках подорожують повз Біг-Бен, Колізей, Ейфелеву вежу, Тадж-Махал і піраміди, а глобус із дороговказом показує напрямок далі. У наборі розмальовка, олівці та наклейки для подорожі відомими місцями світу.",
        pl: "Na stronach podróżujące dzieci z aparatem i mapą w rękach zwiedzają Big Bena, Koloseum, Wieżę Eiffla, Taj Mahal i piramidy, a globus z drogowskazem wskazuje dalszą drogę. W zestawie kolorowanka, kredki i naklejki na podróż po znanych miejscach świata.",
        en: "On these pages, traveling children with a camera and a map explore Big Ben, the Colosseum, the Eiffel Tower, the Taj Mahal and the pyramids, while a globe with a signpost points the way onward. The set includes the coloring book, pencils and stickers for a trip to famous places around the world.",
        sv: "På sidorna utforskar resande barn med kamera och karta Big Ben, Colosseum, Eiffeltornet, Taj Mahal och pyramiderna, medan en jordglob med en vägvisare pekar vidare. I setet ingår målarboken, färgpennor och klistermärken för en resa till kända platser i världen.",
      },
    },
    {
      id: "col-balloons-parties",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/balloons-festive-parties.webp",
      thumb: "assets/products/coloring/thumbs/balloons-festive-parties.jpg",
      personalizable: false,
      name: {
        uk: "Кульки та свята",
        pl: "Baloniki i przyjęcia",
        en: "Balloons and Festive Parties",
        sv: "Ballonger och kalas",
      },
      shortDescription: {
        uk: "Святковий торт зі свічками серед кульок, гірлянд і подарунків.",
        pl: "Świąteczny tort ze świeczkami wśród balonów, girland i prezentów.",
        en: "A birthday cake with candles among balloons, garlands and presents.",
        sv: "En födelsedagstårta med ljus bland ballonger, girlander och presenter.",
      },
      description: {
        uk: "На сторінках — святковий торт зі свічками стоїть серед кульок, гірлянд і подарунків, а плюшевий ведмедик і зайчик у святкових капелюшках приєднуються до свята. У наборі розмальовка, олівці та наклейки для веселого дня народження.",
        pl: "Na stronach świąteczny tort ze świeczkami stoi wśród balonów, girland i prezentów, a pluszowy miś i króliczek w świątecznych czapeczkach dołączają do zabawy. W zestawie kolorowanka, kredki i naklejki na wesołe urodziny.",
        en: "On these pages, a birthday cake with candles stands among balloons, garlands and presents, joined by a teddy bear and a bunny in party hats. The set includes the coloring book, pencils and stickers for a joyful birthday celebration.",
        sv: "På sidorna står en födelsedagstårta med ljus bland ballonger, girlander och presenter, tillsammans med en nallebjörn och en kanin i partyhattar. I setet ingår målarboken, färgpennor och klistermärken för ett glatt födelsedagsfirande.",
      },
    },
    {
      id: "col-underwater-mermaids",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/underwater-kingdoms-mermaids.webp",
      thumb: "assets/products/coloring/thumbs/underwater-kingdoms-mermaids.jpg",
      personalizable: false,
      name: {
        uk: "Підводні королівства та русалоньки",
        pl: "Podwodne królestwa i syrenki",
        en: "Underwater Kingdoms and Mermaids",
        sv: "Undervattensriken och sjöjungfrur",
      },
      shortDescription: {
        uk: "Русалонька та морський коник біля підводного замку й скрині зі скарбами.",
        pl: "Syrenka i konik morski przy podwodnym zamku i skrzyni ze skarbami.",
        en: "A mermaid and a seahorse near an underwater castle and a treasure chest.",
        sv: "En sjöjungfru och en sjöhäst nära ett undervattensslott och en skattkista.",
      },
      description: {
        uk: "На сторінках — русалонька пливе разом із морським коником повз підводний замок, де черепаха, краб і медуза охороняють скриню зі скарбами серед мушель. У наборі розмальовка, олівці та наклейки для казкової подорожі підводним королівством.",
        pl: "Na stronach syrenka płynie razem z konikiem morskim obok podwodnego zamku, gdzie żółw, krab i meduza pilnują skrzyni ze skarbami wśród muszelek. W zestawie kolorowanka, kredki i naklejki na baśniową podróż po podwodnym królestwie.",
        en: "On these pages, a mermaid swims alongside a seahorse past an underwater castle, where a turtle, a crab and a jellyfish guard a treasure chest among the shells. The set includes the coloring book, pencils and stickers for a fairy-tale journey through an underwater kingdom.",
        sv: "På sidorna simmar en sjöjungfru tillsammans med en sjöhäst förbi ett undervattensslott, där en sköldpadda, en krabba och en manet vaktar en skattkista bland snäckskalen. I setet ingår målarboken, färgpennor och klistermärken för en sagoresa genom ett undervattensrike.",
      },
    },
    {
      id: "col-butterflies-flowers",
      type: "coloring",
      price: { PLN: 21, EUR: 5, SEK: 55 },
      image: "assets/products/coloring/butterflies-and-flowers.webp",
      thumb: "assets/products/coloring/thumbs/butterflies-and-flowers.jpg",
      personalizable: false,
      name: {
        uk: "Метелики та квіти",
        pl: "Motyle i kwiaty",
        en: "Butterflies and Flowers",
        sv: "Fjärilar och blommor",
      },
      shortDescription: {
        uk: "Двоє дітей у саду з лійкою й совком серед метеликів і соняшника.",
        pl: "Dwoje dzieci w ogrodzie z konewką i łopatką wśród motyli i słonecznika.",
        en: "Two children gardening with a watering can and a trowel among butterflies and a sunflower.",
        sv: "Två barn som trädgårdsarbetar med vattenkanna och planteringsspade bland fjärilar och en solros.",
      },
      description: {
        uk: "На сторінках — двоє дітей доглядають за садом із лійкою та совком, поки метелики кружляють над соняшником і тюльпанами, а сонечко повзе листочком. У наборі розмальовка, олівці та наклейки для сонячного дня серед квітів.",
        pl: "Na stronach dwoje dzieci pielęgnuje ogród z konewką i łopatką, podczas gdy motyle krążą nad słonecznikiem i tulipanami, a biedronka pełznie po liściu. W zestawie kolorowanka, kredki i naklejki na słoneczny dzień wśród kwiatów.",
        en: "On these pages, two children tend the garden with a watering can and a trowel, while butterflies flutter over a sunflower and tulips, and a ladybird crawls along a leaf. The set includes the coloring book, pencils and stickers for a sunny day among the flowers.",
        sv: "På sidorna sköter två barn trädgården med vattenkanna och planteringsspade, medan fjärilar fladdrar över en solros och tulpaner och en nyckelpiga kryper längs ett blad. I setet ingår målarboken, färgpennor och klistermärken för en solig dag bland blommorna.",
      },
    },
  ];
})();
