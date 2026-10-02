(() => {
  "use strict";

  const data = window.PORTFOLIO;
  const I18N = window.I18N;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  const TYPES = ["fullstack", "mobile", "desktop", "web", "backend"];
  const LINK_ICONS = { live: "↗", shop: "↗", appStore: "", playStore: "▶", github: "</>", docs: "{ }" };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---------- Til (i18n) ----------
  const LANGS = I18N.langs.map((l) => l.code);
  let lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : "en";

  // Interfeys matni: tanlangan til → inglizcha → kalitning o'zi
  function t(key, vars) {
    let v = I18N.ui[lang]?.[key] ?? I18N.ui.en[key] ?? key;
    if (vars && typeof v === "string") v = v.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return v;
  }
  // data.js dagi matn: tarjimasi bo'lsa — tarjima, bo'lmasa inglizcha
  const tr = () => I18N.content[lang] || {};
  const L = (p, field) => tr().projects?.[p.id]?.[field] ?? p[field];
  const typeLabel = (type) => t(`type.${type}`);

  // Freelance + kompaniya loyihalari — qidiruv, modal va hisoblagichlar uchun
  const companyProjects = data.companyProjects || [];
  const allProjects = [...data.projects, ...companyProjects];
  const isCompany = (p) => companyProjects.includes(p);

  // ---------- Counters derived from data ----------
  const shipped = allProjects.length;
  const inStores = allProjects.filter((p) => p.links.appStore || p.links.playStore).length;
  const setModKeys = () => $$("[data-mod-key]").forEach((el) => (el.textContent = isMac ? "⌘K" : "Ctrl K"));

  function setCounters() {
    $$("[data-count-shipped]").forEach((el) => (el.textContent = shipped));
    $$("[data-count-stores]").forEach((el) => (el.textContent = inStores));
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    setModKeys();
  }

  // ---------- Static text (data-i18n*) ----------
  let rotIndex = 0;
  const rotatorHTML = () =>
    `<span class="rotator" aria-live="polite"><span class="rotator-word" data-rotator>${esc(t("hero.words")[rotIndex % t("hero.words").length])}</span></span>`;

  function applyStatic() {
    const root = document.documentElement;
    root.lang = lang;
    document.title = t("meta.title");
    $('meta[name="description"]')?.setAttribute("content", t("meta.desc"));

    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml, { shipped: `<span data-count-shipped>${shipped}</span>`, stores: inStores, rot: rotatorHTML() });
    });
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-i18n-ph]").forEach((el) => el.setAttribute("placeholder", t(el.dataset.i18nPh)));
    setCounters();
    renderLangSwitch();
  }

  function renderLangSwitch() {
    $$("[data-lang-switch]").forEach((wrap) => {
      wrap.setAttribute("aria-label", t("lang.label"));
      wrap.innerHTML = I18N.langs
        .map((l) => `<button type="button" data-set-lang="${l.code}" aria-pressed="${l.code === lang}" title="${esc(l.name)}">${l.label}</button>`)
        .join("");
    });
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-set-lang]");
    if (b) setLang(b.dataset.setLang);
  });

  function setLang(code) {
    if (!LANGS.includes(code) || code === lang) return;
    lang = code;
    try {
      localStorage.setItem("lang", code);
    } catch {}
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", code);
      history.replaceState(null, "", url);
    }
    renderAll();
    if (current) openProject(current.id);
    if (cmdk.open) renderCmdk();
  }

  // ---------- Hero code window ----------
  function renderCode() {
    const p = data.profile;
    const s = (v) => `<span class="t-str">"${esc(v)}"</span>`;
    const arr = (a) => `[${a.map(s).join(", ")}]`;
    const lines = [
      `<span class="t-com">// ${esc(p.name.split(" ")[0].toLowerCase())}.ts</span>`,
      `<span class="t-key">const</span> <span class="t-var">developer</span> = {`,
      `  name: ${s(p.name)},`,
      `  role: ${s(p.role)},`,
      `  stack: {`,
      ...Object.entries(p.stack).map(([k, v]) => `    ${k}: ${" ".repeat(Math.max(0, 7 - k.length))}${arr(v)},`),
      `  },`,
      `  shipped: <span class="t-num">${shipped}</span>, <span class="t-com">// products</span>`,
      `  available: <span class="t-key">${p.available}</span>,`,
      `};`,
      ``,
      `<span class="t-var">developer</span>.<span class="t-fn">build</span>(<span class="t-str">"your idea"</span>);<span class="caret"></span>`,
    ];
    $("[data-code]").innerHTML = lines
      .map((l, i) => `<span class="code-line" style="--i:${i}"><span class="ln">${i + 1}</span>${l || " "}</span>`)
      .join("");
  }
  renderCode();

  // ---------- Rotating headline word ----------
  if (!reduceMotion) {
    setInterval(() => {
      const el = $("[data-rotator]"); // til almashganda element qayta yaratiladi
      if (!el) return;
      el.classList.add("out");
      setTimeout(() => {
        const words = t("hero.words");
        rotIndex = (rotIndex + 1) % words.length;
        const cur = $("[data-rotator]");
        if (!cur) return;
        cur.textContent = words[rotIndex];
        cur.classList.remove("out");
      }, 380);
    }, 2800);
  }

  // ---------- Marquee ----------
  (function marquee() {
    const tools = [...new Set([...data.services.flatMap((s) => s.tools), ...allProjects.flatMap((p) => p.stack)])].slice(0, 22);
    const row = tools.map((x) => `<span>${esc(x)}</span><i>✦</i>`).join("");
    $("[data-marquee]").innerHTML = row + row;
  })();

  // ---------- Reveal on scroll ----------
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  // Qayta chizilgan elementlar: oldin ko'ringan bo'lsa — darhol ko'rinadi
  function reveal(root, wasShown) {
    $$(".reveal, .card", root).forEach((el) => (wasShown ? el.classList.add("in") : revealObserver.observe(el)));
  }

  // ---------- Projects ----------
  const grid = $("[data-projects]");
  let currentFilter = "all";

  function cardMedia(p) {
    // Skrinshot yo'q, lekin logo bor — logo va sayt manzili ko'rinadi
    if (p.logo && !p.images.length) {
      const host = p.links.live ? new URL(p.links.live).host : "";
      return `<div class="media-soon"><img class="media-logo" src="${esc(p.logo)}" alt="${esc(p.title)} logo" loading="lazy" decoding="async">${host ? `<span class="mono muted">${esc(host)}</span>` : ""}</div>`;
    }
    if (p.frame !== "code" && !p.images.length) {
      return `<div class="media-soon"><span class="media-soon-mark">${esc(p.title.charAt(0))}</span><span class="mono muted">${esc(t("card.soon"))}</span></div>`;
    }
    if (p.frame === "code") {
      const eps = (p.endpoints || ["GET /health", "POST /auth/login", "GET /api/v1/…"]).slice(0, 4);
      return `<div class="media-code">
        <div class="media-code-bar"><span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span><span class="mono muted">api.${esc(p.id)}</span></div>
        ${eps
          .map((e) => {
            const [m, ...rest] = e.split(" ");
            return `<div class="ep"><span class="ep-m ep-${esc(m.toLowerCase())}">${esc(m)}</span><span class="mono">${esc(rest.join(" "))}</span><span class="ep-ok">200</span></div>`;
          })
          .join("")}
      </div>`;
    }
    if (p.frame === "screen") {
      return `<div class="media-browser">
        <div class="media-browser-bar"><span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span><span class="url mono">${esc(p.links.live ? new URL(p.links.live).host : p.title.toLowerCase())}</span></div>
        <img src="${esc(p.images[0])}" alt="${esc(p.title)} ${esc(t("card.screen"))}" loading="lazy" decoding="async">
      </div>`;
    }
    const shots = p.images.slice(0, 3);
    return `<div class="media-phones" data-count="${shots.length}">
      ${shots.map((src, i) => `<div class="phone phone--${i}"><img src="${esc(src)}" alt="${esc(p.title)} ${esc(t("card.screen"))} ${i + 1}" loading="lazy" decoding="async"></div>`).join("")}
    </div>`;
  }

  function projectCards(list, wideFirst) {
    return list
      .map((p, i) => {
        const badges = [];
        if (isCompany(p)) badges.push(`<span class="badge badge-company">${esc(data.company.name)}</span>`);
        if (p.links.appStore || p.links.playStore) badges.push(`<span class="badge badge-live">${esc(t("badge.stores"))}</span>`);
        else if (p.links.live) badges.push(`<span class="badge badge-live">${esc(t("badge.live"))}</span>`);
        return `<article class="card ${i === 0 && wideFirst ? "card--wide" : ""}" style="view-transition-name: card-${esc(p.id)}" data-type="${esc(p.type)}">
          <a href="#project/${esc(p.id)}" class="card-link" aria-label="${esc(t("card.open", { title: p.title }))}"></a>
          <div class="card-media">${cardMedia(p)}</div>
          <div class="card-body">
            <div class="card-meta"><span class="badge">${esc(typeLabel(p.type))}</span>${badges.join("")}<span class="muted mono">${p.year}</span></div>
            <h3 class="card-title">${esc(p.title)}</h3>
            <p class="card-text">${esc(L(p, "summary"))}</p>
            <ul class="tags">${p.stack.slice(0, 4).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <span class="card-cta">${esc(t("card.view"))} <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderProjects(filter = currentFilter, wasShown = false) {
    currentFilter = filter;
    const list = data.projects.filter((p) => filter === "all" || p.type === filter);
    grid.innerHTML = projectCards(list, filter === "all");
    bindSpotlight(grid);
    reveal(grid, wasShown);
  }

  function renderCompany(wasShown = false) {
    const section = $("#company");
    if (!section) return;
    if (!companyProjects.length || !data.company) return section.remove();
    const c = data.company;
    const ct = tr().company || {};
    $("[data-company]").innerHTML = `<a class="company-strip reveal ${wasShown ? "in" : ""}" href="${esc(c.url)}" target="_blank" rel="noopener">
        <span class="company-name">${esc(c.name)}</span>
        <span class="muted">${esc(ct.role || c.role)} · ${esc(ct.since || c.since)} — ${esc(t("company.now"))}</span>
        <span class="mono muted">${esc(new URL(c.url).host)} ↗</span>
      </a>`;
    const cgrid = $("[data-company-projects]");
    cgrid.innerHTML = projectCards(companyProjects, false);
    bindSpotlight(cgrid);
    reveal($("#company"), wasShown);
  }

  // Filter chips — only categories that have projects
  const filterWrap = $("[data-filters]");
  function renderFilters() {
    if (!filterWrap) return;
    const counts = data.projects.reduce((a, p) => ((a[p.type] = (a[p.type] || 0) + 1), a), {});
    const types = TYPES.filter((x) => counts[x]);
    if (types.length < 2) {
      filterWrap.hidden = true;
      return;
    }
    filterWrap.innerHTML = [["all", t("filter.all"), data.projects.length], ...types.map((x) => [x, typeLabel(x), counts[x]])]
      .map(([k, label, n]) => `<button role="tab" class="chip" data-filter="${k}" aria-selected="${k === currentFilter}">${esc(label)}<sup>${n}</sup></button>`)
      .join("");
  }
  filterWrap?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn || btn.getAttribute("aria-selected") === "true") return;
    $$("[data-filter]", filterWrap).forEach((b) => b.setAttribute("aria-selected", b === btn));
    const run = () => renderProjects(btn.dataset.filter);
    document.startViewTransition && !reduceMotion ? document.startViewTransition(run) : run();
  });

  // ---------- Services ----------
  function renderServices(wasShown = false) {
    const box = $("[data-services]");
    box.innerHTML = data.services
      .map((s, i) => {
        const x = tr().services?.[s.id] || {};
        return `<article class="service reveal" style="--d:${i * 90}ms">
        <div class="service-top">
          <span class="service-icon service-icon--${esc(s.id)}">${serviceIcon(s.id)}</span>
          <span class="mono muted">${esc(x.layer || s.layer)}</span>
        </div>
        <h3>${esc(x.title || s.title)}</h3>
        <p>${esc(x.text || s.text)}</p>
        <ul class="tags">${s.tools.map((tool) => `<li>${esc(tool)}</li>`).join("")}</ul>
        ${i < data.services.length - 1 ? `<span class="service-flow" aria-hidden="true"><i></i></span>` : ""}
      </article>`;
      })
      .join("");
    bindSpotlight(box);
    reveal(box, wasShown);
  }

  function serviceIcon(id) {
    const icons = {
      mobile: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
      web: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 6.5h.01M9 6.5h.01"/></svg>',
      backend: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
    };
    return icons[id] || icons.web;
  }

  // ---------- Journey ----------
  function renderJourney(wasShown = false) {
    const box = $("[data-journey]");
    const tj = tr().journey || [];
    box.innerHTML = data.journey
      .map((j, i) => {
        const x = tj[i] || {};
        return `<li class="tl-item reveal ${j.current ? "tl-item--now" : ""}" style="--d:${i * 80}ms">
        <span class="tl-dot"></span>
        <span class="tl-when mono">${esc(x.when || j.when)}</span>
        <h3>${esc(x.title || j.title)}</h3>
        <p>${esc(x.text || j.text)}</p>
      </li>`;
      })
      .join("");
    reveal(box, wasShown);
  }

  // ---------- Hammasini chizish (birinchi marta va til almashganda) ----------
  let rendered = false;
  function renderAll() {
    const again = rendered;
    applyStatic();
    renderFilters();
    renderProjects(currentFilter, again);
    renderCompany(again);
    renderServices(again);
    renderJourney(again);
    if (again) $$(".reveal").forEach((el) => el.classList.contains("in") || revealObserver.observe(el));
    setMenu(false);
    rendered = true;
  }

  // ---------- Count-up ----------
  const countObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countObserver.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.textContent, 10);
        if (reduceMotion || !target) return;
        const start = performance.now();
        const dur = 1200;
        const tick = (now) => {
          const k = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { threshold: 0.6 }
  );

  // ---------- Spotlight (cursor glow on cards) ----------
  function bindSpotlight(root) {
    $$(".card, .service, .stat", root).forEach((el) => {
      if (el.dataset.spot) return;
      el.dataset.spot = "1";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  // ---------- Tilt on hero code window ----------
  (function tilt() {
    const el = $("[data-tilt]");
    if (!el || reduceMotion || matchMedia("(hover: none)").matches) return;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  })();

  // ---------- Nav: active section + scrolled state ----------
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav-links a, .mobile-menu a");
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => sectionObserver.observe(s));

  // ---------- Mobile menu (≤ 820px) ----------
  const menuBtn = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
    nav.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && setMenu(false));
  document.addEventListener("click", (e) => !menu.hidden && !nav.contains(e.target) && setMenu(false));
  matchMedia("(min-width: 821px)").addEventListener("change", (e) => e.matches && setMenu(false));

  // ---------- Toast ----------
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  // ---------- Copy email ----------
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(data.profile.email);
      toast(t("toast.copied"));
    } catch {
      location.href = `mailto:${data.profile.email}`;
    }
  }
  $("[data-copy-email]").addEventListener("click", async () => {
    await copyEmail();
    const label = $("[data-copy-label]");
    label.textContent = t("contact.copied");
    setTimeout(() => (label.textContent = t("contact.copy")), 1800);
  });

  // ---------- Contact form → opens mail client ----------
  $("[data-contact-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(t("mail.subject", { name: f.get("name") }));
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    location.href = `mailto:${data.profile.email}?subject=${subject}&body=${body}`;
    toast(t("toast.opening"));
  });

  // ---------- Project dialog ----------
  const dlg = $("[data-project-dialog]");
  const track = $("[data-pd-track]");
  const dots = $("[data-pd-dots]");
  let current = null;

  function openProject(id) {
    const p = allProjects.find((x) => x.id === id);
    if (!p) return;
    const same = current === p && dlg.open;
    current = p;
    $("[data-pd-meta]").innerHTML = `${p.logo ? `<img class="pd-logo" src="${esc(p.logo)}" alt="" width="28" height="28">` : ""}<span class="badge">${esc(typeLabel(p.type))}</span>${isCompany(p) ? `<span class="badge badge-company">${esc(data.company.name)}</span>` : ""}<span class="mono muted">${p.year}</span>`;
    $("[data-pd-title]").textContent = p.title;
    $("[data-pd-tagline]").textContent = L(p, "tagline");
    $("[data-pd-desc]").textContent = L(p, "description");
    $("[data-pd-features]").innerHTML = L(p, "features").map((f) => `<li>${esc(f)}</li>`).join("");
    $("[data-pd-stack]").innerHTML = p.stack.map((x) => `<li>${esc(x)}</li>`).join("");

    const eps = p.endpoints || [];
    $("[data-pd-endpoints-wrap]").hidden = !eps.length;
    $("[data-pd-endpoints]").innerHTML = eps
      .map((e) => {
        const [m, ...rest] = e.split(" ");
        return `<li><span class="ep-m ep-${esc(m.toLowerCase())}">${esc(m)}</span><span class="mono">${esc(rest.join(" "))}</span></li>`;
      })
      .join("");

    const links = Object.entries(p.links).filter(([, url]) => url);
    $("[data-pd-links]").innerHTML = links
      .map(([k, url]) => {
        const label = k === "appStore" ? "App Store" : k === "playStore" ? "Google Play" : t(`link.${k}`);
        return `<a class="btn btn-small btn-ghost btn-store" href="${esc(url)}" target="_blank" rel="noopener"><span class="link-icon">${LINK_ICONS[k] ?? "↗"}</span>${esc(label)}</a>`;
      })
      .join("");

    // Til almashganda ochiq oynadagi rasmlar joyida qoladi
    if (!same) {
      const media = $(".pd-media", dlg);
      media.hidden = !p.images.length;
      media.dataset.frame = p.frame;
      track.innerHTML = p.images
        .map((src, i) => `<figure class="pd-slide"><img src="${esc(src)}" alt="${esc(p.title)} ${esc(t("card.screen"))} ${i + 1}" ${i > 1 ? 'loading="lazy"' : ""} decoding="async"></figure>`)
        .join("");
      track.scrollLeft = 0;
    }
    dots.innerHTML = p.images.map((_, i) => `<button type="button" aria-label="${esc(t("dlg.image", { n: i + 1 }))}" data-i="${i}"></button>`).join("");
    setActiveDot(same ? slideIndex() : 0);

    if (!dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add("no-scroll");
      $(".pd", dlg).scrollTop = 0;
    }
  }

  function closeProject() {
    if (dlg.open) dlg.close();
  }

  dlg.addEventListener("close", () => {
    if (dlg.open) return; // reopened with another project before this event fired
    document.documentElement.classList.remove("no-scroll");
    if (current && location.hash === `#project/${current.id}`) history.replaceState(null, "", isCompany(current) ? "#company" : "#work");
    current = null;
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) closeProject();
  });
  $("[data-close-dialog]").addEventListener("click", closeProject);

  const slideIndex = () => Math.round(track.scrollLeft / (track.clientWidth || 1));
  const goTo = (i) => {
    const n = track.children.length;
    if (!n) return;
    i = (i + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };
  function setActiveDot(i) {
    $$("button", dots).forEach((d, k) => d.classList.toggle("active", k === i));
  }
  track.addEventListener("scroll", () => setActiveDot(slideIndex()), { passive: true });
  $("[data-pd-prev]").addEventListener("click", () => goTo(slideIndex() - 1));
  $("[data-pd-next]").addEventListener("click", () => goTo(slideIndex() + 1));
  dots.addEventListener("click", (e) => {
    const b = e.target.closest("[data-i]");
    if (b) goTo(+b.dataset.i);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(slideIndex() - 1);
    if (e.key === "ArrowRight") goTo(slideIndex() + 1);
  });

  // Deep links: #project/<id>
  function handleHash() {
    const m = location.hash.match(/^#project\/(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]));
    else if (dlg.open) closeProject();
  }
  addEventListener("hashchange", handleHash);

  // ---------- Command palette ----------
  const cmdk = $("[data-cmdk]");
  const cmdkInput = $("[data-cmdk-input]");
  const cmdkList = $("[data-cmdk-list]");
  let cmdkActive = 0;
  let cmdkItems = [];

  const scrollToId = (id) => {
    history.replaceState(null, "", `#${id}`);
    document.getElementById(id).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Buyruqlar tilga bog'liq — har safar joriy tilda yig'iladi
  const commands = () => [
    ...allProjects.map((p) => ({
      group: t("cmdk.projects"),
      label: p.title,
      hint: isCompany(p) ? data.company.name : typeLabel(p.type),
      run: () => {
        history.replaceState(null, "", `#project/${p.id}`);
        openProject(p.id);
      },
    })),
    { group: t("cmdk.navigate"), label: t("cmdk.home"), run: () => scrollToId("home") },
    { group: t("cmdk.navigate"), label: t("nav.work"), run: () => scrollToId("work") },
    ...(companyProjects.length ? [{ group: t("cmdk.navigate"), label: data.company.name, run: () => scrollToId("company") }] : []),
    { group: t("cmdk.navigate"), label: t("nav.services"), run: () => scrollToId("services") },
    { group: t("cmdk.navigate"), label: t("nav.journey"), run: () => scrollToId("journey") },
    { group: t("cmdk.navigate"), label: t("nav.contact"), run: () => scrollToId("contact") },
    ...I18N.langs.map((l) => ({ group: t("cmdk.language"), label: l.name, hint: l.code === lang ? "✓" : l.label, run: () => setLang(l.code) })),
    { group: t("cmdk.actions"), label: t("cmdk.copyEmail"), hint: data.profile.email, run: copyEmail },
    { group: t("cmdk.actions"), label: t("cmdk.openCv"), run: () => (location.href = "cv.html") },
    { group: t("cmdk.links"), label: "GitHub", hint: `@${data.profile.github}`, run: () => open(`https://github.com/${data.profile.github}`, "_blank", "noopener") },
    { group: t("cmdk.links"), label: "Telegram", hint: `@${data.profile.telegram}`, run: () => open(`https://t.me/${data.profile.telegram}`, "_blank", "noopener") },
    { group: t("cmdk.links"), label: "LinkedIn", run: () => open(`https://www.linkedin.com/in/${data.profile.linkedin}/`, "_blank", "noopener") },
  ];

  function renderCmdk() {
    const q = cmdkInput.value.trim().toLowerCase();
    cmdkItems = commands().filter((c) => !q || `${c.label} ${c.hint || ""} ${c.group}`.toLowerCase().includes(q));
    cmdkActive = Math.min(cmdkActive, Math.max(0, cmdkItems.length - 1));
    let lastGroup = "";
    cmdkList.innerHTML = cmdkItems.length
      ? cmdkItems
          .map((c, i) => {
            const head = c.group !== lastGroup ? `<li class="cmdk-group" role="presentation">${esc(c.group)}</li>` : "";
            lastGroup = c.group;
            return `${head}<li role="option" class="cmdk-item" data-i="${i}" aria-selected="${i === cmdkActive}"><span>${esc(c.label)}</span>${c.hint ? `<span class="muted">${esc(c.hint)}</span>` : ""}</li>`;
          })
          .join("")
      : `<li class="cmdk-empty">${esc(t("cmdk.empty", { q }))}</li>`;
  }

  function openCmdk() {
    if (dlg.open) closeProject();
    cmdkInput.value = "";
    cmdkActive = 0;
    renderCmdk();
    cmdk.showModal();
    cmdkInput.focus();
  }
  function runCmdk(i) {
    const c = cmdkItems[i];
    if (!c) return;
    cmdk.close();
    c.run();
  }

  $$("[data-open-cmdk]").forEach((b) => b.addEventListener("click", openCmdk));
  cmdkInput.addEventListener("input", () => {
    cmdkActive = 0;
    renderCmdk();
  });
  cmdkInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = cmdkItems.length;
      if (!n) return;
      cmdkActive = (cmdkActive + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
      renderCmdk();
      $(`[data-i="${cmdkActive}"]`, cmdkList)?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCmdk(cmdkActive);
    }
  });
  cmdkList.addEventListener("click", (e) => {
    const li = e.target.closest("[data-i]");
    if (li) runCmdk(+li.dataset.i);
  });
  cmdkList.addEventListener("pointermove", (e) => {
    const li = e.target.closest("[data-i]");
    if (li && +li.dataset.i !== cmdkActive) {
      cmdkActive = +li.dataset.i;
      $$(".cmdk-item", cmdkList).forEach((x) => x.setAttribute("aria-selected", +x.dataset.i === cmdkActive));
    }
  });
  cmdk.addEventListener("click", (e) => {
    if (e.target === cmdk) cmdk.close();
  });
  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      cmdk.open ? cmdk.close() : openCmdk();
    }
  });

  // ---------- Init ----------
  renderAll();
  $$(".reveal").forEach((el) => revealObserver.observe(el));
  $$("[data-countup]").forEach((el) => countObserver.observe(el));
  bindSpotlight(document);
  handleHash();
  // Kartalar JS bilan chizilgach bo'lim pastga suriladi — #company kabi havolaga qayta o'tamiz
  if (/^#[\w-]+$/.test(location.hash)) document.getElementById(location.hash.slice(1))?.scrollIntoView();
})();
