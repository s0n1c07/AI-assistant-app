import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock, MessageSquare, Bot, Calendar } from "lucide-react";

interface MockSession {
  id: string;
  personaId: string;
  startedAt: number;
  duration: number;
  messageCount: number;
}

const PERSONA_EMOJIS: Record<string, string> = { aria: "🤖", alex: "💻", nova: "✨" };
const PERSONA_COLORS: Record<string, string> = { aria: "#7c3aed", alex: "#10b981", nova: "#ec4899" };
const PERSONA_NAMES:  Record<string, string> = { aria: "Aria", alex: "Alex", nova: "Nova" };

function formatDuration(ms: number) {
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  if (mins > 0) return `${mins}m ${secs % 60}s`;
  return `${secs}s`;
}

function formatDate(ts: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(ts));
}

// Demo sessions shown when there are no real sessions yet
const demoSessions: MockSession[] = [
  { id: "1", personaId: "aria", startedAt: Date.now() - 86400000 * 1, duration: 345000, messageCount: 12 },
  { id: "2", personaId: "alex", startedAt: Date.now() - 86400000 * 2, duration: 900000, messageCount: 28 },
  { id: "3", personaId: "nova", startedAt: Date.now() - 86400000 * 3, duration: 240000, messageCount: 8 },
  { id: "4", personaId: "aria", startedAt: Date.now() - 86400000 * 5, duration: 600000, messageCount: 19 },
];

export default async function HistoryPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const sessions = demoSessions; // replace with Convex query when connected

  const totalTime = sessions.reduce((s, r) => s + r.duration, 0);
  const totalMsgs = sessions.reduce((s, r) => s + r.messageCount, 0);

  return (
    <div className="page-wrapper">
      {/* Ambient blob */}
      <div className="blob blob-purple" style={{ top: "10%", left: "5%", width: "350px", height: "350px" }} />

      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="badge" style={{ marginBottom: "0.75rem" }}>
              <Calendar size={11} /> Session History
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, marginBottom: "0.3rem" }}>
              Your{" "}
              <span className="gradient-text">Conversations</span>
            </h1>
            <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
              All past voice and chat sessions with VoxMind AI.
            </p>
          </div>
          <Link href="/dashboard">
            <button className="btn-glow" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
              + New Session
            </button>
          </Link>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: <Bot size={17} />,          label: "Total Sessions", value: sessions.length.toString(), color: "#7c3aed" },
            { icon: <Clock size={17} />,         label: "Total Talk Time", value: formatDuration(totalTime),  color: "#3b82f6" },
            { icon: <MessageSquare size={17} />, label: "Total Messages",  value: totalMsgs.toString(),       color: "#06b6d4" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Session list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sessions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</p>
              <p className="text-secondary">No sessions yet. Start a conversation in the{" "}
                <Link href="/dashboard" style={{ color: "var(--accent-purple-light)" }}>Dashboard</Link>.
              </p>
            </div>
          ) : (
            sessions.map((session) => {
              const color = PERSONA_COLORS[session.personaId] || "#7c3aed";
              return (
                <div
                  key={session.id}
                  className="session-card"
                  style={{ borderLeft: `3px solid ${color}` }}
                >
                  {/* Left: persona + date */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${color}18`, border: `1px solid ${color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.4rem", flexShrink: 0,
                    }}>
                      {PERSONA_EMOJIS[session.personaId]}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "3px" }}>
                        {PERSONA_NAMES[session.personaId]} Session
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {formatDate(session.startedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right: stats */}
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Duration</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {formatDuration(session.duration)}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Messages</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {session.messageCount}
                      </p>
                    </div>
                    <div style={{
                      padding: "4px 10px", borderRadius: "100px",
                      background: `${color}15`, border: `1px solid ${color}30`,
                      fontSize: "0.72rem", fontWeight: 700, color,
                    }}>
                      {PERSONA_NAMES[session.personaId]}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {sessions === demoSessions && (
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            📝 Showing sample sessions. Connect Convex to persist real session history.
          </p>
        )}
      </div>
    </div>
  );
}
