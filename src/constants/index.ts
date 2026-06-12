export const siteConfig = {
  name: "Aria AI",
  description: "Your intelligent AI voice & chat assistant — available 24/7.",
  url: "https://github.com/s0n1c07/AI-assistant-app",
};

export const features = [
  {
    icon: "🎤",
    title: "Real-time Voice Chat",
    description:
      "Speak naturally with Aria. She listens, understands, and responds in real-time using advanced voice AI.",
  },
  {
    icon: "🧠",
    title: "Intelligent Responses",
    description:
      "Powered by state-of-the-art AI models that understand context, nuance, and complex questions.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    description:
      "Your sessions are protected with Clerk authentication. Only you can access your conversations.",
  },
  {
    icon: "⚡",
    title: "Instant Replies",
    description:
      "No waiting. Aria processes your voice and responds with near-zero latency.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    description:
      "Fully responsive on desktop, tablet, and mobile. Use it anywhere, anytime.",
  },
  {
    icon: "💾",
    title: "Session Memory",
    description:
      "Aria remembers context throughout your conversation so responses stay relevant.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

export const VAPI_CONFIG = {
  webToken: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!,
  workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
};
