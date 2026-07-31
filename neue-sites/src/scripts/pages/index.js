/* ==========================================================
   pages/index.js — Javascript unique to the Business page
   ========================================================== */

// ── B2B HERO KPI COUNTER ENGINE ───────────────────────────
const animateKpi = (el, target, suffix = '', dur = 1600) => {
  if (!el) return;
  const start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const heroObs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    animateKpi(document.getElementById('heroK1'), 127);
    animateKpi(document.getElementById('heroK2'), 20, 'h');
    animateKpi(document.getElementById('heroK3'), 14);
    heroObs.disconnect();
  }
}), { threshold: 0.3 });

export function initHeroKpi() {
  const hp = document.querySelector('.hero-preview');
  if (hp) heroObs.observe(hp);
}

// ── INTERACTIVE IDE WORKSPACE ENGINE ───────────────────────
export function switchIdeTab(tabId) {
  document.querySelectorAll('.ide-node').forEach(node => {
    node.classList.remove('active');
  });
  const activeNode = document.getElementById(`node-${tabId}`);
  if (activeNode) activeNode.classList.add('active');
  
  const tabTitle = document.getElementById('tab-title');
  if (tabTitle) {
    tabTitle.innerText = `${tabId}.${tabId === 'bausteine' ? 'json' : (tabId === 'begleitung' ? 'log' : 'doc')}`;
  }
  
  document.querySelectorAll('.editor-content-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  const activePane = document.getElementById(`pane-${tabId}`);
  if (activePane) activePane.classList.add('active');
}

// ── ACCORDION AUDIT LOG ENGINE ────────────────────────────
export function toggleLog(logId) {
  const item = document.getElementById(logId);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  
  document.querySelectorAll('.log-item').forEach(el => {
    el.classList.remove('open');
    const body = el.querySelector('.log-body');
    if (body) body.style.maxHeight = null;
  });
  
  if (!isOpen) {
    item.classList.add('open');
    const body = item.querySelector('.log-body');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ── SIMULATED CONNECTION SUBMIT (CONTACT PORTAL) ──────────
export function simulateFormSubmit() {
  const button = document.querySelector('.portal-btn-trigger');
  if (!button) return;
  button.innerText = '[VERBINDUNG WIRD HERGESTELLT...]';
  button.style.borderColor = 'var(--accent-copper)';
  button.style.color = 'var(--accent-copper)';
  
  setTimeout(() => {
    button.innerText = '[KANAL GEÖFFNET ✓]';
    button.style.borderColor = 'var(--accent-moss)';
    button.style.color = 'var(--accent-moss)';
    button.style.boxShadow = '0 0 20px rgba(78, 122, 83, 0.3)';
    
    const line = document.createElement('div');
    line.style.marginTop = '12px';
    line.style.color = 'var(--term-ink-secondary)';
    line.style.lineHeight = '1.6';
    line.innerHTML = '<span style="color: var(--accent-moss);">[SUCCESS]</span> Direkter Mail-Tunnel zu <a href="mailto:salva@neudenken.io" style="color: var(--accent-sienna); text-decoration: underline; text-underline-offset: 3px;">salva@neudenken.io</a> initiiert. Schreibe mir!';
    
    const screen = document.querySelector('.portal-screen');
    if (screen) screen.appendChild(line);
  }, 1500);
}

// ── MODAL ENGINE ──────────────────────────────────────────
export function openModal(id) {
  const m = document.getElementById('modal-' + id);
  if (m) {
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(id) {
  const m = document.getElementById('modal-' + id);
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── LIVE DEMO SIMULATOR ALGORITHMS ────────────────────────
const examples = {
  'voice-1': 'Zwei Wasserhähne in der Küche von Familie Müller gewechselt, neuen Durchlauferhitzer installiert, insgesamt 3 Stunden gearbeitet.',
  'voice-2': 'Bei Herrn Schmidt komplette Küchenbeleuchtung erneuert, 4 LED-Spots und einen Dimmer installiert, 2,5 Stunden vor Ort.',
  'voice-3': 'Jährliche Heizungswartung bei Familie Weber, Brenner gewartet, Heizkörper entlüftet, 1,5 Stunden Arbeit.',
  'wa-1': 'Hallo! Mein Wasserhahn in der Küche tropft seit gestern. Können Sie kurzfristig kommen? Danke!',
  'wa-2': 'Hi, brauche dringend nen Elektriker. Sicherung fliegt immer raus wenn ich den Wasserkocher anmache.',
  'wa-3': 'Guten Tag, meine Heizung wird nicht mehr warm obwohl der Kessel läuft. Was könnte das sein?',
  'azu-1': 'Kassenbereich: Geld reingesteckt, Kunden abgerechnet. Leergut: Flaschen angenommen. Warenverräumung: Paletten leer gemacht.',
  'azu-2': 'Inventur am Samstag mitgemacht. Habe Obst und Gemüse gezählt und in die Liste eingetragen. War interessant.',
  'azu-3': 'Tiefkühlware kontrolliert: Temperaturen abgelesen, MHD geprüft. Der Ausbilder hat mir HACCP gezeigt.',
};

// Math & Formatting Helpers
const todayDE = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
};
const invNum = () => `RE-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900)+100)}`;
const eur = n => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';
const hours = t => {
  const m = t.match(/(\d+(?:[,\.]\d+)?)\s*(?:Stunden|h|Std)/i);
  return m ? parseFloat(m[1].replace(',', '.')) : 2;
};
const customer = t => {
  const f = t.match(/Familie\s+([A-ZÄÖÜ][a-zäöüß]+)/); if (f) return 'Familie ' + f[1];
  const h = t.match(/Herr(?:n)?\s+([A-ZÄÖÜ][a-zäöüß]+)/); if (h) return 'Herr ' + h[1];
  return 'Musterkunde GmbH';
};
const trade = t => {
  const l = t.toLowerCase();
  if (/wasser|rohr|abfluss|spüle|sanitär|durchlauferhitzer|heizung|brenner|thermostat|heizkörper|öl|kessel/.test(l)) return 'sanitaer';
  if (/elektr|strom|sicherung|steckdose|leitung|spots?|dimmer|licht|beleuchtung|schalter|kabel/.test(l)) return 'elektro';
  return 'allg';
};

const calculateItems = text => {
  const h = hours(text);
  const tr = trade(text);
  const rate = tr === 'elektro' ? 72 : tr === 'sanitaer' ? 68 : 62;
  const arr = [{ qty: h, unit: 'Std.', desc: tr === 'elektro' ? 'Elektrotechnik-Fachleistung' : tr === 'sanitaer' ? 'Sanitär- und Heizungs-Montage' : 'Fachliche Arbeitszeit', price: rate, total: h * rate }];
  
  const t = text.toLowerCase();
  if (t.includes('wasserhahn') || t.includes('wasserhähne')) {
    const c = t.includes('zwei') || t.includes('2 ') ? 2 : 1;
    arr.push({ qty: c, unit: 'Stk.', desc: 'Hochwertiger Einhandmischer (Grohe)', price: 89, total: c * 89 });
  }
  if (t.includes('durchlauferhitzer')) {
    arr.push({ qty: 1, unit: 'Stk.', desc: 'Elektronischer Durchlauferhitzer 21kW', price: 459, total: 459 });
  }
  if (t.includes('led-spot') || t.includes('led spot') || t.includes('spots')) {
    const m = t.match(/(\d+)\s*led/);
    const c = m ? parseInt(m[1]) : 4;
    arr.push({ qty: c, unit: 'Stk.', desc: 'LED-Einbau-Spot warmweiß IP44', price: 24.5, total: c * 24.5 });
  }
  if (t.includes('dimmer')) {
    arr.push({ qty: 1, unit: 'Stk.', desc: 'Universaldimmer LED Phasenabschnitt', price: 42, total: 42 });
  }
  if (t.includes('brenner') && t.includes('wartung')) {
    arr.push({ qty: 1, unit: 'Pausch.', desc: 'Öl-/Gasbrennerwartung inkl. Verschleißteilesatz', price: 98, total: 98 });
  }
  if (t.includes('heizkörper') && t.includes('entlüft')) {
    arr.push({ qty: 1, unit: 'Pausch.', desc: 'Entlüftung und Funktionsprüfung Heizkörper', price: 42, total: 42 });
  }
  
  arr.push({ qty: 1, unit: 'Pausch.', desc: 'Rüstzeit- & Anfahrtspauschale Zone 1', price: 25, total: 25 });
  return arr;
};

const emptyOutput = (el, ic, msg) => {
  if (el) el.innerHTML = `<div class="empty"><div class="ic">${ic}</div><p>${msg}</p></div>`;
};

// Reusable animated brain SVG for all demo processing states
const demoBrainSVG = `<svg class="demo-brain-svg" viewBox="0 0 100 100" fill="none">
  <line class="db-conn" x1="46" y1="10" x2="23.6" y2="19.6"/>
  <line class="db-conn" x1="46" y1="10" x2="46.4" y2="41"/>
  <line class="db-conn" x1="23.6" y1="19.6" x2="9.8" y2="41.2"/>
  <line class="db-conn" x1="71.4" y1="19.6" x2="90.4" y2="37"/>
  <line class="db-conn" x1="71.4" y1="19.6" x2="61.9" y2="41.4"/>
  <line class="db-conn" x1="90.4" y1="37" x2="89.8" y2="60.8"/>
  <line class="db-conn" x1="46.4" y1="41" x2="22" y2="59"/>
  <line class="db-conn" x1="9.8" y1="41.2" x2="22" y2="59"/>
  <line class="db-conn" x1="61.9" y1="41.4" x2="89.8" y2="60.8"/>
  <line class="db-conn" x1="49" y1="64.4" x2="69.4" y2="69.9"/>
  <line class="db-conn" x1="49" y1="64.4" x2="61.8" y2="89.7"/>
  <path class="db-conn" d="M46,10 Q59,10 71.4,19.6" fill="none"/>
  <path class="db-conn" d="M89.8,60.8 Q95,72 69.4" fill="none"/>
  <line class="db-flow dbf-1"  x1="46" y1="10" x2="23.6" y2="19.6"/>
  <line class="db-flow dbf-2"  x1="46" y1="10" x2="46.4" y2="41"/>
  <line class="db-flow dbf-3"  x1="23.6" y1="19.6" x2="9.8" y2="41.2"/>
  <line class="db-flow dbf-4"  x1="71.4" y1="19.6" x2="90.4" y2="37"/>
  <line class="db-flow dbf-5"  x1="71.4" y1="19.6" x2="61.9" y2="41.4"/>
  <line class="db-flow dbf-6"  x1="90.4" y1="37" x2="89.8" y2="60.8"/>
  <line class="db-flow dbf-7"  x1="46.4" y1="41" x2="22" y2="59"/>
  <line class="db-flow dbf-8"  x1="9.8" y1="41.2" x2="22" y2="59"/>
  <line class="db-flow dbf-9"  x1="61.9" y1="41.4" x2="89.8" y2="60.8"/>
  <line class="db-flow dbf-10" x1="49" y1="64.4" x2="69.4" y2="69.9"/>
  <line class="db-flow dbf-11" x1="49" y1="64.4" x2="61.8" y2="89.7"/>
  <path class="db-flow dbf-c1" d="M46,10 Q59,10 71.4,19.6" fill="none"/>
  <path class="db-flow dbf-c2" d="M89.8,60.8 Q95,72 69.4,69.9" fill="none"/>
  <circle class="db-node" cx="46" cy="10" r="5.5"/>
  <circle class="db-node" cx="23.6" cy="19.6" r="5.5"/>
  <circle class="db-node" cx="71.4" cy="19.6" r="5.5"/>
  <circle class="db-node" cx="90.4" cy="37" r="5.5"/>
  <circle class="db-node" cx="46.4" cy="41" r="5"/>
  <circle class="db-node" cx="9.8" cy="41.2" r="5.5"/>
  <circle class="db-node" cx="61.9" cy="41.4" r="5"/>
  <circle class="db-node" cx="22" cy="59" r="5.5"/>
  <circle class="db-node" cx="89.8" cy="60.8" r="5.5"/>
  <circle class="db-node" cx="49" cy="64.4" r="5.5"/>
  <circle class="db-node" cx="69.4" cy="69.9" r="5"/>
  <circle class="db-node" cx="61.8" cy="89.7" r="4.5"/>
  <circle class="db-np dbnp-1"  cx="46" cy="10" r="5.5"/>
  <circle class="db-np dbnp-2"  cx="23.6" cy="19.6" r="5.5"/>
  <circle class="db-np dbnp-3"  cx="71.4" cy="19.6" r="5.5"/>
  <circle class="db-np dbnp-4"  cx="90.4" cy="37" r="5.5"/>
  <circle class="db-np dbnp-5"  cx="46.4" cy="41" r="5"/>
  <circle class="db-np dbnp-6"  cx="9.8" cy="41.2" r="5.5"/>
  <circle class="db-np dbnp-7"  cx="61.9" cy="41.4" r="5"/>
  <circle class="db-np dbnp-8"  cx="22" cy="59" r="5.5"/>
  <circle class="db-np dbnp-9"  cx="89.8" cy="60.8" r="5.5"/>
  <circle class="db-np dbnp-10" cx="49" cy="64.4" r="5.5"/>
  <circle class="db-np dbnp-11" cx="69.4" cy="69.9" r="5"/>
  <circle class="db-np dbnp-12" cx="61.8" cy="89.7" r="4.5"/>
</svg>`;

const getWhatsAppResponse = text => {
  const t = text.toLowerCase();
  let problem = 'Ihres Anliegens';
  let scope = '80–150 €';
  let schedule = 'in dieser Woche';
  
  if (/wasserhahn|tropf|kristall/.test(t)) {
    problem = 'des tropfenden Wasserhahns';
    scope = '90–130 €';
    schedule = 'in den nächsten 1–2 Werktagen';
  } else if (/sicherung|strom|elektriker|kocher/.test(t)) {
    problem = 'des Sicherungs-Ausfalls';
    scope = '95–180 €';
    schedule = 'heute Nachmittag oder morgen früh';
  } else if (/heizung|warm|kessel|störung/.test(t)) {
    problem = 'der Heizungsstörung';
    scope = '120–250 €';
    schedule = 'in den nächsten 2 Werktagen';
  }
  
  return `Hallo! Vielen Dank für Ihre Nachricht.\n\nDie Behebung ${problem} ist in der Regel schnell erledigt. Um das Problem endgültig zu lösen, schlage ich eine kurze Überprüfung vor Ort vor.\n\nTermin-Option: Wir hätten Zeit am ${schedule}, idealerweise vormittags.\n\nKostenrahmen: Erfahrungsgemäß belaufen sich die Kosten bei solchen Aufträgen auf ca. ${scope} brutto (inkl. Anfahrt & Kleinmaterial).\n\nSoll ich den Termin für Sie einplanen?\n\nBeste Grüße,\nHaustechnik Docimo`;
};

const getAzubiAudit = text => {
  const t = text.toLowerCase();
  let topic = 'Allgemeines Anliegen';
  let status = 'yellow';
  let rating = '🟡 Nachbesserung ratsam';
  let matrix = 'Ausbildungsrahmenplan · Modul unbestimmt';
  let files = 'Keine verknüpften Standards';
  let copy = '';
  let errors = [];
  let nextSteps = [];

  if (/kasse|geld|abrechn|leergut|flasche|verräum|palette/.test(t)) {
    topic = 'Kassensystem & Warenprozess';
    status = 'red';
    rating = '🔴 Überarbeitung zwingend';
    matrix = 'Ausbildungsrahmenplan § 4 Abs. 2 · Kassieren';
    files = 'kassenprozess_standard.pdf · leergut_annahme.pdf · fifo_regeln.pdf';
    copy = `• Eigenständige Durchführung von Kassiervorgängen unter Anleitung\n• Leergutannahme und Abrechnung des Leergutbons\n• Durchführung von MHD-Kontrollen bei Regalkomponenten\n\nIch habe den Kassenabschluss mit Frau/Herrn [Name] begleitet. Hierbei lernte ich den ordnungsgemäßen Abgleich des Ist-Bestandes mit dem System-Soll sowie die Durchführung von Korrekturbuchungen (Stornierungen).`;
    errors = [
      '<strong>Unpräzises Vokabular:</strong> Ausdrücke wie "Geld reingesteckt" entsprechen nicht dem IHK-Standard.',
      '<strong>Unterweisung unvollständig:</strong> Wer hat den Prozess angeleitet? (Namensnennung fehlt).'
    ];
    nextSteps = [
      '1. Nutze IHK-Fachbegriffe wie "Zahlungsverkehr abwickeln".',
      '2. Nenne stets deinen Ausbildungsbeauftragten für diese Woche.',
      '3. Beschreibe die erlernte Fehlerkorrektur (Storno-Ablauf) fachlich.'
    ];
  } else if (/inventur|zählen|obst|gemüse/.test(t)) {
    topic = 'Bestandsführung & Inventur';
    status = 'yellow';
    rating = '🟡 Mehr Tiefe benötigt';
    matrix = 'Ausbildungsrahmenplan § 4 Abs. 6 · Bestandsmanagement';
    files = 'inventur_richtlinien.pdf · warenerfassung.pdf';
    copy = `• Mitwirkung bei der jährlichen Bestandsinventur der Frischwaren\n• Mengenmäßige Erfassung im Handheld-Terminal (MDE)\n• Abgleich nach dem Vier-Augen-Prinzip zur Fehlerminimierung\n\nUnter Aufsicht des Ausbilders wirkte ich bei der jährlichen Vollinventur im Frischebereich mit. Ich erlernte die systematische Zählung und die Dokumentation von Abweichungen.`;
    errors = [
      '<strong>Gedankliche Reflexion fehlt:</strong> Sätze wie "War interessant" haben keinen fachlichen Gehalt.',
      '<strong>Prozessablauf fehlt:</strong> Wie wurden Abweichungen erfasst?'
    ];
    nextSteps = [
      '1. Reflektiere den Sinn der Inventur (Gewinn-/Verlustrechnung).',
      '2. Verwende Fachbegriffe wie "MDE-Gerät" statt "Liste".',
      '3. Erkläre das genutzte Zählverfahren kurz.'
    ];
  } else if (/tiefkühl|mhd|haccp|temperatur|aussortier/.test(t)) {
    topic = 'Qualitätssicherung (HACCP) & MHD';
    status = 'green';
    rating = '🟢 IHK-konform & Solide';
    matrix = 'Ausbildungsrahmenplan § 4 Abs. 9 · Hygiene & Qualität';
    files = 'haccp_protokoll.pdf · tiefkuehlkette_richtlinie.pdf';
    copy = `• Durchführung von täglichen Temperaturmessungen im TK-Bereich\n• Kontrolle des Mindesthaltbarkeitsdatums (MHD) nach FIFO-Methode\n• Dokumentation im offiziellen HACCP-Formblatt\n\nIch führte selbstständig die Temperaturkontrolle der Tiefkühltruhen durch. Der Ausbilder unterwies mich im HACCP-Protokoll und erklärte das Vorgehen bei Abweichungen von den Grenzwerten.`;
    errors = [
      '<strong>Sehr gut dokumentiert:</strong> Fachliche Begriffe sind exakt getroffen.',
      '<strong>Optimierung:</strong> Trage noch die konkrete Solltemperatur (-18 °C) ein.'
    ];
    nextSteps = [
      '1. Halte diesen detaillierten Schreibstil unbedingt bei.',
      '2. Ergänze im nächsten Bericht Kennzahlen (Grenzwerte).',
      '3. Verknüpfe den Eintrag direkt mit dem IHK-Hygienebaustein.'
    ];
  }

  return { topic, status, rating, matrix, files, copy, errors, nextSteps };
};

export function initDemoSimulator() {
  // Tab switching
  document.querySelectorAll('.demo-tab').forEach(t => t.addEventListener('click', () => {
    const target = t.dataset.tab;
    document.querySelectorAll('.demo-tab').forEach(x => x.classList.toggle('active', x.dataset.tab === target));
    document.querySelectorAll('.demo-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === target));
  }));

  // Example chip pre-filling
  document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    const k = c.dataset.example;
    const panel = c.closest('.demo-panel').dataset.panel;
    const id = panel === 'voice' ? 'voice-input' : panel === 'whatsapp' ? 'wa-input' : 'azu-input';
    const inp = document.getElementById(id);
    if (inp) {
      inp.value = examples[k];
      inp.focus();
    }
  }));

  // Voice Simulator Process Button
  const voiceProc = document.getElementById('voice-process');
  if (voiceProc) {
    voiceProc.addEventListener('click', () => {
      const inp = document.getElementById('voice-input');
      const out = document.getElementById('voice-output');
      if (!inp || !out) return;
      const text = inp.value.trim();
      if (!text) { inp.focus(); return; }
      
      voiceProc.disabled = true;
      out.innerHTML = `<div class="processing">${demoBrainSVG}<div class="status" id="vs">KI analysiert Diktat<span class="step">Leistungen &amp; Materialien werden extrahiert…</span></div></div>`;
      
      setTimeout(() => {
        const s = document.getElementById('vs');
        if (s) s.innerHTML = 'Kalkuliere Rechnungsposten<span class="step">Errechne Zwischensummen, MwSt. und PDF-Struktur…</span>';
      }, 1000);
      
      setTimeout(() => {
        const a = calculateItems(text);
        const c = customer(text);
        const sub = a.reduce((sum, item) => sum + item.total, 0);
        const tax = sub * 0.19;
        const total = sub + tax;
        
        out.innerHTML = `
          <div class="invoice">
            <div class="hd">
              <div class="co">
                Docimo Haustechnik
                <small>Meisterbetrieb · Untere Klingen 15 · 72406 Bisingen</small>
              </div>
              <div class="dt">Rechnung</div>
            </div>
            <div class="meta">
              <div><div class="fld">Rechnungsnummer</div><strong>${invNum()}</strong></div>
              <div><div class="fld">Rechnungsdatum</div><strong>${todayDE()}</strong></div>
              <div><div class="fld">Leistungsempfänger</div><strong>${c}</strong></div>
              <div><div class="fld">Leistungszeitraum</div><strong>${todayDE()}</strong></div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Menge</th>
                  <th>Einh.</th>
                  <th>Leistungsbezeichnung</th>
                  <th style="text-align:right">Einzel</th>
                  <th style="text-align:right">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(item => `
                  <tr>
                    <td>${item.qty.toString().replace('.', ',')}</td>
                    <td>${item.unit}</td>
                    <td>${item.desc}</td>
                    <td style="text-align:right">${eur(item.price)}</td>
                    <td style="text-align:right">${eur(item.total)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="totals">
              <div class="row"><span>Nettobetrag</span><span>${eur(sub)}</span></div>
              <div class="row"><span>Umsatzsteuer 19 %</span><span>${eur(tax)}</span></div>
              <div class="row final"><span>Bruttobetrag</span><span>${eur(total)}</span></div>
            </div>
          </div>
          <div class="inv-actions">
            <button class="ghost" id="btn-pdf-dl">PDF herunterladen</button>
            <button class="ghost" id="btn-lex-sync">lexoffice</button>
            <button class="ghost" id="btn-datev-exp">DATEV</button>
          </div>
        `;
        
        // Add event listeners to dynamic buttons
        document.getElementById('btn-pdf-dl').addEventListener('click', () => alert('PDF-Download läuft (simuliert)...'));
        document.getElementById('btn-lex-sync').addEventListener('click', () => alert('lexoffice Schnittstelle aufgerufen (simuliert)...'));
        document.getElementById('btn-datev-exp').addEventListener('click', () => alert('DATEV Export bereitgestellt (simuliert)...'));

        voiceProc.disabled = false;
      }, 2400);
    });
  }

  // Voice Simulator Reset Button
  const voiceReset = document.getElementById('voice-reset');
  if (voiceReset) {
    voiceReset.addEventListener('click', () => {
      const inp = document.getElementById('voice-input');
      const out = document.getElementById('voice-output');
      if (inp) inp.value = '';
      emptyOutput(out, '§', 'Hier erscheint gleich Ihre fertige Rechnung.');
    });
  }

  // WhatsApp Simulator Process Button
  const waProc = document.getElementById('wa-process');
  if (waProc) {
    waProc.addEventListener('click', () => {
      const inp = document.getElementById('wa-input');
      const out = document.getElementById('wa-output');
      if (!inp || !out) return;
      const text = inp.value.trim();
      if (!text) { inp.focus(); return; }
      
      waProc.disabled = true;
      out.innerHTML = `<div class="processing">${demoBrainSVG}<div class="status">Erkenne Kundenanliegen<span class="step">Dringlichkeit &amp; Schadensklassifizierung werden berechnet…</span></div></div>`;
      
      setTimeout(() => {
        const cleanText = text.replace(/</g, '&lt;');
        const formattedResp = getWhatsAppResponse(text).replace(/</g, '&lt;').replace(/\n/g, '<br>');
        
        out.innerHTML = `
          <div class="wa-out-wrap">
            <div class="wa-msg wa-in">
              <span class="wa-lbl">Kunden-WhatsApp</span>
              ${cleanText}
            </div>
            <div class="wa-msg wa-resp">
              <span class="wa-lbl">Profi-Antwort · KI-Vorschlag</span>
              ${formattedResp}
            </div>
          </div>
          <div class="inv-actions">
            <button class="ghost" id="btn-wa-copy">Kopieren</button>
            <button class="ghost" id="btn-wa-var">Variante generieren</button>
          </div>
        `;
        
        document.getElementById('btn-wa-copy').addEventListener('click', () => {
          const respMsg = document.querySelector('.wa-resp');
          if (respMsg) {
            navigator.clipboard.writeText(respMsg.innerText.replace('Ihre Antwort · KI-Entwurf\n', ''));
            alert('Vorschlag in Zwischenablage kopiert!');
          }
        });
        document.getElementById('btn-wa-var').addEventListener('click', () => alert('Variante wird erzeugt (simuliert)...'));

        waProc.disabled = false;
      }, 1900);
    });
  }

  // WhatsApp Simulator Reset Button
  const waReset = document.getElementById('wa-reset');
  if (waReset) {
    waReset.addEventListener('click', () => {
      const inp = document.getElementById('wa-input');
      const out = document.getElementById('wa-output');
      if (inp) inp.value = '';
      emptyOutput(out, '"', 'Hier erscheint gleich Ihre professionelle Antwort.');
    });
  }

  // Azubi Audit Simulator Process Button
  const azuProc = document.getElementById('azu-process');
  if (azuProc) {
    azuProc.addEventListener('click', () => {
      const inp = document.getElementById('azu-input');
      const out = document.getElementById('azu-output');
      if (!inp || !out) return;
      const text = inp.value.trim();
      if (!text) { inp.focus(); return; }
      
      azuProc.disabled = true;
      out.innerHTML = `<div class="processing">${demoBrainSVG}<div class="status" id="as">IHK-Auditierung läuft<span class="step">Gleiche Berichtstext mit Ausbildungsrahmenplan ab…</span></div></div>`;
      
      setTimeout(() => {
        const s = document.getElementById('as');
        if (s) s.innerHTML = 'Prüfe betriebliche Standard-Dateien<span class="step">Analysiere verknüpfte Prozesskarten des Handwerksbetriebs…</span>';
      }, 1000);

      setTimeout(() => {
        const r = getAzubiAudit(text);
        
        out.innerHTML = `
          <div class="az-result">
            <div class="az-card">
              <div class="head">
                <h4>Audit-Ergebnis</h4>
                <span class="az-status ${r.status}">${r.rating}</span>
              </div>
              <div class="lbl">Erkanntes Lerngebiet</div>
              <div class="val"><strong>${r.topic}</strong></div>
              <div class="lbl">IHK Zuordnung</div>
              <div class="val">${r.matrix}</div>
              <div class="lbl">Betriebliche Prozesskarten</div>
              <div class="val" style="font-family:var(--font-mono); font-size:10.5px; color:var(--accent-sienna);">${r.files}</div>
            </div>
            
            <div class="az-card">
              <div class="head">
                <h4>DATEI A · Ready-to-Copy (IHK-Text)</h4>
              </div>
              <div class="val" style="white-space:pre-wrap; font-size:12.5px; background:rgba(242, 238, 229, 0.5); padding:14px; border-radius:6px; border:1px solid var(--border-glow); line-height: 1.5; color:var(--ink-primary);">${r.copy}</div>
            </div>
            
            <div class="az-card">
              <div class="head">
                <h4>DATEI B · Feedback für den Azubi</h4>
              </div>
              ${r.errors.map(err => `<div class="val" style="margin-bottom:8px; padding-left:12px; border-left:2px solid var(--accent-sienna); line-height: 1.4;">${err}</div>`).join('')}
            </div>
            
            <div class="az-card">
              <div class="head">
                <h4>DATEI C · Top 3 To-Dos für nächste Woche</h4>
              </div>
              ${r.nextSteps.map(step => `<div class="val" style="margin-bottom:6px; font-weight:500;">${step}</div>`).join('')}
            </div>
          </div>
          <div class="inv-actions">
            <button class="ghost" id="btn-file-a">Datei A</button>
            <button class="ghost" id="btn-file-b">Datei B</button>
            <button class="ghost" id="btn-log-reg">Logbuch eintragen</button>
          </div>
        `;
        
        document.getElementById('btn-file-a').addEventListener('click', () => alert('Datei A exportiert (simuliert)...'));
        document.getElementById('btn-file-b').addEventListener('click', () => alert('Datei B an Azubi versendet (simuliert)...'));
        document.getElementById('btn-log-reg').addEventListener('click', () => alert('Logbuch aktualisiert (simuliert)...'));

        azuProc.disabled = false;
      }, 2500);
    });
  }

  // Azubi Audit Simulator Reset Button
  const azuReset = document.getElementById('azu-reset');
  if (azuReset) {
    azuReset.addEventListener('click', () => {
      const inp = document.getElementById('azu-input');
      const out = document.getElementById('azu-output');
      if (inp) inp.value = '';
      emptyOutput(out, '⎈', 'Hier erscheint gleich der IHK-konforme Audit-Report.');
    });
  }
}

// ── PORTFOLIO LOADER OBSERVER ─────────────────────────────
export function initPortfolioLoader() {
  const pfLoaderOverlay = document.getElementById('pfLoaderOverlay');
  const pfLoaderWrap = pfLoaderOverlay ? pfLoaderOverlay.closest('.pf-loader-wrap') : null;
  if (pfLoaderOverlay && pfLoaderWrap) {
    let pfLoaderFired = false;
    const pfLoaderObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !pfLoaderFired) {
          pfLoaderFired = true;
          setTimeout(() => {
            pfLoaderOverlay.classList.add('fade-out');
            pfLoaderWrap.classList.add('loaded');
            setTimeout(() => {
              pfLoaderOverlay.classList.add('hidden');
              pfLoaderWrap.querySelectorAll('.scroll-reveal').forEach(el => {
                el.classList.add('visible');
              });
            }, 800);
          }, 2200);
          pfLoaderObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const pfAnchor = document.getElementById('portfolio');
    if (pfAnchor) pfLoaderObserver.observe(pfAnchor);
  }
}

// ── INITIALIZATION FUNCTION ───────────────────────────────
export function initIndexPage() {
  // Expose methods on window for HTML onclicks
  window.switchIdeTab = switchIdeTab;
  window.toggleLog = toggleLog;
  window.simulateFormSubmit = simulateFormSubmit;
  window.openModal = openModal;
  window.closeModal = closeModal;

  // Auto-open first accordion item
  setTimeout(() => {
    toggleLog('log-az-1');
  }, 500);

  // Setup modal clicks
  document.querySelectorAll('.modal').forEach(o => {
    o.addEventListener('click', e => {
      if (e.target === o) {
        o.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Setup modal escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(m => {
        m.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });

  // Initialize page components
  initHeroKpi();
  initDemoSimulator();
  initPortfolioLoader();
}
