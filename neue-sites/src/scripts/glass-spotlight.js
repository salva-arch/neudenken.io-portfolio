/**
 * glass-spotlight.js — Cursor tracking for glass cards and grid backdrop
 */

/** Initialize cursor tracking for glass-card spotlight effect and grid backdrop. */
export function initGlassSpotlight() {
  document.addEventListener('mousemove', (e) => {
    // Grid backdrop mouse tracking
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Glass card local spotlight
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}
