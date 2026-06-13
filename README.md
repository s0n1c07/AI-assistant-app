# 🤖 Aria AI — Intelligent Voice Assistant

<div align="center">

![Aria AI](https://img.shields.io/badge/AI-Voice%20Assistant-7c3aed?style=for-the-badge&logo=robot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk)
![Vapi AI](https://img.shields.io/badge/Voice-Vapi%20AI-3b82f6?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Recharts](https://img.shields.io/badge/Charts-Recharts-22d3ee?style=for-the-badge)

**Real-time AI voice assistant with personas, analytics & memory — built with Next.js 15**

[🚀 View Repo](https://github.com/s0n1c07/AI-assistant-app) · [📖 Setup Guide](#-setup) · [🗺️ Workflow](#-how-it-works--complete-workflow) · [🐛 Issues](https://github.com/s0n1c07/AI-assistant-app/issues)

</div>

---

## ✨ Features

### Core
- 🎤 **Real-time Voice AI** — Talk naturally; Aria listens and responds with near-zero latency via Vapi AI
- 🔐 **Secure Authentication** — Sign in with Email or Google via Clerk; all routes protected by middleware
- 💬 **Live Transcripts** — Every word you and the AI say appears in real-time chat bubbles
- 🌊 **Volume-reactive Orb** — The voice orb pulses and scales with the AI's speech volume
- 👤 **User Profile Page** — Shows your account details pulled from Clerk

### 🆕 AI Personas (v2)
- 🤖 **Aria** — Friendly, warm, general-purpose assistant (purple theme)
- 💻 **Alex** — Expert coding tutor; great for debugging, architecture & code reviews (green theme)
- ✨ **Nova** — Creative muse; storytelling, poetry, brainstorming & ideas (pink theme)
- Every persona gets its own **color scheme, orb glow, chat bubble color** and **greeting style**

### 🆕 Usage Analytics Dashboard (v2)
- 📊 **7-Day Session Chart** — Area chart showing your conversation frequency over the last week
- 🍩 **Persona Breakdown** — Donut pie chart showing which AI you use most
- ⏱️ **Stat Cards** — Total talk time, message count, average session length, favorite persona

### 🆕 Memory System (v2)
- 🧠 **Persistent Facts** — Store facts about yourself so Aria always knows your context
- 🏷️ **4 Categories** — Personal · Preference · Project · Interest
- ➕ **Add / 🗑️ Delete** — Full CRUD from the Memory tab in the dashboard
- 🔗 **Convex-powered** — Memories persist across browser sessions when Convex is connected

### Design
- 🌑 **Premium Dark UI** — Deep `#0a0a0f` background, glassmorphism cards, purple/blue gradients
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ✨ **Micro-animations** — Orb pulse, fade-in-up, floating, ripple rings on speak

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | Full-stack React framework (App Router) |
| **TypeScript** | 5 | Type safety across the whole codebase |
| **Tailwind CSS** | 4 | Utility styling + custom design tokens |
| **Clerk** | 6 | Authentication (Email + Google OAuth) |
| **Vapi AI** | 2.x | Real-time voice conversations |
| **Convex** | 1.x | Real-time serverless database |
| **Recharts** | 2.x | Session & persona analytics charts |

---

## 🗺️ How It Works — Complete Workflow

### 1. Landing Page (`/`)
The app opens on a dark hero page with:
- An animated rotating **AI orb** (your visual introduction to Aria)
- **"Start for Free"** button → goes to `/sign-up`
- **"Sign In"** button → goes to `/sign-in`
- A feature grid explaining the app's capabilities
- All sections are visible **without logging in**

```
User visits / → Sees hero + features → Clicks "Start for Free"
```

---

### 2. Authentication (`/sign-in` · `/sign-up`)
- Powered by **Clerk** — handles sign up, login, Google OAuth
- After signing in → **automatically redirected** to `/dashboard`
- After signing up → **automatically redirected** to `/dashboard`
- The `middleware.ts` file blocks unauthenticated access to `/dashboard` and `/profile`

```
User signs up/in via Clerk → JWT cookie set → Redirected to /dashboard
```

---

### 3. Dashboard — Voice Tab (`/dashboard`)

This is the **main screen**. It has 3 tabs:

#### 🎙️ Voice Session Tab (default)

**Step 1 — Pick a Persona**
```
Three cards appear: 🤖 Aria | 💻 Alex | ✨ Nova
Click any card → selected persona highlighted with its own color glow
The orb, chat bubbles, and tip text all update to match the persona
```

**Step 2 — Start the Session**
```
Click the pulsing orb → browser asks for microphone permission (first time only)
Status changes: "Connecting..." → "Listening..."
Aria greets you by name (pulled from your Clerk profile)
```

**Step 3 — Speak**
```
You talk → your voice is sent to Vapi AI in real-time
Vapi processes it → sends it to the AI model → streams audio response back
Your words + AI replies appear as chat bubbles in the transcript panel below the orb
The orb scales up/down in sync with the AI's speaking volume
```

**Step 4 — Controls**
```
🎤 Mute button  → toggle microphone on/off mid-session
📵 End button   → stop the call; session stats are recorded
```

**Step 5 — End Session**
```
Click the red phone button → call ends gracefully
Duration + message count saved locally (or to Convex if connected)
Stats immediately appear in the Analytics tab
```

---

#### 📊 Analytics Tab

After running any voice sessions, switch to this tab to see:

| Widget | What it shows |
|---|---|
| **Total Talk Time** | Sum of all session durations |
| **Total Messages** | Total back-and-forth exchanges |
| **Avg Session** | Average length per call |
| **Favorite AI** | The persona you've used most |
| **7-Day Chart** | Sessions per day for the last week |
| **Persona Pie** | Share of Aria vs Alex vs Nova usage |

> Stats update in real-time — start a session, end it, switch to Analytics and the chart updates immediately.

---

#### 🧠 Memory Tab

Add facts about yourself so Aria knows your context:

```
Click "Add a memory for Aria"
Type a fact → e.g. "I'm building a SaaS in TypeScript"
Choose a category → Personal / Preference / Project / Interest
Press "Save Memory" (or hit Enter)
```

Examples of useful memories:
```
👤 Personal:    "My name is Raj and I'm 22 years old"
❤️ Preference:  "I prefer concise answers with bullet points"
🛠️ Project:     "I'm working on an AI assistant app using Next.js"
⭐ Interest:    "I love competitive programming and chess"
```

To delete a memory → click the 🗑️ icon on any memory card.

---

### 4. Profile Page (`/profile`)
- Shows your **avatar**, **full name**, **email**, and **Clerk user ID**
- Online indicator (green dot on avatar)
- "Manage Account" button → opens Clerk's hosted account page
- All data is pulled server-side from Clerk — no separate DB call needed

---

### 5. Data Flow Diagram

```
Browser
  │
  ├─ Clerk (Auth) ──────────────────── JWT → protects /dashboard, /profile
  │
  ├─ Vapi AI (Voice)
  │    ├─ Your mic audio → Vapi servers
  │    ├─ Vapi → AI model (GPT-4 / custom)
  │    └─ AI audio stream → your speaker + transcript events → UI
  │
  ├─ Convex (DB) [optional]
  │    ├─ memories table  → stores user facts
  │    ├─ sessions table  → stores call history
  │    └─ users table     → stores profile data
  │
  └─ Next.js (App)
       ├─ /          → Landing page (public)
       ├─ /sign-in   → Clerk sign-in (public)
       ├─ /sign-up   → Clerk sign-up (public)
       ├─ /dashboard → Main voice UI (protected)
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
# ── CLERK AUTHENTICATION ─────────────────────────────────────
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

# ── CONVEX (DATABASE — optional) ─────────────────────────────
# Auto-filled when you run: npx convex dev
NEXT_PUBLIC_CONVEX_URL=
```

### 3. Configure Your Vapi Assistant

1. Go to **https://vapi.ai** → Dashboard → Assistants → your assistant
2. Set the **System Prompt** — example:
   > *"You are Aria, a friendly and intelligent AI voice assistant. Be concise, warm, and helpful. You can assist with coding, creative writing, general questions, and more."*
3. Set **Voice** → recommend `Alloy` or `Shimmer` for natural tone
4. Save — no code changes needed

### 4. (Optional) Set up Convex for persistent memory & session history

```bash
npx convex dev
```
- A browser window opens → log in to Convex → creates your deployment automatically
- `NEXT_PUBLIC_CONVEX_URL` is automatically written to `.env.local`
- Run your app alongside this command in a separate terminal

### 5. Run Locally

```bash
npm run dev
```
Open → **http://localhost:3000**

---

## 📁 Project Structure

```
ai-assistant-app/
├── convex/
│   ├── schema.ts              # DB: users, sessions, memories tables
│   └── users.ts               # DB: mutations & queries (CRUD)
│
├── public/                    # Static assets
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Dashboard (server — auth guard)
│   │   ├── profile/
│   │   │   └── page.tsx       # User profile page
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   ├── globals.css        # Full design system (CSS vars, animations)
│   │   └── layout.tsx         # Root layout (Clerk + Convex providers)
│   │
│   ├── components/
│   │   ├── DashboardClient.tsx  # 🆕 Tabbed dashboard (Voice/Analytics/Memory)
│   │   ├── HeroSection.tsx      # Landing page hero + features grid
│   │   ├── MemoryPanel.tsx      # 🆕 Memory add/delete UI
│   │   ├── Navbar.tsx           # Responsive navbar + Clerk auth buttons
│   │   ├── PersonaSelector.tsx  # 🆕 Aria / Alex / Nova persona cards
│   │   ├── UsageDashboard.tsx   # 🆕 Session charts (Recharts)
│   │   └── VoiceAgent.tsx       # Core Vapi AI orb + transcript panel
│   │
│   ├── constants/
│   │   ├── index.ts             # Site config, features, nav links
│   │   └── personas.ts          # 🆕 Persona definitions (color, prompt, emoji)
│   │
│   ├── lib/
│   │   └── utils.ts             # cn() utility for class merging
│   │
│   ├── middleware.ts             # Clerk route protection
│   └── providers/
│       └── ConvexClerkProvider.tsx  # Combined auth + DB provider
│
├── .env.local                   # ⚠️ Your secrets — NEVER commit this
├── .gitignore                   # Excludes .env.local, node_modules, .next
├── next.config.ts               # Image domains (Clerk avatars)
├── package.json
└── tsconfig.json
```

---

## 🔒 Security

| Item | Status |
|---|---|
| `.env.local` in `.gitignore` | ✅ Never committed |
| `CLERK_SECRET_KEY` server-only | ✅ Only used in Server Components |
| `NEXT_PUBLIC_*` browser-safe | ✅ Safe by design (Vapi/Clerk public tokens) |
| Routes protected by middleware | ✅ `/dashboard`, `/profile` require auth |
| Clerk JWT validates every request | ✅ Handled automatically |

---

## 🎯 Roadmap

- [x] Real-time Voice AI with Vapi
- [x] Clerk authentication (Email + Google)
- [x] Live conversation transcripts
- [x] Multiple AI personas (Aria, Alex, Nova)
- [x] Usage analytics dashboard with charts
- [x] Memory system (persistent user facts)
- [ ] Text chat mode alongside voice
- [ ] Session summary / history page
- [ ] Multi-language support (10+ via Vapi)
- [ ] Email feedback form via Resend
- [ ] Dark/Light theme toggle
- [ ] Vercel production deployment

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">
Built with ❤️ using Next.js 15 · Clerk · Vapi AI · Convex · Recharts
<br><br>
<a href="https://github.com/s0n1c07/AI-assistant-app">⭐ Star this repo if you find it useful!</a>
</div>
