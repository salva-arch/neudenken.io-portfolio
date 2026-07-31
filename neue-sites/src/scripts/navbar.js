/**
 * navbar.js — Mobile navigation toggle with ARIA support
 */

/** Initialize mobile hamburger menu toggle. */
export function initMobileNav() {
  // Brand nav toggle (index page)
  const brandToggle = document.querySelector('.brand-nav-toggle');
  const brandLinks = document.querySelector('.header-bar .nav-links');
  if (brandToggle && brandLinks) {
    brandToggle.setAttribute('aria-expanded', 'false');
    brandToggle.setAttribute('aria-controls', 'brand-nav-links');
    brandLinks.id = 'brand-nav-links';

    brandToggle.addEventListener('click', () => {
      const isOpen = brandLinks.classList.toggle('open');
      brandToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Pill nav toggle (karriere/blog pages)
  const pillToggle = document.querySelector('.nav-toggle');
  const pillLinks = document.querySelector('.nav-links-pill');
  if (pillToggle && pillLinks) {
    pillToggle.setAttribute('aria-expanded', 'false');
    pillToggle.setAttribute('aria-controls', 'pill-nav-links');
    pillLinks.id = 'pill-nav-links';

    pillToggle.addEventListener('click', () => {
      const isOpen = pillLinks.classList.toggle('open');
      pillToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link, .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-links.open, .nav-links-pill.open').forEach(el => {
        el.classList.remove('open');
      });
      document.querySelectorAll('[aria-expanded="true"]').forEach(el => {
        el.setAttribute('aria-expanded', 'false');
      });
    });
  });
}
