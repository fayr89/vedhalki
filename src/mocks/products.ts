export const productVariants = {
  forma: [
    { id: "forma-pryamaya", label: "Прямая", priceMod: 0 },
    { id: "forma-izognutaya", label: "Изогнутая", priceMod: 300 },
    { id: "forma-asimmetrichnaya", label: "Асимметричная", priceMod: 500 },
    { id: "forma-kvadratnaya", label: "Квадратная", priceMod: 200 },
    { id: "forma-kruglaya", label: "Круглая", priceMod: 400 },
  ],
  function: [
    { id: "func-odezhda", label: "Одежда", priceMod: 0 },
    { id: "func-obuv", label: "Обувь", priceMod: 200 },
    { id: "func-aksessuary", label: "Аксессуары", priceMod: 100 },
    { id: "func-universal", label: "Универсальная", priceMod: 400 },
  ],
  stil: [
    { id: "stil-minimalizm", label: "Минимализм", priceMod: 0 },
    { id: "stil-loft", label: "Лофт", priceMod: 300 },
    { id: "stil-skandi", label: "Сканди", priceMod: 200 },
    { id: "stil-artdeco", label: "Арт-деко", priceMod: 500 },
    { id: "stil-nordik", label: "Нордик", priceMod: 200 },
  ],
};

