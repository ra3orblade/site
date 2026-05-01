export const profile = {
  name: 'Andrew Simachev',
  title: 'Senior Front-End Engineer & Architect',
  location: 'Berlin',
  email: 'andrew.simachev@gmail.com',
  github: 'https://github.com/ra3orblade',
  linkedin: 'https://linkedin.com/in/ra3orblade',
  summary:
    'Senior front-end engineer and architect with over 15 years building production web applications, designing component architectures, and leading cross-functional engineering teams. Founding engineer of an open-source, local-first knowledge-management platform used by thousands of people. For the past year I have been working AI-natively — Claude Code as a primary development tool, spec-driven workflows as the default, and agentic multi-step tasks where I orchestrate subagents instead of writing every line by hand.',
} as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: 'Anytype.io',
    role: 'Senior Front-End Engineer & Architect',
    location: 'Berlin',
    period: 'Apr 2021 — Present',
    bullets: [
      'Founding engineer of an open-source, local-first knowledge-management platform. Built the core front-end codebase from the ground up.',
      'Shipped a block-based rich-text editor with 20+ block types, a relational database UI with seven view types, an interactive D3 knowledge graph, real-time collaborative chat, notifications, and a Chrome extension.',
      'Architected the front-end data layer: reactive MobX stores consuming a gRPC event stream, with local caching, optimistic updates and conflict resolution.',
      'Designed and shipped the internal product analytics system that directly informed roadmap prioritization.',
      'Owned release engineering across macOS, Windows and Linux — packaging, code signing, Apple notarization for both Electron and Tauri.',
      'Mentored front-end engineers, contributed to hiring, code reviews, sprint planning.',
    ],
    tech: 'React 19 · TypeScript strict · MobX · Lexical · Tailwind v4 · Tauri v2 · Rust · Vite · Bun · gRPC · ts-proto · D3.js · PixiJS',
  },
  {
    company: 'devtodev',
    role: 'Chief Technology Officer',
    location: 'Vilnius',
    period: 'Oct 2018 — Apr 2021',
    bullets: [
      'Led engineering for a SaaS product-analytics platform serving game developers, managing 15 engineers in an Agile environment.',
      'Authored technical specifications and roadmaps, aligning product development with business objectives across departments.',
      'Introduced a Greenplum cluster, reducing complex analytical query times by more than 60%.',
      'Oversaw a ground-up platform redesign that improved retention and reduced support-ticket volume by 40%.',
      'Built and grew the front-end team — hiring, one-on-ones, performance conversations, mentoring, technical direction.',
    ],
    tech: 'React · TypeScript · MobX · Sass · Node.js · PostgreSQL · Greenplum · MongoDB',
  },
  {
    company: 'Game Insight',
    role: 'Senior Developer',
    location: 'Vilnius',
    period: 'Dec 2010 — Oct 2018',
    bullets: [
      'Backend and CMS for Narr8, an interactive storytelling app with 500,000+ downloads.',
      'Front-end UI layer for Tank Domination, an online multiplayer game.',
      'Internal productivity tools — a Slack integration framework and a studio-wide analytics dashboard.',
      'Architected talkover.com, a real-time social chat platform handling concurrent users — early experience with the kind of real-time messaging work I later brought into Anytype.',
    ],
    tech: 'Node.js · JavaScript · HTML · CSS · MongoDB',
  },
  {
    company: 'Astrum Online Entertainment',
    role: 'Full-stack Engineer',
    location: 'Moscow',
    period: '2004 — 2010',
    bullets: [
      'Browser-based MMO games — game UIs, server-side logic and back-office tooling.',
    ],
  },
];

export type WorkEntry = {
  title: string;
  blurb: string;
  context: string;
};

export const selectedWork: WorkEntry[] = [
  {
    title: 'Anytype desktop client',
    blurb:
      'Founding front-end engineer. Built the client from scratch — open source, local-first, cross-platform across macOS, Windows and Linux. The features below are part of it.',
    context: 'Anytype, 2021 — present',
  },
  {
    title: 'Block-based editor',
    blurb:
      'Rich-text editor with twenty-plus block types — text, headings, lists, tables, code, embeds, callouts, toggles, files, columns. Drag-and-drop reordering, slash commands, keyboard-first navigation.',
    context: 'Anytype, 2021 — present',
  },
  {
    title: 'Relational database UI',
    blurb:
      'Database surfaces with seven view types — grid, list, gallery, board, calendar, graph, timeline. Filters, sorts, grouping, row templates. The same dataset rendered through any view, kept in sync as filters change.',
    context: 'Anytype, 2021 — present',
  },
  {
    title: 'Interactive knowledge graph',
    blurb:
      'Force-directed visualization of every object and relation in a workspace. Custom layout over D3, reactive MobX stores, updates streamed from the local database. Pan, zoom, search, filter.',
    context: 'Anytype, 2021 — present',
  },
  {
    title: 'Real-time collaborative chat',
    blurb:
      'Multi-space messaging built into the same object model as the rest of the app — messages, attachments and mentions are first-class objects. End-to-end on the front-end against a streaming backend.',
    context: 'Anytype, 2024 — 2025',
  },
  {
    title: 'Cross-platform release pipeline',
    blurb:
      'Packaging, code signing and notarization for macOS, Windows and Linux across both Electron and Tauri. Auto-update, crash reporting, channels for nightly and stable builds.',
    context: 'Anytype, 2021 — present',
  },
  {
    title: 'devtodev — platform redesign',
    blurb:
      'Ground-up redesign of a product-analytics SaaS for game developers. Improved retention and cut support-ticket volume by 40%. A Greenplum cluster I introduced reduced analytical query times by more than 60%.',
    context: 'devtodev, 2018 — 2021',
  },
  {
    title: 'Narr8 — interactive storytelling',
    blurb:
      'Backend and CMS for an interactive storytelling app that reached 500,000+ downloads. Designed the publishing pipeline and content APIs powering the editorial workflow.',
    context: 'Game Insight, 2010 — 2018',
  },
];

export type Capability = { title: string; body: string };

export const aiPractice = {
  eyebrow: 'Primary practice',
  title: 'Building with AI agents.',
  body:
    'Claude Code is my primary development tool. Tasks start as written specs, not prompts. Subagents run in parallel for research, refactoring and review. Custom skills and hooks turn workflows I run weekly into single-command operations. Large-scale migrations — full MobX-React-Lite conversion, a complete build-system swap — are framed as specs the model executes against, not sequences of hand-written edits.',
  tail:
    'The way I build now is not the way I built two years ago — and the gap is widening fast.',
} as const;

export const capabilities: Capability[] = [
  {
    title: 'Front-end architecture',
    body: 'Component systems, state machines, design tokens. Foundations a team can build on for years — not a stack of features, a system that compounds.',
  },
  {
    title: 'Real-time data layers',
    body: 'Reactive stores over gRPC streams. Optimistic updates, local caching, conflict resolution. The client-side contract with backend, kept stable as the middleware evolves.',
  },
  {
    title: 'Cross-platform desktop',
    body: 'Tauri v2 with Rust shells, Electron when it fits. Code signing, Apple notarization, native installers for macOS, Windows and Linux — the whole release pipeline.',
  },
];

export const stack = [
  'React',
  'TypeScript',
  'MobX',
  'Lexical',
  'Tailwind',
  'Tauri',
  'Rust',
  'Electron',
  'Vite',
  'Bun',
  'gRPC',
  'D3',
  'PixiJS',
  'WebGL',
  'Node',
  'PostgreSQL',
  'MongoDB',
  'Claude Code',
] as const;
