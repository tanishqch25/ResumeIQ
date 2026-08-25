/**
 * ResumeIQ Mock Data Layer
 *
 * This module is the single source of truth for all sample analysis data.
 * To wire in a real API later, replace the exported functions below with
 * network calls that return data in the same shape — no component changes needed.
 *
 * Shape defined per Section 24 of the build spec.
 */

// ─── Primary Analysis (Strong Resume — 82/100) ───────────────────────────────

export const primaryAnalysis = {
  id: "analysis-001",
  fileName: "john_doe_resume.pdf",
  analyzedAt: "2026-08-10",
  overallScore: 82,
  overallLabel: "Strong Resume",

  breakdown: {
    atsCompatibility: { score: 88, label: "Strong",            description: "Your resume parses well in most ATS systems." },
    contentQuality:   { score: 79, label: "Needs Improvement", description: "Bullet points lack measurable outcomes in places." },
    formatting:       { score: 91, label: "Excellent",         description: "Clean, consistent structure throughout." },
    skills:           { score: 84, label: "Strong",            description: "Core skills are well-represented and relevant." },
    experience:       { score: 80, label: "Strong",            description: "Work history is clear but could use stronger impact language." },
    keywords:         { score: 76, label: "Needs Improvement", description: "Several high-frequency industry keywords are missing." },
  },

  sections: [
    {
      name: "Contact Information",
      status: "Good",
      icon: "contact",
      suggestions: [
        "Email address is professional and clearly formatted.",
        "LinkedIn profile URL is included — ensure it's up to date.",
        "Consider adding a GitHub link if you have relevant open-source work.",
      ],
    },
    {
      name: "Professional Summary",
      status: "Needs Improvement",
      icon: "summary",
      suggestions: [
        "Current summary is generic — it could apply to any candidate.",
        "Add a specific career goal or value proposition tied to your target role.",
        "Mention your most impressive achievement in the first sentence.",
      ],
    },
    {
      name: "Experience",
      status: "Good",
      icon: "experience",
      suggestions: [
        "Most bullets use action verbs — good foundation.",
        "3 of 8 bullets lack quantifiable outcomes; add metrics where possible (e.g., 'reduced load time by 40%').",
        "Earliest role descriptions are too brief — expand to 2–3 bullets minimum.",
      ],
    },
    {
      name: "Education",
      status: "Good",
      icon: "education",
      suggestions: [
        "Degree and institution are clearly listed.",
        "GPA is not shown — include it if above 3.5.",
        "Relevant coursework or academic projects could strengthen this section for early-career roles.",
      ],
    },
    {
      name: "Skills",
      status: "Needs Improvement",
      icon: "skills",
      suggestions: [
        "Skills are listed but not grouped — consider organizing into categories (Languages, Frameworks, Tools).",
        "Remove outdated tools (e.g., Adobe Flash) that signal stale experience.",
        "Add cloud platform experience (AWS, GCP, or Azure) if applicable.",
      ],
    },
    {
      name: "Projects",
      status: "Good",
      icon: "projects",
      suggestions: [
        "Project descriptions are clear and include tech stack — good practice.",
        "Add impact metrics where possible (e.g., user count, performance improvement).",
        "Link to live demos or GitHub repos to make projects verifiable.",
      ],
    },
  ],

  ats: {
    score: 88,
    matchedKeywords: [
      "React", "JavaScript", "TypeScript", "Node.js", "REST API",
      "Git", "Agile", "CI/CD", "PostgreSQL", "Docker",
    ],
    missingKeywords: [
      "GraphQL", "Kubernetes", "AWS", "System Design", "Technical Leadership",
      "Performance Optimization", "Microservices",
    ],
    formattingIssues: [
      { severity: "warning", message: "One table detected in the Skills section — tables may not parse correctly in all ATS systems. Use plain text lists instead." },
      { severity: "info",    message: "Headers and footers are used. Some ATS systems skip header/footer content — move critical contact info to the body." },
      { severity: "info",    message: "Font size is 10pt in two sections — ATS parsers may truncate text below 11pt." },
    ],
    sectionRecognition: [
      { name: "Contact Information", recognized: true },
      { name: "Professional Summary", recognized: true },
      { name: "Work Experience", recognized: true },
      { name: "Education", recognized: true },
      { name: "Skills", recognized: true },
      { name: "Projects", recognized: true },
      { name: "Certifications", recognized: false },
    ],
  },

  recommendations: {
    high: [
      {
        id: "rec-h1",
        problem: "Professional summary is generic and unfocused.",
        whyItMatters: "Recruiters read the summary first. A vague summary signals lack of direction and gets your resume skipped.",
        whatToDo: "Rewrite your summary in 2–3 sentences: your title, your strongest skill or achievement, and the type of role you are targeting.",
      },
      {
        id: "rec-h2",
        problem: "Missing high-frequency keywords for software engineering roles.",
        whyItMatters: "ATS systems filter on keyword matches before a human ever reads the resume. Missing keywords get you filtered out automatically.",
        whatToDo: "Add GraphQL, Kubernetes, and AWS to your Skills section and weave them naturally into Experience bullets where accurate.",
      },
      {
        id: "rec-h3",
        problem: "Three experience bullets lack measurable outcomes.",
        whyItMatters: "Concrete numbers demonstrate impact and make your resume more credible and memorable.",
        whatToDo: "Replace vague bullets ('Worked on improving the dashboard') with metric-backed ones ('Reduced dashboard load time by 38% by optimizing React rendering pipeline').",
      },
    ],
    medium: [
      {
        id: "rec-m1",
        problem: "Skills section is an unsorted flat list.",
        whyItMatters: "A grouped, scannable skills section makes it easier for both humans and ATS to categorize your expertise quickly.",
        whatToDo: "Organize skills into labeled groups: Languages, Frameworks, Tools & Platforms, and Methodologies.",
      },
      {
        id: "rec-m2",
        problem: "Table used in Skills section reduces ATS compatibility.",
        whyItMatters: "Many ATS parsers cannot read tables and will either skip the content or mangle it.",
        whatToDo: "Replace the table with a plain comma-separated or pipe-delimited text list.",
      },
      {
        id: "rec-m3",
        problem: "Project descriptions lack impact metrics.",
        whyItMatters: "Projects are most compelling when readers understand their scale and effect.",
        whatToDo: "Add context like user count, performance gains, or production usage to each project description.",
      },
    ],
    optional: [
      {
        id: "rec-o1",
        problem: "GitHub link is not included.",
        whyItMatters: "For engineering roles, a GitHub profile provides verifiable evidence of technical skill.",
        whatToDo: "Add a GitHub URL to your contact information section if your profile has public repositories.",
      },
      {
        id: "rec-o2",
        problem: "GPA is not shown.",
        whyItMatters: "For candidates with a GPA above 3.5 applying to competitive roles, including it is a positive signal.",
        whatToDo: "If your GPA is 3.5 or higher, add it next to your degree. If it's lower, omit it — that is perfectly standard.",
      },
      {
        id: "rec-o3",
        problem: "Certifications section is not present.",
        whyItMatters: "Relevant certifications (e.g., AWS Certified Developer) strengthen credibility and improve ATS keyword matching.",
        whatToDo: "Add a Certifications section if you have any relevant credentials. One genuine certification is worth more than a padded list.",
      },
    ],
  },

  improvements: [
    {
      id: "imp-1",
      section: "Professional Summary",
      original: "Experienced software developer with a passion for coding and building things.",
      improved:  "Full-stack software engineer with 4 years of experience building scalable React and Node.js applications. Focused on performance, clean architecture, and delivering measurable business outcomes.",
    },
    {
      id: "imp-2",
      section: "Experience — Bullet 1",
      original: "Worked on improving the dashboard and made it faster.",
      improved:  "Reduced dashboard load time by 38% by refactoring the React component tree, eliminating unnecessary re-renders, and introducing virtualized lists for large data sets.",
    },
    {
      id: "imp-3",
      section: "Experience — Bullet 2",
      original: "Helped with the backend API and wrote some tests.",
      improved:  "Designed and implemented 12 REST API endpoints using Node.js and Express, and wrote a comprehensive test suite (Jest) achieving 87% code coverage.",
    },
    {
      id: "imp-4",
      section: "Experience — Bullet 3",
      original: "Worked on a website for a client.",
      improved:  "Developed a responsive marketing website for a retail client using Next.js and Tailwind CSS, resulting in a 22% increase in organic search traffic within 60 days of launch.",
    },
    {
      id: "imp-5",
      section: "Skills",
      original: "JavaScript, React, Node, Postgres, Git, Docker, some AWS, testing",
      improved:  "Languages: JavaScript (ES2022+), TypeScript, SQL\nFrameworks: React 18, Next.js, Node.js, Express\nTools & Platforms: Docker, Git, GitHub Actions, PostgreSQL, AWS (EC2, S3, RDS)\nMethodologies: Agile, CI/CD, Test-Driven Development",
    },
  ],
};

