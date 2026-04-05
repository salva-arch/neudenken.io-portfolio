# 🏖️ Retail Vacation Planner

> An intelligent staff scheduling and vacation planning system for retail branches – completely without Excel. Featuring concurrency checks, waitlist logic, and automated reporting.

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php)
![WordPress](https://img.shields.io/badge/WordPress-21759B?logo=wordpress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**🔗 Production Use:** Developed for and actively used by a ~20-person retail team.  
**🖥️ Demo/Showcase:** The `urlaubsplaner.php` contained in this repository is a fully functional mockup equipped with dummy data.

---

## 🎯 The Problem (Why not just use Excel?)
Planning vacations in a retail store with about 20 employees was traditionally an administrative nightmare:
- **Paper & Excel Chaos:** No clear "Single Source of Truth".
- **Collisions:** Multiple staff members requesting the same popular bridge days simultaneously.
- **Legal & Internal Compliance:** Calculating limits for minijobs, trainees (Youth Labor Protection Act), and deducting public holidays had to be done manually.
- **Management Coverage:** Gaps in leadership often went unnoticed until the schedule was already finalized.

## 💡 The Solution
A **Single-Page Application (Vanilla JS & PHP)** that embeds natively as a WordPress page template, acting as an automated "Gatekeeper". The system actively blocks conflicts **during the request process**, manages waitlists for popular periods, and drastically reduces management overhead through iCal/Outlook integrations and automated weekly reports.

---

## ✨ Core Features in Detail

### 📅 1. Smart Booking System & Collision Detection
The core of the application is a real-time rule engine:
- **Maximum Absence Check (`MAX_ABSENT`):** Instantly alerts the user and prevents booking if a defined threshold (e.g., max 3 people on vacation) is reached.
- **Minimum Management Coverage (`MIN_MANAGERS`):** AI-assisted logic ensures that at least 2 people from the leadership team are present on any given workday.
- **Dynamic Waitlist Mode:** If a request violates a rule, it isn't completely rejected. The system suggests placing it on a "Waitlist," allowing the store manager to visually review the conflict and potentially grant an exception (e.g., in medical/emergency cases).
- **Role-Based Masking:** For data protection reasons, regular employees only see grey "Occupied" tiles rather than the names of colleagues who are on leave.

### 👥 2. Smart Contract & Role Logic
Not every employee has the same contract. The app dynamically adjusts its rules:
- **Public Holiday Calculator (Gauss Algorithm):** The system automatically calculates nationwide and state-specific (e.g., Baden-Württemberg) public holidays and deducts them from the requested vacation days.
- **Saturday Rule for Minijobs:** Automatically limits free Saturdays for part-time/minijob staff (e.g., max 1 free Saturday per month), with special compliance for minors (e.g., max 2 free Saturdays).
- **Fixed Days Off (`fix_off`):** Recognizes contractually guaranteed days off (e.g., every Monday) and prevents the system from deducting a vacation day for them.

### ✉️ 3. Automated Email & Approval Workflow
Fast, login-free approvals for branch managers:
- **1-Click HTML Emails:** Managers receive a modern HTML email for every new request. Utilizing secure cryptographic tokens (`RB_ACTION_TOKEN`), the request can be **Approved** or **Rejected** directly from the email client (e.g., Outlook) without having to log into WordPress.
- **Waitlist Feedback:** The system actively highlights conflict recommendations in the email (e.g., "System Recommendation: REJECT" for rule violations).
- **Automated Weekly Report:** A scheduled cron job (`wp_schedule_event`) sends the store manager a CSV database backup and a briefing of unresolved requests every Monday morning.

### 📆 4. iCal / Outlook REST API Sync
Seamless integration into corporate environments:
- Store PCs (Office 365) can subscribe to the secure `/api=1&action=ical` endpoint.
- Employee vacations appear live and mathematically protected directly in the branch's Microsoft Exchange calendar as "Out of Office".
- "Pending" requests are marked with a `[?]` and synchronized to Outlook with "Tentative" status.

### 💓 5. Team Pulse (Work Climate Dashboard)
- A highly appreciated UI widget: It actively monitors the dashboard and highlights the **Top 5 birthdays and company anniversaries** occurring within the next 30 days.
- Prevents management from accidentally overlooking major milestones (like a 10-year anniversary) or the birthdays of trainees.

---

## 🛠 Tech Stack & Architecture

| Component | Technology / Method |
|------------|-------------|
| Backend | Modern **PHP 8.x** |
| CMS Hosting | Embedded as a **WordPress Template** (Requires zero external plugins) |
| Frontend | React-free **Vanilla Single Page Application** (JavaScript + CSS3) |
| User Interface | Custom Dark- & Light-mode CSS styled with Neumorphism |
| Data Storage | Native `wp_options` as a flat JSON array (High-Speed Access, extremely robust, zero DB-migrations required upon updates) |
| Security | Session-binding, CSRF/Clickjacking via Headers, built-in brute-force rate limit protection |

This project demonstrates: You don't need a massive framework (React/Vue/Laravel) to build highly performant, asynchronous interactive systems. Because of the flat JSON store approach, AJAX calls round-trip in `< 40ms` on average.

---

## 🚀 Quick Start (Demo Version)

The included `urlaubsplaner.php` in this repository is a safe Sandbox! It includes fictional employees (Max, Lisa, etc.) and uses an isolated dummy database key.

1. Upload the file into your WordPress Theme directory (`wp-content/themes/your-theme/`)
2. Create a new Page in your WP-Backend.
3. On the right-side panel under "Template", select **"Urlaubsplaner (Show / Demo)"**.
4. Log into the frontend using one of the dummy Personnel IDs:

### 🎭 Logins for the Showcase Edition
| ID | Name | Contract Role | Permissions |
|---|------|---------------|--------|
| `1001` | Max Mustermann | Manager (Leadership/Full-Time) | Full visibility, Approvals, CSV Exports |
| `1002` | Lisa Schmidt | Deputy (Vice-Manager) | Approvals |
| `3001` | Julia Weber | Staff (Part-Time) | Restricted scope, sees colleagues only as "Occupied" |
| `4001` | Mia Richter | Trainee (Minor) | Extended youth labor law restrictions (Saturdays) |
| `5001` | Emma Scholz | Minijob | Max 1 free Saturday per calendar month |

---

## 📄 License & Author
Engineered for real-world production by **[Salvatore Docimo](https://github.com/salva-arch)**.  
MIT Reference – see GitHub code history.
