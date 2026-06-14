# 🤖 VoxMind — AI Voice & Chat Assistant

<div align="center">

![VoxMind](https://img.shields.io/badge/AI-Voice%20%26%20Chat%20Assistant-7c3aed?style=for-the-badge&logo=robot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk)
![Vapi AI](https://img.shields.io/badge/Voice-Vapi%20AI-3b82f6?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/Chat-OpenAI%20GPT--4o-10a37f?style=for-the-badge&logo=openai)
![Recharts](https://img.shields.io/badge/Charts-Recharts-22d3ee?style=for-the-badge)

**Real-time AI voice & text chat assistant with personas, analytics, memory & multi-language support — built with Next.js 15**

[🚀 View Repo](https://github.com/s0n1c07/AI-assistant-app) · [📖 Setup Guide](#-setup) · [🗺️ Workflow](#️-how-it-works--complete-workflow) · [🐛 Issues](https://github.com/s0n1c07/AI-assistant-app/issues)

</div>

---

## ✨ Features

### 🎤 Voice Mode (Vapi AI)
- **Real-time voice conversations** — Talk naturally; the AI listens and responds with near-zero latency
- **Single-bubble transcripts** — Each speaker turn appears as one clean message (partial transcripts accumulate, only the final is committed)
- **Volume-reactive orb** — The orb pulses and scales with the AI's speech volume
- **Mute / End call controls** — Toggle mic mid-session or end gracefully
- **Live typing indicator** — Animated dots when the AI is generating a response

### 💬 Text Chat Mode (OpenAI GPT-4o-mini)
- **Streaming responses** — AI reply streams token-by-token in real-time
- **Full conversation history** — Context window maintained across the session
- **Per-persona system prompts** — Each persona has a distinct personality and expertise

### 🤖 AI Personas
| Persona | Specialty | Theme |
|---|---|---|
| 🤖 **Aria** | General assistant — warm, helpful, versatile | Purple |
| 💻 **Alex** | Expert coding tutor — TypeScript, React, Python, system design | Green |
| ✨ **Nova** | Creative muse — storytelling, poetry, brainstorming | Pink |

Every persona gets its own color scheme, orb glow, chat bubble color, and greeting style.

### 🌍 Multi-Language Support (12 Languages)
English · Hindi · Spanish · French · German · Portuguese · Japanese · Korean · Chinese · Arabic · Russian · Italian

### 📊 Usage Analytics Dashboard
- **7-Day session chart** — Area chart of your conversation frequency
- **Persona breakdown** — Donut chart showing which AI you use most
- **Stat cards** — Total talk time, message count, avg session length, favorite persona

### 🧠 Memory System
- **Persistent user facts** — Store things about yourself so the AI always knows your context
- **4 categories** — Personal · Preference · Project · Interest
- **Full CRUD** — Add & delete from the Memory tab
- **Convex-powered** — Memories persist across sessions when Convex is connected

### 🔒 Authentication
- Email + Google OAuth via **Clerk**
- All routes protected by middleware — `/dashboard` and `/profile` require login

### 💌 Feedback System
- In-app feedback form with email delivery via the `/api/feedback` route

### Design
- 🌑 **Premium dark UI** — Deep `#0a0a0f` background, glassmorphism cards, gradient accents
- 📱 **Fully responsive** — Mobile, tablet, and desktop
- ✨ **Micro-animations** — Orb pulse, fade-in-up, ripple rings, floating effects

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | Full-stack React framework (App Router) |
| **TypeScript** | 5 | Type safety across the whole codebase |
| **Clerk** | 6 | Authentication (Email + Google OAuth) |
| **Vapi AI** | 2.x | Real-time voice conversations (STT + LLM + TTS) |
| **OpenAI** | 4.x | Text chat via GPT-4o-mini (streaming) |
| **Convex** | 1.x | Real-time serverless database (memories, sessions) |
| **Recharts** | 2.x | Session & persona analytics charts |
| **Vanilla CSS** | — | Custom design system with CSS variables |

---

## 🗺️ How It Works — Complete Workflow

### 1. Landing Page (`/`)
- Animated rotating **AI orb** introduction
- **"Start for Free"** → `/sign-up` | **"Sign In"** → `/sign-in`
- Feature grid visible without login

```
User visits / → Sees hero + features → Clicks "Start for Free"
```

---

### 2. Authentication (`/sign-in` · `/sign-up`)
- Powered by **Clerk** — handles email, Google OAuth
- After login → auto-redirected to `/dashboard`
- `middleware.ts` blocks unauthenticated access to protected routes

```
User signs up/in → JWT cookie set → Redirected to /dashboard
```

---

### 3. Dashboard (`/dashboard`) — 3 Tabs

#### 🎙️ Voice Tab (default)

```
1. Pick a Persona  → Aria / Alex / Nova
2. Click the orb   → Browser asks for mic permission (first time)
3. Speak           → Your voice → Vapi → AI → audio response back
4. Transcripts     → Your words & AI replies appear as chat bubbles
5. End call        → Stats recorded
```

**Transcript behaviour (fixed):**
- Partial transcripts show as a faint italic live preview
- Only the **final** complete turn is committed as a permanent bubble
- No more multiple fragments per response

#### 📊 Analytics Tab

| Widget | What it shows |
|---|---|
| Total Talk Time | Sum of all session durations |
| Total Messages | Total back-and-forth exchanges |
| Avg Session | Average length per call |
| Favorite AI | Most-used persona |
| 7-Day Chart | Sessions per day for the last week |
| Persona Pie | Share of Aria vs Alex vs Nova usage |

#### 🧠 Memory Tab

```
Click "Add a memory"
Type a fact → e.g. "I'm building a SaaS in TypeScript"
Choose category → Personal / Preference / Project / Interest
Press "Save Memory"
```

---

### 4. Text Chat (`/dashboard` — Chat Panel)
- Type a message → streamed GPT-4o-mini response appears in real-time
- Each persona has its own system prompt for distinct personality
- Language selector changes the response language

---

### 5. Profile Page (`/profile`)
- Shows avatar, name, email, Clerk user ID
- "Manage Account" → Clerk hosted settings

---

### 6. Data Flow

```
Browser
  │
  ├─ Clerk (Auth) ──────────────────── JWT → protects /dashboard, /profile
  │
  ├─ Vapi AI (Voice)
  │    ├─ Mic audio → Vapi servers (STT)
  │    ├─ Vapi → AI model (LLM)
  │    └─ Audio stream → speaker + transcript events → UI bubbles
  │
  ├─ OpenAI API (Text Chat)
  │    └─ /api/chat → GPT-4o-mini streaming → token-by-token UI update
  │
  ├─ /api/feedback → Email delivery
  │
  ├─ Convex (DB) [optional]
  │    ├─ memories table  → user facts
  │    ├─ sessions table  → call history
  │    └─ users table     → profile data
  │
  └─ Next.js (App)
       ├─ /          → Landing page (public)
       ├─ /sign-in   → Clerk sign-in (public)
       ├─ /sign-up   → Clerk sign-up (public)
       ├─ /dashboard → Main voice + chat UI (protected)
       └─ /profile   → User profile (protected)
```

---

## ⚡ Setup

### 1. Clone & Install

```bash
git clone https://github.com/s0n1c07/AI-assistant-app.git
cd AI-assistant-app
npm install --legacy-peer-deps
```

### 2. Environment Variables

Create `.env.local` in the project root (**never commit this file**):

```env
# ── CLERK AUTHENTICATION ──────────────────────────────────────
# Get from: https://clerk.com → New Application
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Redirect URLs (keep as-is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ── VAPI AI (VOICE) ───────────────────────────────────────────
# Get from: https://vapi.ai → Settings → API Keys
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-public-token
# Get from: https://vapi.ai → Assistants → your assistant ID
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-assistant-id

# ── OPENAI (TEXT CHAT) ────────────────────────────────────────
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# ── CONVEX (DATABASE — optional) ─────────────────────────────
# Auto-filled when you run: npx convex dev
NEXT_PUBLIC_CONVEX_URL=
```

### 3. Configure Your Vapi Assistant

1. Go to **https://vapi.ai** → Dashboard → Assistants → your assistant
2. Set the **System Prompt** — example:
   > *"You are Aria, a friendly and intelligent AI voice assistant. Be concise, warm, and helpful."*
3. Set **Voice** → recommend `Alloy` or `Shimmer`
4. Save — no code changes needed

### 4. (Optional) Set up Convex

```bash
npx convex dev
```
- A browser window opens → log in → creates your deployment
- `NEXT_PUBLIC_CONVEX_URL` is auto-written to `.env.local`
- Run alongside the app in a separate terminal

### 5. Run Locally

```bash
npm run dev
```
Open → **http://localhost:3000**

---

## 🚀 Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. Click **"Add New Project"** → Import `AI-assistant-app`
3. Add all `.env.local` variables under **Environment Variables** in Vercel settings
4. Click **Deploy**
5. Get your live URL: `https://ai-assistant-app-xyz.vercel.com`

> Every `git push` to `main` triggers an automatic redeploy.

---

## 📁 Project Structure

```
ai-assistant-app/
├── convex/
│   ├── schema.ts              # DB: users, sessions, memories tables
│   └── users.ts               # DB: mutations & queries (CRUD)
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # OpenAI GPT-4o-mini streaming endpoint
│   │   │   └── feedback/route.ts  # Feedback email delivery endpoint
│   │   ├── dashboard/page.tsx     # Dashboard (server — auth guard)
│   │   ├── history/               # Session history page
│   │   ├── profile/page.tsx       # User profile page
│   │   ├── sign-in/               # Clerk sign-in
│   │   ├── sign-up/               # Clerk sign-up
│   │   ├── globals.css            # Full design system (CSS vars, animations)
│   │   └── layout.tsx             # Root layout (Clerk + Convex providers)
│   │
│   ├── components/
│   │   ├── ChatPanel.tsx          # Text chat UI (streaming GPT-4o-mini)
│   │   ├── DashboardClient.tsx    # Tabbed dashboard (Voice/Analytics/Memory)
│   │   ├── FeedbackModal.tsx      # In-app feedback form
│   │   ├── HeroSection.tsx        # Landing page hero + features grid
│   │   ├── LanguageSelector.tsx   # 12-language dropdown
│   │   ├── MemoryPanel.tsx        # Memory add/delete UI
│   │   ├── Navbar.tsx             # Responsive navbar + Clerk auth buttons
│   │   ├── PersonaSelector.tsx    # Aria / Alex / Nova persona cards
│   │   ├── ThemeToggle.tsx        # Dark/light theme toggle
│   │   ├── UsageDashboard.tsx     # Session charts (Recharts)
│   │   └── VoiceAgent.tsx         # Vapi AI orb + transcript panel
│   │
│   ├── constants/
│   │   ├── index.ts               # Site config, features, nav links
│   │   ├── languages.ts           # 12 supported languages
│   │   └── personas.ts            # Persona definitions (color, prompt, emoji)
│   │
│   ├── lib/utils.ts               # Utility helpers
│   ├── middleware.ts               # Clerk route protection
│   └── providers/
│       └── ConvexClerkProvider.tsx # Combined auth + DB provider
│
├── .env.local                     # ⚠️ Your secrets — NEVER commit this
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🔒 Security

| Item | Status |
|---|---|
| `.env.local` in `.gitignore` | ✅ Never committed |
| `CLERK_SECRET_KEY` server-only | ✅ Only used in Server Components |
| `OPENAI_API_KEY` server-only | ✅ Only used in API route (never exposed to browser) |
| `NEXT_PUBLIC_*` browser-safe | ✅ Safe by design (Vapi/Clerk public tokens) |
| Routes protected by middleware | ✅ `/dashboard`, `/profile` require auth |
| Clerk JWT validates every request | ✅ Handled automatically |

---

## 🎯 Roadmap

- [x] Real-time voice AI with Vapi
- [x] Clerk authentication (Email + Google)
- [x] Live conversation transcripts (single bubble per turn)
- [x] Multiple AI personas (Aria, Alex, Nova)
- [x] Text chat mode with streaming (GPT-4o-mini)
- [x] Usage analytics dashboard with charts
- [x] Memory system (persistent user facts)
- [x] Multi-language support (12 languages)
- [x] In-app feedback form
- [x] Dark/Light theme toggle
- [x] Vercel deployment support
- [ ] Session history page (full past conversations)
- [ ] Email summary after each session
- [ ] Fine-tuned persona voices

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">
Built with ❤️ using Next.js 15 · Clerk · Vapi AI · OpenAI · Convex · Recharts
<br><br>
<a href="https://github.com/s0n1c07/AI-assistant-app">⭐ Star this repo if you find it useful!</a>
</div>
