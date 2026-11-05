export type Role = { title: string; span: string; bullets: string[] };

export type Job = {
  id: string;
  company: string;
  legal?: string;
  place?: string;
  span: string;
  current?: boolean;
  roles: Role[];
  tags: string[];
};

export const profile = {
  name: "Nopezi Saputra Pratama",
  short: "Nopezi",
  tagline: "Software engineer — backend, front end, dan chatbot developer.",
  city: "Ragunan, Pasar Minggu, Jakarta Selatan",
  phone: "081943214722",
  phoneHref: "tel:+6281943214722",
  email: "snopezi@hotmail.com",
  linkedin: "https://www.linkedin.com/in/nopezi-saputra-pratama",
  site: "https://nopezi.github.io",
  since: 2019,
};

export const jobs: Job[] = [
  {
    id: "amansob",
    company: "Amansob",
    span: "Jan 2025 — kini",
    current: true,
    roles: [
      {
        title: "Fullstack Developer",
        span: "Jan 2025 — kini",
        bullets: [
          "Mengembangkan aplikasi web dari ujung ke ujung — front end, back end, dan integrasi API.",
          "Keahlian teratas saat ini: Liveperson Gen AI prompts.",
        ],
      },
    ],
    tags: ["fullstack", "liveperson", "genai prompts"],
  },
  {
    id: "wings",
    company: "Wings Group Indonesia",
    legal: "Sayap Mas Utama",
    place: "Jakarta Timur",
    span: "Des 2022 — Mar 2025 · 2 tahun 4 bulan",
    roles: [
      {
        title: "Back End Developer",
        span: "Jan 2023 — Mar 2025",
        bullets: ["Pengembangan dan pemeliharaan sistem back end untuk platform internal Wings Group."],
      },
      {
        title: "Fullstack Web Developer",
        span: "Des 2022 — Des 2023",
        bullets: ["Membangun aplikasi web end-to-end untuk kebutuhan internal perusahaan."],
      },
    ],
    tags: ["back end", "fullstack"],
  },
  {
    id: "bri",
    company: "PT Bank Rakyat Indonesia (Persero) Tbk",
    place: "Jakarta Selatan",
    span: "Nov 2021 — Nov 2022",
    roles: [
      {
        title: "Full Stack Web Developer",
        span: "Nov 2021 — Nov 2022",
        bullets: [
          "Mengembangkan beberapa aplikasi web core banking internal BRI di tim Corporate Core Platform.",
          "Maintenance dan debugging ketika aplikasi bermasalah.",
          "Merancang dan mengembangkan front end aplikasi web.",
        ],
      },
    ],
    tags: ["core banking", "front end"],
  },
  {
    id: "tokoweb",
    company: "TOKOWEB.CO",
    place: "Bandung",
    span: "Jan 2021 — Sep 2021",
    roles: [
      {
        title: "Fullstack Developer",
        span: "Jan 2021 — Sep 2021",
        bullets: [
          "Membangun web, backend REST API, dan struktur database dengan framework monolitik untuk perusahaan klien.",
        ],
      },
    ],
    tags: ["rest api", "database", "monolitik"],
  },
  {
    id: "morbis-bot",
    company: "Morbis",
    place: "Yogyakarta",
    span: "2020 — 2021",
    roles: [
      {
        title: "Chatbot Developer & Backend Developer",
        span: "2020 — 2021",
        bullets: [
          "Mengembangkan bot Telegram dan WhatsApp untuk janji temu rumah sakit.",
          "Riset & development notifikasi absen in/out office via Telegram.",
          "Mengembangkan chat blast WhatsApp untuk vaksinasi COVID-19 — Pemerintah Daerah Istimewa Yogyakarta.",
        ],
      },
    ],
    tags: ["telegram", "whatsapp", "chat blast", "absensi"],
  },
  {
    id: "morbis-api",
    company: "Morbis",
    place: "Yogyakarta",
    span: "2019 — 2020",
    roles: [
      {
        title: "Back End Developer",
        span: "2019 — 2020",
        bullets: [
          "Mengembangkan REST API untuk aplikasi mobile rumah sakit.",
          "Mengembangkan beberapa fitur menu di backoffice website dengan PHP dan JavaScript.",
          "Riset dan development migrasi data untuk dashboard menggunakan PHP dan Golang.",
        ],
      },
    ],
    tags: ["rest api", "php", "golang", "backoffice"],
  },
  {
    id: "sarihusada",
    company: "PT Sari Husada",
    place: "Yogyakarta",
    span: "Agu — Des 2019",
    roles: [
      {
        title: "Freelancer Web Developer",
        span: "Agu — Des 2019",
        bullets: ["Mengembangkan aplikasi web booking ruang meeting untuk perusahaan."],
      },
    ],
    tags: ["web app", "booking"],
  },
  {
    id: "botika",
    company: "Botika",
    place: "Yogyakarta",
    span: "Feb — Jul 2019",
    roles: [
      {
        title: "PHP Developer / Chatbot Developer",
        span: "Feb — Jul 2019",
        bullets: [
          "Mengembangkan chat bot WhatsApp, Telegram, Facebook, dan Web Chat untuk klien.",
        ],
      },
    ],
    tags: ["whatsapp", "telegram", "facebook", "web chat", "php"],
  },
];

