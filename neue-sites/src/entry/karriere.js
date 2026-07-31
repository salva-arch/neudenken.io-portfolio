/**
 * Entry point for karriere.html (Career portfolio page)
 */


// ── Shared Scripts ─────────────────────────────────────────
import { initParticles } from '../scripts/particles.js'
import { initGlassSpotlight } from '../scripts/glass-spotlight.js'
import { initScrollReveal } from '../scripts/scroll-reveal.js'
import { initConsoleSim } from '../scripts/console-log-sim.js'
import { initMobileNav } from '../scripts/navbar.js'

// ── Page Scripts ───────────────────────────────────────────
import { initKarrierePage } from '../scripts/pages/karriere.js'

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Particle engine without line connections
  const canvas = document.getElementById('antigravityCanvas')
  if (canvas) initParticles(canvas, { lineConnections: false })

  initGlassSpotlight()
  initScrollReveal()
  initMobileNav()

  // Workforce console logs
  initConsoleSim('workforceLog', [
    '<span class="c-system">[SYS] Workforce-Planer v3.2 initialized</span>',
    '<span class="c-ok">[OK] Schichtplan KW22 optimiert — A-Besetzung gesichert</span>',
    '<span class="c-accent">[AI] Urlaubsüberlappung erkannt → Alternativ-Routing aktiv</span>',
    '<span class="c-action">[ACTION] Springer-Pool benachrichtigt (3 Kandidaten)</span>',
    '<span class="c-ok">[OK] Compliance-Check bestanden: Pausenregelung §4 ArbZG</span>',
    '<span class="c-system">[SYNC] Outlook-Kalender synchronisiert</span>',
  ])

  // Page-specific systems
  initKarrierePage()
})
