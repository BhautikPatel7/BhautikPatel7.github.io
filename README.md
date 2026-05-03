# Bhautik Thummar — Portfolio Website

> A hand-crafted, premium dark-themed portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no templates.

![Neural Dark Theme](https://img.shields.io/badge/theme-Neural_Dark-6366f1?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/tech-Vanilla_JS-f7df1e?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/hosting-GitHub_Pages-222?style=flat-square)

## ✨ Features

- **Neural Dark Theme** — Premium dark design with glassmorphism, gradients, and glow effects
- **Custom Cursor** — Dot + ring follower with interactive hover states
- **Typing Animation** — Terminal-style role cycling (AI/ML Engineer, Computer Vision Expert, etc.)
- **Floating Code Snippets** — ML code drifting with mouse parallax
- **Word-Split Section Titles** — Each word flips in individually
- **3D Card Tilt** — Project cards rotate based on mouse position
- **Scroll-Driven Animations** — Blur reveals, clip-path wipes, 3D flips, glow-in effects
- **Animated Counters** — Stats count up on scroll
- **Terminal YAML Block** — Fun personality showcase
- **Filterable Projects** — Category-based project filtering
- **Contact Form** — Formspree-powered with toast notifications
- **Responsive** — Looks great on all devices
- **Performance Optimized** — Deferred scripts, preconnect hints, passive listeners

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Space Grotesk, JetBrains Mono |
| Icons | Font Awesome 6 |
| Hosting | GitHub Pages |

## 🚀 Deploy to GitHub Pages

1. **Create a GitHub repository** named `bhautikpatel7.github.io` (or any name)

2. **Initialize git and push:**
   ```bash
   cd ProtFolio
   git init
   git add .
   git commit -m "🚀 Launch portfolio"
   git branch -M main
   git remote add origin https://github.com/BhautikPatel7/bhautikpatel7.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repo **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
   - Click **Save**

4. **Your site will be live at:** `https://bhautikpatel7.github.io`

## 📁 Project Structure

```
ProtFolio/
├── index.html              # Main HTML
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── .nojekyll               # GitHub Pages config
├── assets/
│   ├── favicon.svg         # BT monogram favicon
│   └── resume.pdf          # (Add your resume here)
├── css/
│   ├── variables.css       # Design tokens
│   ├── reset.css           # Modern reset
│   ├── animations.css      # Scroll animation system
│   ├── style.css           # Base styles
│   ├── components.css      # Navbar, footer, UI
│   ├── cursor.css          # Custom cursor
│   ├── responsive.css      # Breakpoints
│   └── sections/
│       ├── hero.css
│       ├── about.css
│       ├── skills.css
│       ├── timeline.css
│       ├── projects.css
│       ├── other-projects.css
│       └── contact.css
└── js/
    ├── main.js             # Scroll engine + nav
    ├── cursor.js           # Custom cursor
    ├── typing.js           # Typing effect
    ├── hero.js             # Parallax + magnetic buttons
    ├── about.js            # Counter animation
    ├── projects.js         # Filter + tilt
    └── contact.js          # Form handler
```

## 📝 Customization

### Update your info
Edit `index.html` and replace placeholder content with your actual:
- Project descriptions, screenshots, and links
- Company names in the Experience timeline
- Resume PDF in `assets/resume.pdf`

### Connect the contact form
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy the form ID
3. In `index.html`, replace `YOUR_FORM_ID` in the contact form action

---

Designed & crafted with precision by **Bhautik Thummar**
