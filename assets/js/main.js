(function () {
  "use strict";

  /* ---------- Configuración editable ---------- */
  const CONFIG = {
    email: "williacu@gmail.com",
    linkedin: "https://www.linkedin.com/in/williacu",
    whatsapp: "", // ej: "573004022196" para mostrar botón de WhatsApp; vacío = oculto
    cv: "assets/docs/CV-William-Acuna-Rojas.pdf",
    countries: 4, // EE. UU., Puerto Rico, México, Colombia
    years: "10+"
  };

  const INDUSTRIES = {
    cultura:     { es: "Cultura y eventos", en: "Culture & events" },
    salud:       { es: "Salud",             en: "Healthcare" },
    finanzas:    { es: "Finanzas",          en: "Finance" },
    ecommerce:   { es: "E-commerce",        en: "E-commerce" },
    apps:        { es: "Apps móviles",      en: "Mobile apps" },
    automotriz:  { es: "Automotriz",        en: "Automotive" },
    servicios:   { es: "Servicios",         en: "Services" },
    gastronomia: { es: "Gastronomía",       en: "Food & dining" },
    educacion:   { es: "Educación",         en: "Education" },
    marca:       { es: "Marca personal",    en: "Personal brand" }
  };

  const SKILLS = [
    { es: "Desarrollo", en: "Development", items: ["WordPress y Elementor Pro", "PHP", "Drupal", "React", "Expo (React Native) y Supabase", "HTML, CSS y JavaScript", "APIs REST"] },
    { es: "SEO y medición", en: "SEO & analytics", items: ["SEO técnico", "SEO programático", "Schema markup", "Core Web Vitals", "Search Console", "GA4 y Tag Manager"] },
    { es: "Plataformas", en: "Platforms", items: ["WordPress", "Shopify", "Duda", "PrestaShop", "Cloudflare", "WP Rocket"] },
    { es: "IA en el flujo de trabajo", en: "AI in my workflow", items: ["Claude", "ChatGPT", "Gemini", "Copilot"] }
  ];

  const T = {
    es: {
      skip: "Saltar a los proyectos",
      "nav.work": "Proyectos", "nav.about": "Perfil", "nav.contact": "Contacto",
      "hero.title": "Diseño y desarrollo sitios web desde cero.",
      "hero.lead": "Desarrollador web y especialista en SEO en Bogotá. Cada sitio de esta lista lo diseñé y lo construí yo, de la primera maqueta a la publicación.",
      "hero.cta": "Ver los proyectos", "hero.cv": "Descargar CV",
      "facts.sites": "sitios construidos", "facts.ind": "industrias", "facts.countries": "países", "facts.years": "años de experiencia",
      "work.title": "Proyectos", "work.viewIndex": "Índice", "work.viewGrid": "Galería", "work.all": "Todos",
      "about.title": "Perfil",
      "about.p1": "Más de 10 años diseñando, desarrollando y optimizando sitios web y tiendas en línea. Trabajo principalmente con WordPress y Elementor, y también desarrollo en PHP, Drupal y React, además de apps móviles nativas con Expo y Supabase. Construyo a la medida lo que el proyecto necesite: integraciones con APIs, formularios avanzados y páginas dinámicas.",
      "about.p2": "Cada sitio sale con SEO técnico desde la base: arquitectura, datos estructurados, rendimiento y medición con Search Console, Analytics y Tag Manager. Uso herramientas de IA en mi flujo diario para prototipar, depurar y documentar más rápido.",
      "contact.title": "¿Tienes un proyecto o una vacante?", "contact.lead": "Respondo en menos de 24 horas.",
      "contact.email": "Escríbeme", "contact.cv": "Descargar CV",
      "case.prev": "Proyecto anterior", "case.next": "Proyecto siguiente", "case.close": "Cerrar",
      "case.visit": "Visitar el sitio", "case.industry": "Industria", "case.role": "Mi rol", "case.stack": "Tecnología",
      "case.roleValue": "Diseño y desarrollo completo, desde cero",
      "case.noUrl": "Sitio sin dominio público por ahora",
      "case.of": "de", "ph.soon": "Vista previa en preparación",
      "langLabel": "Change language to English"
    },
    en: {
      skip: "Skip to projects",
      "nav.work": "Work", "nav.about": "About", "nav.contact": "Contact",
      "hero.title": "I design and build websites from scratch.",
      "hero.lead": "Web developer and SEO specialist based in Bogotá. I designed and built every site on this list myself, from the first wireframe to launch.",
      "hero.cta": "See the work", "hero.cv": "Download résumé",
      "facts.sites": "websites built", "facts.ind": "industries", "facts.countries": "countries", "facts.years": "years of experience",
      "work.title": "Work", "work.viewIndex": "Index", "work.viewGrid": "Gallery", "work.all": "All",
      "about.title": "About",
      "about.p1": "10+ years designing, developing and optimizing websites and online stores. I work mainly with WordPress and Elementor, and also build with PHP, Drupal and React, plus native mobile apps with Expo and Supabase. I build whatever custom pieces a project needs: API integrations, advanced forms and dynamic pages.",
      "about.p2": "Every site ships with technical SEO built in: architecture, structured data, performance, and tracking with Search Console, Analytics and Tag Manager. AI tools are part of my daily workflow for faster prototyping, debugging and documentation.",
      "contact.title": "Have a project or an opening?", "contact.lead": "I reply within 24 hours.",
      "contact.email": "Email me", "contact.cv": "Download résumé",
      "case.prev": "Previous project", "case.next": "Next project", "case.close": "Close",
      "case.visit": "Visit the site", "case.industry": "Industry", "case.role": "My role", "case.stack": "Stack",
      "case.roleValue": "Full design and development, from scratch",
      "case.noUrl": "No public domain yet",
      "case.of": "of", "ph.soon": "Preview coming soon",
      "langLabel": "Cambiar idioma a español"
    }
  };

  /* ---------- Estado ---------- */
  const P = (window.PROJECTS || []).slice();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let lang = initialLang();
  let filter = "all";
  let view = "index";
  let current = -1;
  let scrollAnim = null;

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") n.textContent = v;
      else if (k === "class") n.className = v;
      else n.setAttribute(k, v);
    }
    (Array.isArray(kids) ? kids : [kids]).forEach(c => c && n.append(c));
    return n;
  };
  const t = k => (T[lang] && T[lang][k]) || T.es[k] || k;
  const domainOf = p => p.url ? p.url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "") : "";
  const imgPath = (p, kind) => `assets/img/projects/${p.slug}/${kind}.webp`;
  const visible = () => P.filter(p => filter === "all" || p.industry === filter);

  function initialLang() {
    try { const s = localStorage.getItem("lang"); if (s === "es" || s === "en") return s; } catch (e) {}
    return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  }

  /* Imagen con respaldo: si el archivo aún no existe, muestra un marcador */
  function picture(p, kind, alt) {
    const img = el("img", { src: imgPath(p, kind), alt: alt || "", loading: "lazy", decoding: "async" });
    img.addEventListener("error", () => img.replaceWith(placeholder(p)), { once: true });
    return img;
  }
  function placeholder(p) {
    return el("div", { class: "ph", text: domainOf(p) || p.name });
  }

  /* ---------- Render ---------- */
  function applyText() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-label]").forEach(n => n.setAttribute("aria-label", t(n.dataset.i18nLabel)));
    const lt = $("#langToggle");
    lt.textContent = lang === "es" ? "EN" : "ES";
    lt.setAttribute("aria-label", t("langLabel"));
  }

  function renderFacts() {
    const industries = new Set(P.map(p => p.industry)).size;
    const totalSites = P.reduce((n, p) => n + (p.sites || 1), 0);
    const facts = [[totalSites, "facts.sites"], [industries, "facts.ind"], [CONFIG.countries, "facts.countries"], [CONFIG.years, "facts.years"]];
    $("#facts").replaceChildren(...facts.map(([v, k]) => el("div", {}, [el("dt", { text: t(k) }), el("dd", { text: String(v) })])));
  }

  function renderFilters() {
    const counts = P.reduce((a, p) => (a[p.industry] = (a[p.industry] || 0) + 1, a), {});
    const keys = Object.keys(INDUSTRIES).filter(k => counts[k]);
    const mk = (key, label, n) => {
      const b = el("button", { type: "button", class: "chip", "aria-pressed": String(filter === key), "data-filter": key }, [label, el("span", { class: "n", text: String(n) })]);
      b.addEventListener("click", () => { filter = key; renderFilters(); renderList(); });
      return b;
    };
    $("#filters").replaceChildren(mk("all", t("work.all"), P.length), ...keys.map(k => mk(k, INDUSTRIES[k][lang], counts[k])));
  }

  function renderList() {
    const items = visible();
    const index = $("#indexList"), grid = $("#gridList");
    index.hidden = view !== "index";
    grid.hidden = view !== "grid";

    if (view === "index") {
      index.replaceChildren(...items.map(p => {
        const b = el("button", { type: "button", class: "row", "data-slug": p.slug }, [
          el("span", { class: "row-domain", text: domainOf(p) || p.name }),
          el("span", { class: "row-name", text: p.name }),
          el("span", { class: "row-ind", text: INDUSTRIES[p.industry][lang] })
        ]);
        b.addEventListener("click", () => openCase(p.slug));
        if (finePointer) {
          b.addEventListener("mouseenter", () => showPeek(p));
          b.addEventListener("mouseleave", hidePeek);
        }
        return el("li", {}, b);
      }));
    } else {
      grid.replaceChildren(...items.map(p => {
        const b = el("button", { type: "button", class: "card", "data-slug": p.slug }, [
          el("div", { class: "card-media" }, picture(p, "desktop", "")),
          el("h3", { text: p.name }),
          el("p", { text: INDUSTRIES[p.industry][lang] + (domainOf(p) ? " / " + domainOf(p) : "") })
        ]);
        b.addEventListener("click", () => openCase(p.slug));
        return el("li", {}, b);
      }));
    }
  }

  function renderSkills() {
    $("#skills").replaceChildren(...SKILLS.map(g => el("div", {}, [
      el("h3", { text: g[lang] }),
      el("ul", {}, g.items.map(i => el("li", { text: i })))
    ])));
  }

  function renderContact() {
    const links = [
      [`mailto:${CONFIG.email}`, `${t("contact.email")}: ${CONFIG.email}`],
      [CONFIG.linkedin, "LinkedIn"],
      CONFIG.whatsapp ? [`https://wa.me/${CONFIG.whatsapp}`, "WhatsApp"] : null,
      [CONFIG.cv, t("contact.cv")]
    ].filter(Boolean);
    $("#contactLinks").replaceChildren(...links.map(([href, label]) => {
      const a = el("a", { href, text: label });
      if (href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
      if (href === CONFIG.cv) a.setAttribute("download", "");
      return el("li", {}, a);
    }));
  }

  function renderAll() { applyText(); renderFacts(); renderFilters(); renderList(); renderSkills(); renderContact(); }

  /* ---------- Vista previa flotante sobre el índice ---------- */
  const peek = $("#peek");
  function showPeek(p) {
    peek.replaceChildren(picture(p, "desktop", ""));
    peek.classList.add("on");
  }
  function hidePeek() { peek.classList.remove("on"); }
  if (finePointer) {
    document.addEventListener("mousemove", e => {
      if (!peek.classList.contains("on")) return;
      const w = peek.offsetWidth, h = peek.offsetHeight || 240;
      let x = e.clientX + 28, y = e.clientY - h / 2;
      if (x + w > window.innerWidth - 16) x = e.clientX - w - 28;
      y = Math.max(16, Math.min(y, window.innerHeight - h - 16));
      peek.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });
  }

  /* ---------- Caso de estudio ---------- */
  const dlg = $("#case");
  const screen = $("#caseScreen");

  function openCase(slug) {
    hidePeek();
    const list = visible();
    let i = list.findIndex(p => p.slug === slug);
    if (i < 0) { filter = "all"; renderFilters(); renderList(); i = P.findIndex(p => p.slug === slug); }
    if (i < 0) return;
    current = i;
    fillCase();
    if (!dlg.open) dlg.showModal();
    try { history.replaceState(null, "", "#p/" + slug); } catch (e) {}
  }

  function fillCase() {
    const list = visible();
    const p = list[current];
    const d = domainOf(p);
    $("#caseName").textContent = p.name;
    $("#caseDomain").textContent = d || t("case.noUrl");
    $("#caseUrlBar").textContent = d || p.name;
    $("#caseDesc").textContent = p.desc[lang] || p.desc.es;
    $("#caseCount").textContent = `${current + 1} ${t("case.of")} ${list.length}`;
    const meta = [["case.industry", INDUSTRIES[p.industry][lang]], ["case.role", t("case.roleValue")]];
    if (p.stack && p.stack.length) meta.push(["case.stack", p.stack.join(", ")]);
    $("#caseMeta").replaceChildren(...meta.map(([k, v]) => el("div", {}, [el("dt", { text: t(k) }), el("dd", { text: v })])));

    const visit = $("#caseVisit");
    visit.hidden = !p.url;
    if (p.url) visit.href = p.url;

    stopScroll();
    screen.scrollTop = 0;
    const full = picture(p, "full", `${p.name}: ${lang === "es" ? "página completa" : "full page"}`);
    full.loading = "eager";
    full.addEventListener("load", () => startScroll(), { once: true });
    screen.replaceChildren(full);

    const phone = $("#casePhone");
    const mob = el("img", { src: imgPath(p, "mobile"), alt: `${p.name} ${lang === "es" ? "en móvil" : "on mobile"}`, loading: "lazy" });
    mob.addEventListener("error", () => phone.replaceChildren(), { once: true });
    phone.replaceChildren(mob);
  }

  /* Recorrido automático de la página completa; se detiene si el usuario interactúa */
  function startScroll() {
    if (reduced) return;
    const max = screen.scrollHeight - screen.clientHeight;
    if (max < 40) return;
    const duration = Math.min(14000, Math.max(5000, max * 4));
    let t0 = null;
    const step = ts => {
      if (t0 === null) t0 = ts + 700; // breve pausa antes de empezar
      const k = Math.max(0, Math.min(1, (ts - t0) / duration));
      const ease = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      screen.scrollTop = ease * max;
      if (k < 1) scrollAnim = requestAnimationFrame(step);
    };
    scrollAnim = requestAnimationFrame(step);
  }
  function stopScroll() { if (scrollAnim) cancelAnimationFrame(scrollAnim); scrollAnim = null; }
  ["wheel", "touchstart", "pointerdown", "keydown"].forEach(ev => screen.addEventListener(ev, stopScroll, { passive: true }));

  function move(delta) {
    const list = visible();
    current = (current + delta + list.length) % list.length;
    fillCase();
    try { history.replaceState(null, "", "#p/" + list[current].slug); } catch (e) {}
  }

  $("#casePrev").addEventListener("click", () => move(-1));
  $("#caseNext").addEventListener("click", () => move(1));
  $("#caseClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" && e.target !== screen) move(1);
    if (e.key === "ArrowLeft" && e.target !== screen) move(-1);
  });
  dlg.addEventListener("close", () => {
    stopScroll();
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  });

  /* ---------- Controles generales ---------- */
  $("#langToggle").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    renderAll();
    if (dlg.open) fillCase();
  });

  document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
    view = b.dataset.view;
    document.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    hidePeek();
    renderList();
  }));

  $("#year").textContent = new Date().getFullYear();
  renderAll();

  /* Enlace directo a un proyecto: tusitio/#p/slug */
  const m = location.hash.match(/^#p\/(.+)$/);
  if (m) openCase(decodeURIComponent(m[1]));
})();
