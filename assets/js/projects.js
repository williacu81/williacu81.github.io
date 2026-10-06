/*
  PROYECTOS DEL PORTAFOLIO
  ------------------------
  - El orden de esta lista es el orden en que aparecen en el sitio (los primeros son los más visibles).
  - "slug" debe coincidir con el nombre de la carpeta en Drive convertido por scripts/prepare_images.py
    (minúsculas, sin tildes, espacios -> guiones). Ej: "Volé Candles" -> "vole-candles".
  - "url": vacío ("") si el sitio no tiene dominio público todavía.
  - "stack": tecnología con la que se construyó el sitio.
  - "industry": una de las claves definidas en INDUSTRIES (main.js).
  - "sites" (opcional): número de sitios si el proyecto incluye más de uno. Se suma en el contador.
*/
window.PROJECTS = [
  {
    slug: "festival-de-cine-de-cartagena",
    name: "Festival Internacional de Cine de Cartagena (FICCI)",
    url: "https://ficcifestival.com",
    industry: "cultura",
    stack: ["Drupal"],
    desc: {
      es: "Sitio oficial del festival de cine más antiguo de América Latina: programación, convocatorias, invitados y noticias.",
      en: "Official site of Latin America's oldest film festival: lineup, open calls, guests and news."
    }
  },
  {
    slug: "premios-india-catalina",
    name: "Premios India Catalina",
    url: "https://premiosindiacatalina.com",
    industry: "cultura",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Plataforma de los premios a la industria audiovisual y de televisión de Colombia: categorías, nominados y ganadores.",
      en: "Platform for Colombia's TV and audiovisual industry awards: categories, nominees and winners."
    }
  },
  {
    slug: "volkswagen",
    name: "Volkswagen Puerto Rico",
    url: "https://volkswagenpuertorico.online",
    industry: "automotriz",
    stack: ["HTML"],
    desc: {
      es: "Landing page de una campaña conjunta de los tres concesionarios Volkswagen de Puerto Rico para captar clientes del Atlas 2026 con 0% de APR.",
      en: "Landing page for a joint campaign by Volkswagen's three dealerships in Puerto Rico, capturing leads for the 2026 Atlas at 0% APR."
    }
  },
  {
    slug: "vole-candles",
    name: "Volé Candles",
    url: "https://volecandles.com",
    industry: "ecommerce",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Tienda en línea de velas artesanales de lujo hechas en vidrio reciclado.",
      en: "Online store for handcrafted luxury candles made in recycled glass."
    }
  },
  {
    slug: "kickoff-advertising",
    name: "KickOff Advertising",
    url: "https://kickoffadvertising.com",
    industry: "servicios",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio corporativo de una agencia de SEO y marketing digital orientada a resultados.",
      en: "Corporate site for a results-driven SEO and digital marketing agency."
    }
  },
  {
    slug: "festival-voces-del-jazz",
    name: "Festival Voces del Jazz y del Caribe",
    url: "https://vocesdeljazz.com",
    industry: "cultura",
    stack: ["PHP"],
    desc: {
      es: "Sitio del festival de jazz y música del Caribe: artistas, agenda y ediciones anteriores.",
      en: "Site for the Jazz and Caribbean music festival: artists, schedule and past editions."
    }
  },
  {
    slug: "sociedad-dermatologica-de-puerto-rico",
    name: "Sociedad Dermatológica de Puerto Rico",
    url: "https://dermapr.com",
    industry: "salud",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de la asociación de dermatólogos de Puerto Rico: miembros, eventos y recursos para pacientes.",
      en: "Site for Puerto Rico's dermatology society: members, events and patient resources."
    }
  },
  {
    slug: "jairo-varela-legacy",
    name: "Jairo Varela Legacy",
    url: "https://jairovarelalegacy.com",
    industry: "cultura",
    stack: ["React"],
    desc: {
      es: "Homenaje digital a Jairo Varela, fundador del Grupo Niche: su historia, su música y su legado.",
      en: "Digital tribute to Jairo Varela, founder of Grupo Niche: his story, music and legacy."
    }
  },
  {
    slug: "comision-filmica-de-cartagena",
    name: "Comisión Fílmica de Cartagena",
    url: "https://cartagenacomisionfilmica.com",
    industry: "cultura",
    stack: ["Drupal"],
    desc: {
      es: "Portal para atraer producciones audiovisuales a Cartagena: locaciones, permisos y servicios.",
      en: "Portal attracting film and TV productions to Cartagena: locations, permits and services."
    }
  },
  {
    slug: "allmedrx",
    name: "AllmedRX",
    url: "https://allmedrx.org",
    industry: "salud",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de servicios farmacéuticos y de salud.",
      en: "Pharmacy and healthcare services website."
    }
  },
  {
    slug: "allergy-worx",
    name: "Allergy Worx",
    url: "https://allergyworx.com",
    industry: "salud",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de servicios de alergología.",
      en: "Allergy care services website."
    }
  },
  {
    slug: "gold-education",
    name: "Gold Education",
    url: "https://goldeducation.com.mx",
    industry: "educacion",
    sites: 2,
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitios web para las oficinas en México y Colombia de una empresa que gestiona intercambios educativos en el exterior: programas, destinos y asesoría.",
      en: "Websites for the Mexico and Colombia offices of a company that manages study-abroad exchanges: programs, destinations and advising."
    }
  },
  {
    slug: "brunch-after",
    name: "Brunch After",
    url: "https://brunchafter.com",
    industry: "apps",
    stack: ["PHP", "Expo (React Native)", "Supabase"],
    desc: {
      es: "Sitio web de una aplicación móvil de citas. Además del sitio, desarrollé la app nativa para Android y iPhone con Expo y Supabase.",
      en: "Website for a mobile dating app. Beyond the site, I built the native Android and iPhone app with Expo and Supabase."
    }
  },
  {
    slug: "oriental-arroz-gourmet",
    name: "Oriental Arroz Gourmet",
    url: "",
    industry: "gastronomia",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de restaurante de cocina oriental.",
      en: "Asian cuisine restaurant website."
    }
  },
  {
    slug: "cheff-cob",
    name: "The Chef Cobb",
    url: "https://thechefcobb.com",
    industry: "gastronomia",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de marca gastronómica.",
      en: "Food brand website."
    }
  },
  {
    slug: "us-agroparts",
    name: "US Agroparts",
    url: "https://usagroparts.com",
    industry: "ecommerce",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Catálogo y tienda de repuestos para maquinaria agrícola.",
      en: "Catalog and store for agricultural machinery parts."
    }
  },
  {
    slug: "sumerced-store",
    name: "Sumercé Store",
    url: "https://sumerced.kickoffadvertising.com",
    industry: "ecommerce",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Tienda en línea de productos colombianos.",
      en: "Online store for Colombian products."
    }
  },
  {
    slug: "magica-figura",
    name: "Mágica Figura",
    url: "https://magicafigura.com",
    industry: "ecommerce",
    stack: ["Shopify"],
    desc: {
      es: "Tienda en línea de productos para la salud.",
      en: "Online store for health products."
    }
  },
  {
    slug: "viuda-negra-tattoo",
    name: "Viuda Negra Tattoo Supply",
    url: "https://www.viudanegra.co",
    industry: "ecommerce",
    stack: ["Shopify"],
    desc: {
      es: "Tienda en línea de una distribuidora de insumos para tatuaje con envíos a toda Colombia.",
      en: "Online store for a tattoo supply distributor shipping across Colombia."
    }
  },
  {
    slug: "truelove-supply",
    name: "Truelove Supply",
    url: "https://www.truelovesupply.com",
    industry: "ecommerce",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de una marca colombiana de productos para el cuidado y la elaboración de tatuajes.",
      en: "Website for a Colombian brand of tattoo-making and aftercare products."
    }
  },
  {
    slug: "steel-glass-designs",
    name: "Steel Glass Designs",
    url: "https://steelglassdesigns.com",
    industry: "servicios",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de una empresa de diseño e instalación en acero y vidrio.",
      en: "Website for a steel and glass design and installation company."
    }
  },
  {
    slug: "exedit-media",
    name: "Exedit Media",
    url: "https://exeditmedia.com",
    industry: "servicios",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de una productora de contenido y medios.",
      en: "Website for a media and content production company."
    }
  },
  {
    slug: "axion-strategic-advisors",
    name: "Axion Strategic Advisors",
    url: "https://axionstrategicadvisors.com",
    industry: "servicios",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio corporativo de una firma de asesoría estratégica.",
      en: "Corporate site for a strategic advisory firm."
    }
  },
  {
    slug: "outsource-worx",
    name: "OutSource Worx",
    url: "https://outsourceworx.com",
    industry: "salud",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de una compañía farmacéutica en Estados Unidos que fabrica medicamentos a medida.",
      en: "Website for a US pharmaceutical company that manufactures custom medications."
    }
  },
  {
    slug: "home-services-improvements",
    name: "Home Services Improvement",
    url: "https://homeservicesimprovement.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de créditos rápidos para proyectos de mejoras del hogar en Estados Unidos.",
      en: "Fast financing site for home improvement projects in the US."
    }
  },
  {
    slug: "enlace-global",
    name: "Enlace Global",
    url: "https://oficialcumplimientoenlaceglobal.com",
    industry: "servicios",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de servicios de oficial de cumplimiento para empresas.",
      en: "Compliance officer services website for businesses."
    }
  },
  {
    slug: "ibrahim-salem",
    name: "Ibrahim Salem",
    url: "https://ibrahimsalemcomedia.com",
    industry: "marca",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio personal de comediante: shows, fechas y contenido.",
      en: "Comedian's personal site: shows, dates and content."
    }
  },
  {
    slug: "raquel-alba",
    name: "Raquel Alba",
    url: "https://raquelalba.co",
    industry: "marca",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de marca personal.",
      en: "Personal brand website."
    }
  },
  {
    slug: "alexandra-velandia",
    name: "Alexandra Velandia",
    url: "",
    industry: "marca",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de marca personal.",
      en: "Personal brand website."
    }
  },
  {
    slug: "possible-finance",
    name: "Possible Finance",
    url: "",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Flujo de redirección y captación de clientes para Possible Finance, empresa fintech de préstamos en Estados Unidos.",
      en: "Redirect and customer acquisition flow for Possible Finance, a US lending fintech."
    }
  },
  {
    slug: "best-car-title-loans",
    name: "Best Car Title Loans",
    url: "https://bestcartitleloans.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de generación de leads para préstamos con título de auto.",
      en: "Lead generation site for car title loans."
    }
  },
  {
    slug: "personal-loans-choice",
    name: "Personal Loans Choice",
    url: "https://personalloanschoice.com",
    industry: "finanzas",
    stack: ["PHP"],
    desc: {
      es: "Sitio de generación de leads para préstamos personales.",
      en: "Lead generation site for personal loans."
    }
  },
  {
    slug: "best-personal-loans-near-me",
    name: "Best Personal Loans Near Me",
    url: "https://bestpersonalloansnearme.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de préstamos personales con páginas por ubicación.",
      en: "Personal loans site with location-based pages."
    }
  },
  {
    slug: "debt-relief",
    name: "Debt Relief Rescue",
    url: "https://www.debtreliefrescue.com",
    industry: "finanzas",
    stack: ["PHP"],
    desc: {
      es: "Sitio de servicios de alivio y consolidación de deudas.",
      en: "Debt relief and consolidation services website."
    }
  },
  {
    slug: "business-loans",
    name: "Business Loans",
    url: "",
    industry: "finanzas",
    stack: ["PHP"],
    desc: {
      es: "Sitio de financiación para pequeñas y medianas empresas.",
      en: "Small and mid-size business financing website."
    }
  },
  {
    slug: "auto-insurance-picker",
    name: "Auto Insurance Picker",
    url: "https://autoinsurancepicker.com",
    industry: "finanzas",
    stack: ["PHP"],
    desc: {
      es: "Comparador y generador de leads para seguros de auto.",
      en: "Auto insurance comparison and lead generation site."
    }
  },
  {
    slug: "8-min-auto",
    name: "8 Min Auto",
    url: "https://8minauto.com",
    industry: "automotriz",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de un taller de reparación y mantenimiento de vehículos en Estados Unidos.",
      en: "Website for an auto repair and maintenance shop in the US."
    }
  },
  {
    slug: "startbuildingcredit",
    name: "Start Building Credit",
    url: "https://startbuildingcredit.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio educativo y de servicios para construir historial crediticio.",
      en: "Educational and service site for building credit."
    }
  },
  {
    slug: "doctor-cash",
    name: "Doctor Cash",
    url: "https://doctor.cash",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de servicios financieros y préstamos.",
      en: "Financial services and loans website."
    }
  },
  {
    slug: "capital-worx",
    name: "Capital Worx Investments",
    url: "https://capitalworxinvestments.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio corporativo de una firma de inversiones.",
      en: "Corporate site for an investment firm."
    }
  },
  {
    slug: "florida-payment",
    name: "Florida Payment",
    url: "https://www.floridapayment.com",
    industry: "finanzas",
    stack: ["WordPress", "Elementor"],
    desc: {
      es: "Sitio de soluciones de pago y servicios financieros en Florida.",
      en: "Payment solutions and financial services site in Florida."
    }
  }
];
