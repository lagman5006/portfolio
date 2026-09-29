/*
 * ============================================================
 *  PORTFOLIO MA'LUMOTLARI — saytdagi barcha kontent shu yerda.
 *  Yangi loyiha qo'shish: `projects` massiviga yangi obyekt qo'shing.
 *
 *  type:   "fullstack" | "mobile" | "desktop" | "web" | "backend"
 *  frame:  "phone"  — telefon skrinshotlari (vertikal)
 *          "screen" — sayt / desktop skrinshotlari (gorizontal)
 *          "code"   — rasmsiz backend: kartada endpointlar ko'rinadi
 *  links:  appStore, playStore, live, shop, github, docs — faqat borlarini yozing
 *  logo:   ixtiyoriy — skrinshot bo'lmasa kartada logo ko'rinadi
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
      id: "tdyu-endowment",
      title: "TDYU Endowment Fund",
      tagline: "University endowment website, merch shop & two admin panels",
      type: "fullstack",
      frame: "code",
      year: 2026,
      summary:
        "Donation platform and alumni network for Tashkent State University of Law — with an online merch shop, two admin panels and a Node.js API.",
      description:
        "A complete platform for the Tashkent State University of Law (TDYU) Endowment Fund. The public website presents the fund's mission, programs and projects, publishes annual reports for transparency, accepts donations and grows the alumni community with an interactive world map. A second site — the fund's merch shop — sells branded products with customer accounts and order tracking. Each site has its own admin panel, and both run on a single Node.js API that I built and deployed to an Nginx server with HTTPS.",
      features: [
        "Fund website: mission, programs, projects, governance and alumni stories",
        "Donation flow with an impact calculator and downloadable annual reports",
        "Interactive alumni world map (Leaflet) with self-registration",
        "Merch shop with Google sign-in, customer accounts and order history",
        "Admin panel: alumni applications (approve / reject), governance, stats",
        "Shop admin: products, banners, orders and sales analytics · image cropper",
        "Uzbek, Russian and English · light / dark theme",
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Leaflet", "Node.js", "REST API", "Nginx"],
      endpoints: ["GET /api/stats", "POST /api/applications", "GET /api/shop/products", "POST /api/shop/orders"],
      logo: "images/opt/tdyu/logo.webp",
      images: [],
      links: {
        live: "https://fond.yuretta.uz/",
        shop: "https://fond.yuretta.uz/shop",
      },
    },
    {
      id: "azko-zavod",
      title: "AZKO Zavod",
      tagline: "Production & accounting system for an oil factory",
      type: "fullstack",
      frame: "phone",
      year: 2026,
      summary:
        "Backend, web admin panel and mobile app that run an oil factory end-to-end — from raw cottonseed to sales, debts and SMS reminders.",
      description:
        "AZKO Zavod is the accounting and management system of a cottonseed oil factory, built as a monorepo with three parts. The Express API on MySQL (Knex) tracks raw-material intake, production batches, warehouse stock, clients, sales and debts, with a scheduled auto-press job and SMS reminders sent through Eskiz. Managers work in a React admin panel, while the Flutter app has two roles: workers record weigh-ins, production and quick sales on the floor, and the director follows analytics, sales history and the debt ledger from their phone.",
      features: [
        "Raw cottonseed intake, production batches and scheduled auto-press (cron)",
        "Warehouse stock with a full transaction history",
        "Sales with printable PDF receipts and Excel export",
        "Client debts, payments and automatic SMS reminders (Eskiz)",
        "React admin panel: dashboard, production, sales, debts, users, SMS logs",
        "Flutter app with worker and director roles",
        "JWT auth, Zod validation, CI/CD deploy to azkozavod.uz",
      ],
      stack: ["Node.js", "Express", "TypeScript", "Knex", "MySQL", "React", "Tailwind CSS", "Flutter", "JWT"],
      endpoints: ["POST /api/raw-materials", "POST /api/production/process", "POST /api/sales", "POST /api/debts/:id/send-reminder"],
      images: [
        "images/opt/azkozavod/azko-1.webp",
        "images/opt/azkozavod/azko-2.webp",
        "images/opt/azkozavod/azko-3.webp",
      ],
      links: {},
    },
    {
      id: "xayrulla-hamidov-tv",
      title: "Xayrulla Hamidov TV",
      tagline: "Football media platform — mobile app, admin panel & API",
      type: "fullstack",
      frame: "phone",
      year: 2026,
      summary:
        "Football highlights, full matches, podcasts, shorts and live streams for a well-known sports commentator's audience — with push notifications and real-time analytics.",
      description:
        "Xayrulla Hamidov TV is the media platform of the well-known Uzbek football commentator and journalist. The Flutter app streams highlights, full matches, podcasts and vertical shorts, plus a live HLS broadcast, with favourites, search and sign-in by email, Google or Apple. Editors manage all content from a React admin panel — uploads go to S3-compatible cloud storage — and send push notifications to every user. The Express API tracks views and likes, and pushes live statistics to the dashboard over WebSockets.",
      features: [
        "Highlights, full matches, podcasts and vertical shorts",
        "Live stream (HLS) with a custom video player",
        "Email, Google and Apple sign-in with email verification",
        "Favourites synced with the server, search and push notifications",
        "Admin panel: content management, users, push campaigns, analytics",
        "Real-time view analytics over WebSockets",
        "Video uploads to S3-compatible storage (Cloudflare R2)",
      ],
      stack: ["Flutter", "Dart", "Provider", "Node.js", "Express", "TypeScript", "MySQL", "React", "WebSocket", "Firebase Messaging", "S3 / R2"],
      endpoints: ["GET /api/home", "GET /api/videos/highlights", "POST /api/notifications", "GET /api/analytics"],
      images: [
        "images/opt/xayrulla-tv/tv-1.webp",
        "images/opt/xayrulla-tv/tv-2.webp",
        "images/opt/xayrulla-tv/tv-3.webp",
      ],
      links: {},
    },
    {
      id: "zonic",
      title: "Zonic",
      tagline: "Run, capture territory, compete",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "A running game on a live map: every GPS run captures territory — with leaderboards, clans, challenges, a market and chat.",
      description:
        "Zonic turns running into a territory-control game. Each run is tracked by GPS, and the loop you close becomes your zone on a live Yandex map. Runners compete on global, country and city leaderboards by distance, territory and steps, team up in clans, take on challenges, customise their profile in the in-app market and chat in real time — including voice messages. Profiles show weekly activity, pace and personal records.",
      features: [
        "GPS run tracking that captures zones on a live map",
        "Leaderboards by distance, territory and steps — global, country and city",
        "Clans, friends, challenges and a community feed",
        "Real-time chat with voice messages (Socket.IO)",
        "In-app market: frames, covers and profile themes",
        "Profile with weekly activity, pace and personal records",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Yandex MapKit", "Geolocator", "Socket.IO", "Pedometer", "Firebase Messaging"],
      images: [
        "images/opt/zonic/zonic-1.webp",
        "images/opt/zonic/zonic-2.webp",
        "images/opt/zonic/zonic-3.webp",
        "images/opt/zonic/zonic-4.webp",
        "images/opt/zonic/zonic-5.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/us/app/zonic-app/id6766318781",
        playStore: "https://play.google.com/store/apps/details?id=com.zonic.app",
        live: "https://zonic-landing-six.vercel.app",
      },
    },
    {
      id: "avtotest",
      title: "Avtomaktab",
      tagline: "Driving school test system",
      type: "desktop",
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

  // Ish joyi — kompaniya loyihalari "Work" (freelance) ro'yxatidan alohida ko'rsatiladi
  company: {
    name: "IT Progress",
    url: "https://it-progress.uz/",
    role: "Flutter Developer",
    since: "Jul 2026",
  },

  // Kompaniyada ishlagan loyihalar — maydonlar `projects` bilan bir xil.
  // Rasmlar hali yo'q: images/opt/<id>/ ga qo'shib, `images` massiviga yozing.
  companyProjects: [
    {
      id: "skor-xodimlar",
      title: "Skor Xodimlar",
      tagline: "Staff attendance & field-team tracking",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Face-verified check-in, GPS geofencing and a live map of field staff for managers — with payroll and reports built in.",
      description:
        "Skor Xodimlar is an employee attendance system for organisations with offices, branches and field teams. Staff check in with a selfie verified by on-device face detection inside an assigned GPS zone, while a background location service keeps the manager's live map up to date. Managers get a separate dashboard with daily and monthly reports, late-arrival and early-leave lists, leave requests and payroll.",
      features: [
        "Check-in / check-out with ML Kit face verification",
        "GPS geofencing — managers assign work zones per employee",
        "Real-time staff map with movement history on Yandex Maps",
        "Manager dashboard: daily & monthly reports, latecomers, payroll",
        "Leave & absence requests with approval flow",
        "Push notifications and 4 languages (UZ, RU, EN, KG)",
      ],
      stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "ML Kit", "Yandex MapKit", "Geolocator", "Firebase Messaging", "Dio", "GetIt"],
      images: [
        "images/opt/skor-xodimlar/xodimlar-1.webp",
        "images/opt/skor-xodimlar/xodimlar-2.webp",
        "images/opt/skor-xodimlar/xodimlar-3.webp",
        "images/opt/skor-xodimlar/xodimlar-4.webp",
        "images/opt/skor-xodimlar/xodimlar-5.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/uz/app/skor-xodimlar/id6797519944",
        playStore: "https://play.google.com/store/apps/details?id=uz.skor.hodimlar",
      },
    },
    {
      id: "skor-maktab",
      title: "Skor Maktab",
      tagline: "School attendance & parent notifications",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Face-ID attendance for schools: parents get instant arrival alerts, teachers manage classes, admins see the full picture.",
      description:
        "Skor Maktab is a school monitoring and attendance system. Students are registered by face scan at the entrance, and parents instantly receive a push notification when their child arrives or leaves. Teachers manage classes and mark attendance manually when needed, while the school administration sees daily, weekly, monthly and yearly statistics, canteen expenses and AI-generated analysis. Premium features are unlocked with a yearly subscription paid through Click.",
      features: [
        "Face-scan attendance with ML Kit face detection",
        "Instant arrival / departure notifications for parents",
        "Class and student management, manual attendance for teachers",
        "Daily, weekly, monthly and yearly attendance statistics",
        "Canteen expenses and AI-powered attendance analysis",
        "Yearly subscription via Click payments, Excel export",
      ],
      stack: ["Flutter", "Dart", "Riverpod", "Provider", "ML Kit", "Camera", "Firebase Messaging", "Click API", "REST API"],
      images: [
        "images/opt/skor-maktab/maktab-1.webp",
        "images/opt/skor-maktab/maktab-2.webp",
        "images/opt/skor-maktab/maktab-3.webp",
        "images/opt/skor-maktab/maktab-4.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/uz/app/skor-maktab/id6800694358",
        playStore: "https://play.google.com/store/apps/details?id=uz.skorfaceid.app",
      },
    },
    {
      id: "toyxona",
      title: "Toyxona.uz",
      tagline: "Wedding venue & services marketplace",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Find and book wedding halls and event services — with separate panels for venue owners and service providers.",
      description:
        "Toyxona.uz is a marketplace for planning weddings and events in Uzbekistan. Clients browse wedding halls, check real-time availability on a calendar, compare packages and send booking requests. Venue owners manage their halls, schedule and incoming requests from their own panel, and service providers (photographers, musicians, decorators and more) showcase their portfolio. Built-in chat, reviews, bonuses, promo codes and referrals keep everyone connected.",
      features: [
        "Venue search with availability calendar and day sessions",
        "Booking requests with confirm / reject flow for owners",
        "Owner panel: venues, schedule, requests and dashboard",
        "Provider panel with portfolio for event services",
        "Chat, reviews, favourites, bonuses, promo codes and referrals",
        "Sign in with phone OTP, Google or Apple · push notifications",
      ],
      stack: ["Flutter", "Dart", "Provider", "REST API", "Firebase Messaging", "Google Sign-In", "Sign in with Apple", "Table Calendar"],
      images: [
        "images/opt/toyxona/toyxona-1.webp",
        "images/opt/toyxona/toyxona-2.webp",
        "images/opt/toyxona/toyxona-3.webp",
        "images/opt/toyxona/toyxona-4.webp",
        "images/opt/toyxona/toyxona-5.webp",
        "images/opt/toyxona/toyxona-6.webp",
      ],
      links: {
        appStore: "https://apps.apple.com/uz/app/toyxonauz/id6796257426",
        playStore: "https://play.google.com/store/apps/details?id=uz.toyxona.app",
      },
    },
    {
      id: "osiyo-bozor",
      title: "Osiyo Bozor",
      tagline: "Sales & warehouse app for a building-materials market",
      type: "mobile",
      frame: "phone",
      year: 2026,
      summary:
        "Point of sale, stock control and tax-receipt QR scanning for building-materials shops — keeps working offline.",
      description:
        "Osiyo Bozor is a sales and warehouse management app for building-materials shops (metal, timber, paint) at the Osiyo market. It connects to the OSIYO SYSTEM Tadbirkor API: sellers manage the catalogue, receive stock, make sales and scan fiscal receipt QR codes, which are verified against the tax service (OFD) and synced to the server. A local SQLite database keeps the app usable when the internet drops, and tokens refresh silently in the background.",
      features: [
        "Product catalogue with categories, stock-ins and per-product stats",
        "Cart and point-of-sale checkout, sales history",
        "Fiscal receipt QR scanning with signed OFD verification",
        "Warehouse summary and low-stock attention list",
        "Dashboard and reports; scanner-operator role",
        "Offline mode on SQLite with automatic token refresh",
      ],
      stack: ["Flutter", "Dart", "Riverpod", "GoRouter", "SQLite", "Mobile Scanner", "REST API", "Firebase Messaging"],
      images: [
        "images/opt/osiyo-bozor/osiyo-1.webp",
        "images/opt/osiyo-bozor/osiyo-2.webp",
        "images/opt/osiyo-bozor/osiyo-3.webp",
        "images/opt/osiyo-bozor/osiyo-4.webp",
      ],
      links: {},
    },
  ],

  journey: [
    {
      when: "Jul 2026 — Now",
      title: "Flutter Developer · IT Progress",
      text: "Building and maintaining the company's production apps — attendance systems, a wedding-venue marketplace and a retail/warehouse app.",
      current: true,
    },
    {
      when: "Freelance",
      title: "Full-Stack Developer",
      text: "Building complete products — mobile and web clients together with the backends and databases behind them.",
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