export const education = {
  school: "STMIK El Rahma Yogyakarta",
  degree: "Sarjana Komputer (S.Kom) — Teknik Informatika",
  span: "2014 — 2018",
};

export const sectors = [
  "Perhotelan & penerbitan",
  "Perbankan inti",
  "Otomasi proses",
  "Properti",
  "E-commerce",
  "Kesehatan",
];

export type Skill = {
  name: string;
  kind: "Keahlian teratas" | "Pengalaman" | "Sertifikasi" | "Umum";
  evidence: string[];
  jobs?: string[];
  certs?: boolean;
};

export const skillGroups: { group: string; skills: Skill[] }[] = [
  {
    group: "Bahasa & front end",
    skills: [
      {
        name: "Java",
        kind: "Pengalaman",
        evidence: [
          "Pengalaman komprehensif dalam desain dan pengembangan aplikasi web Java.",
          "Tersertifikasi: Jago Academy — Java Programming Language.",
        ],
        certs: true,
      },
      {
        name: "JavaScript",
        kind: "Pengalaman",
        evidence: [
          "Stack utama sejak 2019 — web, back office, dan bot.",
          "BRI: merancang dan mengembangkan front end aplikasi web.",
          "Morbis: fitur backoffice website.",
        ],
        jobs: ["bri", "morbis-api"],
      },
      {
        name: "TypeScript",
        kind: "Umum",
        evidence: ["Disebutkan dalam stack web developer di ringkasan CV."],
      },
      {
        name: "PHP",
        kind: "Pengalaman",
        evidence: [
          "Botika: chat bot WhatsApp, Telegram, Facebook, Web Chat.",
          "Morbis: backoffice website dan riset migrasi dashboard.",
          "Sari Husada: aplikasi booking ruang meeting.",
        ],
        jobs: ["botika", "morbis-api", "sarihusada"],
      },
      {
        name: "Golang",
        kind: "Pengalaman",
        evidence: ["Morbis: riset migrasi data dashboard (PHP & Golang)."],
        jobs: ["morbis-api"],
      },
      {
        name: "HTML",
        kind: "Pengalaman",
        evidence: ["Bagian dari stack web developer; front end di BRI."],
        jobs: ["bri"],
      },
      {
        name: "jQuery",
        kind: "Umum",
        evidence: ["Disebutkan dalam stack web developer di ringkasan CV."],
      },
    ],
  },
  {
    group: "Backend & API",
    skills: [
      {
        name: "Node.js",
        kind: "Umum",
        evidence: ["Ringkasan CV: framework Node.js — Express atau NestJS."],
      },
      {
        name: "Express.js",
        kind: "Sertifikasi",
        evidence: ["Tersertifikasi: Kelas Belajar RESTful dengan Express.js."],
        certs: true,
      },
      {
        name: "NestJS",
        kind: "Umum",
        evidence: ["Ringkasan CV: framework Node.js NestJS."],
      },
      {
        name: "RESTful API",
        kind: "Pengalaman",
        evidence: [
          "Morbis: REST API untuk aplikasi mobile rumah sakit.",
          "TOKOWEB.CO: backend REST API untuk klien.",
          "Tersertifikasi: RESTful dengan Express.js.",
        ],
        jobs: ["morbis-api", "tokoweb"],
        certs: true,
      },
      {
        name: "Perancangan database",
        kind: "Pengalaman",
        evidence: ["TOKOWEB.CO: menyusun struktur database aplikasi monolitik."],
        jobs: ["tokoweb"],
      },
      {
        name: "Arsitektur monolitik",
        kind: "Pengalaman",
        evidence: ["TOKOWEB.CO: membangun web + API + database dalam framework monolitik."],
        jobs: ["tokoweb"],
      },
      {
        name: "Migrasi data",
        kind: "Pengalaman",
        evidence: ["Morbis: riset migrasi data untuk dashboard."],
        jobs: ["morbis-api"],
      },
    ],
  },
  {
    group: "Chatbot & messaging",
    skills: [
      {
        name: "Telegram Bot API",
        kind: "Pengalaman",
        evidence: [
          "Morbis: bot janji temu rumah sakit dan notifikasi absen in/out.",
          "Botika: chat bot Telegram untuk klien.",
        ],
        jobs: ["morbis-bot", "botika"],
      },
      {
        name: "WhatsApp API",
        kind: "Pengalaman",
        evidence: [
          "Morbis: bot janji temu dan chat blast vaksinasi COVID-19 Pemda DIY.",
          "Botika: chat bot WhatsApp untuk klien.",
        ],
        jobs: ["morbis-bot", "botika"],
      },
      {
        name: "Facebook Messenger",
        kind: "Pengalaman",
        evidence: ["Botika: chat bot Facebook untuk klien."],
        jobs: ["botika"],
      },
      {
        name: "Web Chat",
        kind: "Pengalaman",
        evidence: ["Botika: chat bot Web Chat untuk klien."],
        jobs: ["botika"],
      },
      {
        name: "Liveperson Gen AI prompts",
        kind: "Keahlian teratas",
        evidence: [
          "Tercantum sebagai keahlian teratas di CV.",
          "Dijalankan di peran saat ini: Fullstack Developer, Amansob.",
        ],
        jobs: ["amansob"],
      },
    ],
  },
  {
    group: "Data & cloud",
    skills: [
      {
        name: "MongoDB",
        kind: "Sertifikasi",
        evidence: ["Tersertifikasi: Kelas Belajar MongoDB."],
        certs: true,
      },
      {
        name: "Alibaba Cloud",
        kind: "Sertifikasi",
        evidence: ["Tersertifikasi: Alibaba Cloud Certified Developers — Level 1."],
        certs: true,
      },
    ],
  },
  {
    group: "Domain",
    skills: [
      {
        name: "Core banking",
        kind: "Pengalaman",
        evidence: ["BRI: aplikasi web core banking internal, tim Corporate Core Platform."],
        jobs: ["bri"],
      },
      {
        name: "Otomasi proses",
        kind: "Umum",
        evidence: ["Ringkasan CV: process automation."],
      },
      {
        name: "Chat blast & notifikasi",
        kind: "Pengalaman",
        evidence: [
          "Morbis: blast vaksinasi COVID-19 Pemda DIY dan notifikasi absensi Telegram.",
        ],
        jobs: ["morbis-bot"],
      },
    ],
  },
];

