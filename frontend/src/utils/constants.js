/**
 * Single source of truth for all portfolio content.
 * Update this file to personalise the portfolio.
 */

// ── Personal ─────────────────────────────────────────────────────────────────
export const PERSONAL = {
  name:       'Kishor Shelar',
  firstName:  'Kishor',
  lastName:   'Shelar',
  title:      'Full-Stack Developer',
  location:   'Pune, Maharashtra, India',
  email:      'kishorshelar@gmail.com',
  phone:      '+91 83085 16345',
  github:     'https://github.com/kishorshelar07',
  linkedin:   'https://www.linkedin.com/in/kishorshelar1610/',
  website:    'https://kishorshelar.dev',
  resume:     '/resume.pdf',
  available:  true,
  bio:        'Aspiring Full-Stack Developer with training and internship experience in building responsive web applications, APIs, and full-stack solutions. Skilled in front-end development, problem solving, and the software development lifecycle.',
};

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',      to: 'about'      },
  { label: 'Skills',     to: 'skills'     },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects',   to: 'projects'   },
  { label: 'Services',   to: 'services'   },
  { label: 'Blog',       to: 'blog'       },
  { label: 'Contact',    to: 'contact'    },
];

// ── Hero typing phrases ───────────────────────────────────────────────────────
export const TYPING_PHRASES = [
  'Full-Stack Developer',
  'React JS Developer',
  'Node.js Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

// ── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { num: '1+',  label: 'Year Exp' },
  { num: '10+', label: 'Projects' },
  { num: '5+',  label: 'Tech Stack' },
];

// ── Social links ─────────────────────────────────────────────────────────────
export const SOCIALS = [
  { icon: 'bi-github',       href: PERSONAL.github,   label: 'GitHub'   },
  { icon: 'bi-linkedin',     href: PERSONAL.linkedin,  label: 'LinkedIn' },
  { icon: 'bi-envelope-fill', href: `mailto:${PERSONAL.email}`, label: 'Email' },
  { icon: 'bi-telephone-fill', href: `tel:${PERSONAL.phone.replace(/\s/g, '')}`, label: 'Phone' },
];

// ── Theme ────────────────────────────────────────────────────────────────────
export const THEME_STORAGE_KEY = 'portfolio_theme';

// ── API ──────────────────────────────────────────────────────────────────────
export const API_BASE =
  process.env.REACT_APP_API_URL || '/api';
