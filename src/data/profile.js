// Single source of truth for identity, navigation and contact details.
// Set a URL to a string to show the link; leave it null to hide it.

export const profile = {
  name: "Maitrey Bharambe",
  brand: "MB/",
  title: "Data Scientist × AI Engineer × Creative Developer",
  location: "Mumbai, India",
  tagline: "Data Science & AI Engineering",
  email: "maitrey.bharambe24@gmail.com",
  github: "https://github.com/Maitrey-Bharambe",
  linkedin: "https://www.linkedin.com/in/maitrey-bharambe-677088331",
  // Optional label in the navigation bar, e.g. "Open to research collaborations".
  // Left null on purpose: availability is not assumed.
  availability: null,
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lines: ["Building", "Intelligence.", "Beyond", "The model."],
  meta: "Mumbai, India / Data Science & AI Engineering",
  intro:
    "I'm Maitrey, a data scientist and AI engineer working across machine learning, data systems, and creative software. I turn messy data and complex models into systems people can actually use.",
  interests: ["Data Science", "Machine Learning", "AI Systems", "Software"],
};

// Titles that loop along the full-width band under the hero.
export const loopTitles = ["Data Scientist", "AI Engineer", "Technical General Manager", "Creative Developer"];

export const identity = [
  {
    n: "01",
    title: "Data Science",
    text: "Exploratory analysis, statistical reasoning, and data-driven insights.",
  },
  {
    n: "02",
    title: "AI Engineering",
    text: "RAG pipelines, retrieval systems, and applied machine learning.",
  },
  {
    n: "03",
    title: "Data Systems",
    text: "ETL pipelines, data processing, and information retrieval.",
  },
  {
    n: "04",
    title: "Software",
    text: "Backend services, APIs, and interactive applications.",
  },
];

export const philosophy = [
  {
    n: "01",
    title: "Understand the data",
    text: "Understand data quality, structure, and limitations before trusting the output.",
  },
  {
    n: "02",
    title: "Build the pipeline",
    text: "Reliable models depend on sound data processing and engineering.",
  },
  {
    n: "03",
    title: "Question the output",
    text: "Evaluate models critically and understand their limitations.",
  },
  {
    n: "04",
    title: "Make it usable",
    text: "Turn analytical results into tools, visualizations, and understandable interfaces.",
  },
];
