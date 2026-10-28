// Each entry renders as one ledger row. Null fields are simply hidden.
// `highlight: true` paints the row yellow.

export const experience = [
  {
    id: "csre-iitb",
    role: "Data Scientist",
    organization: "CSRE Department, IIT Bombay / Raxar Technologies",
    dates: "October 2026 – Present", // started 1 October 2026
    points: ["Project: Hanging Glacier Dynamics Monitoring."], // TODO: add verified responsibilities
    tags: ["Copernicus Sentinel-1", "DEM data", "Swin Transformer", "Vision Transformers", "Hanging glacier dynamics"],
    highlight: true,
  },
  {
    id: "tata-power",
    role: "AI Intern",
    organization: "Tata Power",
    dates: "June 2026 – July 2026",
    points: [
      "ETL pipelines for electricity market (DAM, RTM), temperature, and historical market data, with cleaning and processing.",
      "RAG-based market intelligence: Sentence Transformers embeddings in ChromaDB with hybrid semantic retrieval.",
      "Chunking, caching, and retrieval optimization.",
      "Streamlit application as the analytical interface.",
    ],
    tags: ["ETL", "RAG", "ChromaDB", "Sentence Transformers", "Streamlit"],
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
    highlight: true,
  },
  {
    id: "fundora",
    role: "Software Development Engineer Intern",
    organization: "Fundora",
    dates: "January 2026 – April 2026",
    points: ["Backend services and API development.", "CI/CD pipelines and Docker-based deployments."],
    tags: ["Backend", "APIs", "CI/CD", "Docker"],
    highlight: false,
  },
  {
    id: "csi-vit",
    role: "Technical General Manager",
    organization: "Computer Society of India, VIT",
    dates: "July 2026 – Present",
    points: [
      "Technical projects and coding competitions.",
      "Mentoring junior members on backend and version-control practices.",
    ],
    tags: ["Mentoring", "Backend", "Git"],
    highlight: false,
  },
  {
    id: "gssoc",
    role: "Open Source Contributor",
    organization: "GirlScript Summer of Code",
    dates: "July 2025 – September 2025",
    points: ["Open-source contributions: bug fixes, issue tracking, and code reviews in Git-based workflows."],
    tags: ["Open source", "Git", "Code review"],
    highlight: false,
  },
];
