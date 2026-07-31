/**
 * Entry point for index.html (Business page)
 * Imports all shared + page-specific styles and scripts.
 */


// ── Shared Scripts ─────────────────────────────────────────
import { initParticles } from '../scripts/particles.js'
import { initGlassSpotlight } from '../scripts/glass-spotlight.js'
import { initScrollReveal } from '../scripts/scroll-reveal.js'
import { initConsoleSim } from '../scripts/console-log-sim.js'
import { initMobileNav } from '../scripts/navbar.js'

// ── Page Scripts ───────────────────────────────────────────
import { initIndexPage } from '../scripts/pages/index.js'

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Particle engine with line connections
  const canvas = document.getElementById('antigravityCanvas')
  if (canvas) initParticles(canvas, { lineConnections: true })

  // Shared systems
  initGlassSpotlight()
  initScrollReveal()
  initMobileNav()

  // Flagship console logs
  initConsoleSim('flagshipConsole', [
    '<span class="c-system">[LOG] User \'Schichtleiter_S\' logged in from rottenburg.de-node</span>',
    '<span class="c-ok">[OK] Optimized schedule generated for CW 22 (A-Coverage secure)</span>',
    '<span class="c-system">[SYSTEM] Automatic sync to Outlook-Calendar completed successfully</span>',
    '<span class="c-accent">[LLM] Running verification query on holiday constraints...</span>',
    '<span class="c-ok">[OK] Conflict check: 0 conflicts detected in database</span>',
    '<span class="c-system">[LOG] Weekly backup stored at secure localized storage</span>',
  ])

  // Page-specific systems
  initIndexPage()
})
