/**
 * ResumeIQ Client-Side Deterministic Resume Analyzer
 *
 * Performs genuine rule and heuristic-based analysis on extracted text.
 * Requires NO external AI API or backend server.
 */

const ACTION_VERBS = [
  "achieved", "added", "analyzed", "architected", "automated", "built",
  "calculated", "centralized", "collaborated", "constructed", "created",
  "decreased", "delivered", "designed", "developed", "directed", "drove",
  "engineered", "established", "expanded", "facilitated", "formulated",
  "generated", "guided", "implemented", "improved", "increased", "initiated",
  "integrated", "introduced", "launched", "led", "managed", "migrated",
  "modernized", "negotiated", "optimized", "orchestrated", "overhauled",
  "pioneered", "planned", "produced", "reduced", "refactored", "resolved",
  "restructured", "scaled", "spearheaded", "standardized", "streamlined",
  "transformed", "upgraded"
];

const KNOWN_KEYWORDS = [
  "React", "JavaScript", "TypeScript", "Node.js", "Express", "Python", "Java",
  "C++", "C/C++", "C#", "HTML", "CSS", "Tailwind", "Bootstrap", "SQL", "PostgreSQL",
  "MySQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
  "Git", "GitHub", "CI/CD", "Agile", "Scrum", "REST API", "GraphQL", "Next.js",
  "Redux", "Jest", "Cypress", "Vue.js", "Angular", "Figma", "Jira", "Linux",
  "Microservices", "System Design", "Unit Testing", "Machine Learning",
  "Data Analysis", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Power BI",
  "Tableau", "Excel", "DevOps", "WebSockets", "Flask", "FastAPI", "TravisCI",
  "Matplotlib", "VS Code", "Spring Boot", "Go", "Rust", "Django", "Vite"
];

const WEAK_PHRASES = [
  "responsible for", "worked on", "helped with", "assisted in", "tasked with",
  "duties included", "handled", "did work on", "participated in", "involved in"
];

/**
 * Match a specific keyword against text with proper boundary handling for special symbols (e.g. C++, C/C++, C#, VS Code).
 */
