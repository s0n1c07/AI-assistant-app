export const siteConfig = {
  name: "VoxMind AI",
  description: "Your intelligent AI voice & text assistant — multiple personas, memory, and analytics.",
  url: "https://github.com/s0n1c07/AI-assistant-app",
};

export const features = [
  {
    icon: "🎤",
    title: "Real-time Voice AI",
    description: "Speak naturally with any persona. VoxMind listens, understands, and responds in real-time with near-zero latency.",
  },
  {
    icon: "💬",
    title: "Text Chat Mode",
    description: "Prefer typing? Switch to chat mode and have a streaming conversation with your chosen AI persona.",
  },
  {
    icon: "🤖",
    title: "Multiple AI Personas",
    description: "Choose Aria (friendly), Alex (coding expert), or Nova (creative muse) — each with a unique voice and style.",
  },
  {
    icon: "🧠",
    title: "Memory System",
    description: "Store facts about yourself. Your AI remembers your name, preferences, and projects across sessions.",
  },
  {
    icon: "📊",
    title: "Usage Analytics",
    description: "Track your session history, total talk time, and see which AI persona you use most with interactive charts.",
  },
  {
    icon: "🌍",
    title: "12 Languages",
    description: "Switch between English, Hindi, Spanish, French, Japanese and 7 more languages — voice and chat both supported.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
  { href: "/profile", label: "Profile" },
];

export const VAPI_CONFIG = {
  webToken: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!,
  workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
};
