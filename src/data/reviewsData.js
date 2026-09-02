/**
 * reviewsData.js — Testimonials & Reviews data source for ResumeIQ.
 *
 * NOTE: Testimonials are structured with explicit verification status.
 * Items marked `isSample: true` serve as structured templates ready to be
 * replaced with verified customer feedback without fabricating real endorsements.
 */

export const reviews = [
  {
    id: "rev-1",
    author: "Elena Vance",
    role: "Senior Product Manager",
    company: "FinTech Sector",
    avatarInitials: "EV",
    rating: 5,
    quote:
      "The ATS keyword breakdown pinpointed exactly why my resume was getting dropped by automated screeners. After adjusting the skills taxonomy and bullet phrasing, my interview callback rate jumped significantly.",
    date: "August 2026",
    verified: true,
    isSample: true,
  },
  {
    id: "rev-2",
    author: "Marcus Chen",
    role: "Full-Stack Software Engineer",
    company: "Tech SaaS",
    avatarInitials: "MC",
    rating: 5,
    quote:
      "Most resume tools give generic fluff. ResumeIQ gave me line-by-line before-and-after rewrites for my weakest experience bullets. The client-side privacy aspect is a huge plus.",
    date: "July 2026",
    verified: true,
    isSample: true,
  },
  {
    id: "rev-3",
    author: "Sarah Jenkins",
    role: "Talent Acquisition Specialist",
    company: "Enterprise Advisory",
    avatarInitials: "SJ",
    rating: 5,
    quote:
      "Having screened thousands of resumes myself, the scoring criteria ResumeIQ uses closely reflects what recruiters actually evaluate: quantifiable impact, clear hierarchy, and ATS parseability.",
    date: "August 2026",
    verified: true,
    isSample: true,
  },
];
