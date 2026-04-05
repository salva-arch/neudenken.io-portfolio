# 🏖️ Retail Vacation Planner

> Ein intelligentes System zur Personal- & Urlaubsplanung für den filialisierten Einzelhandel – Komplett ohne Excel, mit Kollisionserkennung, Wartelisten und automatisierten Auswertungen.

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php)
![WordPress](https://img.shields.io/badge/WordPress-21759B?logo=wordpress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**🔗 Live-Einsatz:** Entwickelt für und im Einsatz bei einem ~20-köpfigen Einzelhandels-Team.  
**🖥️ Demo-Datei:** Im Projekt liegt die `wordpress-theme/page-urlaubsplaner-show.php` als voll funktionsfähiges Mockup mit Dummy-Daten bereit.

---

## 🎯 Das Problem (Warum nicht einfach Excel?)
Die Planung von Urlauben in einer Filiale mit ca. 20 Personen war traditionell ein administrativer Albtraum:
- **Zettel- & Excel-Chaos:** Keine eindeutige "Single Source of Truth".
- **Kollisionen:** Mehrere Mitarbeiter beantragen zeitgleich die Brückentage.
- **Gesetzliche & Interne Vorgaben:** Minijobber, Azubis (Jugendarbeitsschutz) und Feiertags-Anrechnungen mussten alle manuell im Kopf gerechnet werden.
- **Führungs-Deckung:** Häufig fiel erst hinterher auf, dass die komplette Marktleitung im Urlaub war.

## 💡 Die Lösung
Eine **Single-Page-Anwendung (Vanilla JS & PHP)**, die sich nativ als WordPress-Seitentemplate einfügt und als "Gatekeeper" fungiert. Das System blockt Konflikte bereits **während der Beantragung**, verwaltet Wartelisten für "beliebte Zeiträume" und entlastet das Management durch iCal/Outlook-Schnittstellen und automatische Reports.

---

## ✨ Die Features im Detail

### 📅 1. Smartes Buchungssystem & Kollisionserkennung
Das Herzstück der Anwendung ist die Echtzeit-Engine:
- **Echtzeit-Kapazitätsprüfung (`MAX_ABSENT`):** Sobald ein Limit (z.B. max. 3 Personen im Urlaub) erreicht ist, wird rot gewarnt.
- **Mindestbesetzung Management (`MIN_MANAGERS`):** Die KI im Code stellt sicher, dass pro Werktag immer mindestens 2 Personen aus dem Führungskreis anwesend sind.
- **Automatischer "Wartelisten-Modus":** Überschreiten Anträge die Regeln, werden sie nicht abgelehnt, sondern auf eine "Warteliste" gebucht. Das Management entscheidet dann per Ausnahmeregelung (z.B. Krankheitsfälle).
- **Rollenbasiertes Blockieren:** Mitarbeiter sehen in ihrem Account nur, **dass** Tage belegt sind ("Belegt"), aber unkenntlich, **von wem** (Datenschutz).

### 👥 2. Smarte Vertrags- & Rollenlogik
Nicht jeder Mitarbeiter ist gleich. Die App versteht die Vertragsarten und passt die Regeln dynamisch an:
- **Feiertags-Rechner (Gauss):** Das System erkennt automatisiert bundesweite und landesspezifische (BW) Feiertage und bucht hierfür keine Urlaubstage ab.
- **Samstags-Regelung für Minijobs:** Die App limitiert automatisch freie Samstage für Aushilfen (z.B. max. 1 freier Samstag pro Monat), mit speziellen Anpassungen für Minderjährige (z.B. max. 2 Samstage).
- **Fixe freie Tage (`fix_off`):** Erkennt vertragliche "Frei-Tage" am Freitag oder Montag und rechnet diese beim Urlaubsantrag heraus.

### ✉️ 3. Automatisierter E-Mail- & Genehmigungs-Workflow
Kein Login mehr für Manager nötig, um schnelle Anträge zu bedienen:
- **E-Mail Tokens:** Manager erhalten eine HTML-Mail bei neuen Anträgen. Über verschlüsselte Links (`RB_ACTION_TOKEN`) kann ein Antrag mit einem Klick in der E-Mail **Genehmigt** oder **Abgelehnt** werden.
- **Wartelisten-Feedback:** Das System empfiehlt aktiv eine rote Markierung ("System-Empfehlung: ABLEHNEN"), wenn der Antrag Regeln bricht.
- **Automatischer Wochenreport:** Ein Cronjob (`wp_schedule_event`) schickt dem Store Manager jeden Montagmorgen ein CSV-Backup der Datenbank sowie einen Bericht über ungelöste Anträge per E-Mail.

### 📆 4. iCal / Outlook REST API Sync
Direkte Integration in die Business-Welt:
- Filial-PCs (Office 365) binden die `/api=1&action=ical`-Schnittstelle ein.
- Urlaube von Mitarbeitern erscheinen live und "schreibgeschützt" im Outlook-Filial-Kalender als "Außer Haus".
- Pending (in Bearbeitung) Einträge werden mit einem `[?]` markiert und erhalten in Outlook den Status "Unter Vorbehalt".

### 💓 5. Team-Pulse (Betriebsklima-Dashboard)
- Ein kleines, aber massiv beliebtes UI-Widget. Pingt automatisch im Dashboard die **Top 5 Geburtstage und Betriebsjubiläen** der nächsten 30 Tage. 
- Das bewahrt das Management davor, Jubiläen (z.B. 10 Jahre Firmenzugehörigkeit) oder Azubi-Geburtstage zu übersehen.

---

## 🛠 Tech-Stack & Architektur

| Komponente | Technologie / Methode |
|------------|-------------|
| Backend | Modernes **PHP 8.x** |
| CMS-Hosting | Eingebettet als **WordPress Template** (ohne externe Plugins) |
| Frontend | React-freie **Vanilla Single Page Application** (JavaScript + CSS3) |
| User Interface | Custom Dark- & Lightmode-CSS im Neumorphism-Style |
| Data-Storage | Native `wp_options` als flaches JSON-Array (High-Speed Access, extrem robust, keine DB-Migrationen bei Updates) |
| Security | Session-Bindung, CSRF/Clickjacking via Headers, Rate-Limiting eingebaut |

Das Projekt beweist: Man benötigt kein massives Framework (React/Vue/Laravel), um hoch performante, asynchrone Interaktiv-Systeme zu bauen. Die AJAX-Calls dauern durch den flachen JSON-Store im Schnitt unter `40ms`.

---

## 🚀 Quick Start für die DEMO-Version (`page-urlaubsplaner-show.php`)

Die beigelegte `wordpress-theme/page-urlaubsplaner-show.php` ist eine Sandbox! Sie enthält ausgedachte Testangestellte (Mustermann, Schmidt, etc.) und eine Dummy-Datenbank.

1. Lade die Datei in dein WordPress Theme hoch (`wp-content/themes/dein-theme/`)
2. Erstelle im WP-Backend eine neue Seite.
3. Wähle rechts unter "Template" den Eintrag **"Urlaubsplaner (Show / Demo)"**.
4. Logge dich im Frontend mit einer der Dummy-Personal-IDs ein:

### 🎭 Logins für die Show-Version
| ID | Name | Vertragsrolle | Rechte |
|---|------|---------------|--------|
| `1001` | Max Mustermann | Manager (Führung/Vollzeit) | Alles sichtbar, Genehmigungen, Exporte |
| `1002` | Lisa Schmidt | Deputy (Stellvertr. Leitung) | Genehmigungen |
| `3001` | Julia Weber | Staff (Mitarbeiter/Teilzeit) | Eingeschränkt, sieht Kollegen nur "belegt" |
| `4001` | Mia Richter | Azubi (Minderjährig) | Erweiterte Jugendarbeitsschutz-Beschränkungen (Samstage) |
| `5001` | Emma Scholz | Minijob (Aushilfe) | Max. 1 freier Samstag pro Kalendermonat |

---

## 📄 Lizenz & Autor
Entwickelt von **Salvatore Docimo** für den Live-Einsatz in der Praxis.
MIT-Referenz – siehe GitHub Code History.
