export type Lang = "en" | "ua" | "it";

export const LANGS: { code: Lang; short: string }[] = [
  { code: "ua", short: "UA" },
  { code: "en", short: "EN" },
  { code: "it", short: "IT" },
];

export const DEFAULT_LANG: Lang = "en";

type Dict = {
  nav: {
    about: string;
    services: string;
    results: string;
    testimonials: string;
    faq: string;
    contact: string;
    book: string;
    bookConsult: string;
  };
  intro: {
    button: string;
    aria: string;
  };
  hero: {
    role: string;
    taglineA: string;
    taglineB: string;
    subtitleA: string;
    subtitleB: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  labels: {
    about: string;
    services: string;
    procedures: string;
    proceduresLead: string;
    philosophy: string;
    results: string;
    process: string;
    testimonials: string;
    faq: string;
    booking: string;
    contact: string;
  };
  about: {
    tagline: string;
    p1: string;
    p2: string;
    p3: string;
    cta: string;
  };
  services: { name: string; price: string; desc: string }[];
  philosophy: {
    lineA: string;
    lineB: string;
    principles: { key: string; title: string; text: string }[];
  };
  results: {
    headingA: string;
    headingB: string;
    text: string;
    before: string;
    after: string;
  };
  process: { n: string; title: string; text: string }[];
  trust: { value: string; label: string }[];
  testimonials: { quote: string; name: string; detail: string }[];
  reviews: { heading: string; headingAccent: string; lead: string };
  faq: { q: string; a: string }[];
  finalCta: { label: string; lineA: string; lineB: string; button: string };
  contact: {
    heading: string;
    fields: {
      address: string;
      phone: string;
      email: string;
      hours: string;
      instagram: string;
      license: string;
    };
    values: {
      address: string;
      phone: string;
      email: string;
      hours: string;
      instagram: string;
      license: string;
    };
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      submit: string;
      disclaimer: string;
    };
  };
  booking: {
    heading: string;
    lead: string;
    name: string;
    phone: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    disclaimer: string;
    close: string;
  };
  footer: {
    tagline: string;
    about: string;
    services: string;
    contact: string;
    rights: string;
    place: string;
  };
};

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      about: "About the doctor",
      services: "Services",
      results: "Before & after",
      testimonials: "Reviews",
      faq: "Questions",
      contact: "Contact",
      book: "Book",
      bookConsult: "Book a consultation",
    },
    intro: {
      button: "Enter",
      aria: "Enter the site",
    },
    hero: {
      role: "Aesthetic physician",
      taglineA: "Natural, living beauty.",
      taglineB: "Beauty in the real you.",
      subtitleA: "Medicine, anatomy and aesthetics —",
      subtitleB: "behind every decision.",
      ctaPrimary: "Book a consultation",
      ctaSecondary: "Procedures",
      scroll: "Scroll",
    },
    labels: {
      about: "About the doctor",
      services: "Services",
      procedures: "Procedures",
      proceduresLead: "Base prices — your exact plan is set at a consultation.",
      philosophy: "Philosophy",
      results: "Before / after",
      process: "Process",
      testimonials: "Reviews",
      faq: "Questions",
      booking: "Booking",
      contact: "Contact",
    },
    about: {
      tagline: "Aesthetic medicine built on anatomy, precision and naturalness.",
      p1: "I work with every patient individually — from assessing the skin to choosing the procedures. I combine professional care with device-based and injectable techniques, preserving the naturalness and harmony of your features.",
      p2: "Every procedure here brings together deep knowledge, care and aesthetics — so that the results make you happier.",
      p3: "Get in touch — I will choose the right procedure for you.",
      cta: "Choose a procedure",
    },
    services: [
      {
        name: "Consultation",
        price: "€50",
        desc: "An examination, skin assessment, and a personal treatment plan.",
      },
      {
        name: "Follow-up consultation",
        price: "€40",
        desc: "Progress check and fine-tuning of your treatment plan.",
      },
      {
        name: "Facial peeling",
        price: "€70",
        desc: "Renews the skin's surface and evens out tone and texture, with no lengthy downtime.",
      },
      {
        name: "Deep cleansing",
        price: "€90",
        desc: "Thorough pore cleansing by hand and with equipment, for clear, well-cared-for skin.",
      },
      {
        name: "Lip contouring",
        price: "€180",
        desc: "Natural correction of lip volume and shape with hyaluronic fillers.",
      },
      {
        name: "Botulinum therapy",
        price: "€150",
        desc: "Relaxes expression muscles for smooth skin, free of creases and wrinkles.",
      },
      {
        name: "Biorevitalisation",
        price: "€120",
        desc: "Deep hydration and collagen stimulation via hyaluronic acid injections.",
      },
      {
        name: "Vector lifting",
        price: "€350",
        desc: "Thread-lifts the facial contour — no surgery, no lengthy recovery.",
      },
      {
        name: "Blanche therapy",
        price: "€130",
        desc: "A gentle brightening treatment that evens tone and restores natural radiance.",
      },
    ],
    philosophy: {
      lineA: "We do not create a new face.",
      lineB: "We restore harmony.",
      principles: [
        {
          key: "i",
          title: "Anatomy",
          text: "Understanding structure, volume and facial proportions.",
        },
        {
          key: "ii",
          title: "Precision",
          text: "Every decision has a medical rationale.",
        },
        {
          key: "iii",
          title: "Naturalness",
          text: "The result must remain yours.",
        },
      ],
    },
    results: {
      headingA: "A result that",
      headingB: "stays yours.",
      text: "Drag the slider to see the difference in skin quality and tone. Real clinical cases are shown during the consultation.",
      before: "Before",
      after: "After",
    },
    process: [
      {
        n: "01",
        title: "Consultation",
        text: "Analysis of proportions, skin condition and an honest talk about expectations.",
      },
      {
        n: "02",
        title: "Individual plan",
        text: "A sequence of steps with nothing unnecessary.",
      },
      {
        n: "03",
        title: "Procedure",
        text: "Delicate execution following a medical protocol.",
      },
      {
        n: "04",
        title: "Follow-up",
        text: "Monitoring the result and support between visits.",
      },
    ],
    trust: [
      { value: "8", label: "years in aesthetic medicine" },
      { value: "1,200+", label: "patients" },
      { value: "Original", label: "certified products only" },
      { value: "Licensed", label: "private medical practice" },
    ],
    testimonials: [
      {
        quote:
          "Botox for the first time, and what scared me most was the 'frozen' look. She counted the units in front of me and explained why exactly that many. Two weeks on, the forehead is smooth but my brows still move. It has held for five months.",
        name: "Marina, 34",
        detail: "Botulinum therapy — forehead & glabella",
      },
      {
        quote:
          "I came in to 'build up my cheekbones' and left with advice to inject nothing for now and treat my skin instead. It's the only time a doctor has turned down my money. I've been a regular ever since.",
        name: "Olha R.",
        detail: "Consultation, biorevitalisation",
      },
      {
        quote:
          "For three years I went to different injectors and always walked out with 'duck' lips. Here they used half a millilitre — my own shape, I just look well-rested.",
        name: "Kateryna V.",
        detail: "Lip correction",
      },
      {
        quote:
          "The dark circles had bothered me for years — I looked tired in every photo. After the tear-trough correction nobody realised I'd had anything done. People asked if I'd been on holiday.",
        name: "Anna S., 41",
        detail: "Eye area",
      },
      {
        quote:
          "Before a big event I was mostly worried about bruising. They worked very carefully, with a cannula — not a single bruise, and the slight swelling was gone within a day. I was back at work the next morning.",
        name: "Yuliia M.",
        detail: "Facial biorevitalisation",
      },
      {
        quote:
          "I've been coming for two years. They tell you the full price upfront, they write the plan out on paper, and not once have they tried to sell me 'something extra'.",
        name: "L.",
        detail: "Comprehensive care",
      },
      {
        quote:
          "I never thought I'd see an aesthetic doctor. My wife talked me into a consultation about my neck. It was done so subtly that colleagues noticed nothing — they just said I looked rested.",
        name: "Dmytro K., 46",
        detail: "Neck, platysma botulinum therapy",
      },
      {
        quote:
          "Teenage acne left my skin texture uneven. She told me honestly that one session would do nothing and laid out a course over several months. My skin is smoother than it has ever been. Don't expect an instant miracle.",
        name: "Sofiia T., 29",
        detail: "Polynucleotides, mesotherapy",
      },
    ],
    reviews: {
      heading: "What Our Clients Are",
      headingAccent: "Saying",
      lead: "I'm glad to have helped hundreds of clients enhance their natural beauty. Here's what they say about their experience and results.",
    },
    faq: [
      {
        q: "Will it be obvious I've had something done?",
        a: "The whole point of the approach is that it isn't. We work with minimal doses and in stages, preserving your expressions. People usually see that you look well without understanding why.",
      },
      {
        q: "How painful is it?",
        a: "Most procedures involve only mild discomfort. Topical anaesthesia is used when needed. Fine needles and a slow technique make the process as comfortable as possible.",
      },
      {
        q: "When will I see the result and how long does it last?",
        a: "Botulinum therapy develops over 10–14 days; fillers and biorevitalisation are visible immediately with further improvement. Duration depends on the product and individual factors: on average 6 to 18 months.",
      },
      {
        q: "What happens at the first consultation?",
        a: "We analyse facial proportions, skin condition and quality, discuss your expectations and build a plan. The consultation commits you to nothing — sometimes its outcome is that procedures aren't needed yet.",
      },
      {
        q: "Can I come just to talk it through?",
        a: "Yes. You can book a consultation only, with no procedures the same day. That's a normal practice and the right way to start.",
      },
    ],
    finalCta: {
      label: "04 — Booking",
      lineA: "Your face does not need changing.",
      lineB: "It needs the right approach.",
      button: "Book a consultation",
    },
    contact: {
      heading: "Book a consultation",
      fields: {
        address: "Address",
        phone: "Phone",
        email: "Email",
        hours: "Hours",
        instagram: "Instagram",
        license: "License",
      },
      values: {
        address: "Milan, Via Montenapoleone (by appointment)",
        phone: "+39 000 000 00 00",
        email: "hello@sofialorenti.com",
        hours: "Mon–Sat, 10:00–19:00",
        instagram: "@dr.sofia.lorenti",
        license: "Health Ministry licence No. ___",
      },
      form: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
        submit: "Send request",
        disclaimer:
          "By submitting this form you agree to the processing of your personal data.",
      },
    },
    booking: {
      heading: "Book a consultation",
      lead: "Leave your name and phone — I will call you back to confirm a time.",
      name: "Name",
      phone: "Phone",
      submit: "Send request",
      sending: "Sending…",
      success: "Thank you! I will contact you shortly.",
      error: "Something went wrong — please call or write to us directly.",
      disclaimer:
        "By submitting this form you agree to the processing of your personal data.",
      close: "Close",
    },
    footer: {
      tagline:
        "DR. SOFIA LORENTI — a private aesthetic-medicine practice. By appointment only.",
      about: "About the doctor",
      services: "Services",
      contact: "Contact",
      rights: "DR. SOFIA LORENTI",
      place: "Milan · Aesthetic Medicine",
    },
  },

  ua: {
    nav: {
      about: "Про лікаря",
      services: "Послуги",
      results: "До та після",
      testimonials: "Відгуки",
      faq: "Питання",
      contact: "Контакти",
      book: "Записатися",
      bookConsult: "Записатися на консультацію",
    },
    intro: {
      button: "Увійти",
      aria: "Вхід на сайт",
    },
    hero: {
      role: "Лікар естетичної медицини",
      taglineA: "Природна, жива краса.",
      taglineB: "Краса у справжньому тобі.",
      subtitleA: "Медицина, анатомія та естетика —",
      subtitleB: "в основі кожного рішення.",
      ctaPrimary: "Записатися на консультацію",
      ctaSecondary: "Процедури",
      scroll: "Гортати",
    },
    labels: {
      about: "Про лікаря",
      services: "Послуги",
      procedures: "Процедури",
      proceduresLead: "Базові ціни — точний план визначається на консультації.",
      philosophy: "Філософія",
      results: "До / після",
      process: "Процес",
      testimonials: "Відгуки",
      faq: "Питання",
      booking: "Запис",
      contact: "Контакти",
    },
    about: {
      tagline: "Естетична медицина, побудована на анатомії, точності та природності.",
      p1: "Я працюю з кожним пацієнтом індивідуально — від оцінки стану шкіри до підбору процедур. Поєдную професійний догляд, апаратні та ін’єкційні методики, зберігаючи природність і гармонію рис обличчя.",
      p2: "Кожна процедура тут — це поєднання глибоких знань, турботи та естетики. І все задля того, щоб результати робили Вас щасливішими.",
      p3: "Зв’яжіться зі мною — я підберу процедуру саме для вас.",
      cta: "Підібрати процедуру",
    },
    services: [
      {
        name: "Консультація",
        price: "€50",
        desc: "Огляд, оцінка стану шкіри та індивідуальний план процедур.",
      },
      {
        name: "Повторна консультація",
        price: "€40",
        desc: "Контроль результату й коригування програми на наступних етапах.",
      },
      {
        name: "Пілінг обличчя",
        price: "€70",
        desc: "Оновлення поверхні шкіри, вирівнювання тону й текстури без тривалого відновлення.",
      },
      {
        name: "Чистка",
        price: "€90",
        desc: "Глибоке очищення пор апаратним і ручним методом для чистої, доглянутої шкіри.",
      },
      {
        name: "Контурна пластика губ",
        price: "€180",
        desc: "Природна корекція об'єму та форми губ гіалуроновими філерами.",
      },
      {
        name: "Ботулінотерапія",
        price: "€150",
        desc: "Розслаблення мімічних м'язів для гладкої шкіри без заломів і зморшок.",
      },
      {
        name: "Біоревіталізація",
        price: "€120",
        desc: "Глибоке зволоження та стимуляція власного колагену ін'єкціями гіалуронової кислоти.",
      },
      {
        name: "Векторний ліфтинг",
        price: "€350",
        desc: "Підтяжка овалу обличчя нитками — без хірургії й тривалої реабілітації.",
      },
      {
        name: "Бланч-терапія",
        price: "€130",
        desc: "М'яке освітлення та вирівнювання тону шкіри, повернення природного сяйва.",
      },
    ],
    philosophy: {
      lineA: "Ми не створюємо нове обличчя.",
      lineB: "Ми повертаємо гармонію.",
      principles: [
        {
          key: "i",
          title: "Анатомія",
          text: "Розуміння структури, об'ємів та пропорцій обличчя.",
        },
        {
          key: "ii",
          title: "Точність",
          text: "Кожне рішення має медичне обґрунтування.",
        },
        {
          key: "iii",
          title: "Природність",
          text: "Результат повинен залишатися вашим.",
        },
      ],
    },
    results: {
      headingA: "Результат, який",
      headingB: "залишається вашим.",
      text: "Порухайте повзунок, щоб побачити різницю в якості та тонусі шкіри. Реальні клінічні кейси показуємо на консультації.",
      before: "До",
      after: "Після",
    },
    process: [
      {
        n: "01",
        title: "Консультація",
        text: "Аналіз пропорцій, стану шкіри та чесна розмова про очікування.",
      },
      {
        n: "02",
        title: "Індивідуальний план",
        text: "Послідовність кроків без зайвих процедур.",
      },
      {
        n: "03",
        title: "Процедура",
        text: "Делікатне виконання за медичним протоколом.",
      },
      {
        n: "04",
        title: "Супровід",
        text: "Контроль результату та підтримка між візитами.",
      },
    ],
    trust: [
      { value: "8", label: "років у естетичній медицині" },
      { value: "1 200+", label: "пацієнтів" },
      { value: "Оригінальні", label: "лише сертифіковані препарати" },
      { value: "Ліцензія МОЗ", label: "приватна медична практика" },
    ],
    testimonials: [
      {
        quote:
          "Робила ботокс уперше і найбільше боялася ефекту «маски». Лікарка порахувала одиниці прямо при мені й пояснила, чому саме стільки. Через два тижні чоло гладеньке, але брови рухаються. Тримається вже пʼятий місяць.",
        name: "Марина, 34",
        detail: "Ботулінотерапія — чоло та міжбрівʼя",
      },
      {
        quote:
          "Прийшла «збільшити вилиці», а пішла з порадою поки нічого не колоти й підлікувати шкіру. Це був єдиний раз, коли лікар відмовився брати мої гроші. Відтоді я тут постійний пацієнт.",
        name: "Ольга Р.",
        detail: "Консультація, біоревіталізація",
      },
      {
        quote:
          "Три роки ходила до різних майстрів і завжди виходила з «качиними» губами. Тут вкололи всього пів мілілітра — форма своя, просто виглядаю так, ніби добре виспалась.",
        name: "Катерина В.",
        detail: "Корекція губ",
      },
      {
        quote:
          "Мене роками діставали темні кола — на всіх фото виглядала втомленою. Після корекції носослізної борозни ніхто не зрозумів, що я щось робила. Питали, чи я у відпустці була.",
        name: "Анна С., 41",
        detail: "Зона навколо очей",
      },
      {
        quote:
          "Перед важливою подією найбільше хвилювалась через синці. Кололи дуже акуратно, канюлею — жодного синця, невеликий набряк зійшов за день. Наступного ранку вийшла на роботу як звичайно.",
        name: "Юлія М.",
        detail: "Біоревіталізація обличчя",
      },
      {
        quote:
          "Ходжу вже два роки. Ціни кажуть одразу і повністю, план розписують на папері, і жодного разу не намагались продати «ще щось».",
        name: "Л.",
        detail: "Комплексний догляд",
      },
      {
        quote:
          "Не думав, що колись піду до косметолога. Дружина вмовила на консультацію щодо шиї. Зробили так делікатно, що колеги нічого не помітили — просто сказали, що я наче відпочив.",
        name: "Дмитро К., 46",
        detail: "Шия, ботулінотерапія платизми",
      },
      {
        quote:
          "Після підліткового акне лишилась нерівна текстура. Лікарка чесно сказала, що за один раз нічого не буде, і розписала курс на кілька місяців. Зараз шкіра рівніша, ніж будь-коли. Не чекайте миттєвого дива.",
        name: "Софія Т., 29",
        detail: "Полінуклеотиди, мезотерапія",
      },
    ],
    reviews: {
      heading: "Що говорять наші",
      headingAccent: "клієнти",
      lead: "Я рада, що допомогла сотням клієнтів підкреслити їхню природну красу. Ось що вони говорять про свій досвід та результати.",
    },
    faq: [
      {
        q: "Чи буде помітно, що я щось робила?",
        a: "Мета підходу — щоб було непомітно. Ми працюємо мінімальними дозами та поетапно, зберігаючи вашу міміку й вираз обличчя. Оточення зазвичай бачить, що ви добре виглядаєте, але не розуміє причини.",
      },
      {
        q: "Наскільки це боляче?",
        a: "Більшість процедур передбачає лише легкий дискомфорт. За потреби застосовується аплікаційна анестезія. Тонкі голки та повільна техніка роблять процес максимально комфортним.",
      },
      {
        q: "Коли буде видно результат і скільки він триває?",
        a: "Ботулінотерапія розкривається протягом 10–14 днів, філери та біоревіталізація — одразу з подальшим покращенням. Тривалість залежить від препарату й індивідуальних особливостей: у середньому від 6 до 18 місяців.",
      },
      {
        q: "Як проходить перша консультація?",
        a: "Ми аналізуємо пропорції обличчя, стан і якість шкіри, обговорюємо ваші очікування та складаємо план. Консультація ні до чого не зобов'язує — іноді її результат у тому, що процедури поки не потрібні.",
      },
      {
        q: "Чи можна прийти просто порадитися?",
        a: "Так. Ви можете записатися лише на консультацію, без проведення процедур того ж дня. Це нормальна практика й правильний початок.",
      },
    ],
    finalCta: {
      label: "04 — Запис",
      lineA: "Ваше обличчя не потребує змін.",
      lineB: "Воно потребує правильного підходу.",
      button: "Записатися на консультацію",
    },
    contact: {
      heading: "Запис на консультацію",
      fields: {
        address: "Адреса",
        phone: "Телефон",
        email: "Email",
        hours: "Прийом",
        instagram: "Instagram",
        license: "Ліцензія",
      },
      values: {
        address: "Мілан, Via Montenapoleone (за записом)",
        phone: "+39 000 000 00 00",
        email: "hello@sofialorenti.com",
        hours: "Пн–Сб, 10:00–19:00",
        instagram: "@dr.sofia.lorenti",
        license: "Ліцензія МОЗ України № ___",
      },
      form: {
        name: "Ім'я",
        phone: "Телефон",
        email: "Email",
        message: "Коментар",
        submit: "Надіслати запит",
        disclaimer:
          "Надсилаючи форму, ви погоджуєтесь на обробку персональних даних.",
      },
    },
    booking: {
      heading: "Запис на консультацію",
      lead: "Залиште ім'я та телефон — я передзвоню, щоб узгодити зручний час.",
      name: "Ім'я",
      phone: "Телефон",
      submit: "Надіслати запит",
      sending: "Надсилаємо…",
      success: "Дякую! Я зв'яжуся з вами найближчим часом.",
      error: "Щось пішло не так — зателефонуйте або напишіть нам напряму.",
      disclaimer:
        "Надсилаючи форму, ви погоджуєтесь на обробку персональних даних.",
      close: "Закрити",
    },
    footer: {
      tagline:
        "DR. SOFIA LORENTI — приватна практика естетичної медицини. Прийом за попереднім записом.",
      about: "Про лікаря",
      services: "Послуги",
      contact: "Контакти",
      rights: "DR. SOFIA LORENTI",
      place: "Мілан · Естетична медицина",
    },
  },

  it: {
    nav: {
      about: "Il medico",
      services: "Trattamenti",
      results: "Prima e dopo",
      testimonials: "Recensioni",
      faq: "Domande",
      contact: "Contatti",
      book: "Prenota",
      bookConsult: "Prenota una consulenza",
    },
    intro: {
      button: "Entra",
      aria: "Entra nel sito",
    },
    hero: {
      role: "Medico estetico",
      taglineA: "Bellezza naturale e viva.",
      taglineB: "La bellezza nel vero te.",
      subtitleA: "Medicina, anatomia ed estetica —",
      subtitleB: "dietro ogni decisione.",
      ctaPrimary: "Prenota una consulenza",
      ctaSecondary: "Trattamenti",
      scroll: "Scorri",
    },
    labels: {
      about: "Il medico",
      services: "Trattamenti",
      procedures: "Trattamenti",
      proceduresLead: "Prezzi base — il piano definitivo si stabilisce in consulenza.",
      philosophy: "Filosofia",
      results: "Prima / dopo",
      process: "Percorso",
      testimonials: "Recensioni",
      faq: "Domande",
      booking: "Prenotazione",
      contact: "Contatti",
    },
    about: {
      tagline: "Medicina estetica costruita su anatomia, precisione e naturalezza.",
      p1: "Lavoro con ogni paziente in modo individuale — dalla valutazione della pelle alla scelta dei trattamenti. Unisco cura professionale, tecniche strumentali e iniettive, preservando la naturalezza e l’armonia dei lineamenti.",
      p2: "Ogni trattamento qui unisce conoscenza approfondita, cura ed estetica — perché il risultato ti renda più felice.",
      p3: "Contattami — sceglierò il trattamento giusto per te.",
      cta: "Scegli un trattamento",
    },
    services: [
      {
        name: "Consulenza",
        price: "€50",
        desc: "Visita, valutazione della pelle e piano di trattamento personalizzato.",
      },
      {
        name: "Consulenza di controllo",
        price: "€40",
        desc: "Verifica dei risultati e adeguamento del programma.",
      },
      {
        name: "Peeling viso",
        price: "€70",
        desc: "Rinnova la superficie della pelle, uniforma tono e texture, senza tempi di recupero lunghi.",
      },
      {
        name: "Pulizia profonda",
        price: "€90",
        desc: "Pulizia approfondita dei pori con metodo manuale e strumentale.",
      },
      {
        name: "Contornatura labbra",
        price: "€180",
        desc: "Correzione naturale di volume e forma delle labbra con filler all'acido ialuronico.",
      },
      {
        name: "Tossina botulinica",
        price: "€150",
        desc: "Rilassa i muscoli mimici per una pelle liscia, senza pieghe né rughe.",
      },
      {
        name: "Biorivitalizzazione",
        price: "€120",
        desc: "Idratazione profonda e stimolazione del collagene con acido ialuronico.",
      },
      {
        name: "Lifting vettoriale",
        price: "€350",
        desc: "Solleva l'ovale del viso con fili — senza chirurgia né lunga guarigione.",
      },
      {
        name: "Terapia Blanche",
        price: "€130",
        desc: "Un trattamento delicato che schiarisce e uniforma il tono, per una luminosità naturale.",
      },
    ],
    philosophy: {
      lineA: "Non creiamo un volto nuovo.",
      lineB: "Restituiamo armonia.",
      principles: [
        {
          key: "i",
          title: "Anatomia",
          text: "Comprensione di struttura, volumi e proporzioni del viso.",
        },
        {
          key: "ii",
          title: "Precisione",
          text: "Ogni decisione ha una motivazione medica.",
        },
        {
          key: "iii",
          title: "Naturalezza",
          text: "Il risultato deve restare tuo.",
        },
      ],
    },
    results: {
      headingA: "Un risultato",
      headingB: "che resta tuo.",
      text: "Trascina il cursore per vedere la differenza di qualità e tono della pelle. I casi clinici reali vengono mostrati durante la consulenza.",
      before: "Prima",
      after: "Dopo",
    },
    process: [
      {
        n: "01",
        title: "Consulenza",
        text: "Analisi delle proporzioni, dello stato della pelle e un dialogo sincero sulle aspettative.",
      },
      {
        n: "02",
        title: "Piano personalizzato",
        text: "Una sequenza di passaggi senza nulla di superfluo.",
      },
      {
        n: "03",
        title: "Trattamento",
        text: "Esecuzione delicata secondo protocollo medico.",
      },
      {
        n: "04",
        title: "Follow-up",
        text: "Controllo del risultato e supporto tra un incontro e l'altro.",
      },
    ],
    trust: [
      { value: "8", label: "anni in medicina estetica" },
      { value: "1 200+", label: "pazienti" },
      { value: "Originali", label: "solo prodotti certificati" },
      { value: "Autorizzato", label: "studio medico privato" },
    ],
    testimonials: [
      {
        quote:
          "Botox per la prima volta, e la paura più grande era l'effetto «maschera». Ha contato le unità davanti a me e mi ha spiegato perché proprio quel numero. Dopo due settimane la fronte è liscia ma le sopracciglia si muovono. Dura già da cinque mesi.",
        name: "Marina, 34",
        detail: "Tossina botulinica — fronte e glabella",
      },
      {
        quote:
          "Sono venuta per «aumentare gli zigomi» e sono uscita con il consiglio di non iniettare nulla per ora e di curare la pelle. È l'unica volta che un medico ha rifiutato i miei soldi. Da allora sono una paziente fissa.",
        name: "Olha R.",
        detail: "Consulenza, biorivitalizzazione",
      },
      {
        quote:
          "Per tre anni sono andata da diversi operatori e uscivo sempre con le labbra «a papera». Qui hanno usato mezzo millilitro — la mia forma, sembro solo riposata.",
        name: "Kateryna V.",
        detail: "Correzione labbra",
      },
      {
        quote:
          "Le occhiaie mi tormentavano da anni — in ogni foto sembravo stanca. Dopo la correzione del solco lacrimale nessuno ha capito che avevo fatto qualcosa. Mi chiedevano se fossi stata in vacanza.",
        name: "Anna S., 41",
        detail: "Contorno occhi",
      },
      {
        quote:
          "Prima di un evento importante temevo soprattutto i lividi. Hanno lavorato con molta attenzione, con la cannula — nessun livido, e il leggero gonfiore è sparito in un giorno. La mattina dopo ero al lavoro.",
        name: "Yuliia M.",
        detail: "Biorivitalizzazione del viso",
      },
      {
        quote:
          "Vengo da due anni. Il prezzo te lo dicono subito e per intero, il piano lo scrivono su carta, e non hanno mai provato a vendermi «qualcosa in più».",
        name: "L.",
        detail: "Percorso completo",
      },
      {
        quote:
          "Non pensavo che sarei mai andato da un medico estetico. Mia moglie mi ha convinto a una consulenza per il collo. È stato fatto con tale discrezione che i colleghi non hanno notato nulla — hanno solo detto che sembravo riposato.",
        name: "Dmytro K., 46",
        detail: "Collo, tossina botulinica del platisma",
      },
      {
        quote:
          "L'acne dell'adolescenza mi aveva lasciato una pelle irregolare. Mi ha detto onestamente che una sola seduta non avrebbe fatto nulla e ha programmato un percorso di alcuni mesi. Ora la pelle è più liscia che mai. Non aspettatevi un miracolo immediato.",
        name: "Sofiia T., 29",
        detail: "Polinucleotidi, mesoterapia",
      },
    ],
    reviews: {
      heading: "Cosa Dicono i Nostri",
      headingAccent: "Clienti",
      lead: "Sono felice di aver aiutato centinaia di clienti a valorizzare la loro bellezza naturale. Ecco cosa dicono della loro esperienza e dei risultati.",
    },
    faq: [
      {
        q: "Si noterà che ho fatto qualcosa?",
        a: "L'obiettivo dell'approccio è proprio che non si noti. Lavoriamo con dosi minime e per gradi, preservando la mimica. Di solito gli altri vedono che hai un bell'aspetto senza capirne il motivo.",
      },
      {
        q: "Quanto è doloroso?",
        a: "La maggior parte dei trattamenti comporta solo un lieve fastidio. Quando serve si usa l'anestesia topica. Aghi sottili e una tecnica lenta rendono il percorso il più confortevole possibile.",
      },
      {
        q: "Quando si vede il risultato e quanto dura?",
        a: "La tossina botulinica si sviluppa in 10–14 giorni; filler e biorivitalizzazione sono visibili subito, con un ulteriore miglioramento. La durata dipende dal prodotto e dai fattori individuali: in media da 6 a 18 mesi.",
      },
      {
        q: "Come si svolge la prima consulenza?",
        a: "Analizziamo proporzioni del viso, stato e qualità della pelle, parliamo delle aspettative e costruiamo un piano. La consulenza non impegna a nulla — a volte l'esito è che i trattamenti non servono ancora.",
      },
      {
        q: "Posso venire solo per un parere?",
        a: "Sì. Puoi prenotare solo la consulenza, senza trattamenti nello stesso giorno. È una prassi normale e il modo giusto per iniziare.",
      },
    ],
    finalCta: {
      label: "04 — Prenotazione",
      lineA: "Il tuo viso non ha bisogno di cambiamenti.",
      lineB: "Ha bisogno dell'approccio giusto.",
      button: "Prenota una consulenza",
    },
    contact: {
      heading: "Prenota una consulenza",
      fields: {
        address: "Indirizzo",
        phone: "Telefono",
        email: "Email",
        hours: "Orari",
        instagram: "Instagram",
        license: "Autorizzazione",
      },
      values: {
        address: "Milano, Via Montenapoleone (su appuntamento)",
        phone: "+39 000 000 00 00",
        email: "hello@sofialorenti.com",
        hours: "Lun–Sab, 10:00–19:00",
        instagram: "@dr.sofia.lorenti",
        license: "Autorizzazione sanitaria n. ___",
      },
      form: {
        name: "Nome",
        phone: "Telefono",
        email: "Email",
        message: "Messaggio",
        submit: "Invia richiesta",
        disclaimer:
          "Inviando il modulo acconsenti al trattamento dei dati personali.",
      },
    },
    booking: {
      heading: "Prenota una consulenza",
      lead: "Lascia il tuo nome e telefono — ti richiamerò per confermare l'orario.",
      name: "Nome",
      phone: "Telefono",
      submit: "Invia richiesta",
      sending: "Invio…",
      success: "Grazie! Ti contatterò a breve.",
      error: "Qualcosa è andato storto — chiamaci o scrivici direttamente.",
      disclaimer:
        "Inviando il modulo acconsenti al trattamento dei dati personali.",
      close: "Chiudi",
    },
    footer: {
      tagline:
        "DR. SOFIA LORENTI — studio privato di medicina estetica. Solo su appuntamento.",
      about: "Il medico",
      services: "Trattamenti",
      contact: "Contatti",
      rights: "DR. SOFIA LORENTI",
      place: "Milano · Medicina estetica",
    },
  },
};
