import"./modulepreload-polyfill-B5Qt9EMX.js";function D(e,t={}){const{lineConnections:i=!0,lineDistance:d=115,mouseRepel:l=!0,mouseRadius:c=180}=t,a=e.getContext("2d");let o=[],n={x:null,y:null,targetX:null,targetY:null,radius:c},y,z=!0,g=null;l&&(document.addEventListener("mousemove",s=>{n.targetX=s.clientX,n.targetY=s.clientY}),document.addEventListener("mouseleave",()=>{n.targetX=null,n.targetY=null}));class E{constructor(r,h){this.x=r,this.y=h,this.baseVx=(Math.random()-.5)*.22,this.baseVy=(Math.random()-.5)*.22,this.vx=this.baseVx,this.vy=this.baseVy,this.radius=Math.random()*2+1,this.color=Math.random()>.4?"rgba(176, 77, 44, 0.45)":"rgba(74, 71, 65, 0.3)"}update(){if(l)if(n.x===null&&n.targetX!==null?(n.x=n.targetX,n.y=n.targetY):n.x!==null&&n.targetX!==null?(n.x+=(n.targetX-n.x)*.1,n.y+=(n.targetY-n.y)*.1):(n.x=null,n.y=null),n.x!==null&&n.y!==null){const h=this.x-n.x,u=this.y-n.y,m=Math.hypot(h,u);if(m<n.radius){const f=(n.radius-m)/n.radius,S=Math.atan2(u,h),M=Math.cos(S)*f*1.6,A=Math.sin(S)*f*1.6;this.vx+=(M-this.vx)*.08,this.vy+=(A-this.vy)*.08}else this.vx+=(this.baseVx-this.vx)*.02,this.vy+=(this.baseVy-this.vy)*.02}else this.vx+=(this.baseVx-this.vx)*.02,this.vy+=(this.baseVy-this.vy)*.02;this.x+=this.vx,this.y+=this.vy;const r=20;this.x<-r&&(this.x=e.width+r),this.x>e.width+r&&(this.x=-r),this.y<-r&&(this.y=e.height+r),this.y>e.height+r&&(this.y=-r)}draw(){a.beginPath(),a.arc(this.x,this.y,this.radius,0,Math.PI*2),a.fillStyle=this.color,a.fill()}}function v(){e.width=window.innerWidth,e.height=window.innerHeight,o=[];const s=Math.max(50,Math.min(130,Math.floor(e.width*e.height/15e3)));for(let r=0;r<s;r++)o.push(new E(Math.random()*e.width,Math.random()*e.height))}function p(){if(!z){g=requestAnimationFrame(p);return}if(a.clearRect(0,0,e.width,e.height),o.forEach(s=>{s.update(),s.draw()}),i)for(let s=0;s<o.length;s++)for(let r=s+1;r<o.length;r++){const h=o[s],u=o[r],m=Math.hypot(h.x-u.x,h.y-u.y);if(m<d){const f=(1-m/d)*.12;a.beginPath(),a.moveTo(h.x,h.y),a.lineTo(u.x,u.y),a.strokeStyle=`rgba(176, 77, 44, ${f})`,a.lineWidth=.75,a.stroke()}}g=requestAnimationFrame(p)}const x=new IntersectionObserver(s=>{s.forEach(r=>{z=r.isIntersecting})},{threshold:0});return x.observe(e),window.addEventListener("resize",()=>{clearTimeout(y),y=setTimeout(v,200)}),v(),p(),()=>{g&&cancelAnimationFrame(g),x.disconnect()}}function I(){document.addEventListener("mousemove",e=>{document.body.style.setProperty("--mouse-x",`${e.clientX}px`),document.body.style.setProperty("--mouse-y",`${e.clientY}px`)}),document.querySelectorAll(".glass-card").forEach(e=>{e.addEventListener("mousemove",t=>{const i=e.getBoundingClientRect();e.style.setProperty("--card-mouse-x",`${t.clientX-i.left}px`),e.style.setProperty("--card-mouse-y",`${t.clientY-i.top}px`)})})}function L(){const e=document.querySelector(".brand-nav-toggle"),t=document.querySelector(".header-bar .nav-links");e&&t&&(e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","brand-nav-links"),t.id="brand-nav-links",e.addEventListener("click",()=>{const l=t.classList.toggle("open");e.setAttribute("aria-expanded",String(l))}));const i=document.querySelector(".nav-toggle"),d=document.querySelector(".nav-links-pill");i&&d&&(i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls","pill-nav-links"),d.id="pill-nav-links",i.addEventListener("click",()=>{const l=d.classList.toggle("open");i.setAttribute("aria-expanded",String(l))})),document.querySelectorAll(".nav-link, .nav-links a").forEach(l=>{l.addEventListener("click",()=>{document.querySelectorAll(".nav-links.open, .nav-links-pill.open").forEach(c=>{c.classList.remove("open")}),document.querySelectorAll('[aria-expanded="true"]').forEach(c=>{c.setAttribute("aria-expanded","false")})})})}const k=[{id:"küchentisch",title:"Die Stunde am Küchentisch: Warum KMU-Digitalisierung am <em>Interface</em> scheitert.",date:"20. Mai 2026",readTime:"5 Min Lesezeit",excerpt:"Warum Handwerker keine 40-seitigen Projektpläne brauchen, sondern Software, die in drei Klicks fertig ist.",content:`
      <p>
        Es ist 21:30 Uhr an einem Dienstagabend. Der letzte Kunde ist längst bedient, die Werkzeuge sind geputzt, der Lieferwagen steht in der Einfahrt. Eigentlich wäre jetzt Zeit für die Couch, für die Familie. Doch am Küchentisch brennt noch Licht.
      </p>
      <p>
        Vor dem Handwerker liegt ein Haufen Zettel: Regierapporte, Materiallisten, krakelige Notizen von der Baustelle. Er muss Rechnungen schreiben. Und er hasst es.
      </p>
      <blockquote>
        „Die Stunde, die ihr abends am Küchentisch verliert. Das ist der wahre Preis schlecht durchdachter Digitalisierung.“
      </blockquote>
      <p>
        Große IT-Dienstleister versprechen Erlösung durch mächtige All-in-One-Software. Sie präsentieren Dashboards mit einhundert Knöpfen, bunten Diagrammen und komplexen Rechtestrukturen. <strong>Doch genau hier liegt der Denkfehler:</strong> Ein selbstständiger Meister braucht kein Ticketsystem. Er braucht keine Enterprise-Ressourcenplanung. Er braucht ein Interface, das ihn versteht.
      </p>
      <h3>Das Problem: <em>Reibung</em> am Bildschirm</h3>
      <p>
        Jedes Mal, wenn eine Software nach einem Passwort fragt, eine Datei nicht parst oder ein Formular mit 15 Pflichtfeldern blockiert, entsteht Reibung. Reibung kostet Willenskraft — und am Ende des Tages ist die Willenskraft aufgebraucht. Also greift der Handwerker doch wieder zum Zettel, und der administrative Stau wächst.
      </p>
      <p>
        Gute Software für KMU zeichnet sich nicht dadurch aus, was sie alles *kann*, sondern dadurch, was sie dem Nutzer *erspart*. Sie muss unsichtbar sein. Sie muss sich anfühlen wie ein vertrautes Werkzeug — wie ein perfekt ausbalancierter Hammer.
      </p>
      <h3>Die Lösung: Pragmatische <em>Mikro-Tools</em></h3>
      <p>
        Anstatt zu versuchen, den gesamten Betrieb auf einmal umzukrempeln, plädiere ich für gezielte, kleine Automatisierungs-Bausteine. 
      </p>
      <p>
        <strong>Beispiel Stimme-zu-Rechnung:</strong> Der Handwerker spricht auf dem Heimweg eine Sprachnachricht in sein Handy: *„Zwei Wasserhähne bei Familie Müller gewechselt, 3 Stunden Arbeit.“* Wenn er nach Hause kommt, liegt die fertige Netto/Brutto-Rechnung bereits als PDF in seiner Inbox. Berechnet, formatiert, fertig für lexoffice. Ein Klick, abgeschickt. Das ist Digitalisierung ohne Reibung. Das ist die Stunde, die er zurückgewinnt.
      </p>
    `},{id:"ladenfläche",title:"Der Code auf der Ladenfläche: Wie 20 Jahre Operations meinen Blick auf <em>Software</em> geprägt haben.",date:"12. Mai 2026",readTime:"6 Min Lesezeit",excerpt:"Warum gute Software erst auf der echten Verkaufsfläche entsteht — und warum Slideware dort sofort entlarvt wird.",content:`
      <p>
        Wer zwanzig Jahre lang Filialen im Lebensmitteleinzelhandel geleitet hat, entwickelt eine tiefe Allergie gegen zwei Dinge: Ineffizienz und graue Theorie.
      </p>
      <p>
        In einem Markt, in dem jede Sekunde beim Kassiervorgang zählt, in dem die Logistikkette im Minutentakt getaktet ist und in dem man morgens um 6:00 Uhr mit 17 hochdynamischen Charakteren die Frühschicht startet, lernt man eines ganz schnell: <strong>Systeme müssen narrensicher sein.</strong>
      </p>
      <blockquote>
        „Wenn ein System in der Schicht um 6:00 Uhr morgens zu Reibung führt, wird es nicht genutzt. Punkt.“
      </blockquote>
      <p>
        Ich habe im Laufe meiner Karriere unzählige Corporate-IT-Rollouts miterlebt. Gut gemeinte Dashboards zur Personaleinsatzplanung, ausgeklügelte Zeiterfassungssysteme, glitzernde Kommunikations-Apps. Fast alle hatten eines gemeinsam: Sie wurden von Menschen entworfen, die noch nie eine Palette bei 3 Grad Außentemperatur entladen haben.
      </p>
      <h3>Der Bruch zwischen <em>Zentrale</em> und <em>Fläche</em></h3>
      <p>
        Dieser Bruch ist das größte Effizienzgrab moderner Konzerne. Entwickler sitzen in klimatisierten Büros und optimieren Klickpfade. Auf der Verkaufsfläche steht jedoch ein gestresster Mitarbeiter, der Handschuhe trägt, ein klapperndes Handterminal bedient und parallel drei Kundenfragen beantworten muss. Für ihn ist ein „schönes Dropdown-Menü“ eine Zumutung.
      </p>
      <p>
        Als ich begann, mich tief in Software-Engineering und KI-Systeme einzuarbeiten, tat ich das aus diesem Schmerz heraus. Ich wollte nicht länger zusehen, wie Millionen für IT-Projekte ausgegeben werden, die am Ende die Arbeit auf der Fläche verlangsamen, statt sie zu beschleunigen.
      </p>
      <h3>Code muss die <em>Realität</em> atmen</h3>
      <p>
        Gute Software entsteht, wenn man das logistische Verständnis der Verkaufsfläche direkt in den Code einfließen lässt. 
      </p>
      <p>
        Mein produktiv betriebener *Workforce-Planer v7.9* wurde genau so geboren. Er wurde nicht am Reißbrett entworfen. Er entstand direkt im Pausenraum. Jede Zeile PHP und SQL wurde verfeinert, während meine Mitarbeiter neben mir saßen und Feedback gaben. Erst als das System die Schichtplanung von 3 Stunden auf 10 Minuten reduzierte — ohne jegliche Schulung — wusste ich: Das ist echte Digitalisierung.
      </p>
    `},{id:"hype",title:"TÜV AI Automation: Warum wir aufhören müssen, über Hype zu reden, und anfangen müssen zu <em>bauen</em>.",date:"04. Mai 2026",readTime:"4 Min Lesezeit",excerpt:"Künstliche Intelligenz ist kein philosophisches Thema für Aufsichtsratssitzungen. Es ist ein praktisches Werkzeug für den Alltag.",content:`
      <p>
        Geht man heute auf LinkedIn oder liest Wirtschaftsberichte, könnte man meinen, Künstliche Intelligenz sei ein mystisches Konstrukt, das in naher Zukunft die gesamte Menschheit ersetzt. Es wird über Singularität debattiert, über millionenschwere GPU-Cluster und bahnbrechende neuronale Architekturen.
      </p>
      <p>
        Als TÜV-zertifizierter AI Automation Manager betrachte ich das nüchterner: <strong>KI ist ein extrem nützlicher Elektromotor für Text- und Datenflüsse.</strong> Nicht mehr, aber auch nicht weniger.
      </p>
      <blockquote>
        „Wir müssen aufhören, KI als philosophische Hype-Welle zu betrachten. Wir müssen anfangen, sie als schlichtes Werkzeug in unsere Prozesse einzubauen.“
      </blockquote>
      <p>
        Die eigentliche Revolution findet nicht im Silicon Valley statt, sondern dort, wo bestehende, administrative Prozesse durch einfache Schnittstellen entlastet werden. Das erfordert kein tiefes Verständnis von stochastischem Gradientenabstieg. Es erfordert Prozesswissen und pragmatischen Code.
      </p>
      <h3>Die drei Säulen sicherer <em>Automation</em></h3>
      <p>
        Damit KI im mittelständischen Betrieb einen echten Beitrag leistet, muss sie drei Kriterien erfüllen:
      </p>
      <p>
        1. **Sicherheit &amp; Datenschutz:** Keine sensiblen Daten dürfen ungefiltert in öffentliche Cloud-Modelle fließen. Systeme müssen so gehärtet sein, dass sie DSGVO-konform agieren (z.B. durch lokale Filter-Gateways oder dedizierte API-Verbindungen).
      </p>
      <p>
        2. **Determinismus durch Leitplanken:** Sprachmodelle neigen zum Erfinden (Halluzinieren). Im Handwerk oder im Ausbildungsbetrieb ist das fatal. Wir müssen den Modellen strikte Leitplanken geben (Retrieval-Augmented Generation / RAG) — sie dürfen nur auf Basis unserer eigenen, verifizierten Betriebsmittel antworten.
      </p>
      <p>
        3. **Nahtlose Integration:** Kein Mitarbeiter hat Lust, ständig zwischen ChatGPT und dem eigentlichen System hin- und herzukopieren. Die KI muss sich dort verstecken, wo ohnehin gearbeitet wird — in WhatsApp, in Microsoft Teams oder als einfacher Dateianhang im Email-Postfach.
      </p>
      <p>
        Wenn wir diese Regeln beherzigen, wird KI von einer Hype-Folie zu einem festen, verlässlichen Mitarbeiter, der nachts lautlos die Akten sortiert.
      </p>
    `}];function P(){const e=document.getElementById("blog-list-container");if(e){e.innerHTML=k.map(i=>`
      <a href="#blog/${i.id}" class="blog-item" onclick="openArticle('${i.id}'); return false;">
        <span class="date">${i.date}</span>
        <h4>${i.title}</h4>
        <span class="read-time">${i.readTime}</span>
      </a>
    `).join("");const t=document.getElementById("blog-count-label");t&&(t.textContent=`${k.length} Artikel`)}}function b(e){const t=k.find(i=>i.id===e);if(t){const i=document.getElementById("reader-date"),d=document.getElementById("reader-read-time"),l=document.getElementById("reader-title"),c=document.getElementById("reader-content");i&&(i.textContent=t.date),d&&(d.textContent=t.readTime),l&&(l.innerHTML=t.title),c&&(c.innerHTML=t.content);const a=document.getElementById("hub-main-view"),o=document.getElementById("blog-reader-view");a&&(a.style.display="none"),o&&(o.style.display="block"),window.scrollTo({top:0,behavior:"smooth"}),history.pushState({articleId:e},t.title,`#blog/${e}`)}}function w(){const e=document.getElementById("blog-reader-view"),t=document.getElementById("hub-main-view");e&&(e.style.display="none"),t&&(t.style.display="block"),window.location.hash.startsWith("#blog/")&&history.pushState(null,"Salva — Hub & Blog",window.location.pathname+window.location.search)}function B(){window.openArticle=b,window.showHub=w,P();const e=window.location.hash;if(e.startsWith("#blog/")){const t=e.replace("#blog/","");b(t)}else w();window.addEventListener("popstate",t=>{t.state&&t.state.articleId?b(t.state.articleId):w()})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("antigravityCanvas");e&&D(e,{lineConnections:!1}),I(),L(),B()});
