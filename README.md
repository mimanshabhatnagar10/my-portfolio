# Mimansha Bhatnagar — Personal Portfolio Website

A production-quality personal portfolio website crafted for **Mimansha Bhatnagar**, Data Scientist and Computer Science Engineering (Artificial Intelligence) student at Chandigarh University.

---

## 🌟 Architecture & Features

- **Persona-Centric Design**: Minimalist obsidian slate dark mode paired with luminous indigo/cyan accents, and an instant high-contrast light mode toggle.
- **Strict No-Fabrication Content**: 100% verified information from Chandigarh University, CGPA 8.56, Sewa Sangh Kaithal internship, 4 real projects, Azure AI-900 & AZ-900 certifications, and HERizon 2.0.
- **Embedded PDF Resume Viewer**: Embedded directly into the website so visitors can read your CV without leaving, with "Download Resume" and "Open in New Tab" links.
- **Interactive Lightbox Modals**: Accessible click-to-enlarge certificate dialogs with keyboard `Esc` closing and backdrop dismissal.
- **Zero-Dependency Modern Web Stack**: Clean HTML5, Vanilla CSS3 with fluid typography and custom properties, and native modular ES6 JavaScript. Fast load times and zero build lock-in.
- **Vercel Deployment Ready**: Preconfigured `vercel.json` with clean URLs and HTTP security headers.

---

## 📂 Project Directory Structure

```
├── index.html                  # Master entry point with SEO & OpenGraph meta tags
├── vercel.json                 # Vercel deployment headers & caching config
├── README.md                   # Complete documentation & customization guide
├── public/
│   ├── resume.pdf              # [DROP HERE] Your real resume PDF
│   ├── RESUME_INSTRUCTIONS.txt
│   ├── images/                 # [DROP HERE] Your profile photograph
│   │   ├── profile.jpg
│   │   └── README.txt
│   ├── certificates/           # [DROP HERE] Microsoft certificate images
│   │   ├── azure-ai-900.png
│   │   └── azure-az-900.png
│   ├── achievements/           # [DROP HERE] HERizon 2.0 certificate image
│   │   └── herizon-2.png
│   └── gallery/                # [DROP HERE] Academic photos & event moments
│       └── README.txt
└── src/
    ├── app.js                  # Master application orchestration
    ├── styles/
    │   ├── variables.css       # Color palettes, dark/light theme tokens, spacing
    │   ├── typography.css      # Plus Jakarta Sans & JetBrains Mono fluid scales
    │   └── globals.css         # Reset, UI cards, buttons, grid, responsive styles
    ├── data/                   # ⚡ CENTRALIZED DATA (Edit your content here!)
    │   ├── profile.js          # Identity, contact, bio, vision, social links
    │   ├── projects.js         # 4 verified projects & GitHub links
    │   ├── skills.js           # Categorized technical competencies
    │   ├── education.js        # Chandigarh University, B.E. CSE-AI, CGPA 8.56
    │   ├── experience.js       # Sewa Sangh Kaithal internship & milestones
    │   ├── certifications.js   # Azure AI-900 & AZ-900 details & image paths
    │   ├── achievements.js     # HERizon 2.0 achievement details & image paths
    │   └── gallery.js          # Academic gallery items & categories
    └── components/
        ├── Navbar.js           # Header, active spy, theme toggle, mobile drawer
        ├── Hero.js             # Headline, photo/monogram avatar, status badge, metrics
        ├── About.js            # Biography, strategic pillars, current learning focus
        ├── Projects.js         # Project cards, category filters, case study modals
        ├── CoaLab.js           # COA Lab: Simulator card & Number System Converter
        ├── Skills.js           # Skill matrix & core focus pills
        ├── Journey.js          # Academic education card & social internship
        ├── Certifications.js   # Microsoft credentials with zoomable viewer
        ├── Achievements.js     # HERizon 2.0 college achievement spotlight
        ├── Gallery.js          # Photo showcase with captions & drop-in guide
        ├── ResumeViewer.js     # Embedded PDF viewer with fallback placeholder
        ├── Contact.js          # Validated contact form, mailto builder & copy email
        ├── Modal.js            # Accessible lightbox dialog for certificates/details
        └── Footer.js           # Branding, sitemap links, and back-to-top button
```

---

## 📝 How to Update Your Information (Centralized Content)

All content is managed inside `src/data/`. You never need to touch HTML or CSS to change text!

| Content to Change | File Location |
| :--- | :--- |
| **Name, Bio, Email, Phone, Socials** | `src/data/profile.js` |
| **Projects & GitHub Links** | `src/data/projects.js` |
| **Technical Skills & Tools** | `src/data/skills.js` |
| **College, Degree, CGPA** | `src/data/education.js` |
| **Internship & Milestones** | `src/data/experience.js` |
| **Certifications & Credential Links** | `src/data/certifications.js` |
| **College Achievements** | `src/data/achievements.js` |
| **Photo Gallery Items & Captions** | `src/data/gallery.js` |

---

## 📄 How to Add Your Resume PDF

1. Export your resume as a PDF file.
2. Name the file **`resume.pdf`**.
3. Place it in the **`public/`** folder: `public/resume.pdf`.
4. Refresh your portfolio! The website will automatically embed your PDF and enable direct downloads and new-tab viewing.

---

## 📜 How to Add Your Certificate & Achievement Images

1. **Microsoft Azure AI-900 & AZ-900**:
   - Save your certificate images into `public/certificates/` as `azure-ai-900.png` and `azure-az-900.png`.
2. **HERizon 2.0 College Achievement**:
   - Save your certificate image into `public/achievements/` as `herizon-2.png`.
3. The portfolio will automatically render the images inside the interactive lightbox preview!

---

## 📸 How to Add Photos to the Academic Gallery

1. Place image files inside `public/gallery/` (e.g., `campus-1.jpg`).
2. Open `src/data/gallery.js` and add an entry:
   ```javascript
   export const galleryItems = [
     {
       id: "campus-1",
       title: "Chandigarh University Computing Lab",
       category: "Campus",
       caption: "Collaborating on engineering projects at CU campus.",
       imageSrc: "/gallery/campus-1.jpg"
     }
   ];
   ```
3. Refresh to see the photo displayed with responsive masonry layout and click-to-enlarge lightbox viewing!

---

## 💻 Local Testing Instructions

You can preview the website locally using Python's built-in web server:

### In PowerShell or Command Prompt:
```powershell
# Navigate to project directory
cd "c:\Users\miman\project\coa projecct\assignment 2"

# Start the local server on port 3000
python -m http.server 3000
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 🚀 How to Deploy on Vercel (Step-by-Step)

### Option 1: Deploy via GitHub (Recommended)

1. **Push your project to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Mimansha Bhatnagar portfolio"
   git branch -M main
   git remote add origin https://github.com/mimanshabhatnagar10/portfolio.git
   git push -u origin main
   ```
2. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. **Import Project**:
   - Click **"Add New..."** → **"Project"**.
   - Select your `portfolio` repository from the list.
4. **Deploy**:
   - Framework Preset: **Other** (Static Site).
   - Root Directory: `./` (or leave default).
   - Click **"Deploy"**.
5. Within 15 seconds, Vercel will provide your live URL (e.g., `https://mimansha-bhatnagar-portfolio.vercel.app`)!
6. Once deployed, update `portfolio` in `src/data/profile.js` with your live link.

### Option 2: Deploy using Vercel CLI

```bash
# If you have vercel CLI installed:
vercel
```
Follow the quick prompts and your site is live!
