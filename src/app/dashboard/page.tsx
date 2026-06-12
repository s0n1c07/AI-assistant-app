import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VoiceAgent from "@/components/VoiceAgent";
import { Bot, Sparkles, Activity } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName || "there";

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "1rem",
              color: "var(--accent-purple-light)",
              fontSize: "0.78rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
            }}
          >
            <Activity size={12} />
            Voice Session
          </div>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Welcome back,{" "}
            <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Start a voice conversation with Aria — your personal AI assistant.
          </p>
        </div>

        {/* Info cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { icon: <Bot size={18} />, label: "Assistant", value: "Aria AI" },
            { icon: <Sparkles size={18} />, label: "Mode", value: "Voice + Chat" },
            { icon: <Activity size={18} />, label: "Status", value: "Ready" },
          ].map((card) => (
            <div
              key={card.label}
              className="glass-card"
              style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(124,58,237,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-purple-light)",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice Agent panel */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <VoiceAgent userName={firstName} />
        </div>

        {/* Tips */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: "12px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1rem" }}>💡</span>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent-purple-light)" }}>Tips: </strong>
            Click the orb to start. Speak clearly into your microphone. Aria understands natural language — ask anything!
            Press the red button to end the session.
          </p>
        </div>
      </div>
    </div>
  );
}
