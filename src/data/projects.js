/*
 * Project entries. The page renders this array in order; nothing else needs
 * to change when you add one.
 *
 * Fields (all optional except id, name, category, projectType):
 *   projectType   "pipeline" | "classifier" | "vision" | "devtool" | "rl" | "software" | "pending"
 *   featured      true -> full-width feature layout (use for one project)
 *   wide          true -> full-width card inside the grid
 *   shortDescription, problem, contribution   strings
 *   implementation  array of strings (documented work only)
 *   technologies  array of strings
 *   achievement   string, e.g. "Runner-up"
 *   results       array of strings, ONLY verified outcomes
 *   diagram       { label, kind: "chain" | "set", steps: [] }
 *   architecture  same shape as image plus optional caption (default "Architecture")
 *   image         { src: "/images/projects/x.png", alt: "...", width, height }
 *   githubUrl, liveUrl   strings or null (buttons are hidden when null)
 *   pendingNote   string shown on projectType "pending"
 */

export const projects = [
  {
    id: "nexlink",
    code: "PRJ-01",
    name: "NexLink",
    category: "Private Networking / Network Diagnostics / AI-Assisted Ops",
    projectType: "software",
    featured: true,
    shortDescription:
      "An AI-assisted private networking, network diagnostics and remote administration platform. Operators create a private network, add computers with a short code, and see, per device and per peer pair, whether WireGuard has actually completed a handshake.",
    problem:
      "Connectivity tools often infer health from the layer above. NexLink only reports what it can prove, and shows missing data as unknown rather than healthy.",
    implementation: [
      "One Next.js app on one port: console, REST API, Socket.IO live updates and an encrypted relay for devices that cannot reach each other directly.",
      "A Go networking agent running userspace WireGuard, trying direct UDP first and falling back to the relay.",
      "Device-code enrollment with Ed25519 proof of possession and operator approval; private keys never leave the device.",
      "A four-layer health model: registered, configured, tunnel up (fresh handshake), reachable.",
      "Incident detection and a diagnostic loop; Groq-based briefings must cite recorded evidence, and any proposed action passes a policy engine and human approval.",
    ],
    technologies: ["Next.js", "React", "Go", "WireGuard", "Socket.IO", "MongoDB", "Groq", "Tailwind CSS"],
    results: [
      "128 / 128 automated tests passing: web app 85, Go agent 28, diagnostic service 15 (24 Oct 2026).",
      "Real WireGuard tunnel verified between two agents on one PC, over both the direct path and the encrypted relay; handshake within 1 s, tunnel RTT 0.35-0.48 ms on the direct path.",
      "Two-PC and cross-network tests are still pending.",
    ],
    image: {
      src: "/images/projects/nexlink-landing.png",
      alt: "NexLink landing page: dark interface with a lime accent and a console illustration showing a tunnel readout.",
      width: 1440,
      height: 900,
    },
    architecture: {
      src: "/images/projects/nexlink-architecture.webp",
      alt: "NexLink architecture diagram: users, web console, backend services, MongoDB database, devices with direct UDP and encrypted relay paths, AI-powered operations, and the technology stack.",
      width: 1536,
      height: 1024,
    },
    githubUrl: "https://github.com/Maitrey-Bharambe/nexlinkk",
    liveUrl: "https://nexlink-maitrey.azurewebsites.net/welcome",
  },
  {
    id: "factorymind-ai",
    code: "PRJ-02",
    name: "FactoryMind AI",
    category: "Agentic Digital Twin / Predictive Maintenance / Multi-Agent Systems",
    projectType: "software",
    wide: true,
    shortDescription:
      "An agentic digital twin of a small smart factory. Two trained ML models predict machine failures, and a team of AI agents works out what a failure will do to the whole line and reorganizes production around it while the machine is repaired.",
    problem:
      "A breakdown in one machine starves or blocks every cell around it, and most predictive-maintenance demos stop at \"this machine will fail\" without saying how to keep producing.",
    implementation: [
      "Discrete-event simulation of a seven-cell production line, with a machine-specific failure mode, failing parameter and thresholds for every cell.",
      "LightGBM failure-probability model chained into a Random Forest status model, served from a FastAPI service.",
      "Supervisor agent merging Maintenance, Production, Material, Safety and Workforce agents into one 8-step recovery plan.",
      "Factory-level impact analysis: downstream starvation and upstream blocking times, and expected production loss with and without recovery.",
      "Autonomy levels enforced in code (SAFE, APPROVAL_REQUIRED, HUMAN_REQUIRED) and role-based views for operator, supervisor and admin.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Python", "FastAPI", "LightGBM", "scikit-learn", "Groq"],
    results: [
      "ML failure model: 97.4% accuracy on the hold-out set (AI4I dataset).",
      "Live A/B in the simulation: with autonomy off the line output fell to 0% of normal; with autonomy on it held at 61-67% of normal (two runs) with no downstream starvation.",
    ],
    image: {
      src: "/images/projects/factorymind-command-center.png",
      alt: "FactoryMind AI Command Center showing a failing CNC-07 lathe, the factory-impact analysis, an 8-step recovery plan and a supervisor approval card.",
      width: 800,
      height: 500,
    },
    architecture: {
      caption: "Live simulation",
      src: "/images/projects/factorymind-simulation.webp",
      alt: "FactoryMind AI live factory-floor simulation showing seven production cells, AGV routes, workpieces, a live event feed and production-flow KPIs.",
      width: 2000,
      height: 1053,
    },
    githubUrl: "https://github.com/SohamG2696/FactoryMind_AI",
    liveUrl: null,
  },
  {
    id: "tcs-agentic-hackathon",
    code: "PRJ-03",
    name: "TCS Agentic Hackathon",
    category: "Applied AI / Security / RAG",
    projectType: "classifier",
    shortDescription:
      "A Random Forest phishing classifier combined with a RAG pipeline to analyze flagged student messages.",
    problem: "Moderators need more than a score: they need to know why a message was flagged and what to do next.",
    implementation: [
      "Phishing risk scoring with a Random Forest classifier.",
      "Context retrieval through a RAG pipeline.",
      "Analysis of flagged student messages.",
      "Explainable recommendations for moderators.",
    ],
    technologies: ["Python", "Scikit-learn", "Random Forest", "RAG"],
    logo: { src: "/logos/tcs.webp", alt: "Tata Consultancy Services logo", width: 612, height: 192 },
    achievement: "Runner-up",
    achievementProof: {
      src: "/certificates/tcs-tech-day.webp",
      alt: "TCS Tech Day 2026 certificate of appreciation presented to Maitrey Bharambe as runner-up, with the Runners-up trophy.",
      width: 1080,
      height: 1102,
    },
    results: null,
    diagram: {
      label: "Message-to-action flow",
      kind: "chain",
      steps: ["Message", "Classifier", "Context retrieval", "Recommended action"],
    },
    image: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: "tomato-leaf-disease",
    code: "PRJ-04",
    name: "Tomato Leaf Disease Prediction",
    category: "Computer Vision / Deep Learning / Explainable AI",
    projectType: "vision",
    shortDescription:
      "An ensemble of EfficientNetB0 and ResNet50 trained on the Tomato Leaf Disease Dataset, with LIME to explain individual predictions.",
    problem:
      "A classifier that cannot show what it looked at is hard to trust, so each prediction is paired with an explanation.",
    implementation: [
      "Image preprocessing and data augmentation.",
      "Transfer learning with EfficientNetB0 and ResNet50.",
      "Ensemble prediction.",
      "Evaluation with accuracy, precision, recall, and F1-score.",
      "LIME explanations linking predictions to image regions.",
    ],
    technologies: ["TensorFlow/Keras", "EfficientNetB0", "ResNet50", "LIME", "Python"],
    achievement: null,
    results: null,
    diagram: {
      label: "Prediction and interpretability",
      kind: "chain",
      steps: ["Leaf image", "Preprocessing + augmentation", "EfficientNetB0 + ResNet50", "Ensemble prediction", "LIME explanation"],
    },
    image: null,
    githubUrl: "https://github.com/Maitrey-Bharambe/tomato",
    liveUrl: null,
  },
  {
    id: "codexai",
    code: "PRJ-05",
    name: "CodexAI",
    category: "RAG / Developer Tools / Vector Search",
    projectType: "devtool",
    shortDescription:
      "A developer tool for repository-level code understanding: ask natural-language questions about a codebase.",
    problem: "Understanding an unfamiliar repository means tracing components and code flow by hand.",
    implementation: [
      "Embeddings and vector search over repository code.",
      "MongoDB Vector Search as the retrieval layer.",
      "Component explanations.",
      "Code-flow and architectural insights.",
    ],
    technologies: ["RAG", "Embeddings", "MongoDB Vector Search"],
    achievement: null,
    results: null,
    diagram: {
      label: "Architecture sketch",
      kind: "chain",
      steps: ["Repository", "Embeddings", "MongoDB Vector Search", "Explanations"],
    },
    image: null,
    githubUrl: "https://github.com/Maitrey-Bharambe/CodeArchitect",
    liveUrl: null,
  },
  {
    id: "f1-ql-racing-agent",
    code: "PRJ-06",
    name: "F1-QL Racing Agent",
    category: "Reinforcement Learning / Simulation",
    projectType: "rl",
    shortDescription:
      "A Q-learning agent for a racing simulation, shaped by custom reward functions. The work also included a workshop based on the results.",
    problem: "Teaching an agent to drive well takes a reward design that balances several goals at once.",
    implementation: [
      "Q-learning agent.",
      "Custom reward functions covering track adherence, speed control, and lap efficiency.",
      "A workshop built around the results.",
    ],
    technologies: ["Python", "Q-learning", "Reinforcement learning"],
    achievement: null,
    results: null,
    diagram: {
      label: "Reward terms",
      kind: "set",
      steps: ["Track adherence", "Speed control", "Lap efficiency"],
    },
    image: null,
    githubUrl: "https://github.com/Maitrey-Bharambe/F1_QL",
    liveUrl: null,
  },
];
