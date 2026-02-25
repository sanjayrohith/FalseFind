# 📰 The Veritas Tribune — FalseFind Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)

**A newspaper-themed web interface for verifying news articles using ML analysis and multi-API web scraping**

[Features](#-features) • [Setup](#-setup-guide) • [Usage](#-how-to-use) • [Architecture](#-architecture)

</div>

---

## 🎯 What This Does

The Veritas Tribune is the frontend for **FalseFind** — a fake news detection system. It provides two ways to verify news:

1. **"Verify This Story"** — Sends the article to ML models that analyze it for fake news patterns, predict the likely source, and detect impersonation.
2. **"Scrape the Web"** — Searches the internet across multiple APIs (GNews, Google Fact Check, DuckDuckGo) to cross-reference the claim against real news sources, producing a **REAL / FAKE / UNVERIFIED** verdict with confidence %.

The UI is designed with a **vintage newspaper aesthetic** — editorial typography, ink-style borders, stamp-style verdict badges, and warm parchment tones.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **ML Verification** | Fake news detection, source attribution, and impersonation checking |
| 🌐 **Web Scraping** | Multi-API search across GNews, Google Fact Check, and DuckDuckGo |
| ✅ **Cross-Reference Verdict** | REAL / FAKE / UNVERIFIED with confidence % and explanation |
| 📰 **Live Headlines** | Dynamic news ticker showing real headlines by category (Politics, Tech, Business, Entertainment, World) |
| 🗂️ **History Archive** | Local storage-backed history of past verifications |
| 🎨 **Newspaper Theme** | Vintage editorial design with Playfair Display, stamp animations, and parchment textures |
| 📱 **Fully Responsive** | Works on desktop, tablet, and mobile |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                      # shadcn/ui base components
│   │   ├── NewsInput.tsx            # Article input + Verify & Scrape buttons
│   │   ├── VerdictDisplay.tsx       # ML analysis result card with verdict stamp
│   │   ├── ScrapeResultDisplay.tsx  # Web scraping results with source cards
│   │   ├── HistoryPanel.tsx         # Past verification archive
│   │   └── NewsTicker.tsx           # Live headlines sidebar
│   ├── hooks/
│   │   └── useFakeNewsDetector.ts   # Core hook — API calls, state, types
│   ├── pages/
│   │   └── Index.tsx                # Main page layout
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── index.css                    # Design system — colors, fonts, animations
│   ├── App.tsx                      # Router setup
│   └── main.tsx                     # Entry point
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Setup Guide

### Prerequisites

- **Node.js 18+** (or Bun)
- **The backend must be running** — see [Backend README](https://github.com/sanjayrohith/source-attribution)

### Step 1 — Clone & Install

```bash
git clone https://github.com/sanjayrohith/FalseFind.git
cd FalseFind

npm install
```

### Step 2 — Start the Backend

The frontend talks to the backend API at `http://localhost:8000`. Make sure the backend is running first:

```bash
# In a separate terminal
cd /path/to/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

### Step 3 — Start the Frontend

```bash
npm run dev
```

Open **http://localhost:5173** (or the URL shown in terminal).

### Full Setup (Both Servers)

```bash
# Terminal 1 — Backend
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload

# Terminal 2 — Frontend
cd frontend
npm run dev
```

## 🖥️ How to Use

### 1. Verify This Story (ML Analysis)

1. Paste a news headline or article into the text area
2. Optionally select a claimed source (Politics, Tech, etc.)
3. Click **"Verify This Story"** (the primary button)
4. Review the **Verification Report**:
   - **Verdict stamp**: LIKELY TRUE / LIKELY FALSE / UNCERTAIN
   - **Fake News Analysis**: classification + confidence %
   - **Style Analysis**: predicted source + confidence %
   - **Impersonation Check**: whether claimed source matches detected style

### 2. Scrape the Web (Multi-API Verification)

1. Paste a news claim into the text area
2. Click **"Scrape the Web"** (the secondary button)
3. Review the **Web Investigation Report**:
   - **Verdict**: REAL / FAKE / UNVERIFIED with confidence %
   - **Explanation**: why the system reached this conclusion
   - **Fact Checks**: existing fact-checks from Google (if found)
   - **Sources**: all found sources with provider badges (GNews, DuckDuckGo)

### 3. Live Headlines

The left sidebar shows live headlines fetched from GNews API, one per category:
- Politics, Tech, Business, Entertainment, World
- Headlines refresh on every page load
- Click any headline to read the full article

### 4. History Archive

The right sidebar shows your past verifications. Click any entry to reload it.

## 🎨 Design System

The UI uses a **vintage newspaper aesthetic**:

| Element | Implementation |
|---------|---------------|
| **Title font** | UnifrakturMaguntia (blackletter masthead) |
| **Headline font** | Playfair Display (editorial headings) |
| **Body font** | Source Serif 4 (readable body text) |
| **Colors** | Warm parchment tones (HSL-based) |
| **Shadows** | Subtle card-depth for separation |
| **Animations** | fadeInUp entrance, stampIn verdict, hover-lift CTAs |

Colors are defined as CSS variables in `src/index.css` and can be customized.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-first Styling |
| **shadcn/ui** | Base UI Components |
| **Lucide Icons** | Iconography |
| **date-fns** | Date formatting |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔗 Related

- **Backend API**: [github.com/sanjayrohith/source-attribution](https://github.com/sanjayrohith/source-attribution)

## ⚠️ Disclaimer

This tool is for **educational and demonstration purposes only**. It uses ML heuristics and web search — it is not a definitive fact-checking source. Always verify news through multiple reputable sources before sharing.

## 📄 License

MIT License

---

<div align="center">

**The Veritas Tribune** — *Fighting Misinformation One Story at a Time*

</div>
