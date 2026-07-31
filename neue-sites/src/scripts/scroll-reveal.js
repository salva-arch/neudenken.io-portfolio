/**
 * scroll-reveal.js — IntersectionObserver-based scroll reveal
 */

/**
 * Initialize scroll reveal animations for elements matching the selector.
 * @param {string} [selector='.scroll-reveal'] - CSS selector for elements to reveal
 */
export function initScrollReveal(selector = '.scroll-reveal') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}
