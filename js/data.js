/*
 * ============================================================
 *  PORTFOLIO MA'LUMOTLARI — saytdagi barcha kontent shu yerda.
 *  Yangi loyiha qo'shish: `projects` massiviga yangi obyekt qo'shing.
 *
 *  type:   "mobile" | "web" | "backend"
 *  frame:  "phone"  — telefon skrinshotlari (vertikal)
 *          "screen" — sayt / desktop skrinshotlari (gorizontal)
 *          "code"   — rasmsiz backend: kartada endpointlar ko'rinadi
 *  links:  appStore, playStore, live, github, docs — faqat borlarini yozing
 *
 *  Rasmlar: images/ ga tashlang, so'ng `./scripts/optimize-images.sh`
 *  ishga tushiring — images/opt/ ichida .webp versiyalari paydo bo'ladi.
 * ============================================================
 */
window.PORTFOLIO = {
  profile: {
    name: "Rahmatullo Ergashev",
    role: "Full-Stack Developer",
    location: "Fergana, Uzbekistan",
    email: "asliddin5006@gmail.com",
    phone: "+998 99 037 5006",
    telegram: "lagman5006",
    github: "lagman5006",
    linkedin: "rahmatulloh-ergashev",
    available: true,
    // Hero'dagi kod oynasida ko'rinadi — o'z stekingizga moslang
    stack: {
      mobile: ["Flutter", "Dart"],
      web: ["React", "Next.js", "TypeScript"],
      backend: ["Node.js", "PostgreSQL", "Docker"],
    },
  },

  // "What I do" bo'limi — mijoz → API → ma'lumotlar bazasi
  services: [
    {
      id: "mobile",
      layer: "Client · Mobile",
      title: "Mobile apps",
      text: "Cross-platform iOS & Android apps with clean architecture, smooth animations and offline-first data.",
      tools: ["Flutter", "Dart", "BLoC", "Provider", "Hive", "Firebase"],
    },
    {
      id: "web",
      layer: "Client · Web",
      title: "Web apps",
      text: "Fast, responsive, SEO-friendly websites and dashboards that look great on every screen.",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"],
    },
    {
      id: "backend",
      layer: "Server · Data",
      title: "Backend & APIs",
      text: "Secure REST APIs, authentication, databases and deployments that keep products running.",
      tools: ["Node.js", "REST API", "PostgreSQL", "Docker", "JWT Auth", "Git"],
    },
  ],

  projects: [
    {
      id: "yuristai",
      title: "Yurist AI",
      tagline: "AI-powered legal assistant & specialist directory",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "AI legal assistant for Uzbekistan — instant legal advice, automated document drafting and Lex.uz database integration.",
      description:
        "Yurist AI is a smart legal assistant built for the legislation of the Republic of Uzbekistan. It gives users immediate, high-accuracy legal advice, drafts applications and complaints, searches the official Lex.uz database, and connects people with verified specialists — notaries, advocates, family, labor, business, property, tax and administrative lawyers.",
      features: [
        "Instant AI consultations based on Uzbekistan legislation",
        "Automated generation of applications and complaints",
        "Integrated search over the official Lex.uz database",
        "Specialist directory grouped by field of law",
        "Fluid light / dark theme with responsive components",
        "Secure storage and full privacy for sensitive legal data",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "AI Integration", "REST API", "Hive", "Secure Storage"],
      images: [
        "images/opt/yuristai/yuristai-1.webp",
        "images/opt/yuristai/yuristai-2.webp",
        "images/opt/yuristai/yuristai-3.webp",
        "images/opt/yuristai/yuristai-4.webp",
        "images/opt/yuristai/yuristai-5.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/ru/app/yuristai-app/id6780047253",
        playStore: "https://play.google.com/store/apps/details?id=com.yurist.ai",
      },
    },
    {
      id: "mymock",
      title: "myMock",
      tagline: "Interactive educational platform",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Mock tests, video lessons and structured courses with progress tracking for students preparing for exams.",
      description:
        "myMock is an interactive educational platform that helps students prepare for exams through comprehensive online mock tests, interactive video lessons and structured multi-module courses — with live academic support from teachers.",
      features: [
        "Comprehensive mock tests with results tracking",
        "Interactive video lessons in a modular structure",
        "Teacher profiles and academic course catalogue",
        "Secure sign-in with phone number or Google account",
        "Live chat with teachers and administrators",
      ],
      stack: ["Flutter", "Dart", "Provider", "REST API", "Dio", "Firebase Auth"],
      images: [
        "images/opt/myMock/Screenshot_20260530_111151.webp",
        "images/opt/myMock/Screenshot_20260530_111159.webp",
        "images/opt/myMock/Screenshot_20260530_111239.webp",
        "images/opt/myMock/Screenshot_20260530_111304.webp",
        "images/opt/myMock/Screenshot_20260530_111312.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/us/app/mymock/id6760037918",
        playStore: "https://play.google.com/store/apps/details?id=uz.mymock.app",
      },
    },
    {
      id: "zonic",
      title: "Zonic",
      tagline: "Health & fitness companion",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Tracks steps, workouts and sleep with beautiful data visualisations and full offline support.",
      description:
        "Zonic is an elegant health and fitness tracker that helps users monitor activity, workouts, sleep and overall wellness. Local caching keeps it working flawlessly offline, and custom-painted charts turn the data into something people actually enjoy looking at.",
      features: [
        "Daily activity, step count and workout log",
        "Personal goals with interactive progress indicators",
        "Premium dark-mode dashboard",
        "Weekly and monthly charts & statistics",
        "NoSQL local cache for complete offline use",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Hive", "Custom Painters", "Health Sensors"],
      images: [
        "images/opt/zonic/Screenshot_20260530_105708.webp",
        "images/opt/zonic/Screenshot_20260530_105721.webp",
        "images/opt/zonic/Screenshot_20260530_105815.webp",
        "images/opt/zonic/Screenshot_20260530_105823.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/us/app/zonic-app/id6766318781",
        live: "https://zonic-landing-six.vercel.app",
      },
    },
    {
      id: "sair",
      title: "SAIR",
      tagline: "Travel & location discovery assistant",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Helps tourists and locals discover nearby places using location-aware camera detection and live maps.",
      description:
        "SAIR is a location-aware travel companion that helps tourists and locals discover historical landmarks, attractions, restaurants and shops. It combines mapping and camera technologies to show real-time point-of-interest details.",
      features: [
        "AR camera scanning for nearby locations",
        "Real-time directory of attractions and cafés",
        "Live map, location tracking and route calculation",
        "Detailed place pages with user reviews",
        "Offline map caching and local POI database",
      ],
      stack: ["Flutter", "Dart", "BLoC", "AR / Camera", "Google Maps API", "Geolocator"],
      images: [
        "images/opt/SAIR/Screenshot-2026-05-30-at-11.21.49.webp",
        "images/opt/SAIR/Screenshot-2026-05-30-at-11.21.59.webp",
        "images/opt/SAIR/Screenshot-2026-05-30-at-11.22.14.webp",
        "images/opt/SAIR/Screenshot-2026-05-30-at-11.22.21.webp",
        "images/opt/SAIR/Screenshot-2026-05-30-at-11.21.41.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/us/app/sair/id6763813012",
      },
    },
    {
      id: "styleup",
      title: "StyleUp",
      tagline: "Barbershop booking platform (BarBros)",
      type: "mobile",
      frame: "phone",
      year: 2025,
      summary:
        "Find barbershops, book services and chat with barbers. Team project at the Najot Ta'lim StartUp program.",
      description:
        "StyleUp connects users with nearby barbershops and styling services. It helps barbershops manage their barbers and lets barbers showcase their work to attract more clients. Built as a team project in the Najot Ta'lim StartUp program.",
      features: [
        "Browse nearby barbershops and services",
        "Barber profiles and portfolios",
        "Appointment booking with a preferred barber",
        "Real-time chat with barbershops",
        "Order history and dark / light theme",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "Dependency Injection", "REST API"],
      images: ["images/opt/StyleUp1.webp", "images/opt/StyleUp2.webp", "images/opt/StyleUp3.webp"],
      links: {},
    },
    {
      id: "nasiya",
      title: "Nasiya App",
      tagline: "Installment payment management",
      type: "mobile",
      frame: "phone",
      year: 2025,
      summary:
        "Debt and installment tracking for small businesses with SMS reminders and financial reports.",
      description:
        "Nasiya App is an installment payment management system for small business owners. It tracks customer debts, manages payments and sends automated SMS reminders about upcoming payments.",
      features: [
        "Dashboard with total debt overview",
        "Client management",
        "Automated SMS payment reminders",
        "Payment tracking and history",
        "Multi-language: Uzbek, Russian, English",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "SMS Integration", "Local Storage"],
      images: ["images/opt/nasiyaapp1.webp", "images/opt/nasiyaapp2.webp", "images/opt/nasiyaapp3.webp"],
      links: {},
    },
    {
      id: "avtotest",
      title: "Avtomaktab",
      tagline: "Driving school test system",
      type: "mobile",
      frame: "screen",
      year: 2025,
      summary:
        "Driving licence exam preparation with 1000+ questions, timed exams and progress tracking.",
      description:
        "Avtomaktab helps people prepare for their driving licence exam with more than 1000 questions organised by category and topic, timed practice exams and detailed progress statistics.",
      features: [
        "1000+ practice questions by category",
        "Timed practice exams",
        "Progress tracking and statistics",
        "Uzbek (Latin & Cyrillic) and Russian",
        "Works offline with bundled JSON data",
      ],
      stack: ["Flutter", "Dart", "Provider", "JSON", "SharedPreferences", "Responsive UI"],
      images: ["images/opt/avtotest1.webp", "images/opt/avtotest2.webp", "images/opt/avtotest3.webp"],
      links: {},
    },

    /* ---- NAMUNA: web / backend loyihalar shu ko'rinishda qo'shiladi ----
    {
      id: "my-api",
      title: "My API",
      tagline: "Qisqa tavsif",
      type: "backend",
      frame: "code",
      year: 2026,
      summary: "Kartada ko'rinadigan 1-2 gap.",
      description: "Modal oynadagi to'liq tavsif.",
      features: ["...", "..."],
      stack: ["Node.js", "PostgreSQL"],
      endpoints: ["POST /auth/login", "GET /users/:id", "GET /orders"],
      images: [],
      links: { github: "https://github.com/...", docs: "https://.../docs", live: "https://..." },
    },
    ------------------------------------------------------------------- */
  ],

  journey: [
    {
      when: "Now",
      title: "Full-Stack Developer",
      text: "Building complete products — mobile and web clients together with the backends and databases behind them.",
      current: true,
    },
    {
      when: "2025 — 2026",
      title: "StartUp program · Najot Ta'lim",
      text: "Team product development, shipping apps to the App Store and Google Play. Design patterns and clean architecture in practice.",
    },
    {
      when: "2025",
      title: "Flutter Bootcamp · Najot Ta'lim",
      text: "Intensive Flutter development program — graduated.",
    },
    {
      when: "2025",
      title: "Foundation Course · Najot Ta'lim",
      text: "Programming fundamentals — graduated.",
    },
  ],
};
