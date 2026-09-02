/**
 * faqData.js — FAQ content for ResumeIQ.
 *
 * Edit questions and answers here without touching any UI component.
 * All answers reflect only what the application actually does.
 */

export const faqs = [
  {
    id: "what-does-it-check",
    question: "What does ResumeIQ analyze?",
    answer:
      "ResumeIQ examines six dimensions of your resume: ATS compatibility, overall content quality, formatting, keyword coverage, section-by-section structure (contact, summary, experience, education, skills), and specific improvement opportunities. After analysis you receive a scored breakdown for each category plus a prioritized list of recommendations.",
  },
  {
    id: "ats-compatibility",
    question: "Does it check ATS compatibility?",
    answer:
      "Yes. ATS compatibility is one of the six scored categories. The analysis identifies formatting patterns and keyword gaps that would cause automated applicant tracking systems to rank your resume lower before it ever reaches a recruiter.",
  },
  {
    id: "supported-formats",
    question: "What resume file formats does ResumeIQ support?",
    answer:
      "ResumeIQ accepts PDF and DOCX files. These are the two formats that cover the vast majority of resumes and are supported natively by the parser without requiring any additional software.",
  },
  {
    id: "score-calculation",
    question: "How is my resume score calculated?",
    answer:
      "The overall score is a composite of the individual category scores — ATS compatibility, content quality, formatting, and keyword density — weighted and combined into a single 0–100 result. The dashboard shows each category score separately so you can see exactly where points are being added or lost.",
  },
  {
    id: "job-description-match",
    question: "Can I compare my resume with a specific job description?",
    answer:
      "Yes. The Job Match feature lets you paste any job description and immediately see how your resume's skills and keywords align with that role's requirements. The result shows matching skills, missing skills, and specific suggestions for strengthening your application.",
  },
  {
    id: "does-it-rewrite",
    question: "Does ResumeIQ rewrite my resume for me?",
    answer:
      "It doesn't replace your resume wholesale, but the Improve Resume section provides concrete before-and-after rewrites for the weakest individual bullet points and sections. These are starting points — you review and adjust them to reflect your actual experience.",
  },
  {
    id: "data-storage",
    question: "Is my resume stored anywhere?",
    answer:
      "Your resume is parsed entirely within your browser. The file content is not uploaded to any external server during analysis. Dashboard results are stored in your browser's session so you can navigate between analysis views, but they are not persisted beyond your session.",
  },
  {
    id: "who-can-use",
    question: "Can students use ResumeIQ?",
    answer:
      "ResumeIQ works for any resume — student, entry-level, or experienced professional. The analysis criteria apply regardless of career stage: structure, keyword coverage, ATS formatting, and clarity are relevant whether you are applying for your first internship or your tenth senior role.",
  },
  {
    id: "ats-friendly-tips",
    question: "What makes a resume ATS-friendly?",
    answer:
      "The main factors are: standard section headings (Experience, Education, Skills), a single-column layout free of tables and text boxes, relevant keywords that match the job description, no headers or footers containing critical information, and a clean PDF or DOCX format. ResumeIQ's ATS analysis checks your resume against these criteria specifically.",
  },
  {
    id: "multiple-analyses",
    question: "Can I analyze my resume more than once?",
    answer:
      "Yes. You can upload and analyze a new version of your resume at any time by returning to the Upload page. Each analysis runs fresh, so you can iterate on your resume and re-check your score after making improvements.",
  },
];
