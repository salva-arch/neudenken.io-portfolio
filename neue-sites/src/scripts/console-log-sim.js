/**
 * console-log-sim.js — Rotating console log simulator
 */

/**
 * Simulate rotating console log entries in a container element.
 * @param {string} elementId - ID of the container element
 * @param {string[]} logs - Array of HTML log strings
 * @param {number} [interval=4000] - Rotation interval in ms
 * @param {number} [maxLines=8] - Max visible log lines
 */
export function initConsoleSim(elementId, logs, interval = 4000, maxLines = 8) {
  const container = document.getElementById(elementId);
  if (!container || !logs.length) return;

  let logIndex = 0;

  setInterval(() => {
    const line = document.createElement('span');
    line.innerHTML = logs[logIndex];
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;

    if (container.children.length > maxLines) {
      container.removeChild(container.children[0]);
    }

    logIndex = (logIndex + 1) % logs.length;
  }, interval);
}
