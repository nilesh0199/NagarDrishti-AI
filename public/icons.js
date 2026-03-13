/**
 * NagarDrishti AI - Professional SVG Icons (minimal, government dashboard style)
 */

const icons = {
  traffic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2-6 4 12 2-6h7"/><circle cx="6" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></svg>`,
  airQuality: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/><path d="M12 8v4l2 2"/></svg>`,
  transport: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="9" rx="1"/><path d="M7 16v1M17 16v1"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>`,
  energy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  water: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c-3 4-6 8-6 12a6 6 0 0 0 12 0c0-4-3-8-6-12z"/><path d="M12 3v18"/></svg>`
};

function getIcon(name) {
  if (name === 'aqi') return icons.airQuality;
  return icons[name] || icons.traffic;
}
