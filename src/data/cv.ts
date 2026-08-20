export const profile = {
  name: 'Andrew Simachev',
  title: 'Senior Front-End Engineer & Architect',
  location: 'Berlin',
  email: 'andrew.simachev@gmail.com',
  github: 'https://github.com/ra3orblade',
  linkedin: 'https://linkedin.com/in/ra3orblade',
  x: 'https://x.com/Ra3orbladez',
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
    company: 'Brainstorm',
    role: 'Founder',
    location: 'Berlin',
    period: 'May 2026 — Present',
    bullets: [
      'Founded an AI-native organization building a local-first knowledge operating system — a secure desktop shell hosting sandboxed apps over a single local vault.',
      'Set product and technical direction: apps compose over one data model via Block Protocol, real-time conflict-free sync on Yjs CRDTs, a shared Lexical editor across every surface.',
      'Designed the capability-governed sandbox model — apps isolated, every request to vault data mediated through a per-vault capability ledger. Security as an architectural boundary, not an add-on.',
      'Own the core repositories: shell, the zero-knowledge self-hostable sync engine, the optional cloud control plane that never touches vault content, and the public site and docs.',
      'Running the org AI-natively from day one — spec-driven development, agentic workflows and subagent orchestration as the default way of building and shipping.',
    ],
    tech: 'TypeScript · Electron · Yjs · Lexical · Block Protocol · CRDTs · Astro · Claude Code',
  },
  {
    company: 'Anytype.io',
    role: 'Senior Front-End Engineer & Architect',
    location: 'Berlin',
    period: 'Apr 2021 — May 2026',
    bullets: [
      'Founding engineer of an open-source, local-first knowledge-management platform. Built the core front-end codebase from the ground up and grew an active open-source contributor community around it.',
      'Led a ground-up AI-native rewrite of the desktop client (anytype-bun) as a mostly-solo effort — Electron to Tauri v2, contentEditable to Lexical, Sass to Tailwind v4, webpack to Vite and Bun, google-protobuf to ts-proto. Specs as the primary artifact, subagents for parallel research, every diff reviewed.',
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
      'Oversaw the move to a Greenplum cluster, which cut complex analytical query times by more than 60%.',
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
  href?: string;
  hrefLabel?: string;
  /** Render the app-glyph strip under the blurb (Brainstorm's twenty apps). */
  apps?: boolean;
};

export const selectedWork: WorkEntry[] = [
  {
    title: 'Brainstorm — a desktop OS for you and your AI',
    blurb:
      'Local-first knowledge product modeled as a desktop: a wallpaper, icons, windows, and twenty sandboxed apps — Notes, Database, Graph, Calendar, Mailbox, Agent — all reading and writing one typed object space in a folder on your disk. Every app and every AI call crosses a capability broker that checks a per-vault ledger of grants and fails closed. Electron shell, Yjs CRDTs, Block Protocol, SQLite, Rust native modules. Signed and notarized builds for macOS, Windows and Linux.',
    context: 'Brainstorm, 2026 — present',
    href: 'https://getbrainstorm.online',
    hrefLabel: 'getbrainstorm.online',
    apps: true,
  },
  {
    title: 'Brainstorm agent harness',
    blurb:
      'The rig I build Brainstorm with. Agents drive real headless shells through Playwright — dogfood sessions that use the product and file their own friction log, multi-shell runs that exercise collaboration between instances, a dev MCP server for tooling, and a scripted pipeline that captures, voices over and renders the promo videos. The harness is a separate repo that treats the product as its subject.',
    context: 'Brainstorm, 2026 — present',
  },
  {
    title: 'Anytype desktop client',
    blurb:
      'Founding front-end engineer. Built the client from scratch — open source, local-first, cross-platform across macOS, Windows and Linux. The features below are part of it.',
    context: 'Anytype, 2021 — 2026',
  },
  {
    title: 'Anytype — AI-native rewrite',
    blurb:
      'Ground-up rewrite of the desktop client, executed mostly solo through spec-driven development with Claude Code. Electron to Tauri v2, a custom contentEditable editor to Lexical, Sass to Tailwind v4, webpack to Vite and Bun, google-protobuf to ts-proto over gRPC streaming, and a new cross-platform bundler pipeline. It changed my sense of what one senior engineer can realistically own.',
    context: 'Anytype, 2025 — 2026',
  },
  {
    title: 'Block-based editor',
    blurb:
      'Rich-text editor with twenty-plus block types — text, headings, lists, tables, code, embeds, callouts, toggles, files, columns. Drag-and-drop reordering, slash commands, keyboard-first navigation.',
    context: 'Anytype, 2021 — 2026',
  },
  {
    title: 'Relational database UI',
    blurb:
      'Database surfaces with seven view types — grid, list, gallery, board, calendar, graph, timeline. Filters, sorts, grouping, row templates. The same dataset rendered through any view, kept in sync as filters change.',
    context: 'Anytype, 2021 — 2026',
  },
  {
    title: 'Interactive knowledge graph',
    blurb:
      'Force-directed visualization of every object and relation in a workspace. Custom layout over D3, reactive MobX stores, updates streamed from the local database. Pan, zoom, search, filter.',
    context: 'Anytype, 2021 — 2026',
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
    context: 'Anytype, 2021 — 2026',
  },
  {
    title: 'devtodev — platform redesign',
    blurb:
      'Ground-up redesign of a product-analytics SaaS for game developers. Improved retention and cut support-ticket volume by 40%. Also oversaw the move to a Greenplum cluster, which cut analytical query times by more than 60%.',
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
    'The spec is the unit of work: written first, reviewed like code, executed against. Subagents take research and isolated changes in parallel. Skills and hooks collapse the workflows I repeat weekly into one command. The awkward migrations went the same way — jQuery pulled out of the codebase, a full MobX-React-Lite conversion, rspack swapped for Vite and Bun — each one a spec the model worked through rather than a run of hand edits.',
  tail: 'It changed my sense of how much one engineer can own.',
} as const;

export const capabilities: Capability[] = [
  {
    title: 'Front-end architecture',
    body: 'Component systems, state machines, design tokens. Twenty-plus block types and seven database views sharing one object model — an architecture is only worth the name if it still holds at that count.',
  },
  {
    title: 'Real-time data layers',
    body: 'Reactive MobX stores over a gRPC event stream. Optimistic updates, local caching, conflict resolution — and a client-side contract that stays put while the middleware underneath keeps moving.',
  },
  {
    title: 'Cross-platform desktop',
    body: 'Tauri v2 with a Rust shell, Electron where it fits. Code signing, Apple notarization, installers for macOS, Windows and Linux — the release pipeline, not just the build.',
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

export type OpenSourceProject = {
  name: string;
  tagline: string;
  blurb: string;
  href: string;
  license: string;
  tech: string;
};

export const openSource: OpenSourceProject[] = [
  {
    name: 'swarm',
    tagline: 'Local-first control plane for AI-agent development',
    blurb:
      'Point it at any folder and it watches every Claude Code session on the machine — live tool calls, reasoning, token spend, cost — keeps a ledger of who holds which task, worktree and runtime resource, and streams it all to one dashboard. Zero instrumentation: it reads Claude Code’s own hooks and transcripts. No account, no telemetry, works offline.',
    href: 'https://github.com/ra3orblade/swarm',
    license: 'Apache-2.0',
    tech: 'TypeScript · Bun · SQLite · SSE · MCP',
  },
  {
    name: 'fancy-menus',
    tagline: 'Declarative, accessible React menu library',
    blurb:
      'Dropdowns, context menus, command palettes and popovers authored as typed config objects. The runtime handles positioning, keyboard navigation, virtualization, drag-reorder, sub-menu stacking, persistence and theming — headless, so the chrome is yours.',
    href: 'https://github.com/ra3orblade/fancy-menus',
    license: 'MIT',
    tech: 'React · TypeScript · Floating UI · TanStack Virtual · dnd-kit',
  },
];