// ─── Secondary Analysis (Weaker Resume — 54/100) ─────────────────────────────

export const secondaryAnalysis = {
  id: "analysis-002",
  fileName: "jane_smith_resume.pdf",
  analyzedAt: "2026-07-28",
  overallScore: 54,
  overallLabel: "Needs Work",

  breakdown: {
    atsCompatibility: { score: 51, label: "Weak",             description: "Multiple formatting issues significantly reduce ATS readability." },
    contentQuality:   { score: 49, label: "Weak",             description: "Bullets are vague and lack action verbs or measurable results." },
    formatting:       { score: 68, label: "Needs Improvement", description: "Inconsistent spacing and font sizing detected." },
    skills:           { score: 60, label: "Needs Improvement", description: "Skills are listed but poorly organized and partially outdated." },
    experience:       { score: 55, label: "Needs Improvement", description: "Job descriptions are brief and do not convey impact." },
    keywords:         { score: 42, label: "Weak",             description: "Critical industry keywords are largely absent." },
  },

  sections: [
    {
      name: "Contact Information",
      status: "Good",
      icon: "contact",
      suggestions: [
        "Contact details are present and legible.",
        "No LinkedIn profile is linked — this is a missed opportunity for most professional roles.",
      ],
    },
    {
      name: "Professional Summary",
      status: "Needs Improvement",
      icon: "summary",
      suggestions: [
        "Summary is only one generic sentence and provides no differentiation.",
        "Does not mention any specific role target, skill strength, or career highlight.",
      ],
    },
    {
      name: "Experience",
      status: "Needs Improvement",
      icon: "experience",
      suggestions: [
        "Bullets use passive language ('Responsible for') rather than active verbs.",
        "No quantitative results are mentioned anywhere in the experience section.",
        "Most roles have only 1–2 bullets — expand to 3–5 per role to adequately represent your contributions.",
      ],
    },
    {
      name: "Education",
      status: "Good",
      icon: "education",
      suggestions: [
        "Degree information is present and clearly formatted.",
      ],
    },
    {
      name: "Skills",
      status: "Needs Improvement",
      icon: "skills",
      suggestions: [
        "Skills are listed in an unstructured block with no grouping.",
        "Some listed skills (e.g., Microsoft Word) are too basic to be worth including for most technical roles.",
      ],
    },
    {
      name: "Projects",
      status: "Weak",
      icon: "projects",
      suggestions: [
        "No Projects section present.",
        "For candidates with limited professional experience, projects are critical to demonstrating capability.",
        "Add 2–3 personal or academic projects with technology details and outcomes.",
      ],
    },
  ],

  ats: {
    score: 51,
    matchedKeywords: ["Python", "SQL", "Excel"],
    missingKeywords: [
      "Data Analysis", "Machine Learning", "Pandas", "NumPy", "Tableau",
      "Power BI", "Statistical Modeling", "A/B Testing", "Data Visualization",
    ],
    formattingIssues: [
      { severity: "warning", message: "Multiple font sizes detected — inconsistency may cause ATS parsing errors." },
      { severity: "warning", message: "Two-column layout used — column-based layouts frequently cause ATS to misread section boundaries." },
      { severity: "warning", message: "Special characters used as bullet points (★) — replace with standard dashes or dots." },
    ],
    sectionRecognition: [
      { name: "Contact Information", recognized: true },
      { name: "Professional Summary", recognized: false },
      { name: "Work Experience", recognized: true },
      { name: "Education", recognized: true },
      { name: "Skills", recognized: true },
      { name: "Projects", recognized: false },
    ],
  },

  recommendations: {
    high: [
      {
        id: "rec2-h1",
        problem: "Two-column layout severely reduces ATS compatibility.",
        whyItMatters: "Most ATS systems read resumes left-to-right in a single column. Multi-column layouts cause content to merge or be skipped.",
        whatToDo: "Reformat your resume to a single-column layout. This is the single highest-impact change you can make right now.",
      },
    ],
    medium: [
      {
        id: "rec2-m1",
        problem: "All experience bullets use passive, task-focused language.",
        whyItMatters: "Passive bullets describe duties, not accomplishments. Recruiters want to see what you delivered, not just what you were assigned.",
        whatToDo: "Start every bullet with a strong past-tense action verb (Analyzed, Developed, Increased, Reduced) and include a result wherever possible.",
      },
    ],
    optional: [
      {
        id: "rec2-o1",
        problem: "No Projects section.",
        whyItMatters: "Without professional experience to draw on, projects are your primary evidence of capability.",
        whatToDo: "Add a Projects section with 2–3 examples, including technology used and what you built or achieved.",
      },
    ],
  },

  improvements: [
    {
      id: "imp2-1",
      section: "Professional Summary",
      original: "I am a hard working individual looking for a data related job.",
      improved:  "Data analyst with a background in Python and SQL, seeking a role where I can apply quantitative problem-solving to drive business decisions. Experienced in cleaning large datasets, building automated reports, and communicating findings to non-technical stakeholders.",
    },
    {
      id: "imp2-2",
      section: "Experience — Bullet 1",
      original: "Responsible for managing data and reports.",
      improved:  "Maintained and automated 6 weekly business reports using Python and SQL, reducing manual processing time by approximately 4 hours per week.",
    },
  ],
};

