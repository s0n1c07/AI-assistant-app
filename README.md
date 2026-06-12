# 🤖 Aria AI — Intelligent Voice Assistant

<div align="center">

![Aria AI](https://img.shields.io/badge/AI-Voice%20Assistant-7c3aed?style=for-the-badge&logo=robot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk)
![Vapi](https://img.shields.io/badge/Voice-Vapi%20AI-3b82f6?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

**Real-time AI voice and chat assistant with Clerk authentication**

[🚀 Live Demo](#) · [📖 Docs](#setup) · [🐛 Issues](https://github.com/s0n1c07/AI-assistant-app/issues)

</div>

---

## ✨ Features

- 🎤 **Real-time Voice AI** — Talk naturally with Aria powered by Vapi AI
- 🔐 **Secure Auth** — Sign in with email or Google via Clerk
- 💬 **Live Transcripts** — See the full conversation in real-time
- 🌊 **Volume Visualization** — Orb reacts to voice levels dynamically
- 👤 **User Profiles** — Personalized dashboard with your info
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🌑 **Premium Dark UI** — Glassmorphism + purple gradient design
- 🗃️ **Convex Backend** — Session history stored in real-time DB

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Full-stack React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Clerk | Authentication |
| Vapi AI | Voice conversations |
| Convex | Real-time database |

---

## ⚡ Setup

### 1. Clone & Install
```bash
git clone https://github.com/s0n1c07/AI-assistant-app.git
cd AI-assistant-app
npm install --legacy-peer-deps
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
# Clerk — https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Vapi AI — https://vapi.ai
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-public-token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-assistant-id

# Convex — run: npx convex dev (auto-fills this)
NEXT_PUBLIC_CONVEX_URL=
```

### 3. Set up Convex (optional but recommended)
```bash
npx convex dev
# → Follow browser prompt to create deployment
# → NEXT_PUBLIC_CONVEX_URL is auto-added to .env.local
```

### 4. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/     # Main voice session page
│   ├── profile/       # User profile page
│   ├── sign-in/       # Clerk sign-in
│   ├── sign-up/       # Clerk sign-up
│   └── globals.css    # Design system
├── components/
│   ├── Navbar.tsx     # Responsive navbar
│   ├── HeroSection.tsx # Landing page
│   └── VoiceAgent.tsx  # Core Vapi AI voice component
├── constants/         # App-wide config
├── lib/               # Utilities
├── middleware.ts      # Clerk route protection
└── providers/         # ConvexClerkProvider
convex/
├── schema.ts          # DB schema
└── users.ts           # DB functions
```

---

## 🎯 Suggested Addons

- [ ] **Chat Mode** — Text-based conversation alongside voice
- [ ] **Session History** — View past conversation summaries
- [ ] **Custom AI Persona** — Let users choose their AI personality
- [ ] **Multi-language** — Support for 10+ languages via Vapi
- [ ] **Emotion Detection** — Detect tone/sentiment from voice
- [ ] **Feedback System** — Email feedback via Resend
- [ ] **Dark/Light Toggle** — Theme switcher
- [ ] **Vercel Deploy** — One-click production deployment

---

## 🔒 Security

- All API keys stored in `.env.local` (never committed to git)
- Routes protected by Clerk middleware
- `CLERK_SECRET_KEY` only used server-side
- `NEXT_PUBLIC_*` keys are browser-safe by design

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">
Built with ❤️ using Next.js, Clerk & Vapi AI
</div>
