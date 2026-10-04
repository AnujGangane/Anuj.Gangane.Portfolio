# Anuj Gangane - Full-Stack .NET Developer Portfolio

A **modern, highly professional, recruiter-friendly personal portfolio website** designed and built for **Anuj Gangane**, a Full-Stack .NET Developer specializing in C#, ASP.NET Core, ASP.NET MVC, Entity Framework, SQL Server, REST APIs, and database-driven web applications.

---

## 🚀 Live Execution & Zero-Build Setup

This website adheres to the strict requirement of **Zero Dependencies & Zero Build Tools**:
- **Pure HTML5**
- **Vanilla CSS3** (Custom properties, CSS Grid, Flexbox, responsive typography)
- **Vanilla JavaScript** (ES6+, modern Web APIs, `IntersectionObserver`)
- **No external frameworks or libraries** (No React, Angular, Vue, Blazor, Bootstrap, Tailwind, jQuery, or Node.js)
- **No server or database required**

### How to Run:
Simply double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave, Opera).

```bash
# Optional: Open directly from terminal on Windows
start index.html
```

---

## 📁 Project Directory Structure

```text
Anuj_Gangane_Portfolio/
│
├── index.html                           # Main HTML5 entry document (semantic, SEO-ready)
│
├── css/
│   └── style.css                        # Modern CSS3 stylesheet (Dark/Light themes, animations)
│
├── js/
│   └── script.js                        # Vanilla JavaScript (Themes, modals, validation, observers)
│
├── assets/
│   ├── images/
│   │   ├── Anuj_Photo.JPG               # Profile photo (with circular border & floating badges)
│   │   ├── Task.jpeg                    # Project visual: Staff Task Management System
│   │   ├── Asset.jpg                    # Project visual: Asset Management System
│   │   └── Medical.png                  # Project visual: Medical Store Management System
│   └── Anuj_Resume_DOTNET.pdf           # Official resume PDF (downloadable)
│
├── Anuj_Portfolio_Contact_Messages.xlsx # Excel spreadsheet for logged contact inquiries
│
└── README.md                            # Comprehensive project documentation
```

---

## 🎨 Visual Design & Color Palette

The portfolio features a developer-first dark mode as the default theme, along with a clean light theme toggle:

| Element | Dark Mode (Default) | Light Mode |
| :--- | :--- | :--- |
| **Primary Background** | `#0B1120` | `#F8FAFC` |
| **Secondary Background** | `#111827` | `#F1F5F9` |
| **Card Background** | `#172033` | `#FFFFFF` |
| **Primary Accent** | `#38BDF8` (Sky Blue) | `#0284C7` |
| **Secondary Accent** | `#6366F1` (Indigo) | `#4F46E5` |
| **Primary Text** | `#F8FAFC` | `#0F172A` |
| **Secondary Text** | `#CBD5E1` | `#334155` |
| **Muted Text** | `#94A3B8` | `#64748B` |
| **Borders** | `rgba(148, 163, 184, 0.15)` | `rgba(15, 23, 42, 0.12)` |

---

## 🌟 Sections & Features

1. **Sticky Navigation Bar**:
   - Clean brand typography (`Anuj Gangane. / Full-Stack .NET Developer`)
   - Section links (`Home`, `About`, `Skills`, `Experience`, `Projects`, `Education`, `Contact`)
   - Prominent **Download Resume** button (`assets/Anuj_Gangane_Resume.pdf`)
   - Dark/Light mode switcher with persistence (`localStorage`)
   - Mobile hamburger drawer with animated transitions and auto-close triggers.
   - Dynamic active section indicator on scroll.

2. **Hero Section**:
   - Professional title and introductory statements faithfully reflecting the engineering background.
   - Dual Call-to-Action buttons ("View My Projects" & "Contact Me").
   - Verified social links (LinkedIn, GitHub, Email).
   - Profile container with subtle gradient border and floating tech chips (`C#`, `.NET`, `SQL Server`, `ASP.NET Core`, `REST API`).

