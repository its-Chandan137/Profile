export type LineTone = "default" | "muted" | "accent" | "success" | "error";

export type TerminalLine = {
  text: string;
  tone?: LineTone;
};

export type TerminalAction =
  | { type: "close" }
  | { type: "clear" }
  | { type: "downloadResume" }
  | { type: "scroll"; target: "hero" | "about" | "skills" | "experience" | "projects" | "contact"; closeAfterMs?: number }
  | { type: "contactCelebration"; delayMs: number }
  | { type: "matrix" }
  | { type: "toggleTheme" }
  | { type: "showJoke" };

export type CommandDefinition = {
  command: string;
  lines?: TerminalLine[];
  action?: TerminalAction;
};

const divider = "─────────────────────────────";

const helpLines: TerminalLine[] = [
  { text: "Available commands:", tone: "accent" },
  { text: divider, tone: "muted" },
  { text: "NAVIGATION", tone: "accent" },
  { text: "  navto home          → scroll to top" },
  { text: "  navto about         → scroll to About section" },
  { text: "  navto skills        → scroll to Skills section" },
  { text: "  navto experience    → scroll to Experience section" },
  { text: "  navto projects      → scroll to Projects section" },
  { text: "  navto contact       → scroll to Contact section" },
  { text: "" },
  { text: "INFO", tone: "accent" },
  { text: "  whoami              → about Chandan" },
  { text: "  skills              → list all skills" },
  { text: "  experience          → work history" },
  { text: "  availability        → current status" },
  { text: "  contact             → contact details" },
  { text: "  resume              → download resume" },
  { text: "" },
  { text: "PROJECTS", tone: "accent" },
  { text: "  projects            → list all projects" },
  { text: "  open rta            → RTA e-NOC System details" },
  { text: "  open fretbox        → FretBox / InternBox details" },
  { text: "  open thrivent       → Thrivent / Rightwise Prep details" },
  { text: "  open health         → Smart Health Assist details" },
  { text: "  open amplify        → Amplify Infra details" },
  { text: "  open mealoclock     → Meal O'Clock details" },
  { text: "  open vibhu          → Vibhu details" },
  { text: "" },
  { text: "FUN", tone: "accent" },
  { text: "  hire me             → ??" },
  { text: "  sudo hire me        → ??" },
  { text: "  matrix              → ??" },
  { text: "  coffee              → ??" },
  { text: "  joke                → ??" },
  { text: "  theme               → toggle accent theme" },
  { text: "" },
  { text: "TERMINAL", tone: "accent" },
  { text: "  clear               → clear terminal" },
  { text: "  close               → close terminal" },
  { text: divider, tone: "muted" }
];

export const jokes: TerminalLine[][] = [
  [
    { text: "Why do programmers prefer dark mode?" },
    { text: "→ Because light attracts bugs. 🐛" }
  ],
  [
    { text: "Why did the developer go broke?" },
    { text: "→ Because he used up all his cache." }
  ],
  [
    { text: "A SQL query walks into a bar..." },
    { text: "→ walks up to two tables and asks:" },
    { text: '  "Can I join you?"' }
  ],
  [
    { text: "Why do Java developers wear glasses?" },
    { text: "→ Because they don't C#." }
  ],
  [
    { text: "How many programmers to change a bulb?" },
    { text: "→ None. That's a hardware problem." }
  ]
];

