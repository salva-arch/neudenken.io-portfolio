/**
 * Entry point for blog.html (Personal hub & blog)
 */


// ── Shared Scripts ─────────────────────────────────────────
import { initParticles } from '../scripts/particles.js'
import { initGlassSpotlight } from '../scripts/glass-spotlight.js'
import { initMobileNav } from '../scripts/navbar.js'

// ── Page Scripts ───────────────────────────────────────────
import { initBlogPage } from '../scripts/pages/blog.js'

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('antigravityCanvas')
  if (canvas) initParticles(canvas, { lineConnections: false })

  initGlassSpotlight()
  initMobileNav()

  // Page-specific systems
  initBlogPage()
})