export const products = [
  {
    id: "np-minimal",
    name: "Минимал",
    name_en: "Minimal",
    category: "Вешалка напольная",
    price: 4990,
    description: "Лаконичная напольная вешалка для тех, кто ценит чистоту линий. Тонкий металлический каркас с матовым покрытием органично впишется в любой интерьер — от скандинавского до лофта. Вместительная перекладина и устойчивое основание.",
    features: ["Матовое покрытие", "Стальной каркас", "Высота 175 см", "Нагрузка до 15 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Minimalist%20black%20floor%20standing%20clothes%20rack%20with%20thin%20metal%20frame%20matte%20finish%20on%20white%20background%20Scandinavian%20style%20clean%20lines%20product%20photography%20studio%20lighting%20empty%20room%20minimal%20aesthetic%20professional%20fashion%20display&width=800&height=1000&seq=minimal-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Black%20minimalist%20coat%20stand%20floor%20rack%20thin%20steel%20construction%20white%20wall%20background%20Scandinavian%20interior%20design%20product%20shot%20soft%20natural%20light%20clean%20modern%20aesthetic%20high%20detail%20professional&width=800&height=1000&seq=minimal-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-izognutaya"],
      function: ["func-odezhda", "func-universal"],
      stil: ["stil-minimalizm", "stil-skandi", "stil-nordik"],
    },
  },
  {
    id: "np-skandi",
    name: "Сканди",
    name_en: "Scandi",
    category: "Вешалка напольная",
    price: 6490,
    description: "Вдохновение природой севера. Вешалка Сканди сочетает светлое дерево и чёрный металл, создавая тёплую, уютную атмосферу. Идеально подходит для спальни или прихожей в скандинавском стиле.",
    features: ["Деревянные вставки", "Стальной каркас", "Высота 170 см", "Нагрузка до 20 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Scandinavian%20wooden%20and%20black%20metal%20floor%20clothes%20rack%20with%20light%20oak%20accents%20on%20white%20background%20minimalist%20design%20product%20photography%20clean%20aesthetic%20professional%20studio%20lighting&width=800&height=1000&seq=skandi-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Floor%20standing%20clothes%20rack%20with%20wood%20and%20black%20metal%20combination%20Scandinavian%20style%20in%20bright%20room%20with%20plants%20product%20display%20soft%20natural%20lighting%20minimalist%20interior&width=800&height=1000&seq=skandi-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-izognutaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-skandi", "stil-nordik", "stil-minimalizm"],
    },
  },
  {
    id: "np-loft",
    name: "Лофт",
    name_en: "Loft",
    category: "Стойка для одежды",
    price: 7990,
    description: "Индустриальный характер для смелых интерьеров. Массивная стойка Лофт с трубами из чёрного металла и открытой конструкцией — заявление о стиле. Вмещает верхнюю одежду, сумки и аксессуары.",
    features: ["Чёрный металл", "Индустриальный дизайн", "Высота 180 см", "Двойная перекладина"],
    images: [
      "https://readdy.ai/api/search-image?query=Industrial%20black%20metal%20pipe%20floor%20clothes%20rack%20loft%20style%20double%20rail%20on%20white%20studio%20background%20professional%20product%20photography%20bold%20design%20urban%20aesthetic&width=800&height=1000&seq=loft-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Black%20industrial%20clothing%20rack%20with%20thick%20metal%20pipes%20against%20white%20brick%20wall%20product%20display%20loft%20apartment%20setting%20professional%20photography%20high%20detail&width=800&height=1000&seq=loft-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-asimmetrichnaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-loft", "stil-minimalizm", "stil-artdeco"],
    },
  },
  {
    id: "np-nordik",
    name: "Нордик",
    name_en: "Nordic",
    category: "Вешалка напольная",
    price: 5490,
    description: "Северная простота в каждой детали. Нордик — это вешалка с характером: строгие формы, безупречные пропорции и абсолютная функциональность. Нижняя полка для обуви делает её особенно практичной.",
    features: ["Полка для обуви", "Порошковое покрытие", "Высота 172 см", "Нагрузка до 18 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Sleek%20black%20floor%20clothes%20stand%20with%20shoe%20shelf%20nordic%20design%20on%20white%20background%20minimalist%20product%20photography%20clean%20lines%20professional%20studio%20lighting%20matte%20finish&width=800&height=1000&seq=nordik-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Black%20minimalist%20coat%20rack%20with%20bottom%20shoe%20shelf%20in%20bright%20scandinavian%20room%20with%20wooden%20floor%20product%20shot%20natural%20light%20clean%20aesthetic&width=800&height=1000&seq=nordik-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-kvadratnaya"],
      function: ["func-obuv", "func-odezhda", "func-universal"],
      stil: ["stil-nordik", "stil-skandi", "stil-minimalizm"],
    },
  },
  {
    id: "np-graphite",
    name: "Графит",
    name_en: "Graphite",
    category: "Вешалка-стойка",
    price: 8990,
    description: "Глубокий, насыщенный, благородный. Вешалка-стойка Графит с текстурным покрытием, напоминающим природный камень, станет центральным элементом вашей гардеробной. Продуманная геометрия для максимума вещей.",
    features: ["Текстурное покрытие", "Усиленный каркас", "Высота 185 см", "Нагрузка до 30 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Dark%20textured%20graphite%20finish%20floor%20clothes%20rack%20heavy%20duty%20steel%20construction%20on%20white%20studio%20background%20premium%20product%20photography%20professional%20lighting%20luxurious&width=800&height=1000&seq=graphite-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Luxury%20graphite%20coated%20clothing%20rack%20floor%20stand%20in%20minimalist%20walk-in%20closet%20with%20white%20walls%20product%20display%20elegant%20dark%20aesthetic%20professional&width=800&height=1000&seq=graphite-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-kvadratnaya", "forma-asimmetrichnaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-loft", "stil-artdeco", "stil-minimalizm"],
    },
  },
  {
    id: "np-estet",
    name: "Эстет",
    name_en: "Esthete",
    category: "Напольная вешалка",
    price: 4490,
    description: "Доступная элегантность. Вешалка Эстет доказывает, что стиль не требует больших затрат. Тонкий профиль, устойчивая база и идеальные пропорции — повседневный комфорт в каждой детали.",
    features: ["Бюджетное решение", "Компактный дизайн", "Высота 168 см", "Нагрузка до 12 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Slim%20affordable%20black%20floor%20clothes%20rack%20compact%20design%20on%20white%20background%20product%20photography%20minimalist%20style%20clean%20professional%20studio%20shot%20simple%20elegant&width=800&height=1000&seq=estet-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Simple%20elegant%20black%20coat%20stand%20floor%20rack%20in%20bright%20bedroom%20setting%20with%20white%20walls%20product%20display%20natural%20light%20clean%20minimalist%20aesthetic&width=800&height=1000&seq=estet-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-izognutaya"],
      function: ["func-odezhda", "func-aksessuary"],
      stil: ["stil-minimalizm", "stil-skandi"],
    },
  },
  {
    id: "np-monolith",
    name: "Монолит",
    name_en: "Monolith",
    category: "Вешалка",
    price: 9990,
    description: "Монументальная надёжность. Монолит — это вешалка премиум-класса с цельным мраморным основанием и массивной стальной стойкой. Создана для тех, кто не приемлет компромиссов в качестве и дизайне.",
    features: ["Мраморное основание", "Нержавеющая сталь", "Высота 178 см", "Нагрузка до 40 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Premium%20black%20marble%20base%20floor%20clothes%20rack%20with%20thick%20steel%20pole%20luxury%20design%20on%20white%20background%20professional%20product%20photography%20elegant%20high-end%20aesthetic&width=800&height=1000&seq=monolith-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Luxury%20clothing%20rack%20with%20white%20marble%20base%20and%20black%20steel%20in%20upscale%20bedroom%20interior%20product%20display%20elegant%20minimalist%20design%20professional&width=800&height=1000&seq=monolith-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-kruglaya", "forma-kvadratnaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-artdeco", "stil-loft", "stil-minimalizm"],
    },
  },
  {
    id: "np-artdeco",
    name: "Арт-деко",
    name_en: "Art Deco",
    category: "Стойка",
    price: 11490,
    description: "Геометрия роскоши. Стойка Арт-деко с латунными акцентами и строгими линиями — дань уважения золотой эпохе дизайна. Идеальный выбор для интерьеров с характером и историей.",
    features: ["Латунные элементы", "Геометрический дизайн", "Высота 182 см", "Двойная перекладина"],
    images: [
      "https://readdy.ai/api/search-image?query=Art%20deco%20inspired%20black%20and%20brass%20floor%20clothes%20rack%20geometric%20design%20on%20white%20background%20luxury%20product%20photography%20professional%20lighting%20elegant%20vintage%20modern&width=800&height=1000&seq=artdeco-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Elegant%20art%20deco%20clothing%20rack%20with%20brass%20details%20geometric%20pattern%20in%20luxurious%20room%20setting%20product%20display%20dark%20aesthetic%20professional%20photography&width=800&height=1000&seq=artdeco-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-kvadratnaya", "forma-asimmetrichnaya", "forma-kruglaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-artdeco", "stil-loft", "stil-minimalizm"],
    },
  },
  {
    id: "np-asket",
    name: "Аскет",
    name_en: "Ascetic",
    category: "Вешалка",
    price: 3990,
    description: "Ничего лишнего. Аскет — самая доступная вешалка в коллекции. Простой трубчатый каркас, надёжная устойчивость и абсолютный минимализм. Для тех, кто ценит функциональность превыше всего.",
    features: ["Трубчатый каркас", "Лёгкая конструкция", "Высота 165 см", "Нагрузка до 10 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Simple%20minimal%20black%20tube%20frame%20floor%20clothes%20rack%20basic%20design%20on%20white%20background%20product%20photography%20clean%20affordable%20functional%20professional%20studio&width=800&height=1000&seq=asket-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Minimal%20basic%20black%20coat%20rack%20stand%20in%20small%20apartment%20setting%20with%20white%20walls%20functional%20design%20product%20display%20natural%20lighting%20simple&width=800&height=1000&seq=asket-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya"],
      function: ["func-odezhda"],
      stil: ["stil-minimalizm"],
    },
  },
  {
    id: "np-balance",
    name: "Баланс",
    name_en: "Balance",
    category: "Вешалка напольная",
    price: 6990,
    description: "Идеальное равновесие формы и функции. Баланс — вешалка с асимметричным дизайном: одна сторона для длинных вещей, другая — для коротких. Продуманная конструкция, которая работает на вас.",
    features: ["Асимметричный дизайн", "Два уровня", "Высота 180/140 см", "Нагрузка до 25 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Asymmetric%20black%20floor%20clothes%20rack%20with%20two%20different%20height%20rails%20modern%20design%20on%20white%20background%20product%20photography%20professional%20lighting%20innovative&width=800&height=1000&seq=balance-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Two-level%20asymmetric%20black%20clothing%20rack%20in%20modern%20apartment%20with%20white%20walls%20product%20display%20clean%20design%20natural%20light%20professional%20photography&width=800&height=1000&seq=balance-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-asimmetrichnaya", "forma-pryamaya"],
      function: ["func-universal", "func-odezhda"],
      stil: ["stil-minimalizm", "stil-loft", "stil-nordik"],
    },
  },
  {
    id: "np-geometria",
    name: "Геометрия",
    name_en: "Geometry",
    category: "Стойка",
    price: 7490,
    description: "Математика стиля. Стойка Геометрия построена на чистых углах и прямых линиях. Квадратное основание, перпендикулярные перекладины — архитектурный подход к хранению одежды.",
    features: ["Квадратное основание", "Геометрический дизайн", "Высота 176 см", "Нагрузка до 22 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Geometric%20black%20metal%20floor%20clothes%20rack%20with%20square%20base%20angular%20design%20on%20white%20background%20product%20photography%20architectural%20style%20professional%20lighting&width=800&height=1000&seq=geometria-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Angular%20geometric%20black%20clothing%20rack%20stand%20in%20modern%20loft%20space%20with%20white%20walls%20product%20display%20architectural%20design%20professional%20photography&width=800&height=1000&seq=geometria-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-kvadratnaya", "forma-pryamaya", "forma-asimmetrichnaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-minimalizm", "stil-loft", "stil-artdeco"],
    },
  },
  {
    id: "np-eko",
    name: "Эко",
    name_en: "Eco",
    category: "Вешалка",
    price: 4990,
    description: "Природа в каждой детали. Вешалка Эко изготовлена из переработанной стали с натуральным деревянным покрытием перекладины. Экологичный выбор для осознанного потребления.",
    features: ["Переработанная сталь", "Деревянная перекладина", "Высота 170 см", "Нагрузка до 16 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Eco-friendly%20black%20steel%20floor%20clothes%20rack%20with%20natural%20wood%20rail%20on%20white%20background%20sustainable%20design%20product%20photography%20professional%20minimalist&width=800&height=1000&seq=eko-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Sustainable%20black%20and%20wood%20clothing%20rack%20in%20bright%20natural%20room%20with%20plants%20product%20display%20eco-friendly%20design%20natural%20light%20professional%20photography&width=800&height=1000&seq=eko-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-pryamaya", "forma-izognutaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-skandi", "stil-nordik", "stil-minimalizm"],
    },
  },
  {
    id: "np-form",
    name: "Форм",
    name_en: "Form",
    category: "Напольная вешалка",
    price: 5990,
    description: "Скульптурная элегантность. Вешалка Форм с изогнутыми линиями напоминает произведение современного искусства. Мягкие изгибы металла создают ощущение лёгкости и движения.",
    features: ["Изогнутые линии", "Скульптурный дизайн", "Высота 174 см", "Нагрузка до 14 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Sculptural%20curved%20black%20metal%20floor%20clothes%20rack%20artistic%20design%20organic%20shape%20on%20white%20background%20product%20photography%20professional%20lighting%20elegant&width=800&height=1000&seq=form-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Artistic%20curved%20black%20clothing%20rack%20sculptural%20design%20in%20gallery-like%20white%20room%20product%20display%20elegant%20minimalist%20professional%20photography&width=800&height=1000&seq=form-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-izognutaya", "forma-pryamaya", "forma-asimmetrichnaya"],
      function: ["func-odezhda", "func-aksessuary", "func-universal"],
      stil: ["stil-artdeco", "stil-minimalizm", "stil-loft"],
    },
  },
  {
    id: "np-eclipse",
    name: "Эклипс",
    name_en: "Eclipse",
    category: "Стойка для одежды",
    price: 8490,
    description: "Космический минимализм. Стойка Эклипс с круглым основанием и дугообразной верхней перекладиной. Идеальное решение для просторных гардеробных и демонстрации любимых вещей.",
    features: ["Круглое основание", "Дугообразная перекладина", "Высота 183 см", "Нагрузка до 28 кг"],
    images: [
      "https://readdy.ai/api/search-image?query=Elegant%20black%20floor%20clothes%20rack%20with%20circular%20base%20and%20arched%20rail%20on%20white%20background%20product%20photography%20cosmic%20minimalist%20design%20professional&width=800&height=1000&seq=eclipse-01&orientation=portrait",
      "https://readdy.ai/api/search-image?query=Black%20circular%20base%20clothing%20rack%20with%20curved%20top%20rail%20in%20spacious%20white%20walk-in%20closet%20product%20display%20elegant%20professional%20photography&width=800&height=1000&seq=eclipse-02&orientation=portrait"
    ],
    variants: {
      forma: ["forma-kruglaya", "forma-pryamaya", "forma-izognutaya"],
      function: ["func-universal", "func-odezhda", "func-aksessuary"],
      stil: ["stil-minimalizm", "stil-loft", "stil-artdeco"],
    },
  },
];

export const reviews = [
  {
    id: 1,
    name: "Анна К.",
    rating: 5,
    text: "Заказала вешалку Минимал — идеально вписалась в мою спальню. Очень устойчивая, при этом выглядит невесомо. Доставка быстрая, упаковка надёжная.",
    date: "15 июля 2026",
    product: "Минимал",
  },
  {
    id: 2,
    name: "Дмитрий В.",
    rating: 5,
    text: "Монолит — это просто произведение искусства. Мраморное основание выглядит потрясающе, качество стали на высоте. Рекомендую всем, кто ищет премиум.",
    date: "8 июля 2026",
    product: "Монолит",
  },
  {
    id: 3,
    name: "Елена С.",
    rating: 4,
    text: "Купила Лофт для прихожей — очень стильно смотрится. Единственное, хотелось бы инструкцию по сборке на русском, но собрали быстро.",
    date: "2 июля 2026",
    product: "Лофт",
  },
];