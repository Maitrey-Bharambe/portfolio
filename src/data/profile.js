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
    title: "System Design",
    text: "Agentic systems and multi-agent workflows, designed end to end.",
  },
  {
    n: "04",
    title: "Software",
    text: "Backend services, APIs, and interactive applications.",
  },
];

// Working principles, shown as a knowledge graph. `icon` is mapped to a Lucide icon in
// PrinciplesGraph; the order is also the order of the iterative loop.
export const principles = [
  {
    n: "01",
    id: "understand",
    icon: "database",
    title: "Understand the data",
    text: "Understand what the data actually represents before trusting its output.",
    points: ["Explore and clean data.", "Find patterns and relationships.", "Identify bias, gaps, and limitations."],
  },
  {
    n: "02",
    id: "knowledge",
    icon: "network",
    title: "Build the knowledge graph",
    text: "Connect information into meaningful, structured domain knowledge.",
    points: ["Link entities and concepts.", "Encode domain logic.", "Capture relationships and context."],
  },
  {
    n: "03",
    id: "apply",
    icon: "brain",
    title: "Apply AI / ML",
    text: "Choose the right intelligence for the problem instead of using a model just because it is fashionable.",
    points: [
      "Select suitable models and methods.",
      "Apply ML, LLMs, and AI agents where useful.",
      "Solve real-world problems.",
    ],
  },
  {
    n: "04",
    id: "evaluate",
    icon: "gear",
    title: "Evaluate & improve",
    text: "Treat model outputs as hypotheses that must be tested and improved.",
    points: ["Measure performance.", "Validate against real data.", "Iterate, optimize, and monitor."],
  },
  {
    n: "05",
    id: "deliver",
    icon: "chart",
    title: "Deliver impact",
    text: "Turn analytical results into useful products and measurable outcomes.",
    points: ["Build usable tools and interfaces.", "Create insights and automations.", "Focus on meaningful business value."],
  },
  {
    n: "06",
    id: "engineer",
    icon: "code",
    title: "Engineer & deploy",
    text: "Build reliable, maintainable systems that work beyond a local experiment.",
    points: [
      "Create reproducible pipelines.",
      "Use appropriate tools and cloud infrastructure.",
      "Monitor, maintain, and scale.",
    ],
  },
  {
    n: "07",
    id: "evolve",
    icon: "bulb",
    title: "Learn & evolve",
    text: "Stay curious, challenge assumptions, and improve continuously.",
    points: ["Explore emerging research.", "Learn new technologies.", "Refine approaches through feedback."],
  },
];