3. **About Me**:
   - Direct, authentic profile summary without fabricated claims.
   - Structured information blocks: Location (Pune, MH), Role (Software Developer), Specialization (Full-Stack .NET Development), Education (B.Tech CSE), and Experience.

4. **Technical Skills**:
   - Categorized into 6 clean cards: Programming Languages, .NET Technologies, Frontend Technologies, Backend & APIs, Development Tools, and Databases.
   - Badges with icons and hover effects.
   - Zero fake percentage ratings (e.g. no arbitrary "C# 95%").

5. **Professional Experience**:
   - Modern vertical timeline with date badges and company tags:
     - **Orion Techno Solutions, Pune** (Aug 2025 – Current): Software Developer
     - **Cravita Technologies India Pvt. Ltd., Pune** (Jan 2025 – Jun 2025): Jr. Software Developer

6. **Featured Projects**:
   - **Staff Task Management System** (EF Core, ASP.NET Core MVC, C#, SQL Server)
   - **Asset Management System** (ASP.NET MVC, Blazor, C#, SQL Server, Entity Framework)
   - **Medical Store Management System** (ASP.NET Core MVC, C#, SQL Server, EF Core, SignalR)
   - High-fidelity dashboard mockups and interactive detail modals.

7. **Project Interaction Modal**:
   - Pure Vanilla JS modal dialog.
   - Displays full project description, technology tags, and key architecture feature checklists.
   - Accessible: Closes via close button (`×`), outside click, or `Escape` key; locks body scroll.

8. **Education & Certifications**:
   - B.Tech in CSE (D.Y. Patil College of Engineering and Technology, Kolhapur)
   - Higher Secondary (Class XII, YCIS Satara)
   - Secondary School (Class X, Gopalrao Dev Prashala)
   - Full Stack .NET Developer Certification (Fortune Cloud Pvt. Ltd.)
   - GoogleCloudReady Facilitator Program 2023 (Qwiklabs)

9. **Developer Highlights**:
   - Qualitative engineering pillars (Full-Stack Development, Database Development, API Development, Application Development) without fabricated numerical claims.

10. **Contact Section & Google Sheets Real-Time Integration**:
    - Direct contact details (Email, Phone, Location, LinkedIn, GitHub).
    - One-click **Copy Email** button with feedback indicator.
    - Frontend form validation (Name, Email format, Subject, Message).
    - **Google Sheet Auto-Fill**: Submitting the form automatically posts and appends each inquiry into your live **Google Sheet** in real-time with columns: `Date / Time`, `Name`, `Email`, `Subject`, and `Message`.
    - **No Local File Downloads**: Zero unwanted file downloads or popups on submission.
    - **Offline/Local Backup**: Submissions are also safely mirrored in `localStorage` as a fallback.
    - **Ready-To-Use Apps Script Template**: Includes `google_apps_script.js` with 3-step setup instructions for linking your personal Google Sheet.

11. **Accessibility & Accessibility Compliance**:
    - Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
    - Focus states (`:focus-visible`) for full keyboard navigation.
    - ARIA attributes (`aria-label`, `aria-expanded`, `aria-hidden`, `aria-describedby`).
    - Full support for `prefers-reduced-motion: reduce`.

---

## 📷 Customizing Profile Photo & Resume

- **Profile Image**: Replace `assets/images/profile.jpg` with your personal professional headshot. The existing file is pre-configured with the exact required path, aspect ratio, and circular styling.
- **Resume**: Replace `assets/Anuj_Gangane_Resume.pdf` whenever you update your official resume. The download button in the navigation bar and about section automatically references this path.

---

## 📄 License & Attribution

Designed and built for **Anuj Gangane**. All rights reserved.
Built purely with HTML5, CSS3, and Vanilla JavaScript.
