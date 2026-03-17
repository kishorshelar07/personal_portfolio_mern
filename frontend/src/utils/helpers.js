/**
 * Shared utility helpers — Kishor Shelar Portfolio
 */

// ── Date ────────────────────────────────────────────────────────────────────
/**
 * Formats a JS Date or date string as "MMM DD, YYYY".
 * e.g.  formatDate(new Date()) → "Dec 01, 2024"
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day:   '2-digit',
    year:  'numeric',
  }).format(new Date(date));
};

// ── String ──────────────────────────────────────────────────────────────────
/**
 * Truncates a string to maxLen characters, appending "…" if cut.
 */
export const truncate = (str, maxLen = 100) =>
  str.length > maxLen ? `${str.slice(0, maxLen).trimEnd()}…` : str;

/**
 * Capitalises the first letter of every word.
 */
export const titleCase = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// ── DOM ─────────────────────────────────────────────────────────────────────
/**
 * Smooth-scrolls to an element by id.
 */
export const scrollToSection = (id, offset = 80) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ── Validation ──────────────────────────────────────────────────────────────
/**
 * Very simple email regex check.
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Numbers ─────────────────────────────────────────────────────────────────
/**
 * Clamps value between min and max.
 */
export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

// ── Class names ─────────────────────────────────────────────────────────────
/**
 * Joins class strings, filtering falsy values.
 *   cx('btn', isActive && 'btn--active') → "btn btn--active"
 */
export const cx = (...classes) => classes.filter(Boolean).join(' ');
