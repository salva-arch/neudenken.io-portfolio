/* ==========================================================
   pages/karriere.js — Javascript unique to the Karriere page
   ========================================================== */

export const thesisTexts = [
  "Sie scheitert daran, dass zwischen den Schichten — strategisch, organisatorisch, räumlich — <span class='mark'>niemand beide Sprachen fließend spricht</span>.<br><br>Ich spreche beide. Seit zwanzig Jahren.",
  "Der Schwerpunkt liegt in der <strong>Brückenbildung</strong>. Klassische IT-Berater kennen die Theorie. Die Fläche kennt die Praxis. Ich kenne beides: Die IT-Infrastruktur im Hintergrund <em>und</em> die operative Schicht um 6 Uhr morgens.",
  "Das belegt ein produktives Tool im echten Einsatz, hervorragende Change-Dialoge in SuccessFactors — und die offizielle Präsentation meines Workforce-Planers vor dem <span class='mark'>Unternehmens-Führungskreis</span>."
];

export function initKarrierePage() {
  const thesisBodyEl = document.querySelector('.thesis-body');
  const thesisNavs = [
    document.getElementById('th-nav-1'),
    document.getElementById('th-nav-2'),
    document.getElementById('th-nav-3')
  ];
  
  thesisNavs.forEach((nav, idx) => {
    if (nav) {
      nav.style.cursor = 'pointer';
      nav.addEventListener('click', () => {
        thesisNavs.forEach(n => n.classList.remove('active'));
        nav.classList.add('active');
        if (thesisBodyEl) {
          thesisBodyEl.style.opacity = 0;
          
          setTimeout(() => {
            thesisBodyEl.innerHTML = `<p>${thesisTexts[idx]}</p>`;
            thesisBodyEl.style.opacity = 1;
            thesisBodyEl.style.transition = 'opacity 0.4s ease';
          }, 200);
        }
      });
    }
  });
}
