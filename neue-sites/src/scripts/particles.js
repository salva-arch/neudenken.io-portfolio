/**
 * particles.js — Zero-Gravity Interactive Particle Physics Engine
 * Configurable particle system with optional inter-particle line connections.
 */

/**
 * Initialize the particle physics engine on a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {Object} [options] - Configuration
 * @param {boolean} [options.lineConnections=true] - Draw lines between nearby particles
 * @param {number} [options.lineDistance=115] - Max distance for line connections
 * @param {boolean} [options.mouseRepel=true] - Particles react to mouse cursor
 * @param {number} [options.mouseRadius=180] - Mouse repel radius
 */
export function initParticles(canvas, options = {}) {
  const {
    lineConnections = true,
    lineDistance = 115,
    mouseRepel = true,
    mouseRadius = 180,
  } = options;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, targetX: null, targetY: null, radius: mouseRadius };
  let resizeTimeout;
  let isVisible = true;
  let animFrameId = null;

  if (mouseRepel) {
    document.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
      mouse.targetX = null;
      mouse.targetY = null;
    });
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseVx = (Math.random() - 0.5) * 0.22;
      this.baseVy = (Math.random() - 0.5) * 0.22;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(176, 77, 44, 0.45)' : 'rgba(74, 71, 65, 0.3)';
    }

    update() {
      if (mouseRepel) {
        if (mouse.x === null && mouse.targetX !== null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else if (mouse.x !== null && mouse.targetX !== null) {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        } else {
          mouse.x = null;
          mouse.y = null;
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const repVx = Math.cos(angle) * force * 1.6;
            const repVy = Math.sin(angle) * force * 1.6;
            this.vx += (repVx - this.vx) * 0.08;
            this.vy += (repVy - this.vy) * 0.08;
          } else {
            this.vx += (this.baseVx - this.vx) * 0.02;
            this.vy += (this.baseVy - this.vy) * 0.02;
          }
        } else {
          this.vx += (this.baseVx - this.vx) * 0.02;
          this.vy += (this.baseVy - this.vy) * 0.02;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      const pad = 20;
      if (this.x < -pad) this.x = canvas.width + pad;
      if (this.x > canvas.width + pad) this.x = -pad;
      if (this.y < -pad) this.y = canvas.height + pad;
      if (this.y > canvas.height + pad) this.y = -pad;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function createParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.max(50, Math.min(130, Math.floor((canvas.width * canvas.height) / 15000)));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
  }

  function animate() {
    if (!isVisible) {
      animFrameId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (lineConnections) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < lineDistance) {
            const alpha = (1 - (dist / lineDistance)) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(176, 77, 44, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    }

    animFrameId = requestAnimationFrame(animate);
  }

  // Visibility optimization: pause when canvas is not visible
  const visObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { isVisible = entry.isIntersecting; });
  }, { threshold: 0 });
  visObserver.observe(canvas);

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createParticles, 200);
  });

  createParticles();
  animate();

  return () => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    visObserver.disconnect();
  };
}
