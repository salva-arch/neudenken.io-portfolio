# Changelog

All notable changes to the "Urlaubsplaner App" project will be documented in this file.

## [🚀 SHOWCASE EDITION] - 2026-04-05

*Hierbei handelt es sich um das offizielle Presentation-Release zur Demonstration aller entwickelten Business-Funktionen des Urlaubsplaners in einer gekapselten Dummy-Umgebung (`page-urlaubsplaner-show.php`).*

### 🌟 Business Logic & Compliance-Features
- **Kapazitätsaussteuerung (`MAX_ABSENT`):** Echtzeit-Blockade-Regelwerk implementiert. Verhindert automatisch das Einreichen von Urlaubstagen, wenn das definierte Filial-Limit (z. B. 3 Personen) bereits ausgeschöpft ist.
- **Führungskräfte-Abdeckung (`MIN_MANAGERS`):** Die KI-gestützte Logik blockiert Anträge der Marktleitung/Vertretung, sobald an einem Werktag weniger als 2 Führungskräfte gesichert eingeplant sind.
- **Dynamic Waitlist (Wartelisten-System):** Führt ein Antrag zur Verletzung einer Regel, erfolgt kein harter Abbruch. Das System schlägt dem Mitarbeiter den "Warteliste"-Status vor, woraufhin Führungskräfte den Antrag visuell prüfen und als Ausnahme doch genehmigen können.
- **Vertragsbasierte Validierungen:**
  - *Samstags-Limit Minijobber*: Limitierung von freien Samstagen für Minijobber implementiert (Kappungsgrenze: max. 1 freier Samstag pro Monat).
  - *Jugendarbeitsschutzgesetz (JArbSchG)*: Minderjährige Auszubildende erhalten dynamisch ein gesondertes Samstags-Limit (Kappungsgrenze: max. 2 freie Samstage pro Monat).
- **Gauss-Feiertags-Algorithmus:** Das System berechnet Ostern und landesspezifische (BW) gesetzliche Feiertage via Easter-Date-Funktion und rechnet diese Tage automatisch aus dem Urlaubs-Saldo der Angestellten heraus.

### 👥 Rollen- & Datenschutz (GDPR / DSGVO)
- **Role-Based Access Control (RBAC):** Login-Berechtigungen in Führung (Manager, Deputy), Tagesvertretung und regulären Staff unterteilt.
- **Privacy Masking:** Mitarbeiter ("Staff") sehen in der interaktiven Matrix nur graue "Belegt"-Kacheln statt konkreter Namen (Schutz der persönlichen Freizeitplanung vor Kollegen).
- **Isolated Show-DB:** Die Live-Demo operiert auf dem isolierten WordPress Option-Key `rb_urlaubsplaner_show`, um Überschneidungen mit Echtdaten bei Live-Demonstrationen auszuschließen.

### ✉️ Seamless Management Interfaces
- **1-Click HTML Emails:** Store-Manager erhalten per `wp_mail()` aufbereitete E-Mails bei neuen Anträgen. Mithilfe kryptografischer Action-Tokens (`RB_ACTION_TOKEN`) können Anträge ohne WordPress-Backend-Login direkt über einen Button in der Outlook-Mail genehmigt (Grün) oder abgelehnt (Rot) werden.
- **Microsoft 365 iCal Sync:** Dynamischer Kalender-Endpoint (`?api=1&action=ical`) implementiert. Synchronisiert "Approved" und "Pending" Urlaube sicher (via Auth-Token) direkt als "Beschäftigt / OOF" in den Microsoft Exchange Filial-Kalender.
- **Automated Cron-Reporting (`wp_schedule_event`):** Versendet automatisiert jeden Montagmorgen ein CSV-Backup der Datenbank sowie das "Urlaubs-Briefing" an die Marktleitung per E-Mail.

### ❤️ Team & Culture (Soft-Features)
- **Team Pulse Radar:** Echtzeit-Auswertung im Dashboard für die Führung. Liest Geburts- und Eintrittsdaten der Belegschaft aus und warnt in der UI 30 Tage vor anstehenden runden Jubiläen oder Azubi-Geburtstagen.
- **Soft-Wishes vs. Hard-Vacation:** Mitarbeiter können zwischen hartem "Urlaub" (Zieht Quote ab), "Arbeitsfrei" (Stundenkonto/Überstundenabbau) und weichem "Wunsch" (Dienstplan-Bevorzugung) unterscheiden.

