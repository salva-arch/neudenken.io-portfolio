# Changelog

All notable changes to the "Retail Vacation Planner" project will be documented in this file.

## [🚀 SHOWCASE EDITION] - 2026-04-05

*This is the official Presentation Release designed to demonstrate all developed business tracking features and logic of the Vacation Planner inside an isolated dummy environment (`urlaubsplaner.php`).*

### 🌟 Business Logic & Compliance Features
- **Capacity Control (`MAX_ABSENT`):** Real-time barrier logic implemented. Automatically prevents the submission of vacation days if the defined branch limit (e.g., 3 people simultaneously missing) has already been reached.
- **Management Coverage (`MIN_MANAGERS`):** AI-assisted logic blocks requests from store managers and deputies as soon as an active workday lacks at least 2 scheduled leaders.
- **Dynamic Waitlist System:** If a request violates a rule, doing so does not result in a hard termination. The system proposes the "Waitlist" status instead, enabling leadership to visually review the request and potentially approve it as an exception.
- **Contract-Based Validations:**
  - *Saturday Limit (Minijobs)*: Implemented a cap on free Saturdays for part-time minijobber staff (Limit: max. 1 free Saturday per month).
  - *Youth Labor Protection Act (JArbSchG)*: Minor trainees dynamically receive a separate Saturday limit (Limit: max. 2 free Saturdays per month).
- **Gauss Holiday Algorithm:** The system calculates Easter and state-specific (e.g., Baden-Württemberg) public holidays on the fly using the Easter Date function and automatically deducts those days from the employees' vacation balances.

### 👥 Roles & Data Privacy (GDPR / DSGVO)
- **Role-Based Access Control (RBAC):** Separated login permissions into Leadership (Manager, Deputy), Day-Replacements, and regular Staff.
- **Privacy Masking:** Staff-level employees only see grey "Occupied" tiles instead of concrete names in the interactive calendar grid (protects personal leisure schedules from colleagues).
- **Isolated Show-DB:** The live demo operates securely on the isolated WordPress Option-Key `rb_urlaubsplaner_show` to fully prevent intersections with real data during live demonstrations.

### ✉️ Seamless Management Interfaces
- **1-Click HTML Emails:** Store managers receive beautifully styled HTML emails via `wp_mail()` for all new requests. Thanks to cryptographic Action-Tokens (`RB_ACTION_TOKEN`), requests can be Approved (Green) or Rejected (Red) via a button directly inside the email client (e.g., Outlook) without requiring a WordPress backend login.
- **Microsoft 365 iCal Sync:** Implemented a dynamic calendar endpoint (`?api=1&action=ical`). Securely syncs "Approved" and "Pending" vacations directly as "Out of Office / Busy" events into the Microsoft Exchange branch calendar using an Auth-Token.
- **Automated Cron-Reporting (`wp_schedule_event`):** Programmed a weekly cron job that automatically sends a CSV database backup and a "Vacation Briefing" to the branch management every Monday morning.

### ❤️ Team & Culture (Soft-Features)
- **Team Pulse Radar:** Embedded a real-time tracking widget into the leadership dashboard. It reads the birth and hiring dates of the workforce and visually alerts managers in the UI 30 days before an upcoming milestone (e.g., round company anniversaries or trainee birthdays).
- **Soft-Wishes vs. Hard-Vacation:** Differentiates between hard "Vacation" (deducts from the quota), "Time-Off" (overtime reduction), and soft "Wishes" (shift roster preferences).

### 🔒 Architecture & Security
- Rate-Limiting integrated to stop Brute-Force login attempts from employees (max. 5 attempts per 15 minutes).
- Zero External API Frameworks: The entire system including the Single Page component is housed effectively and maintainable inside an exclusive `.php` file.
- Protection from CSRF/Clickjacking via server-side Header validation.

---

## [8.5.0] - 2026-01-31

### Added 🚀
- **Request Rejection**: Admins can now explicitly reject vacation requests instead of just deleting them.
- **Frontend Feedback**: Rejected requests are now visible to employees in their list with a "⛔ (Rejected)" status.
- **Logic Fixes**: Rejected requests no longer count towards the weekly "Wish" limit or the annual vacation quota.

## [Previous Versions (Legacy Highlights)]

### [8.4.0]
- **SQL Migration**: Fully migrated multi-tenant version to use SQLite tables (`rb_branches`, `rb_employees`).
- **Skill-Shield**: Implemented intelligent coverage logic. Vacation requests are blocked if a branch would lose critical skills (e.g., 'Cashier', 'Responsibility').
- **Social Filter**: Added "Bridge Day Limit" (max 1 bridge day per year to ensure fairness).

### [8.1.0]
- **Audit**: New Reporting Tab for pattern detection (Fridays, before holidays).
- **Export**: CSV Export functionality.

### [7.0.0 - 2.0.0]
- **History**: Various updates including AJAX Core, SMTP Support, Mobile First Design, and Security Hardening.