export const certs = [
  { name: "Java Programming Language", issuer: "Jago Academy" },
  { name: "Certified Developers — Level 1", issuer: "Alibaba Cloud" },
  { name: "ElevAIte (Micro Skill)", issuer: "ElevAIte" },
  { name: "RESTful dengan Express.js", issuer: "Kelas Belajar" },
  { name: "MongoDB", issuer: "Kelas Belajar" },
];

export const tickerItems = [
  "java",
  "typescript",
  "javascript",
  "node.js",
  "express.js",
  "nestjs",
  "php",
  "golang",
  "restful api",
  "mongodb",
  "jquery",
  "html",
  "telegram bot",
  "whatsapp api",
  "facebook messenger",
  "web chat",
  "liveperson",
  "genai prompts",
  "alibaba cloud",
  "core banking",
  "chatbot",
  "otomasi proses",
];

export const summary =
  "Saya Nopezi — insinyur perangkat lunak yang senang belajar dan mengeksplorasi teknologi baru, lalu menerapkannya ke kasus nyata. Lebih dari 6 tahun pengalaman mengembangkan dan mengelola berbagai solusi software untuk industri perhotelan/penerbitan, perbankan online, otomasi proses, properti, dan e-commerce. Pengalaman komprehensif dalam desain dan pengembangan web Java, plus web developer dengan JavaScript, TypeScript (Node.js — Express atau NestJS), jQuery, HTML, RESTful API, dan PHP.";

export const navItems = [
  { id: "terminal", num: "00", label: "terminal" },
  { id: "profil", num: "01", label: "profil" },
  { id: "pengalaman", num: "02", label: "pengalaman" },
  { id: "keahlian", num: "03", label: "keahlian" },
  { id: "sertifikasi", num: "04", label: "sertifikasi" },
  { id: "bot", num: "05", label: "coba bot" },
  { id: "kontak", num: "06", label: "kontak" },
];