### 🔒 Architektur & Sicherheit
- Rate-Limiting gegen Brute-Force Logins von Mitarbeitern integriert (max. 5 Versuche pro 15 Minuten).
- Kein externes API-Framework: Das komplette System inklusive Single-Page-Ansicht lebt hochperformant und wartbar in einer exklusiven `.php` File.
- Schutz vor CSRF/Clickjacking via serverseitige Header-Validierung.


## [8.5.0] - 2026-01-31

### Added 🚀
- **Request Rejection**: Admins can now explicitly reject vacation requests instead of just deleting them.
- **Frontend Feedback**: Rejected requests are now visible to employees in their list with a "⛔ (Abgelehnt)" status.
- **Logic Fixes**: Rejected requests no longer count towards the weekly "Wish" limit or the annual vacation quota.

## [8.4.0] - 2026-01-29

### Added 🚀
- **SQL Migration**: Fully migrated `urlaubsplaner-multitenant.php` to use SQLite tables (`rb_branches`, `rb_employees`).
- **Skill-Shield**: Implemented intelligent coverage logic. Vacation requests are now blocked if a branch would lose critical skills (e.g., 'Kasse', 'Verantwortung').
- **Social Filter**: Added "Bridge Day Limit" (Brückentage-Bremse). Employees can book max. 1 bridge day per year (e.g., Friday after Ascension Day) to ensure fairness.
- **Feature Parity**: Enabled all advanced features in Multi-Tenant version:
    - **Dual Booking**: "Wunschfrei" vs. "Urlaub" with weekly limits.
    - **Team Pulse**: Dashboard for admin to check booking progress.
    - **Audit Reports**: Pattern analysis (Fridays, Bridge Days).
    - **WhatsApp**: Smart links for quick staff communication.
- **Bonus Feature**: **Birthday Reminder** 🎂
    - Admin interface now shows colleagues with birthdays today.
    - Integrated "One-Click Congratulations" via WhatsApp.
    - Added `birthday` database field for all employees.
- **Legacy Update**: Ported the *Skill-Shield* and *Bridge Day Limit* logic to the WordPress template (`page-urlaubsplaner.php`), ensuring feature parity with the Multi-Tenant version.
- **Skill Matrix**: Applied detailed skills for all employees of "Filiale 82".
- **Employee**: Added "Woldai Japhet" (Deputy) to both the Multi-Tenant (SQL) and WordPress (Legacy) versions.
- **Dev Tools**: Added `?reset_all=1` parameter to `urlaubsplaner-multitenant.php` for easy database resetting.

### Changed ⚡
- **Data Source**: `urlaubsplaner-multitenant.php` no longer uses hardcoded arrays for logic, but seeds them into the database on first run.

## [Previous Versions]

### [8.3.0] - 2026-01-14
- **WhatsApp**: Click-to-Chat in Admin area (Smart Links).
- **Data**: Added phone number field to DB structure.

### [8.2.0] - 2026-01-14
- **UI/UX**: Interactive conflict dialog ("Waitlist?").
- **Visuals**: Waitlist entries shown as white dots in calendar.

### [8.1.0] - 2026-01-08
- **Audit**: New Reporting Tab for pattern detection (Fridays, before holidays).
- **Export**: CSV Export functionality.

### [8.0.0] - 2026-01-08
- **Core**: Multi-Tenant Architecture (SQLite).
- **Admin**: Split into Branch-Manager and Super-Admin.

### [7.6.0] - 2026-01-08
- **Dual Booking**: "Vacation" (Yearly) vs. "Wish" (Weekly limit).

### [7.5.0] - 2026-01-08
- **Dashboard**: Team Pulse visualization for admins.

### [7.0.0 - 2.0.0]
- **History**: Various updates including AJAX Core, SMTP Support, Mobile First Design, and Security Hardening.
