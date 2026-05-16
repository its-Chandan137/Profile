export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["JavaScript", "React", "HTML", "CSS", "SCSS", "Bootstrap", "Tailwind"]
  },
  {
    category: "Frameworks",
    skills: ["Angular"]
  },
  {
    category: "State Management",
    skills: ["Redux", "NgRx"]
  },
  {
    category: "Real-Time",
    skills: ["Socket.io", "WebSocket"]
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Vite", "REST APIs", "Google APIs", "Razorpay"]
  }
];
