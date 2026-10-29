// Each entry renders as one ledger row, newest first. Null / empty fields are hidden.
// `ongoing: true` adds an "Ongoing" sticker. `logo` ({ src, alt, width, height }) shows a company logo (else `mark` initials); `certificate` ({ src, alt, width, height }) adds a "View certificate" button.

export const experience = [
  {
    id: "csre-iitb",
    logo: { src: "/logos/csre.webp", alt: "CSRE, IIT Bombay logo", width: 642, height: 311 },
    role: "Data Scientist",
    organization: "CSRE Department, IIT Bombay / Raxar Technologies",
    dates: "1 Oct 2026 – Present",
    ongoing: true,
    points: ["Project: Hanging Glacier Dynamics Monitoring."], // TODO: add verified responsibilities
    tags: ["Copernicus Sentinel-1", "DEM data", "Swin Transformer", "Vision Transformers", "Hanging glacier dynamics"],
  },
  {
    id: "csi-vit",
    logo: { src: "/logos/csi-vit.webp", alt: "CSI VIT logo", width: 800, height: 248, dark: true },
    role: "Technical General Manager",
    organization: "Computer Society of India, VIT",
    dates: "Jul 2026 – Present",
    ongoing: true,
    points: [
      "Technical projects and coding competitions.",
      "Mentoring junior members on backend and version-control practices.",
    ],
    tags: ["Mentoring", "Backend", "Git"],
  },
  {
    id: "tata-power",
    role: "AI Intern",
    organization: "The Tata Power Company Ltd., Data Analytics team",
    dates: "1 Jun 2026 – 15 Jul 2026",
    logo: { src: "/logos/tata-power.webp", alt: "Tata Power logo", width: 296, height: 260 },
    certificate: {
      src: "/certificates/tata-power.webp",
      alt: "Internship certificate from The Tata Power Company Ltd. for Maitrey Bharambe, 1 June 2026 to 15 July 2026, Data Analytics team.",
      width: 1224,
      height: 1584,
    },
    points: [
      "Built an AI-powered Market Intelligence Bot using Generative AI.",
      "ETL pipelines for DAM, RTM, temperature, and historical market data, with cleaning and processing.",
      "RAG: Sentence Transformers embeddings in ChromaDB with hybrid semantic retrieval, plus chunking, caching, and retrieval optimization.",
      "Exploratory data analysis on power market and Digital Twin datasets.",
      "Streamlit application as the analytical interface.",
    ],
    tags: ["Generative AI", "RAG", "ETL", "ChromaDB", "Sentence Transformers", "EDA", "Streamlit"],
    pipeline: {
      label: "DAM & RTM market intelligence pipeline",
      steps: [
        "Data sources",
        "ETL and cleaning",
        "Chunking and embeddings",
        "Hybrid retrieval",
        "Contextual answers",
        "Market intelligence UI",
      ],
    },
  },
  {
    id: "fundora",
    role: "Software Development Engineer Intern",
    organization: "Fundora",
    dates: "24 Feb 2026 – 24 May 2026",
    logo: { src: "/logos/fundora.webp", alt: "Fundora logo", width: 546, height: 134 },
    certificate: {
      src: "/certificates/fundora.webp",
      alt: "Internship certificate from Fundora for Maitrey Bharambe, Software Development Engineer Intern, 24 February 2026 to 24 May 2026.",
      width: 1224,
      height: 1584,
    },
    points: [
      "Developed, tested, and enhanced software solutions and platform features.",
      "Backend services and API development.",
      "CI/CD pipelines and Docker-based deployments.",
      "Debugging, performance optimization, code reviews, and technical discussions.",
    ],
    tags: ["Backend", "APIs", "CI/CD", "Docker", "Code review"],
  },
  {
    id: "gssoc",
    mark: "GSSoC", // shown until a logo file is added as `logo`
    role: "Open Source Contributor",
    organization: "GirlScript Summer of Code",
    dates: "Jul 2025 – Sep 2025",
    points: ["Open-source contributions: bug fixes, issue tracking, and code reviews in Git-based workflows."],
    tags: ["Open source", "Git", "Code review"],
  },
];
