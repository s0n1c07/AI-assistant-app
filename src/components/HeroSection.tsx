"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { features } from "@/constants";
import { Bot, Sparkles, ChevronRight, Mic, Globe, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="page-wrapper grid-bg" style={{ paddingTop: "64px" }}>
      {/* Ambient blobs */}
      <div className="blob blob-purple" style={{ top: "10%", left: "15%", width: "450px", height: "450px" }} />
      <div className="blob blob-blue"   style={{ top: "35%", right: "8%",  width: "350px", height: "350px" }} />
      <div className="blob" style={{
        bottom: "20%", left: "40%", width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
      }} />

      {/* Hero */}
      <section className="container-lg" style={{ padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        {/* Badge */}
        <div
          className="badge animate-fade-in-up"
          style={{ marginBottom: "2rem" }}
        >
          <Sparkles size={13} />
          Powered by Vapi AI Voice Technology
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: "1.5rem",
            animationDelay: "0.1s",
          }}
        >
          Meet{" "}
          <span className="gradient-text">VoxMind</span>
          <br />
          Your AI Companion
        </h1>

        <p
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--text-secondary)",
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.75,
            animationDelay: "0.2s",
          }}
        >
          Voice or text, one language or twelve — VoxMind adapts to you.
          Multiple AI personas, persistent memory, real-time analytics.
        </p>

        {/* CTA */}
        <div
          className="animate-fade-in-up"
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem", animationDelay: "0.3s" }}
        >
          <SignedOut>
            <Link href="/sign-up">
              <button className="btn-glow" style={{ fontSize: "1rem", padding: "13px 32px" }}>
                Start for Free <ChevronRight size={15} style={{ display: "inline", marginLeft: "4px" }} />
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="btn-ghost" style={{ fontSize: "1rem", padding: "13px 32px" }}>Sign In</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="btn-glow" style={{ fontSize: "1rem", padding: "13px 32px" }}>
                Open Dashboard <ChevronRight size={15} style={{ display: "inline", marginLeft: "4px" }} />
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Orb */}
        <div className="animate-float" style={{ display: "flex", justifyContent: "center", marginBottom: "5rem" }}>
          <div style={{ position: "relative", width: "170px", height: "170px" }}>
            <div className="animate-spin-slow" style={{
              position: "absolute", inset: "-14px", borderRadius: "50%",
              border: "1px solid rgba(124,58,237,0.25)",
              borderTopColor: "rgba(124,58,237,0.7)",
            }} />
            <div style={{
              position: "absolute", inset: "-5px", borderRadius: "50%",
              border: "1px solid rgba(59,130,246,0.15)",
            }} />
            <div className="animate-orb" style={{
              width: "170px", height: "170px", borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #9d5eff, #3b82f6, #0a0a0f)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Bot size={58} color="white" style={{ filter: "drop-shadow(0 0 14px rgba(255,255,255,0.5))" }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in-up"
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "5rem", animationDelay: "0.4s" }}
        >
          {[
            { icon: <Mic size={17} />,   label: "Voice AI",  value: "Real-time" },
            { icon: <Zap size={17} />,   label: "Response",  value: "< 1 second" },
            { icon: <Globe size={17} />, label: "Languages", value: "12 Supported" },
          ].map((s) => (
            <div key={s.label} className="glass-card" style={{ padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", gap: "12px", minWidth: "160px" }}>
              <div style={{ color: "var(--accent-purple-light)" }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container-lg" style={{ padding: "0 1.5rem 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Everything you need,{" "}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="text-secondary" style={{ maxWidth: "520px", margin: "0 auto" }}>
            VoxMind packs powerful features into a single, beautiful interface.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.25rem" }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card"
              style={{ padding: "1.75rem", animationDelay: `${i * 0.08}s` }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.875rem" }}>{f.icon}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-secondary" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "2rem 1.5rem",
        borderTop: "1px solid var(--border)",
        color: "var(--text-muted)",
        fontSize: "0.85rem",
      }}>
        <p>
          Built with ❤️ using Next.js, Clerk, Vapi AI &amp; OpenAI ·{" "}
          <a
            href="https://github.com/s0n1c07/AI-assistant-app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-purple-light)" }}
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
