export type Project = {
  name: string;
  domain: string;
  tags: string[];
  bullets: string[];
};

export const projectFilters = ["All", "React", "Angular", "Vanilla JS"] as const;

export const projects: Project[] = [
  {
    name: "RTA e-NOC System",
    domain: "Dubai Infrastructure Clearance Platform",
    tags: ["Angular", "NgRx"],
    bullets: [
      "Owned ~1 year of frontend on a Dubai govt internal app, engineering NgRx store, API integration, and backend data syncing for NOC infrastructure applications.",
      "Single-handedly resolved all frontend bugs for 4+ months after team reduction, independently maintaining majority of the frontend."
    ]
  },
  {
    name: "FretBox / InternBox",
    domain: "Hostel Management SaaS",
    tags: ["React", "Socket.io", "Redux", "SCSS"],
    bullets: [
      "Engineered a full real-time chat system from scratch with Socket.io, file uploads, online/offline status, read receipts, and student-to-management flows.",
      "Identified and resolved numerous pre-existing bugs across the platform alongside active feature development."
    ]
  },
  {
    name: "Thrivent / Rightwise Prep",
    domain: "US Ed-Tech Portal",
    tags: ["React", "Vite", "SCSS"],
    bullets: [
      "Architected a comprehensive design system covering colors, typography, forms, modals, dashboards, sidebars, and more; delivered all frontend pages including auth flows.",
      "Spearheaded frontend alongside a senior lead and onboarded a junior intern into the workflow."
    ]
  },
  {
    name: "Smart Health Assist",
    domain: "Healthcare Platform",
    tags: ["React", "REST APIs"],
    bullets: [
      "Developed almost all UI pages including appointment booking, medicine purchase, real-time patient monitoring with partner/nurse data entry, and per-patient report storage.",
      "Implemented tracking functionality where patients are monitored either via devices or manually by partners, nurses, or closed ones - all data stored per patient as downloadable reports."
    ]
  },
  {
    name: "Amplify Infra",
    domain: "Construction Management App",
    tags: ["React", "Redux", "Google APIs"],
    bullets: [
      "Delivered GPS-based attendance verification, travel allowance tracking, and floor-wise portion planning features using Google APIs.",
      "Architected complex multi-role dynamic forms across a heavily legacy codebase; learned multiple approaches to state and form management under real production pressure."
    ]
  },
  {
    name: "Meal O'Clock",
    domain: "Tiffin Subscription Service",
    tags: ["Vanilla JS", "Razorpay"],
    bullets: [
      "Built end-to-end as one of two developers - meal plan selection, subscription management (monthly/3-month/6-month), pause/resume logic capped at 5 days/month, and Razorpay payment integration.",
      "Handled complete flow from landing page to login, meal form selection, subscription start date, and payment - all in vanilla JS, HTML, and CSS with no frameworks."
    ]
  },
  {
    name: "Vibhu",
    domain: "Internal Enterprise App",
    tags: ["React", "Redux", "SCSS"],
    bullets: [
      "First production React project - built the complete authentication system including login flow, API integration, and OTP-based secure folder structure for sensitive documents.",
      "Established a scalable 3-layer folder structure (folder -> subfolder -> files) adopted by the whole team, and contributed to core React and API integration learnings early in career."
    ]
  }
];
