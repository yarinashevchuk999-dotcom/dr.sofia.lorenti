/* =============================================================================
   DR. SOFIA LORENTI — static build
   Vanilla-JS port of the Next.js client components: language store, intro
   gate (with hash-strip + scroll-pin), shared scroll lock, hero cinematic
   scroll reveal, smooth scroll, scroll-reveal, hero parallax, procedures
   showcase, reviews rail, FAQ accordion, portrait recolour, booking modal.
   ========================================================================== */
(function () {
  "use strict";

  var LANGS = ["ua", "en", "it"];
  var DEFAULT_LANG = "en";
  var STORAGE_KEY = "sl-lang";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Paste your Google Apps Script Web App URL here (see the project's
     GOOGLE_SHEETS_WEBHOOK_URL setup) to have booking/contact leads land in a
     Google Sheet directly from this static page. Left empty, submissions are
     just shown as "sent" locally — nothing is stored anywhere. */
  var GOOGLE_SHEETS_WEBHOOK_URL = "";

  /* ------------------------------------------------------------------ i18n -- */
  var translations = {
    en: {
      nav: { about: "About the doctor", services: "Services", testimonials: "Reviews", faq: "Questions", contact: "Contact", book: "Book", bookConsult: "Book a consultation" },
      intro: { button: "Enter", aria: "Enter the site" },
      hero: {
        role: "Aesthetic physician",
        subtitleA: "Medicine, anatomy and aesthetics —",
        subtitleB: "behind every decision.",
        ctaPrimary: "Book a consultation",
        scroll: "Scroll"
      },
      labels: { procedures: "Procedures", proceduresLead: "Base prices — your exact plan is set at a consultation.", faq: "Questions" },
      about: {
        tagline: "Aesthetic medicine built on anatomy, precision and naturalness.",
        p1: "I work with every patient individually — from assessing the skin to choosing the procedures. I combine professional care with device-based and injectable techniques, preserving the naturalness and harmony of your features.",
        p2: "Every procedure here brings together deep knowledge, care and aesthetics — so that the results make you happier.",
        p3: "Get in touch — I will choose the right procedure for you.",
        cta: "Choose a procedure"
      },
      services: [
        { name: "Consultation", price: "1000 UAH", desc: "An examination, skin assessment, and a personal treatment plan." },
        { name: "Follow-up consultation", price: "600 UAH", desc: "Progress check and fine-tuning of your treatment plan." },
        { name: "Facial peeling", price: "from 1200 UAH", desc: "Renews the skin's surface and evens out tone and texture, with no lengthy downtime." },
        { name: "Deep cleansing", price: "from 1700 UAH", desc: "Thorough pore cleansing by hand and with equipment, for clear, well-cared-for skin." },
        { name: "Lip contouring", price: "from 7300 UAH", desc: "Natural correction of lip volume and shape with hyaluronic fillers." },
        { name: "Botulinum therapy", price: "from 1800 UAH", desc: "Relaxes expression muscles for smooth skin, free of creases and wrinkles." },
        { name: "Biorevitalisation", price: "from 4200 UAH", desc: "Deep hydration and collagen stimulation via hyaluronic acid injections." },
        { name: "Vector lifting", price: "from 10 000 UAH", desc: "Thread-lifts the facial contour — no surgery, no lengthy recovery." },
        { name: "Blanche therapy", price: "4700 UAH", desc: "A gentle brightening treatment that evens tone and restores natural radiance." }
      ],
      trust: [
        { value: "8", label: "years in aesthetic medicine" },
        { value: "1,200+", label: "patients" },
        { value: "Original", label: "certified products only" },
        { value: "Licensed", label: "private medical practice" }
      ],
      testimonials: [
        { quote: "Botox for the first time, and what scared me most was the 'frozen' look. She counted the units in front of me and explained why exactly that many. Two weeks on, the forehead is smooth but my brows still move. It has held for five months.", name: "Marina, 34", detail: "Botulinum therapy — forehead & glabella" },
        { quote: "I came in to 'build up my cheekbones' and left with advice to inject nothing for now and treat my skin instead. It's the only time a doctor has turned down my money. I've been a regular ever since.", name: "Olha R.", detail: "Consultation, biorevitalisation" },
        { quote: "For three years I went to different injectors and always walked out with 'duck' lips. Here they used half a millilitre — my own shape, I just look well-rested.", name: "Kateryna V.", detail: "Lip correction" },
        { quote: "The dark circles had bothered me for years — I looked tired in every photo. After the tear-trough correction nobody realised I'd had anything done. People asked if I'd been on holiday.", name: "Anna S., 41", detail: "Eye area" },
        { quote: "Before a big event I was mostly worried about bruising. They worked very carefully, with a cannula — not a single bruise, and the slight swelling was gone within a day. I was back at work the next morning.", name: "Yuliia M.", detail: "Facial biorevitalisation" },
        { quote: "I've been coming for two years. They tell you the full price upfront, they write the plan out on paper, and not once have they tried to sell me 'something extra'.", name: "L.", detail: "Comprehensive care" },
        { quote: "I never thought I'd see an aesthetic doctor. My wife talked me into a consultation about my neck. It was done so subtly that colleagues noticed nothing — they just said I looked rested.", name: "Dmytro K., 46", detail: "Neck, platysma botulinum therapy" },
        { quote: "Teenage acne left my skin texture uneven. She told me honestly that one session would do nothing and laid out a course over several months. My skin is smoother than it has ever been. Don't expect an instant miracle.", name: "Sofiia T., 29", detail: "Polynucleotides, mesotherapy" }
      ],
      reviews: { heading: "What Our Clients Are", headingAccent: "Saying", lead: "I'm glad to have helped hundreds of clients enhance their natural beauty. Here's what they say about their experience and results." },
      faq: [
        { q: "Will it be obvious I've had something done?", a: "The whole point of the approach is that it isn't. We work with minimal doses and in stages, preserving your expressions. People usually see that you look well without understanding why." },
        { q: "How painful is it?", a: "Most procedures involve only mild discomfort. Topical anaesthesia is used when needed. Fine needles and a slow technique make the process as comfortable as possible." },
        { q: "When will I see the result and how long does it last?", a: "Botulinum therapy develops over 10–14 days; fillers and biorevitalisation are visible immediately with further improvement. Duration depends on the product and individual factors: on average 6 to 18 months." },
        { q: "What happens at the first consultation?", a: "We analyse facial proportions, skin condition and quality, discuss your expectations and build a plan. The consultation commits you to nothing — sometimes its outcome is that procedures aren't needed yet." },
        { q: "Can I come just to talk it through?", a: "Yes. You can book a consultation only, with no procedures the same day. That's a normal practice and the right way to start." }
      ],
      contact: {
        heading: "Book a consultation",
        fields: { address: "Address", phone: "Phone", email: "Email", hours: "Hours", instagram: "Instagram", license: "License" },
        values: { address: "Milan, Via Montenapoleone (by appointment)", phone: "+39 000 000 00 00", email: "hello@sofialorenti.com", hours: "Mon–Sat, 10:00–19:00", instagram: "@dr.sofia.lorenti", license: "Health Ministry licence No. ___" },
        form: { name: "Name", phone: "Phone", email: "Email", message: "Message", submit: "Send request", disclaimer: "By submitting this form you agree to the processing of your personal data." }
      },
      booking: {
        heading: "Book a consultation",
        lead: "Leave your name and phone — I will call you back to confirm a time.",
        name: "Name", phone: "Phone", submit: "Send request", sending: "Sending…",
        success: "Thank you! I will contact you shortly.",
        error: "Something went wrong — please call or write to us directly.",
        disclaimer: "By submitting this form you agree to the processing of your personal data.",
        close: "Close"
      },
      footer: { tagline: "DR. SOFIA LORENTI — a private aesthetic-medicine practice. By appointment only.", about: "About the doctor", services: "Services", contact: "Contact", rights: "DR. SOFIA LORENTI", place: "Milan · Aesthetic Medicine" }
    },

    ua: {
      nav: { about: "Про лікаря", services: "Послуги", testimonials: "Відгуки", faq: "Питання", contact: "Контакти", book: "Записатися", bookConsult: "Записатися на консультацію" },
      intro: { button: "Увійти", aria: "Вхід на сайт" },
      hero: {
        role: "Лікар естетичної медицини",
        subtitleA: "Медицина, анатомія та естетика —",
        subtitleB: "в основі кожного рішення.",
        ctaPrimary: "Записатися на консультацію",
        scroll: "Гортати"
      },
      labels: { procedures: "Процедури", proceduresLead: "Базові ціни — точний план визначається на консультації.", faq: "Питання" },
      about: {
        tagline: "Естетична медицина, побудована на анатомії, точності та природності.",
        p1: "Я працюю з кожним пацієнтом індивідуально — від оцінки стану шкіри до підбору процедур. Поєдную професійний догляд, апаратні та ін’єкційні методики, зберігаючи природність і гармонію рис обличчя.",
        p2: "Кожна процедура тут — це поєднання глибоких знань, турботи та естетики. І все задля того, щоб результати робили Вас щасливішими.",
        p3: "Зв’яжіться зі мною — я підберу процедуру саме для вас.",
        cta: "Підібрати процедуру"
      },
      services: [
        { name: "Консультація", price: "1000 грн", desc: "Огляд, оцінка стану шкіри та індивідуальний план процедур." },
        { name: "Повторна консультація", price: "600 грн", desc: "Контроль результату й коригування програми на наступних етапах." },
        { name: "Пілінг обличчя", price: "від 1200 грн", desc: "Оновлення поверхні шкіри, вирівнювання тону й текстури без тривалого відновлення." },
        { name: "Чистка", price: "від 1700 грн", desc: "Глибоке очищення пор апаратним і ручним методом для чистої, доглянутої шкіри." },
        { name: "Контурна пластика губ", price: "від 7300 грн", desc: "Природна корекція об'єму та форми губ гіалуроновими філерами." },
        { name: "Ботулінотерапія", price: "від 1800 грн", desc: "Розслаблення мімічних м'язів для гладкої шкіри без заломів і зморшок." },
        { name: "Біоревіталізація", price: "від 4200 грн", desc: "Глибоке зволоження та стимуляція власного колагену ін'єкціями гіалуронової кислоти." },
        { name: "Векторний ліфтинг", price: "від 10 000 грн", desc: "Підтяжка овалу обличчя нитками — без хірургії й тривалої реабілітації." },
        { name: "Бланч-терапія", price: "4700 грн", desc: "М'яке освітлення та вирівнювання тону шкіри, повернення природного сяйва." }
      ],
      trust: [
        { value: "8", label: "років у естетичній медицині" },
        { value: "1 200+", label: "пацієнтів" },
        { value: "Оригінальні", label: "лише сертифіковані препарати" },
        { value: "Ліцензія МОЗ", label: "приватна медична практика" }
      ],
      testimonials: [
        { quote: "Робила ботокс уперше і найбільше боялася ефекту «маски». Лікарка порахувала одиниці прямо при мені й пояснила, чому саме стільки. Через два тижні чоло гладеньке, але брови рухаються. Тримається вже пʼятий місяць.", name: "Марина, 34", detail: "Ботулінотерапія — чоло та міжбрівʼя" },
        { quote: "Прийшла «збільшити вилиці», а пішла з порадою поки нічого не колоти й підлікувати шкіру. Це був єдиний раз, коли лікар відмовився брати мої гроші. Відтоді я тут постійний пацієнт.", name: "Ольга Р.", detail: "Консультація, біоревіталізація" },
        { quote: "Три роки ходила до різних майстрів і завжди виходила з «качиними» губами. Тут вкололи всього пів мілілітра — форма своя, просто виглядаю так, ніби добре виспалась.", name: "Катерина В.", detail: "Корекція губ" },
        { quote: "Мене роками діставали темні кола — на всіх фото виглядала втомленою. Після корекції носослізної борозни ніхто не зрозумів, що я щось робила. Питали, чи я у відпустці була.", name: "Анна С., 41", detail: "Зона навколо очей" },
        { quote: "Перед важливою подією найбільше хвилювалась через синці. Кололи дуже акуратно, канюлею — жодного синця, невеликий набряк зійшов за день. Наступного ранку вийшла на роботу як звичайно.", name: "Юлія М.", detail: "Біоревіталізація обличчя" },
        { quote: "Ходжу вже два роки. Ціни кажуть одразу і повністю, план розписують на папері, і жодного разу не намагались продати «ще щось».", name: "Л.", detail: "Комплексний догляд" },
        { quote: "Не думав, що колись піду до косметолога. Дружина вмовила на консультацію щодо шиї. Зробили так делікатно, що колеги нічого не помітили — просто сказали, що я наче відпочив.", name: "Дмитро К., 46", detail: "Шия, ботулінотерапія платизми" },
        { quote: "Після підліткового акне лишилась нерівна текстура. Лікарка чесно сказала, що за один раз нічого не буде, і розписала курс на кілька місяців. Зараз шкіра рівніша, ніж будь-коли. Не чекайте миттєвого дива.", name: "Софія Т., 29", detail: "Полінуклеотиди, мезотерапія" }
      ],
      reviews: { heading: "Що говорять наші", headingAccent: "клієнти", lead: "Я рада, що допомогла сотням клієнтів підкреслити їхню природну красу. Ось що вони говорять про свій досвід та результати." },
      faq: [
        { q: "Чи буде помітно, що я щось робила?", a: "Мета підходу — щоб було непомітно. Ми працюємо мінімальними дозами та поетапно, зберігаючи вашу міміку й вираз обличчя. Оточення зазвичай бачить, що ви добре виглядаєте, але не розуміє причини." },
        { q: "Наскільки це боляче?", a: "Більшість процедур передбачає лише легкий дискомфорт. За потреби застосовується аплікаційна анестезія. Тонкі голки та повільна техніка роблять процес максимально комфортним." },
        { q: "Коли буде видно результат і скільки він триває?", a: "Ботулінотерапія розкривається протягом 10–14 днів, філери та біоревіталізація — одразу з подальшим покращенням. Тривалість залежить від препарату й індивідуальних особливостей: у середньому від 6 до 18 місяців." },
        { q: "Як проходить перша консультація?", a: "Ми аналізуємо пропорції обличчя, стан і якість шкіри, обговорюємо ваші очікування та складаємо план. Консультація ні до чого не зобов'язує — іноді її результат у тому, що процедури поки не потрібні." },
        { q: "Чи можна прийти просто порадитися?", a: "Так. Ви можете записатися лише на консультацію, без проведення процедур того ж дня. Це нормальна практика й правильний початок." }
      ],
      contact: {
        heading: "Запис на консультацію",
        fields: { address: "Адреса", phone: "Телефон", email: "Email", hours: "Прийом", instagram: "Instagram", license: "Ліцензія" },
        values: { address: "Мілан, Via Montenapoleone (за записом)", phone: "+39 000 000 00 00", email: "hello@sofialorenti.com", hours: "Пн–Сб, 10:00–19:00", instagram: "@dr.sofia.lorenti", license: "Ліцензія МОЗ України № ___" },
        form: { name: "Ім'я", phone: "Телефон", email: "Email", message: "Коментар", submit: "Надіслати запит", disclaimer: "Надсилаючи форму, ви погоджуєтесь на обробку персональних даних." }
      },
      booking: {
        heading: "Запис на консультацію",
        lead: "Залиште ім'я та телефон — я передзвоню, щоб узгодити зручний час.",
        name: "Ім'я", phone: "Телефон", submit: "Надіслати запит", sending: "Надсилаємо…",
        success: "Дякую! Я зв'яжуся з вами найближчим часом.",
        error: "Щось пішло не так — зателефонуйте або напишіть нам напряму.",
        disclaimer: "Надсилаючи форму, ви погоджуєтесь на обробку персональних даних.",
        close: "Закрити"
      },
      footer: { tagline: "DR. SOFIA LORENTI — приватна практика естетичної медицини. Прийом за попереднім записом.", about: "Про лікаря", services: "Послуги", contact: "Контакти", rights: "DR. SOFIA LORENTI", place: "Мілан · Естетична медицина" }
    },

    it: {
      nav: { about: "Il medico", services: "Trattamenti", testimonials: "Recensioni", faq: "Domande", contact: "Contatti", book: "Prenota", bookConsult: "Prenota una consulenza" },
      intro: { button: "Entra", aria: "Entra nel sito" },
      hero: {
        role: "Medico estetico",
        subtitleA: "Medicina, anatomia ed estetica —",
        subtitleB: "dietro ogni decisione.",
        ctaPrimary: "Prenota una consulenza",
        scroll: "Scorri"
      },
      labels: { procedures: "Trattamenti", proceduresLead: "Prezzi base — il piano definitivo si stabilisce in consulenza.", faq: "Domande" },
      about: {
        tagline: "Medicina estetica costruita su anatomia, precisione e naturalezza.",
        p1: "Lavoro con ogni paziente in modo individuale — dalla valutazione della pelle alla scelta dei trattamenti. Unisco cura professionale, tecniche strumentali e iniettive, preservando la naturalezza e l’armonia dei lineamenti.",
        p2: "Ogni trattamento qui unisce conoscenza approfondita, cura ed estetica — perché il risultato ti renda più felice.",
        p3: "Contattami — sceglierò il trattamento giusto per te.",
        cta: "Scegli un trattamento"
      },
      services: [
        { name: "Consulenza", price: "1000 UAH", desc: "Visita, valutazione della pelle e piano di trattamento personalizzato." },
        { name: "Consulenza di controllo", price: "600 UAH", desc: "Verifica dei risultati e adeguamento del programma." },
        { name: "Peeling viso", price: "da 1200 UAH", desc: "Rinnova la superficie della pelle, uniforma tono e texture, senza tempi di recupero lunghi." },
        { name: "Pulizia profonda", price: "da 1700 UAH", desc: "Pulizia approfondita dei pori con metodo manuale e strumentale." },
        { name: "Contornatura labbra", price: "da 7300 UAH", desc: "Correzione naturale di volume e forma delle labbra con filler all'acido ialuronico." },
        { name: "Tossina botulinica", price: "da 1800 UAH", desc: "Rilassa i muscoli mimici per una pelle liscia, senza pieghe né rughe." },
        { name: "Biorivitalizzazione", price: "da 4200 UAH", desc: "Idratazione profonda e stimolazione del collagene con acido ialuronico." },
        { name: "Lifting vettoriale", price: "da 10 000 UAH", desc: "Solleva l'ovale del viso con fili — senza chirurgia né lunga guarigione." },
        { name: "Terapia Blanche", price: "4700 UAH", desc: "Un trattamento delicato che schiarisce e uniforma il tono, per una luminosità naturale." }
      ],
      trust: [
        { value: "8", label: "anni in medicina estetica" },
        { value: "1 200+", label: "pazienti" },
        { value: "Originali", label: "solo prodotti certificati" },
        { value: "Autorizzato", label: "studio medico privato" }
      ],
      testimonials: [
        { quote: "Botox per la prima volta, e la paura più grande era l'effetto «maschera». Ha contato le unità davanti a me e mi ha spiegato perché proprio quel numero. Dopo due settimane la fronte è liscia ma le sopracciglia si muovono. Dura già da cinque mesi.", name: "Marina, 34", detail: "Tossina botulinica — fronte e glabella" },
        { quote: "Sono venuta per «aumentare gli zigomi» e sono uscita con il consiglio di non iniettare nulla per ora e di curare la pelle. È l'unica volta che un medico ha rifiutato i miei soldi. Da allora sono una paziente fissa.", name: "Olha R.", detail: "Consulenza, biorivitalizzazione" },
        { quote: "Per tre anni sono andata da diversi operatori e uscivo sempre con le labbra «a papera». Qui hanno usato mezzo millilitro — la mia forma, sembro solo riposata.", name: "Kateryna V.", detail: "Correzione labbra" },
        { quote: "Le occhiaie mi tormentavano da anni — in ogni foto sembravo stanca. Dopo la correzione del solco lacrimale nessuno ha capito che avevo fatto qualcosa. Mi chiedevano se fossi stata in vacanza.", name: "Anna S., 41", detail: "Contorno occhi" },
        { quote: "Prima di un evento importante temevo soprattutto i lividi. Hanno lavorato con molta attenzione, con la cannula — nessun livido, e il leggero gonfiore è sparito in un giorno. La mattina dopo ero al lavoro.", name: "Yuliia M.", detail: "Biorivitalizzazione del viso" },
        { quote: "Vengo da due anni. Il prezzo te lo dicono subito e per intero, il piano lo scrivono su carta, e non hanno mai provato a vendermi «qualcosa in più».", name: "L.", detail: "Percorso completo" },
        { quote: "Non pensavo che sarei mai andato da un medico estetico. Mia moglie mi ha convinto a una consulenza per il collo. È stato fatto con tale discrezione che i colleghi non hanno notato nulla — hanno solo detto che sembravo riposato.", name: "Dmytro K., 46", detail: "Collo, tossina botulinica del platisma" },
        { quote: "L'acne dell'adolescenza mi aveva lasciato una pelle irregolare. Mi ha detto onestamente che una sola seduta non avrebbe fatto nulla e ha programmato un percorso di alcuni mesi. Ora la pelle è più liscia che mai. Non aspettatevi un miracolo immediato.", name: "Sofiia T., 29", detail: "Polinucleotidi, mesoterapia" }
      ],
      reviews: { heading: "Cosa Dicono i Nostri", headingAccent: "Clienti", lead: "Sono felice di aver aiutato centinaia di clienti a valorizzare la loro bellezza naturale. Ecco cosa dicono della loro esperienza e dei risultati." },
      faq: [
        { q: "Si noterà che ho fatto qualcosa?", a: "L'obiettivo dell'approccio è proprio che non si noti. Lavoriamo con dosi minime e per gradi, preservando la mimica. Di solito gli altri vedono che hai un bell'aspetto senza capirne il motivo." },
        { q: "Quanto è doloroso?", a: "La maggior parte dei trattamenti comporta solo un lieve fastidio. Quando serve si usa l'anestesia topica. Aghi sottili e una tecnica lenta rendono il percorso il più confortevole possibile." },
        { q: "Quando si vede il risultato e quanto dura?", a: "La tossina botulinica si sviluppa in 10–14 giorni; filler e biorivitalizzazione sono visibili subito, con un ulteriore miglioramento. La durata dipende dal prodotto e dai fattori individuali: in media da 6 a 18 mesi." },
        { q: "Come si svolge la prima consulenza?", a: "Analizziamo proporzioni del viso, stato e qualità della pelle, parliamo delle aspettative e costruiamo un piano. La consulenza non impegna a nulla — a volte l'esito è che i trattamenti non servono ancora." },
        { q: "Posso venire solo per un parere?", a: "Sì. Puoi prenotare solo la consulenza, senza trattamenti nello stesso giorno. È una prassi normale e il modo giusto per iniziare." }
      ],
      contact: {
        heading: "Prenota una consulenza",
        fields: { address: "Indirizzo", phone: "Telefono", email: "Email", hours: "Orari", instagram: "Instagram", license: "Autorizzazione" },
        values: { address: "Milano, Via Montenapoleone (su appuntamento)", phone: "+39 000 000 00 00", email: "hello@sofialorenti.com", hours: "Lun–Sab, 10:00–19:00", instagram: "@dr.sofia.lorenti", license: "Autorizzazione sanitaria n. ___" },
        form: { name: "Nome", phone: "Telefono", email: "Email", message: "Messaggio", submit: "Invia richiesta", disclaimer: "Inviando il modulo acconsenti al trattamento dei dati personali." }
      },
      booking: {
        heading: "Prenota una consulenza",
        lead: "Lascia il tuo nome e telefono — ti richiamerò per confermare l'orario.",
        name: "Nome", phone: "Telefono", submit: "Invia richiesta", sending: "Invio…",
        success: "Grazie! Ti contatterò a breve.",
        error: "Qualcosa è andato storto — chiamaci o scrivici direttamente.",
        disclaimer: "Inviando il modulo acconsenti al trattamento dei dati personali.",
        close: "Chiudi"
      },
      footer: { tagline: "DR. SOFIA LORENTI — studio privato di medicina estetica. Solo su appuntamento.", about: "Il medico", services: "Trattamenti", contact: "Contatti", rights: "DR. SOFIA LORENTI", place: "Milano · Medicina estetica" }
    }
  };

  /* one photo per procedures row — indices into t.services; matches the
     live ProcedureShowcase component's ROWS table */
  var PROC_ROWS = [
    { img: "proc-consultation.jpg", indices: [0, 1], w: 946, h: 1280 },
    { img: "proc-peeling.jpg", indices: [2], w: 714, h: 1280 },
    { img: "proc-cleansing.jpg", indices: [3], w: 1600, h: 1195 },
    { img: "proc-lips.jpg", indices: [4], w: 1600, h: 1195 },
    { img: "proc-botox.jpg", indices: [5], w: 1600, h: 1195 },
    { img: "proc-biorevit.jpg", indices: [6], w: 1600, h: 1195 },
    { img: "proc-vectorlift.jpg", indices: [7], w: 1600, h: 1195 },
    { img: "proc-blanche.jpg", indices: [8], w: 1600, h: 1195 }
  ];

  /* --------------------------------------------------------------- helpers -- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var currentLang = DEFAULT_LANG;

  /* ------------------------------------------------------- dynamic renders -- */
  var STAR_SVG = '<svg viewBox="0 0 20 20" class="h-[15px] w-[15px] fill-[#cfa15a]"><path d="M10 1.2l2.72 5.63 6.14.87-4.44 4.36 1.05 6.14L10 15.2l-5.47 2.9 1.05-6.14L1.14 7.7l6.14-.87L10 1.2z"></path></svg>';

  function renderReviews(t) {
    var rail = $("#reviewsRail");
    if (!rail) return;
    rail.innerHTML = t.testimonials.map(function (tm) {
      return (
        '<figure class="flex w-[82vw] max-w-[420px] shrink-0 flex-col rounded-xl border border-line bg-[color:var(--ivory)] p-7 shadow-[0_2px_14px_rgba(50,43,36,0.05)] sm:w-[52vw] md:w-[38vw] md:p-9 lg:w-[29vw]" style="border-bottom-width:3px;border-bottom-color:#cfa15a">' +
        '<div class="flex gap-1">' + STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG + "</div>" +
        '<blockquote class="mt-5 flex-1 text-[15px] leading-relaxed text-ink md:text-base">' + esc(tm.quote) + "</blockquote>" +
        '<figcaption class="mt-7 text-sm">' +
        '<div class="font-medium text-ink">— ' + esc(tm.name) + "</div>" +
        '<div class="mt-1 text-[13px] text-[color:var(--taupe-solid)]">' + esc(tm.detail) + "</div>" +
        "</figcaption></figure>"
      );
    }).join("");
  }

  function renderFaq(t) {
    var list = $("#faqList");
    if (!list) return;
    list.innerHTML = t.faq.map(function (item, i) {
      var open = i === 0;
      return (
        '<div class="border-b border-line" data-faq>' +
        '<button type="button" class="flex w-full items-start justify-between gap-8 py-5 text-left md:py-7" aria-expanded="' + open + '">' +
        '<span class="display max-w-2xl text-xl text-ink md:text-2xl">' + esc(item.q) + "</span>" +
        '<span class="mt-2 shrink-0 text-brown transition-transform duration-500' + (open ? " rotate-45" : "") + '" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1v16M1 9h16" stroke="currentColor" stroke-width="1"></path></svg>' +
        "</span></button>" +
        '<div class="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style="grid-template-rows:' + (open ? " 1fr" : " 0fr") + '">' +
        '<div class="overflow-hidden"><p class="max-w-2xl pb-6 text-[15px] leading-relaxed text-brown md:pb-8">' + esc(item.a) + "</p></div>" +
        "</div></div>"
      );
    }).join("");
  }

  function renderTrust(t) {
    var grid = $("#trustGrid");
    if (!grid) return;
    grid.innerHTML = t.trust.map(function (item, i) {
      var accent = /[+%]$/.test(item.value) ? item.value.slice(-1) : "";
      var base = accent ? item.value.slice(0, -1) : item.value;
      return (
        '<div data-reveal class="text-left md:border-l md:border-line md:pl-8 md:first:border-l-0 md:first:pl-0" style="--reveal-delay:' + i * 80 + 'ms">' +
        '<div class="max-w-[18ch] text-[12px] font-medium leading-snug text-ink md:text-sm">' + esc(item.label) + "</div>" +
        '<div class="display mt-1.5 text-2xl text-ink md:text-3xl">' + esc(base) + (accent ? '<span class="text-[#cfa15a]">' + esc(accent) + "</span>" : "") + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderProcedures(t) {
    var wrap = $("#proceduresList");
    if (!wrap) return;
    wrap.innerHTML = PROC_ROWS.map(function (row, i) {
      var photoRight = i % 2 === 1;
      var tanFill = i % 2 === 0;
      var heading = t.services[row.indices[0]].name;
      var paragraph = row.indices.map(function (idx) { return t.services[idx].desc; }).join(" ");
      var priceLine = row.indices.map(function (idx) { return esc(t.services[idx].name) + " — " + esc(t.services[idx].price); }).join("   ·   ");
      var gridCols = photoRight ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]";
      var side = photoRight ? "right" : "left";
      return (
        '<div data-reveal="' + side + '" class="grid md:items-stretch ' + gridCols + '" style="--reveal-delay:0ms">' +
        '<div class="relative h-64 w-full overflow-hidden sm:h-80 md:h-auto md:min-h-[420px]' + (photoRight ? " md:order-2" : "") + '">' +
        '<img src="' + row.img + '" alt="' + esc(heading) + '" class="absolute inset-0 h-full w-full object-cover" loading="lazy" width="' + row.w + '" height="' + row.h + '" />' +
        "</div>" +
        '<div class="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 md:px-14 md:py-16' + (tanFill ? " bg-[color:var(--ivory)]" : "") + '">' +
        '<h3 class="display text-2xl uppercase leading-tight text-ink md:text-3xl">' + esc(heading) + "</h3>" +
        '<p class="text-sm leading-relaxed text-brown md:text-base">' + esc(paragraph) + "</p>" +
        '<div class="border-t border-line pt-4 text-left text-[11px] uppercase tracking-[0.2em] text-[color:var(--taupe-solid)]">' + priceLine + "</div>" +
        '<button type="button" class="btn-lift group inline-flex w-fit items-center gap-3 self-start bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_10px_26px_rgba(207,161,90,0.22)] hover:brightness-110" data-open-booking data-source="' + esc(heading) + '">' +
        '<span data-i18n="nav.book">' + esc(t.nav.book) + "</span>" +
        '<span aria-hidden="true" class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>' +
        "</button></div></div>"
      );
    }).join("");
    bindBookingTriggers(wrap);
  }

  function renderContactList(t) {
    var dl = $("#contactList");
    if (!dl) return;
    var order = ["address", "phone", "email", "hours", "instagram", "license"];
    dl.innerHTML = order.map(function (key) {
      return (
        '<div class="flex justify-between gap-6 border-b border-white/20 pb-2">' +
        '<dt class="text-[11px] uppercase tracking-[0.2em] text-white/60">' + esc(t.contact.fields[key]) + "</dt>" +
        '<dd class="text-right text-[color:var(--ink)]">' + esc(t.contact.values[key]) + "</dd>" +
        "</div>"
      );
    }).join("");
  }

  /* -------------------------------------------------------- apply language -- */
  function getPath(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }

  function applyLang(lang) {
    var t = translations[lang];
    currentLang = lang;

    $all("[data-i18n]").forEach(function (el) {
      var val = getPath(t, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });
    $all("[data-i18n-aria]").forEach(function (el) {
      var val = getPath(t, el.getAttribute("data-i18n-aria"));
      if (val != null) el.setAttribute("aria-label", val);
    });

    document.documentElement.lang = lang === "ua" ? "uk" : lang;

    $all("[data-lang-buttons] button[data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("opacity-100", on);
      b.classList.toggle("opacity-40", !on);
    });

    renderReviews(t);
    renderFaq(t);
    renderTrust(t);
    renderProcedures(t);
    renderContactList(t);
    observeReveals();
    bindFaq();

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function setLang(next) {
    if (next === currentLang || LANGS.indexOf(next) === -1) return;
    var run = function () { applyLang(next); };
    if (document.startViewTransition && !reduceMotion) {
      var vt = document.startViewTransition(run);
      var hush = function () {};
      if (vt.finished && vt.finished.catch) vt.finished.catch(hush);
      if (vt.ready && vt.ready.catch) vt.ready.catch(hush);
      if (vt.updateCallbackDone && vt.updateCallbackDone.catch) vt.updateCallbackDone.catch(hush);
    } else {
      run();
    }
  }

  /* -------------------------------------------------- shared scroll lock --- */
  var lockCount = 0;
  function lockScroll() {
    lockCount += 1;
    if (lockCount === 1) document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) document.body.style.overflow = "";
  }

  /* ---------------------------------------------------------- intro gate --- */
  function initIntroGate() {
    var gate = $("#introGate");
    var btn = $("#introEnter");
    if (!gate || !btn) return;

    // a URL hash left over from an earlier visit (e.g. #faq from a nav
    // click) makes the browser jump straight to that section on load, and
    // keeps re-applying that jump as late-loading fonts/video/images shift
    // the layout. Strip it and pin scroll at 0 for as long as the gate is up.
    if (window.location.hash) {
      try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) {}
    }
    if ("scrollRestoration" in history) {
      try { history.scrollRestoration = "manual"; } catch (e) {}
    }
    lockScroll();

    var pin = function () {
      if (window.scrollY !== 0 || window.scrollX !== 0) window.scrollTo(0, 0);
    };
    pin();
    var retries = [0, 50, 150, 300, 600, 1000, 1600, 2400].map(function (delay) {
      return window.setTimeout(pin, delay);
    });
    window.addEventListener("scroll", pin, { passive: true });

    var entered = false;
    btn.addEventListener("click", function () {
      if (entered) return;
      entered = true;
      retries.forEach(window.clearTimeout);
      window.removeEventListener("scroll", pin);
      gate.classList.add("is-entering");
      document.documentElement.classList.add("site-lit");
      window.setTimeout(function () {
        if (gate.parentNode) gate.parentNode.removeChild(gate);
        unlockScroll();
      }, reduceMotion ? 260 : 1150);
    });
  }

  /* -------------------------------------------------------- smooth scroll -- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var id = link.getAttribute("href").slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - (id === "top" ? 0 : 20);
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      try { history.replaceState(null, "", id === "top" ? " " : "#" + id); } catch (err) {}
    });

    var root = document.documentElement;
    var scrollTimer;
    window.addEventListener("scroll", function () {
      root.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { root.classList.remove("is-scrolling"); }, 180);
    }, { passive: true });
  }

  /* ------------------------------------------------------------- reveals --- */
  var revealObserver = null;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $all("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01, rootMargin: "0px 0px 15% 0px" });
    }
    $all("[data-reveal]").forEach(function (el) {
      if (!el.classList.contains("is-visible")) revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------ parallax --- */
  function initParallax() {
    if (reduceMotion) return;
    var nodes = $all(".parallax");
    if (!nodes.length) return;
    var frame = 0;

    function update() {
      frame = 0;
      var vh = window.innerHeight;
      nodes.forEach(function (outer) {
        var inner = outer.querySelector(".parallax-inner");
        if (!inner) return;
        var speed = parseFloat(outer.getAttribute("data-parallax-speed")) || 0.08;
        var rect = outer.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        var fromCenter = rect.top + rect.height / 2 - vh / 2;
        var translate = -(fromCenter * speed);
        inner.style.transform = "translate3d(0," + translate.toFixed(2) + "px,0)";
      });
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* -------------------------------------------------- hero cinematic reveal -- */
  function initHeroCinematicReveal() {
    var track = $("#heroTrack");
    var videoWrap = $("#heroVideoWrap");
    var eyebrow = $("#heroEyebrow");
    var title = $("#heroTitle");
    var desc = $("#heroDesc");
    var cta = $("#heroCta");
    if (!track) return;

    var stages = [
      { el: eyebrow, start: 0, end: 0.12, lift: 20 },
      { el: title, start: 0.04, end: 0.24, lift: 56 },
      { el: desc, start: 0.16, end: 0.32, lift: 15 },
      { el: cta, start: 0.26, end: 0.42, lift: 15, scale: true }
    ];

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function clamp01(v) { return Math.min(1, Math.max(0, v)); }

    function applyFinal() {
      stages.forEach(function (s) {
        if (!s.el) return;
        s.el.style.opacity = "1";
        s.el.style.transform = s.scale ? "translateY(0px) scale(1)" : "translateY(0px)";
      });
      if (videoWrap) videoWrap.style.transform = "translateY(0px) scale(1)";
    }

    if (reduceMotion) { applyFinal(); return; }

    var frame = 0;
    function update() {
      frame = 0;
      var rect = track.getBoundingClientRect();
      var scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      var progress = clamp01(-rect.top / scrollable);

      stages.forEach(function (s) {
        if (!s.el) return;
        var local = clamp01((progress - s.start) / (s.end - s.start));
        var ease = easeOutCubic(local);
        var lift = (1 - ease) * s.lift;
        s.el.style.transform = s.scale
          ? "translateY(" + lift.toFixed(1) + "px) scale(" + (0.98 + ease * 0.02).toFixed(3) + ")"
          : "translateY(" + lift.toFixed(1) + "px)";
        s.el.style.opacity = ease.toFixed(3);
      });

      if (videoWrap) {
        var scale = 1 + progress * 0.07;
        var drift = -progress * 10;
        videoWrap.style.transform = "translateY(" + drift.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
      }
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* --------------------------------------------------------------- FAQ ----- */
  function bindFaq() {
    var list = $("#faqList");
    if (!list || list.dataset.bound) return;
    list.dataset.bound = "1";
    list.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("button") : null;
      if (!btn) return;
      var row = btn.closest("[data-faq]");
      var panel = row.querySelector(".grid");
      var icon = btn.querySelector("span[aria-hidden]");
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.gridTemplateRows = isOpen ? "0fr" : "1fr";
      icon.classList.toggle("rotate-45", !isOpen);
    });
  }

  /* --------------------------------------------------------- mobile menu -- */
  function initMenu() {
    var toggle = $("#menuToggle");
    var menu = $("#mobileMenu");
    if (!toggle || !menu) return;
    var bar1 = toggle.querySelector('[data-bar="1"]');
    var bar2 = toggle.querySelector('[data-bar="2"]');
    var items = $all(".menu-item", menu);
    var open = false;

    function setOpen(next) {
      if (next === open) return;
      open = next;
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("opacity-0", !open);
      menu.classList.toggle("pointer-events-none", !open);
      menu.classList.toggle("opacity-100", open);
      menu.classList.toggle("pointer-events-auto", open);
      bar1.classList.toggle("translate-y-[3px]", open);
      bar1.classList.toggle("rotate-45", open);
      bar2.classList.toggle("-translate-y-[3px]", open);
      bar2.classList.toggle("-rotate-45", open);
      items.forEach(function (el, i) {
        el.style.transitionDelay = open ? (i * 70 + 80) + "ms" : "0ms";
        el.classList.toggle("is-open", open);
      });
      if (open) lockScroll(); else unlockScroll();
    }

    toggle.addEventListener("click", function () { setOpen(!open); });
    $all("[data-close-menu]", menu).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
  }

  /* ------------------------------------------------------- lang switcher -- */
  function initLangButtons() {
    $all("[data-lang-buttons] button[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  /* --------------------------------------------------------- booking modal -- */
  function openBookingModal(source) {
    var modal = $("#bookingModal");
    var card = $("#bookingCard");
    if (!modal || !card) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    recolourBookingPortraitOnce();

    var t = translations[currentLang];
    var lead = $("#bookingLead");
    if (lead) {
      var base = t.booking.lead;
      lead.textContent = source ? source + " — " + base.charAt(0).toLowerCase() + base.slice(1) : base;
    }
    modal.dataset.source = source || "";

    lockScroll();
    window.requestAnimationFrame(function () {
      modal.classList.remove("opacity-0");
      modal.classList.add("opacity-100");
      card.classList.remove("translate-y-3", "scale-[0.98]", "opacity-0");
      card.classList.add("translate-y-0", "scale-100", "opacity-100");
    });

    document.addEventListener("keydown", onBookingKeydown);
  }

  function closeBookingModal() {
    var modal = $("#bookingModal");
    var card = $("#bookingCard");
    if (!modal || modal.classList.contains("hidden")) return;
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    card.classList.add("translate-y-3", "scale-[0.98]", "opacity-0");
    card.classList.remove("translate-y-0", "scale-100", "opacity-100");
    document.removeEventListener("keydown", onBookingKeydown);
    window.setTimeout(function () {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      resetBookingForm();
      unlockScroll();
    }, 300);
  }

  function onBookingKeydown(e) {
    if (e.key === "Escape") closeBookingModal();
  }

  function resetBookingForm() {
    var form = $("#bookingForm");
    var sent = $("#bookingSent");
    var err = $("#bookingError");
    if (form) { form.reset(); form.classList.remove("hidden"); }
    if (sent) sent.classList.add("hidden");
    if (err) err.classList.add("hidden");
  }

  function bindBookingTriggers(root) {
    $all("[data-open-booking]", root).forEach(function (btn) {
      if (btn.dataset.boundBooking) return;
      btn.dataset.boundBooking = "1";
      btn.addEventListener("click", function () {
        openBookingModal(btn.getAttribute("data-source") || "");
      });
    });
  }

  /* submit a lead — posts to GOOGLE_SHEETS_WEBHOOK_URL when configured,
     otherwise just resolves as sent locally (nothing to fail against). */
  function submitLead(payload) {
    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      return Promise.resolve(true);
    }
    return fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) { return res.ok; }).catch(function () { return false; });
  }

  function initBookingModal() {
    var modal = $("#bookingModal");
    if (!modal) return;
    bindBookingTriggers(document);

    $all("[data-close-booking]", modal).forEach(function (btn) {
      btn.addEventListener("click", closeBookingModal);
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeBookingModal();
    });

    var form = $("#bookingForm");
    var submitBtn = $("#bookingSubmit");
    var errEl = $("#bookingError");
    var sentEl = $("#bookingSent");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var t = translations[currentLang];
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = t.booking.sending;
      errEl.classList.add("hidden");

      submitLead({
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        source: modal.dataset.source || "",
        lang: currentLang,
        submittedAt: new Date().toISOString()
      }).then(function (ok) {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = t.booking.submit;
        if (ok) {
          form.classList.add("hidden");
          sentEl.classList.remove("hidden");
        } else {
          errEl.classList.remove("hidden");
        }
      });
    });
  }

  function initContactForm() {
    var form = $("#contactForm");
    if (!form) return;
    var sentEl = $("#contactSent");
    var errEl = $("#contactError");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var t = translations[currentLang];
      var btn = form.querySelector('button[type="submit"] span');
      var originalLabel = t.contact.form.submit;
      if (btn) btn.textContent = t.booking.sending;
      errEl.classList.add("hidden");

      submitLead({
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
        source: "contact-form",
        lang: currentLang,
        submittedAt: new Date().toISOString()
      }).then(function (ok) {
        if (btn) btn.textContent = originalLabel;
        if (ok) {
          form.classList.add("hidden");
          sentEl.classList.remove("hidden");
        } else {
          errEl.classList.remove("hidden");
        }
      });
    });
  }

  /* --------------------------------------------------- portrait recolour -- */
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2, d = max - min;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    if (s === 0) return [l * 255, l * 255, l * 255];
    var hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
  }
  function loadImage(src) {
    return new Promise(function (res, rej) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () { res(img); };
      img.onerror = rej;
      img.src = src;
    });
  }
  function recolourInto(el, referenceSrc) {
    if (!el) return;
    Promise.all([loadImage(el.src), loadImage(referenceSrc)])
      .then(function (imgs) {
        var portrait = imgs[0], reference = imgs[1];
        var rc = document.createElement("canvas");
        rc.width = reference.naturalWidth; rc.height = reference.naturalHeight;
        var rctx = rc.getContext("2d");
        rctx.drawImage(reference, 0, 0);
        var rp = rctx.getImageData(12, 12, 1, 1).data;
        var th = rgbToHsl(rp[0], rp[1], rp[2]);
        var targetH = th[0], targetS = th[1];

        var c = document.createElement("canvas");
        c.width = portrait.naturalWidth; c.height = portrait.naturalHeight;
        var ctx = c.getContext("2d");
        ctx.drawImage(portrait, 0, 0);
        var d = ctx.getImageData(0, 0, c.width, c.height);
        var data = d.data;
        for (var i = 0; i < data.length; i += 4) {
          var hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
          var s = hsl[1], l = hsl[2];
          if (s < 0.14 && l > 0.45 && l < 0.92) {
            var nrgb = hslToRgb(targetH, Math.max(targetS, 0.16), l);
            data[i] = nrgb[0]; data[i + 1] = nrgb[1]; data[i + 2] = nrgb[2];
          }
        }
        ctx.putImageData(d, 0, 0);
        el.src = c.toDataURL("image/jpeg", 0.92);
      })
      .catch(function () { /* keep the original image (e.g. file:// tainted canvas) */ });
  }
  var bookingPortraitDone = false;
  function recolourBookingPortraitOnce() {
    if (bookingPortraitDone) return;
    bookingPortraitDone = true;
    recolourInto($("#bookingPortrait"), "hero.jpg");
  }

  function initPortrait() {
    // the pixel-by-pixel recolour is real CPU work (canvas getImageData/
    // putImageData + a full-image HSL pass) — running it synchronously on
    // boot competes with first paint/hydration on slow mobile CPUs. Defer
    // the About photo's recolour to an idle moment, and skip the booking-
    // modal photo entirely until the modal is actually opened (it's not
    // visible on load, so there's nothing to gain recolouring it early).
    var run = function () { recolourInto($("#portrait"), "hero.jpg"); };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 2000 });
    } else {
      window.setTimeout(run, 300);
    }
  }

  /* ----------------------------------------------------- custom cursor --- */
  var CURSOR_SELECTOR = "a, button, input, textarea, [data-open-booking], [role='button']";
  function initCustomCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    var ring = $("#cursorRing");
    var dot = $("#cursorDot");
    if (!ring || !dot) return;

    var root = document.documentElement;
    root.classList.add("has-custom-cursor");

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var ringX = mouseX;
    var ringY = mouseY;
    var raf = 0;
    var primed = false;

    function place(el, x, y) {
      el.style.transform = "translate3d(" + x + "px, " + y + "px, 0) translate(-50%, -50%)";
    }

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!primed) {
        primed = true;
        ringX = mouseX;
        ringY = mouseY;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      place(dot, mouseX, mouseY);
    }
    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      place(ring, ringX, ringY);
      raf = requestAnimationFrame(loop);
    }
    function onOver(e) {
      if (e.target.closest && e.target.closest(CURSOR_SELECTOR)) root.classList.add("cursor-hover");
    }
    function onOut(e) {
      if (e.target.closest && e.target.closest(CURSOR_SELECTOR)) root.classList.remove("cursor-hover");
    }
    function onDown() { root.classList.add("cursor-down"); }
    function onUp() { root.classList.remove("cursor-down"); }
    function onLeave() { ring.style.opacity = "0"; dot.style.opacity = "0"; }
    function onEnter() { ring.style.opacity = "1"; dot.style.opacity = "1"; }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);
  }

  /* --------------------------------------------------------------- boot --- */
  function boot() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var initial = stored && LANGS.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;

    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    initIntroGate();
    initSmoothScroll();
    initMenu();
    initLangButtons();
    initBookingModal();
    initContactForm();
    initCustomCursor();

    applyLang(initial);

    initParallax();
    initHeroCinematicReveal();
    initPortrait();
    observeReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
