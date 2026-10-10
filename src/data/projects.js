/**
 * Verified Academic & Technical Projects for Mimansha Bhatnagar
 * Strict No-Fabrication: Contains only verified projects provided by user.
 */
export const projects = [
  {
    id: "stock-market-analysis",
    number: "01",
    title: "Stock Market Analysis and Prediction",
    tagline: "Predictive financial modeling using machine learning and historical market trends.",
    description: "A project that analyzes historical stock market data and predicts potential stock price trends using data analysis and machine learning techniques.",
    longDescription: "Analyzed historical financial equities datasets to uncover market behavior and develop machine learning models capable of forecasting price movements. Focused on exploratory data analysis, feature engineering, and evaluating model accuracy to assist data-driven financial decision-making.",
    category: "AI & Data Science",
    featured: true,
    technologies: ["Python", "Machine Learning", "Pandas", "NumPy", "Matplotlib"],
    status: "Completed (Academic)",
    githubUrl: null, // Private / Local academic project
    liveDemoUrl: null,
    metrics: [
      { label: "Focus", value: "Time Series & Prediction" },
      { label: "Libraries", value: "NumPy, Pandas, Matplotlib" }
    ],
    highlights: [
      "Exploratory data analysis of historical price trends and market volatility",
      "Feature engineering and preprocessing to prepare clean time-series datasets",
      "Model training and performance visualization using Matplotlib charts"
    ]
  },
  {
    id: "hospital-management-system",
    number: "02",
    title: "Hospital Management System",
    tagline: "Relational healthcare administration and patient records database management.",
    description: "A system designed to manage hospital operations, including patient records, doctor details, appointments, and other essential hospital information.",
    longDescription: "Developed a comprehensive management platform engineered to streamline clinical administration. Implemented robust relational schemas for patient histories, doctor scheduling, and appointment booking with object-oriented design principles.",
    category: "Software Systems",
    featured: true,
    technologies: ["Java", "OOP", "MySQL", "Database Management"],
    status: "Open Source",
    githubUrl: "https://github.com/mimanshabhatnagar10/hospital-management-system.git",
    liveDemoUrl: null,
    metrics: [
      { label: "Architecture", value: "Object-Oriented (Java)" },
      { label: "Database", value: "Relational MySQL" }
    ],
    highlights: [
      "Modular database schema for patients, medical staff, and appointments",
      "Applied strict Object-Oriented Programming (OOP) paradigms in Java",
      "Secure record tracking and appointment management workflow"
    ]
  },
  {
    id: "phishing-attack-detector",
    number: "03",
    title: "Phishing Attack Detector",
    tagline: "Cybersecurity URL classifier detecting malicious websites using ML heuristics.",
    description: "A cybersecurity project designed to identify potentially malicious or phishing URLs and help users recognize suspicious websites.",
    longDescription: "Engineered an intelligent defense tool to counter web-based threats. Extracted lexical and structural features from suspicious URLs to classify fraudulent destinations and protect users from phishing campaigns.",
    category: "Cybersecurity & AI",
    featured: true,
    technologies: ["Python", "Machine Learning", "Cybersecurity", "Data Preprocessing"],
    status: "Open Source",
    githubUrl: "https://github.com/mimanshabhatnagar10/phishing-attack-detector.git",
    liveDemoUrl: null,
    metrics: [
      { label: "Domain", value: "Web Security & ML" },
      { label: "Technique", value: "Feature Extraction" }
    ],
    highlights: [
      "Lexical feature extraction from URLs to detect spoofing patterns",
      "Trained classification algorithms on verified security datasets",
      "Provides actionable verdicts on suspicious web destinations"
    ]
  },
  {
    id: "instruction-set-simulator",
    number: "04",
    title: "Instruction Set Simulator",
    tagline: "Interactive computer architecture simulator executing step-by-step CPU operations.",
    description: "A Computer Organization and Architecture project that simulates the execution of basic instructions such as addition and other operations, helping users understand how instructions are processed step by step.",
    longDescription: "Created an educational hardware architecture simulator that mimics the fetch-decode-execute cycle. Allows users to trace register states, arithmetic-logic unit (ALU) computations, and memory interactions in real time.",
    category: "Architecture & Systems",
    featured: true,
    technologies: ["Computer Architecture", "JavaScript", "Algorithms", "Systems"],
    status: "Open Source",
    githubUrl: "https://github.com/mimanshabhatnagar10/instruction-set-simulator.git",
    liveDemoUrl: null,
    metrics: [
      { label: "Subject", value: "Computer Organization (COA)" },
      { label: "Execution", value: "Fetch-Decode-Execute Cycle" }
    ],
    highlights: [
      "Simulates CPU register states, ALU arithmetic, and memory addressing",
      "Step-by-step interactive instruction tracer for educational demonstration",
      "Clear visual feedback of hardware architecture micro-operations"
    ]
  }
];

export const projectCategories = [
  "All",
  "AI & Data Science",
  "Software Systems",
  "Cybersecurity & AI",
  "Architecture & Systems"
];