// ─── History list (shown on /dashboard/history) ───────────────────────────────

export const analysisHistory = [
  {
    id:            primaryAnalysis.id,
    fileName:      primaryAnalysis.fileName,
    analyzedAt:    primaryAnalysis.analyzedAt,
    overallScore:  primaryAnalysis.overallScore,
    overallLabel:  primaryAnalysis.overallLabel,
    atsScore:      primaryAnalysis.ats.score,
    jobMatchScore: 78,
  },
  {
    id:            secondaryAnalysis.id,
    fileName:      secondaryAnalysis.fileName,
    analyzedAt:    secondaryAnalysis.analyzedAt,
    overallScore:  secondaryAnalysis.overallScore,
    overallLabel:  secondaryAnalysis.overallLabel,
    atsScore:      secondaryAnalysis.ats.score,
    jobMatchScore: null,
  },
];

// ─── Job match mock result ────────────────────────────────────────────────────

export const jobMatchResult = {
  matchScore: 78,
  matchLabel: "Good Match",
  matchingSkills: [
    "React", "JavaScript", "TypeScript", "Node.js", "REST API",
    "PostgreSQL", "Docker", "Git",
  ],
  missingSkills: [
    "GraphQL", "Kubernetes", "AWS Lambda", "System Design",
  ],
  matchingKeywords: [
    "full-stack", "scalable", "agile", "CI/CD", "unit testing",
  ],
  suggestions: [
    "Add GraphQL to your experience section if you have used it in any project, even briefly.",
    "The job description emphasizes AWS Lambda specifically — if you have used it, list it under your cloud experience.",
    "The phrase 'cross-functional collaboration' appears 3 times in the job description. Add a bullet mentioning collaboration with product or design teams.",
  ],
};