export const terminalCommands: CommandDefinition[] = [
  { command: "help", lines: helpLines },
  {
    command: "whoami",
    lines: [
      { text: "Chandan Swarnakar", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Role        : Frontend Developer" },
      { text: "Location    : Hyderabad, Telangana, India" },
      { text: "Experience  : 2+ years" },
      { text: "Company     : Vedhas Technology Solutions" },
      { text: "Joined      : Dec 2023" },
      { text: "" },
      { text: "Specializes in React, Angular, and real-time web apps." },
      { text: "Worked across healthcare, government, ed-tech," },
      { text: "construction, and SaaS domains." },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "skills",
    lines: [
      { text: "Skills", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Frontend      : JavaScript, React, HTML, CSS, SCSS" },
      { text: "               Bootstrap, Tailwind" },
      { text: "Frameworks    : Angular" },
      { text: "State Mgmt    : Redux, NgRx" },
      { text: "Real-Time     : Socket.io, WebSocket" },
      { text: "Tools         : Git, Vite, REST APIs" },
      { text: "               Google APIs, Razorpay" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "experience",
    lines: [
      { text: "Work History", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "[DEC 2023 – PRESENT]" },
      { text: "Vedhas Technology Solutions" },
      { text: "Frontend Developer" },
      { text: "" },
      { text: "→ 8+ production projects in React and Angular" },
      { text: "→ Angular + NgRx for Dubai govt NOC system" },
      { text: "→ Real-time chat system with Socket.io" },
      { text: "→ Full design systems and dashboard UIs" },
      { text: "→ Mentored junior developer" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "availability",
    lines: [
      { text: "Status", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "● OPEN TO WORK", tone: "success" },
      { text: "" },
      { text: "Role        : Frontend Developer" },
      { text: "Type        : Full-time preferred" },
      { text: "Location    : Hyderabad (On-site / Remote)" },
      { text: "Notice      : 1 Month" },
      { text: "" },
      { text: "Reach out → chandanswarnakar13@gmail.com" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "contact",
    lines: [
      { text: "Contact Details", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Email    : chandanswarnakar13@gmail.com" },
      { text: "GitHub   : github.com/its-Chandan137" },
      { text: "LinkedIn : linkedin.com/in/chandanswarnakar" },
      { text: "Portfolio: myportfolio137.netlify.app" },
      { text: "Location : Hyderabad, Telangana, India" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "resume",
    lines: [
      { text: "Initiating resume download...", tone: "accent" },
      { text: "downloading chandan_swarnakar_resume.pdf ████████ 100%" },
      { text: "Done! Check your downloads folder.", tone: "success" }
    ],
    action: { type: "downloadResume" }
  },
  {
    command: "projects",
    lines: [
      { text: "Projects [ 7 total ]", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "01  RTA e-NOC System        → Angular, NgRx" },
      { text: "02  FretBox / InternBox     → React, Socket.io, Redux" },
      { text: "03  Thrivent / Rightwise    → React, Vite, SCSS" },
      { text: "04  Smart Health Assist     → React, REST APIs" },
      { text: "05  Amplify Infra           → React, Redux, Google APIs" },
      { text: "06  Meal O'Clock            → Vanilla JS, Razorpay" },
      { text: "07  Vibhu                   → React, Redux, SCSS" },
      { text: divider, tone: "muted" },
      { text: "Type 'open <name>' for details" }
    ]
  },
  {
    command: "open rta",
    lines: [
      { text: "RTA e-NOC System (Dubai Government)", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Dubai Infrastructure Clearance Platform" },
      { text: "Stack   : Angular | NgRx | REST APIs" },
      { text: "Duration: ~1 year" },
      { text: "" },
      { text: "→ Internal govt app for managing NOC applications" },
      { text: "  for infrastructure projects in Dubai" },
      { text: "→ Engineered NgRx store management, API integration" },
      { text: "  and backend data syncing" },
      { text: "→ Sole frontend owner for 4+ months after team" },
      { text: "  reduction — resolved all bugs independently" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open fretbox",
    lines: [
      { text: "FretBox / InternBox", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Hostel Management SaaS" },
      { text: "Stack   : React | Socket.io | Redux | SCSS" },
      { text: "Duration: Production project" },
      { text: "" },
      { text: "→ Built full real-time chat from scratch" },
      { text: "→ Socket.io frontend + backend integration" },
      { text: "→ File uploads, read receipts, online status" },
      { text: "→ Student-to-management request flows" },
      { text: "→ Fixed numerous pre-existing platform bugs" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open thrivent",
    lines: [
      { text: "Thrivent / Rightwise Prep", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : US Ed-Tech Portal" },
      { text: "Stack   : React | Vite | SCSS" },
      { text: "URL     : rightwiseprep.com" },
      { text: "" },
      { text: "→ Built complete design system from scratch" },
      { text: "  colors, typography, forms, modals, sidebars" },
      { text: "→ Delivered all frontend pages + auth flows" },
      { text: "→ Led frontend alongside senior lead" },
      { text: "→ Onboarded and worked with junior intern" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open health",
    lines: [
      { text: "Smart Health Assist", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Healthcare Platform" },
      { text: "Stack   : React | REST APIs" },
      { text: "" },
      { text: "→ Built almost all UI pages" },
      { text: "→ Appointment booking + medicine purchase" },
      { text: "→ Real-time patient monitoring" },
      { text: "→ Partner/nurse data entry system" },
      { text: "→ Per-patient downloadable report storage" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open amplify",
    lines: [
      { text: "Amplify Infra", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Construction Management App" },
      { text: "Stack   : React | Redux | Google APIs | Bootstrap" },
      { text: "" },
      { text: "→ GPS-based attendance verification" },
      { text: "→ Travel allowance tracking" },
      { text: "→ Floor-wise portion planning" },
      { text: "→ Complex multi-role dynamic forms" },
      { text: "→ Worked through heavily legacy codebase" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open mealoclock",
    lines: [
      { text: "Meal O'Clock", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Tiffin Subscription Service" },
      { text: "Stack   : Vanilla JS | HTML | CSS | Razorpay" },
      { text: "" },
      { text: "→ Built end-to-end with one other developer" },
      { text: "→ Meal plan selection + subscription management" },
      { text: "→ Monthly / 3-month / 6-month plans" },
      { text: "→ Pause/resume logic (max 5 days/month)" },
      { text: "→ Full Razorpay payment integration" },
      { text: "→ Zero frameworks used" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "open vibhu",
    lines: [
      { text: "Vibhu", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Domain  : Internal Enterprise App" },
      { text: "Stack   : React | Redux | SCSS | Bootstrap" },
      { text: "" },
      { text: "→ First production React project" },
      { text: "→ Built complete authentication system" },
      { text: "→ Login flow + API integration" },
      { text: "→ OTP-based secure folder structure" },
      { text: "→ Established 3-layer folder architecture" },
      { text: "  adopted by the whole team" },
      { text: divider, tone: "muted" }
    ]
  },
  {
    command: "hire me",
    lines: [
      { text: "Processing request...", tone: "accent" },
      { text: "████████████████████ 100%" },
      { text: "" },
      { text: "Great choice! 🎉", tone: "success" },
      { text: "Redirecting you to contact section..." }
    ],
    action: { type: "contactCelebration", delayMs: 1500 }
  },
  {
    command: "sudo hire me",
    lines: [
      { text: "[sudo] password for recruiter: ********" },
      { text: "Authenticating..." },
      { text: "Access granted. ✓", tone: "success" },
      { text: "" },
      { text: "Permission granted by the universe! 🚀", tone: "success" },
      { text: "You clearly have excellent taste." },
      { text: "Scrolling to contact..." }
    ],
    action: { type: "contactCelebration", delayMs: 1500 }
  },
  {
    command: "matrix",
    lines: [{ text: "Initializing matrix...", tone: "accent" }],
    action: { type: "matrix" }
  },
  {
    command: "coffee",
    lines: [
      { text: "Chandan's fuel ☕", tone: "accent" },
      { text: divider, tone: "muted" },
      { text: "Cups today     : countless" },
      { text: "Preferred      : Black, no sugar" },
      { text: "Effect         : Converts caffeine" },
      { text: "                 into clean components" },
      { text: divider, tone: "muted" }
    ]
  },
  { command: "joke", action: { type: "showJoke" } },
  {
    command: "theme",
    lines: [{ text: "Toggling accent theme...", tone: "accent" }],
    action: { type: "toggleTheme" }
  },
  {
    command: "navto home",
    lines: [{ text: "Navigating to home...", tone: "accent" }],
    action: { type: "scroll", target: "hero", closeAfterMs: 600 }
  },
  {
    command: "navto about",
    lines: [{ text: "Navigating to about...", tone: "accent" }],
    action: { type: "scroll", target: "about", closeAfterMs: 600 }
  },
  {
    command: "navto skills",
    lines: [{ text: "Navigating to skills...", tone: "accent" }],
    action: { type: "scroll", target: "skills", closeAfterMs: 600 }
  },
  {
    command: "navto experience",
    lines: [{ text: "Navigating to experience...", tone: "accent" }],
    action: { type: "scroll", target: "experience", closeAfterMs: 600 }
  },
  {
    command: "navto projects",
    lines: [{ text: "Navigating to projects...", tone: "accent" }],
    action: { type: "scroll", target: "projects", closeAfterMs: 600 }
  },
  {
    command: "navto contact",
    lines: [{ text: "Navigating to contact...", tone: "accent" }],
    action: { type: "scroll", target: "contact", closeAfterMs: 600 }
  },
  { command: "clear", action: { type: "clear" } },
  { command: "close", action: { type: "close" } }
];

export const terminalCommandMap = new Map(terminalCommands.map((definition) => [definition.command, definition]));

export const terminalCommandNames = terminalCommands.map((definition) => definition.command);

export const welcomeLines: TerminalLine[] = [
  { text: "Welcome to Chandan's Portfolio Terminal v1.0", tone: "accent" },
  { text: "Type 'help' to see all available commands." }
];

export const mobileLines: TerminalLine[] = [{ text: "Best experienced on desktop", tone: "muted" }];
