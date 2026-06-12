"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { features } from "@/constants";
import { Bot, Sparkles, ChevronRight, Mic, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      {/* Ambient background blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "40%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Hero content */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "2rem",
            color: "var(--accent-purple-light)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <Sparkles size={14} />
          Powered by Vapi AI Voice Technology
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            animationDelay: "0.1s",
          }}
        >
          Meet{" "}
          <span className="gradient-text">Aria</span>
          <br />
          Your AI Companion
        </h1>

        <p
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            animationDelay: "0.2s",
          }}
        >
          Speak naturally, get intelligent answers. Aria is always listening,
          always learning — your 24/7 AI voice and chat assistant.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "4rem",
            animationDelay: "0.3s",
          }}
        >
          <SignedOut>
            <Link href="/sign-up">
              <button
                className="btn-glow"
                style={{ fontSize: "1rem", padding: "14px 32px" }}
              >
                Start for Free
                <ChevronRight
                  size={16}
                  style={{ display: "inline", marginLeft: "4px" }}
                />
              </button>
            </Link>
            <Link href="/sign-in">
              <button
                className="btn-ghost"
                style={{ fontSize: "1rem", padding: "14px 32px" }}
              >
                Sign In
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button
                className="btn-glow"
                style={{ fontSize: "1rem", padding: "14px 32px" }}
              >
                Open Dashboard
                <ChevronRight
                  size={16}
                  style={{ display: "inline", marginLeft: "4px" }}
                />
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* AI Orb visual */}
        <div
          className="animate-float"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5rem",
          }}
        >
          <div style={{ position: "relative", width: "160px", height: "160px" }}>
            {/* Outer ring */}
            <div
              className="animate-spin-slow"
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                border: "1px solid rgba(124,58,237,0.3)",
                borderTopColor: "rgba(124,58,237,0.8)",
              }}
            />
            {/* Middle ring */}
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            />
            {/* Main orb */}
            <div
              className="animate-orb"
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #9d5eff, #3b82f6, #0a0a0f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={56} color="white" style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))" }} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "5rem",
            animationDelay: "0.4s",
          }}
        >
          {[
            { icon: <Mic size={18} />, label: "Voice AI", value: "Real-time" },
            { icon: <Zap size={18} />, label: "Response", value: "< 1 second" },
            { icon: <Shield size={18} />, label: "Security", value: "Clerk Auth" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "160px",
              }}
            >
              <div style={{ color: "var(--accent-purple-light)" }}>{stat.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section
        id="features"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: "1rem",
            }}
          >
            Everything you need,{" "}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto" }}>
            Aria is packed with powerful features, all accessible from a single
            beautiful interface.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card"
              style={{
                padding: "1.75rem",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1.5rem",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <p>
          Built with ❤️ using Next.js, Clerk & Vapi AI ·{" "}
          <a
            href="https://github.com/s0n1c07/AI-assistant-app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-purple-light)", textDecoration: "none" }}
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
