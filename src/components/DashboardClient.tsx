"use client";

import { useState } from "react";
import VoiceAgent from "@/components/VoiceAgent";
import PersonaSelector from "@/components/PersonaSelector";
import MemoryPanel from "@/components/MemoryPanel";
import UsageDashboard from "@/components/UsageDashboard";
import { personas, type Persona } from "@/constants/personas";
import { Bot, BarChart2, Brain } from "lucide-react";

interface DashboardClientProps {
  firstName: string;
  userId: string;
}

type Tab = "voice" | "stats" | "memory";

export default function DashboardClient({ firstName, userId }: DashboardClientProps) {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);
  const [activeTab, setActiveTab] = useState<Tab>("voice");

  // Local mock memories / sessions for users without Convex set up yet
  const [localMemories, setLocalMemories] = useState<
    Array<{ _id: string; fact: string; category: string; createdAt: number }>
  >([]);
  const [localSessions, setLocalSessions] = useState<
    Array<{
      startedAt: number;
      endedAt?: number;
      duration?: number;
      messageCount?: number;
      personaId: string;
    }>
  >([]);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

  const handleSessionEnd = (messageCount: number) => {
    if (sessionStart) {
      setLocalSessions((prev) => [
        ...prev,
        {
          startedAt: sessionStart,
          endedAt: Date.now(),
          duration: Date.now() - sessionStart,
          messageCount,
          personaId: selectedPersona.id,
        },
      ]);
      setSessionStart(null);
    }
  };

  const handleVoiceStart = () => {
    setSessionStart(Date.now());
  };

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: "voice", label: "Voice Session", icon: <Bot size={15} /> },
    { id: "stats", label: "Analytics", icon: <BarChart2 size={15} /> },
    { id: "memory", label: "Memory", icon: <Brain size={15} /> },
  ];

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
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${selectedPersona.color}18 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, marginBottom: "0.4rem" }}
          >
            Hey{" "}
            <span
              className="gradient-text"
              style={{
                background: selectedPersona.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {firstName}
            </span>{" "}
            👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Your AI companion is ready. Pick a persona and start talking.
          </p>
        </div>

        {/* Tab Nav */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "1.75rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "4px",
            width: "fit-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "9px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
                background: activeTab === tab.id ? selectedPersona.color : "transparent",
                color: activeTab === tab.id ? "white" : "var(--text-muted)",
                boxShadow: activeTab === tab.id ? `0 2px 12px ${selectedPersona.glow}` : "none",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* VOICE TAB */}
        {activeTab === "voice" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
            {/* Persona Selector */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <PersonaSelector
                selected={selectedPersona}
                onSelect={(p) => setSelectedPersona(p)}
              />
            </div>

            {/* Voice Panel */}
            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                borderColor: `${selectedPersona.color}30`,
                boxShadow: `0 4px 24px ${selectedPersona.glow.replace("0.4", "0.1")}`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    background: `${selectedPersona.color}15`,
                    border: `1px solid ${selectedPersona.color}30`,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: selectedPersona.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {selectedPersona.emoji} Talking to {selectedPersona.name}
                </div>
              </div>
              <VoiceAgent
                userName={firstName}
                persona={selectedPersona}
                onSessionEnd={handleSessionEnd}
              />
            </div>

            {/* Tip */}
            <div
              style={{
                padding: "0.875rem 1.125rem",
                background: `${selectedPersona.color}0a`,
                border: `1px solid ${selectedPersona.color}20`,
                borderRadius: "10px",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                display: "flex",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
            >
              <span>💡</span>
              <span>
                <strong style={{ color: selectedPersona.color }}>{selectedPersona.name} tip:</strong>{" "}
                {selectedPersona.id === "aria"
                  ? "Ask me anything — from daily questions to creative brainstorms."
                  : selectedPersona.id === "alex"
                  ? "Share your code, describe a bug, or ask me to design a system architecture."
                  : "Tell me a theme and I'll weave it into a story, poem, or creative brief."}
              </span>
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              Your Usage Analytics
            </h2>
            <UsageDashboard sessions={localSessions} />
          </div>
        )}

        {/* MEMORY TAB */}
        {activeTab === "memory" && (
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Aria&apos;s Memory
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Store facts about yourself so your AI remembers across sessions.
              </p>
            </div>
            <MemoryPanel
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              memories={localMemories as any}
              onAdd={(fact, category) => {
                setLocalMemories((prev) => [
                  {
                    _id: `local-${Date.now()}`,
                    fact,
                    category,
                    createdAt: Date.now(),
                  },
                  ...prev,
                ]);
              }}
              onDelete={(id) => {
                setLocalMemories((prev) => prev.filter((m) => m._id !== id));
              }}
            />
          </div>
        )}

        {/* Hidden session tracker */}
        <div
          style={{ display: "none" }}
          data-session-persona={selectedPersona.id}
          onClick={handleVoiceStart}
        />
      </div>
    </div>
  );
}
