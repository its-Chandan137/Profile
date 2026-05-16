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
      "Developed almost all UI pages, including appointment booking, medicine purchase, real-time patient monitoring, partner data entry, and per-patient report storage."
    ]
  },
  {
    name: "Amplify Infra",
    domain: "Construction Management App",
    tags: ["React", "Redux", "Google APIs"],
    bullets: [
      "Delivered GPS-based attendance verification, travel allowance tracking, and floor-wise portion planning features using Google APIs.",
      "Architected complex multi-role dynamic forms across a heavily legacy codebase."
    ]
  },
  {
    name: "Meal O'Clock",
    domain: "Tiffin Subscription Service",
    tags: ["Vanilla JS", "Razorpay"],
    bullets: [
      "Built end-to-end as one of two developers with meal plan selection, subscription management, pause/resume logic, and Razorpay payment integration."
    ]
  },
  {
    name: "Vibhu",
    domain: "Internal Enterprise App",
    tags: ["React", "Redux", "SCSS"],
    bullets: [
      "First production React project: built the full auth system and established a scalable 3-layer folder structure adopted by the team."
    ]
  }
];