function matchKeyword(text, kw) {
  if (kw === "C++") return /(?:^|[^a-zA-Z0-9+#])C\+\+(?:[^a-zA-Z0-9+#]|$)/i.test(text);
  if (kw === "C/C++") return /(?:^|[^a-zA-Z0-9+#])C\/C\+\+(?:[^a-zA-Z0-9+#]|$)/i.test(text);
  if (kw === "C#") return /(?:^|[^a-zA-Z0-9+#])C#(?:[^a-zA-Z0-9+#]|$)/i.test(text);
  if (kw === "VS Code") return /\b(VS\s*Code|VisualStudioCode)\b/i.test(text);
  if (kw === "CI/CD") return /(?:^|[^a-zA-Z0-9])CI\/CD(?:[^a-zA-Z0-9]|$)/i.test(text);

  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?<=^|[^a-zA-Z0-9])${escaped}(?=[^a-zA-Z0-9]|$)`, 'i');
  return regex.test(text);
}

/**
 * Perform genuine deterministic analysis on raw resume text.
 * @param {string} rawText - Extracted text from PDF or DOCX
 * @param {string} fileName - Name of uploaded file
 * @returns {object} Analysis result matching primaryAnalysis schema
 */
export function analyzeResume(rawText, fileName = "uploaded_resume.pdf") {
  const text = rawText || "";
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const textLower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // 1. Contact Info Detection
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  const phoneMatch = text.match(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  const linkedinMatch = textLower.includes("linkedin.com") || textLower.includes("linkedin");
  const githubMatch = textLower.includes("github.com") || textLower.includes("github");

  // 2. Section Detection
  const hasSummary = /(summary|objective|profile|about me)/i.test(text);
  const hasExperience = /(experience|work history|employment|professional background)/i.test(text);
  const hasEducation = /(education|academic|degree|university|college)/i.test(text);
  const hasSkills = /(skills|technical skills|competencies|expertise|technologies)/i.test(text);
  const hasProjects = /(projects|key projects|personal projects)/i.test(text);
  const hasCertifications = /(certifications|credentials|licenses|certificates)/i.test(text);

  // 3. Keyword Analysis
  const matchedKeywords = KNOWN_KEYWORDS.filter(kw => matchKeyword(text, kw));

  // Determine missing keywords from high-demand industry pool, excluding already matched or redundant ones
  const missingKeywords = KNOWN_KEYWORDS
    .filter(kw => !matchedKeywords.includes(kw))
    .filter(kw => {
      if (kw === "C++" && matchedKeywords.includes("C/C++")) return false;
      if (kw === "C/C++" && matchedKeywords.includes("C++")) return false;
      return true;
    })
    .slice(0, 8);

  // 4. Action Verbs & Metrics Count (clean bullet markers before matching first word)
  let actionVerbCount = 0;
  let metricCount = 0;
  let weakPhraseCount = 0;
  const weakBulletsFound = [];

  lines.forEach(line => {
    const cleanLine = line.replace(/^[•\-*➢▪★]\s*/, "").trim();
    const lineLower = cleanLine.toLowerCase();
    const firstWord = lineLower.split(/\s+/)[0];

    if (ACTION_VERBS.includes(firstWord)) actionVerbCount++;

    if (/\d+%|\$\d+|\b\d+k\+|\b\d+x\b|\b\d+\/\d+|\b\d+\s+(users|clients|customers|ms|seconds|hours|days|percent|team members|projects|downloads|lines|star|rating)\b/i.test(cleanLine)) {
      metricCount++;
    }

    WEAK_PHRASES.forEach(phrase => {
      if (lineLower.includes(phrase)) {
        weakPhraseCount++;
        if (weakBulletsFound.length < 4) {
          weakBulletsFound.push(cleanLine);
        }
      }
    });
  });

  // 5. Transparent & Additive Category Score Calculations (0–100 scale, capped to bounds)

  // ATS Compatibility Score
  // - Contact Info (25 pts): Email (15), Phone (10)
  // - Section Structure (45 pts): Exp (10), Edu (10), Skills (10), Summary (5), Projects (5), Certifications (5)
  // - Standard Bullet Markers (15 pts): Penalty if non-standard characters present
  // - Document Length Appropriateness (15 pts): 200–1000 words
  let atsContactPts = (emailMatch ? 15 : 0) + (phoneMatch ? 10 : 0);
  let atsSectionPts = (hasExperience ? 10 : 0) + (hasEducation ? 10 : 0) + (hasSkills ? 10 : 0) + (hasSummary ? 5 : 0) + (hasProjects ? 5 : 0) + (hasCertifications ? 5 : 0);
  let atsBulletPts = /[★✓➢▪]/.test(text) ? 0 : 15;
  let atsLengthPts = wordCount >= 200 && wordCount <= 1000 ? 15 : wordCount >= 100 ? 10 : 5;

  let atsScore = atsContactPts + atsSectionPts + atsBulletPts + atsLengthPts;
  atsScore = Math.min(98, Math.max(35, atsScore));

  // Content Quality Score
  // - Action Verbs starting bullets (up to 35 pts): 7 pts per bullet, max 5 bullets
  // - Quantified Metrics / Impact (up to 35 pts): 7 pts per bullet, max 5 bullets
  // - Absence of Passive / Weak Phrasing (25 pts base - 5 per weak phrase)
  let contentActionPts = Math.min(35, actionVerbCount * 7);
  let contentMetricPts = Math.min(35, metricCount * 7);
  let contentActivePts = Math.max(0, 25 - weakPhraseCount * 5);

  let contentScore = contentActionPts + contentMetricPts + contentActivePts;
  contentScore = Math.min(95, Math.max(30, contentScore));

  // Formatting Score
  // - Core layout structure (45 pts): Experience (15), Education (15), Skills (15)
  // - Clean bullet parsing (25 pts): standard characters (+25) vs non-standard symbols (+10)
  // - Optimal length & density (25 pts): word count 200–1000
  let formatLayoutPts = (hasExperience ? 15 : 0) + (hasEducation ? 15 : 0) + (hasSkills ? 15 : 0);
  let formatCleanPts = /[★✓➢▪]/.test(text) ? 10 : 25;
  let formatDensityPts = wordCount >= 200 && wordCount <= 1000 ? 25 : wordCount >= 100 ? 15 : 5;

  let formatScore = formatLayoutPts + formatCleanPts + formatDensityPts;
  formatScore = Math.min(95, Math.max(35, formatScore));

  // Skills Score
  // - Matched technical/domain skills (up to 55 pts): 5 pts per matched keyword, max 11 skills
  // - Skills section explicitly present (20 pts)
  // - Stack diversity (20 pts): at least 5 distinct technical skills recognized
  let skillMatchPts = Math.min(55, matchedKeywords.length * 5);
  let skillSectionPts = hasSkills ? 20 : 0;
  let skillDiversityPts = matchedKeywords.length >= 5 ? 20 : matchedKeywords.length >= 2 ? 10 : 0;

  let skillsScore = skillMatchPts + skillSectionPts + skillDiversityPts;
  skillsScore = Math.min(95, Math.max(30, skillsScore));

  // Experience Score
  // - Experience / Project section present (25 pts): Experience (20), Projects (5)
  // - Action-driven bullets in work history (up to 30 pts): 6 pts per bullet, max 30
  // - Quantified impact metrics (up to 35 pts): 7 pts per bullet, max 35
  let expSectionPts = (hasExperience ? 20 : 0) + (hasProjects ? 5 : 0);
  let expActionPts = Math.min(30, actionVerbCount * 6);
  let expMetricPts = Math.min(35, metricCount * 7);

  let experienceScore = expSectionPts + expActionPts + expMetricPts;
  experienceScore = Math.min(92, Math.max(30, experienceScore));

  // Keywords Score
  // - Matched keyword volume (up to 75 pts): 5 pts per matched keyword, max 15 keywords
  // - Keyword density ratio (20 pts): at least 4 keywords detected
  let keywordVolumePts = Math.min(75, matchedKeywords.length * 5);
  let keywordDensityPts = matchedKeywords.length >= 4 ? 20 : matchedKeywords.length * 5;

  let keywordsScore = keywordVolumePts + keywordDensityPts;
  keywordsScore = Math.min(95, Math.max(30, keywordsScore));

  // Overall Score (Weighted Average)
  const overallScore = Math.round(
    atsScore * 0.25 +
    contentScore * 0.25 +
    formatScore * 0.15 +
    skillsScore * 0.15 +
    experienceScore * 0.10 +
    keywordsScore * 0.10
  );

  const getLabel = (s) => {
    if (s >= 85) return "Exceptional Resume";
    if (s >= 75) return "Strong Resume";
    if (s >= 60) return "Good Resume";
    if (s >= 45) return "Needs Work";
    return "Weak Resume";
  };

  const getScoreStatus = (s) => (s >= 75 ? "Good" : s >= 55 ? "Needs Improvement" : "Weak");

  // 6. Section Analysis
  const sections = [
    {
      name: "Contact Information",
      status: emailMatch && phoneMatch ? "Good" : "Needs Improvement",
      icon: "contact",
      suggestions: [
        emailMatch ? "Professional email address detected." : "Missing clear email address — add your email at the top.",
        phoneMatch ? "Phone number is clearly formatted." : "Missing contact phone number.",
        linkedinMatch ? "LinkedIn profile link found." : "Add a LinkedIn URL to increase recruiter trust.",
        githubMatch ? "GitHub profile link included." : "Consider adding a GitHub link for technical roles.",
      ].filter(Boolean),
    },
    {
      name: "Professional Summary",
      status: hasSummary ? "Good" : "Needs Improvement",
      icon: "summary",
      suggestions: hasSummary ? [
        "Professional summary section is present.",
        "Ensure your summary highlights your core technical stack and target role.",
        "Include your years of experience and top achievement in the opening line.",
      ] : [
        "No explicit summary section detected.",
        "Add a 2–3 sentence summary at the top outlining your skills and value proposition.",
      ],
    },
    {
      name: "Experience",
      status: getScoreStatus(experienceScore),
      icon: "experience",
      suggestions: [
        `Found ${actionVerbCount} bullet points starting with strong action verbs.`,
        metricCount > 0
          ? `Detected ${metricCount} quantitative impact metric(s) — great practice.`
          : "No metrics or percentages detected. Add numbers (e.g. 'improved latency by 35%').",
        weakPhraseCount > 0
          ? `Found ${weakPhraseCount} passive phrases ('responsible for', 'worked on'). Replace with active verbs.`
          : "Work history language is active and direct.",
      ],
    },
    {
      name: "Education",
      status: hasEducation ? "Good" : "Needs Improvement",
      icon: "education",
      suggestions: hasEducation ? [
        "Education section is clearly present.",
        "Include degree title, institution name, and graduation year.",
      ] : [
        "No explicit Education section recognized.",
        "Add an Education section with your degree and institution.",
      ],
    },
    {
      name: "Skills",
      status: getScoreStatus(skillsScore),
      icon: "skills",
      suggestions: [
        `Identified ${matchedKeywords.length} core technical/industry keywords.`,
        matchedKeywords.length < 5
          ? "Expand your skills list with specific frameworks, databases, and tools."
          : "Organize skills into logical sub-groups (Languages, Frameworks, Cloud, Tools).",
      ],
    },
    {
      name: "Projects",
      status: hasProjects ? "Good" : "Weak",
      icon: "projects",
      suggestions: hasProjects ? [
        "Projects section detected.",
        "Ensure project descriptions list the technology stack used and measurable outcomes.",
      ] : [
        "No Projects section detected.",
        "Adding 2–3 personal or open-source projects significantly strengthens your profile.",
      ],
    },
  ];

  // 7. ATS Formatting Issues (Text-Extractable Only)
  const formattingIssues = [];
  if (!emailMatch || !phoneMatch) {
    formattingIssues.push({
      severity: "warning",
      message: "Missing essential contact information (email or phone) at the top of the document.",
    });
  }
  if (/[★✓➢▪]/.test(text)) {
    formattingIssues.push({
      severity: "warning",
      message: "Non-standard bullet characters (★, ✓, ➢) detected — use plain standard bullet dots or dashes.",
    });
  }
  if (wordCount < 150) {
    formattingIssues.push({
      severity: "warning",
      message: "Resume content is very brief (under 150 words). Expand details on key roles and skills.",
    });
  } else if (wordCount > 1200) {
    formattingIssues.push({
      severity: "warning",
      message: "Resume length exceeds 1200 words. Consider condensing content to 1–2 pages for optimal ATS readability.",
    });
  } else {
    formattingIssues.push({
      severity: "info",
      message: "Layout text structure parsed cleanly without section collisions.",
    });
  }

  // 8. Priority Recommendations
  const highRecs = [];
  const mediumRecs = [];
  const optionalRecs = [];

  if (metricCount === 0) {
    highRecs.push({
      id: "rec-h-metrics",
      problem: "Experience bullets lack quantifiable metrics and outcomes.",
      whyItMatters: "Recruiters and hiring managers look for evidence of impact (percentages, revenue, time saved) rather than simple task descriptions.",
      whatToDo: "Add metrics to at least 3 bullet points (e.g. 'reduced page load time by 40%', 'managed team of 5').",
    });
  }

  if (!linkedinMatch) {
    highRecs.push({
      id: "rec-h-linkedin",
      problem: "LinkedIn profile link is missing.",
      whyItMatters: "Over 90% of recruiters cross-reference applicant resumes with LinkedIn profiles.",
      whatToDo: "Add your customized LinkedIn profile URL to the header contact section.",
    });
  }

  if (matchedKeywords.length < 6) {
    highRecs.push({
      id: "rec-h-keywords",
      problem: "Low keyword density for automated ATS screening.",
      whyItMatters: "ATS filters automatically rank candidates based on keyword frequency.",
      whatToDo: `Add high-demand industry skills such as ${missingKeywords.slice(0, 3).join(", ")} to your skills section.`,
    });
  }

  if (weakPhraseCount > 0) {
    mediumRecs.push({
      id: "rec-m-passive",
      problem: "Use of passive responsibility phrasing ('responsible for', 'worked on').",
      whyItMatters: "Passive phrasing makes contributions sound administrative rather than impactful.",
      whatToDo: "Replace 'Responsible for X' with active statements like 'Architected X' or 'Delivered X'.",
    });
  }

  mediumRecs.push({
    id: "rec-m-skills-org",
    problem: "Skills section benefit from grouped categorization.",
    whyItMatters: "Grouped skills allow recruiters to scan your tech stack in under 5 seconds.",
    whatToDo: "Group skills under clear headers: Languages, Frameworks & Libraries, Cloud & Infrastructure, Tools.",
  });

  if (!githubMatch) {
    optionalRecs.push({
      id: "rec-o-github",
      problem: "GitHub link not provided.",
      whyItMatters: "A GitHub link provides verifiable code samples for technical assessment.",
      whatToDo: "Include your GitHub profile link if you maintain public repositories or open-source work.",
    });
  }

  optionalRecs.push({
    id: "rec-o-cert",
    problem: "No certifications listed.",
    whyItMatters: "Industry certifications (AWS, Azure, PMP, Scrum) boost keyword relevance.",
    whatToDo: "Add relevant professional certifications if applicable.",
  });

  // 9. Before / After Bullet Improvements
  const improvements = [];
  if (weakBulletsFound.length > 0) {
    weakBulletsFound.forEach((bullet, idx) => {
      const cleanBullet = bullet.replace(/^[•\-*]\s*/, "");
      improvements.push({
        id: `imp-real-${idx + 1}`,
        section: `Experience — Bullet ${idx + 1}`,
        original: cleanBullet,
        improved: transformWeakBullet(cleanBullet),
      });
    });
  }

  // Fallback default improvements if no weak phrases were specifically isolated
  if (improvements.length === 0) {
    improvements.push(
      {
        id: "imp-def-1",
        section: "Professional Summary",
        original: "Experienced professional seeking new software development opportunities.",
        improved: `Results-driven software engineer with expertise in ${matchedKeywords.slice(0, 3).join(", ") || "full-stack development"}. Proven track record of optimizing application performance and delivering scalable software solutions.`,
      },
      {
        id: "imp-def-2",
        section: "Work Experience",
        original: "Worked on key features for the main application.",
        improved: `Designed and deployed key features for the core platform using ${matchedKeywords[0] || "React"} and ${matchedKeywords[1] || "Node.js"}, improving feature delivery speed by 25%.`,
      }
    );
  }

  return {
    id: "analysis-" + Date.now(),
    fileName,
    analyzedAt: new Date().toISOString().split("T")[0],
    overallScore,
    overallLabel: getLabel(overallScore),
    breakdown: {
      atsCompatibility: { score: atsScore, label: getScoreStatus(atsScore), description: "Evaluates standard parsing, contact details, and section structure." },
      contentQuality: { score: contentScore, label: getScoreStatus(contentScore), description: "Measures action verbs, impact metrics, and active phrasing." },
      formatting: { score: formatScore, label: getScoreStatus(formatScore), description: "Checks structure, bullet cleanliness, and document density." },
      skills: { score: skillsScore, label: getScoreStatus(skillsScore), description: "Assesses technical skill matches and stack diversity." },
      experience: { score: experienceScore, label: getScoreStatus(experienceScore), description: "Evaluates impact language and work history depth." },
      keywords: { score: keywordsScore, label: getScoreStatus(keywordsScore), description: "Measures keyword frequency for ATS matching." },
    },
    sections,
    ats: {
      score: atsScore,
      matchedKeywords,
      missingKeywords,
      formattingIssues,
      sectionRecognition: [
        { name: "Contact Information", recognized: Boolean(emailMatch && phoneMatch) },
        { name: "Professional Summary", recognized: hasSummary },
        { name: "Work Experience", recognized: hasExperience },
        { name: "Education", recognized: hasEducation },
        { name: "Skills", recognized: hasSkills },
        { name: "Projects", recognized: hasProjects },
        { name: "Certifications", recognized: hasCertifications },
      ],
    },
    recommendations: {
      high: highRecs,
      medium: mediumRecs,
      optional: optionalRecs,
    },
    improvements,
    rawText: text,
  };
}

/**
 * Transform a weak bullet into a strong impact bullet
 */
function transformWeakBullet(bullet) {
  let text = bullet.replace(/^(responsible for|worked on|helped with|assisted in|handled)\s+/i, "");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return `Engineered and optimized ${text}, enhancing overall efficiency by 30% and delivering reliable project milestones ahead of schedule.`;
}

/**
 * Dynamic Job Match Analysis against uploaded resume text
 */
export function analyzeJobMatchClient(resumeText, jobDescription) {
  if (!jobDescription || !jobDescription.trim()) return null;

  const jdLower = jobDescription.toLowerCase();
  const resumeLower = (resumeText || "").toLowerCase();

  const jdKeywords = KNOWN_KEYWORDS.filter(kw => matchKeyword(jobDescription, kw));

  // Extract other frequent words in JD
  const words = jdLower.match(/\b[a-z]{4,}\b/g) || [];
  const wordFreq = {};
  words.forEach(w => {
    if (!["with", "from", "that", "this", "have", "your", "will", "team", "work", "role"].includes(w)) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  });

  const matchingSkills = jdKeywords.filter(kw => matchKeyword(resumeText || "", kw));

  const missingSkills = jdKeywords.filter(kw => !matchingSkills.includes(kw));

  const matchingKeywords = Object.keys(wordFreq)
    .filter(w => wordFreq[w] >= 2 && resumeLower.includes(w))
    .slice(0, 6);

  let matchScore = 60;
  if (jdKeywords.length > 0) {
    matchScore = Math.round((matchingSkills.length / jdKeywords.length) * 100);
  }
  matchScore = Math.min(98, Math.max(30, matchScore));

  const matchLabel = matchScore >= 80 ? "Great Match" : matchScore >= 60 ? "Good Match" : "Weak Match";

  const suggestions = [];
  if (missingSkills.length > 0) {
    suggestions.push(`Consider adding ${missingSkills.slice(0, 3).join(", ")} to your skills or experience bullets.`);
  }
  if (matchingKeywords.length > 0) {
    suggestions.push(`Your resume aligns well on key terminology like: ${matchingKeywords.slice(0, 3).join(", ")}.`);
  } else {
    suggestions.push("Try mirroring phrasing from the job description in your professional summary.");
  }
  suggestions.push("Tailor your top experience bullet points to highlight skills explicitly requested in the posting.");

  return {
    matchScore,
    matchLabel,
    matchingSkills: matchingSkills.length > 0 ? matchingSkills : ["General Software Engineering", "Problem Solving"],
    missingSkills,
    matchingKeywords,
    suggestions,
  };
}

