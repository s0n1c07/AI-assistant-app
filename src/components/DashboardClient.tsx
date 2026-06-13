"use client";

import { useState } from "react";
import VoiceAgent from "@/components/VoiceAgent";
import ChatPanel from "@/components/ChatPanel";
import PersonaSelector from "@/components/PersonaSelector";
import MemoryPanel from "@/components/MemoryPanel";
import UsageDashboard from "@/components/UsageDashboard";
import LanguageSelector from "@/components/LanguageSelector";
import { personas, type Persona } from "@/constants/personas";
import { defaultLanguage, type Language } from "@/constants/languages";
import { Bot, BarChart2, Brain, MessageSquare, Mic } from "lucide-react";

interface DashboardClientProps {
  firstName: string;
  userId: string;
}

type Tab = "voice" | "chat" | "stats" | "memory";

export default function DashboardClient({ firstName, userId }: DashboardClientProps) {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);
  const [activeTab, setActiveTab] = useState<Tab>("voice");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

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

  const handleSessionStart = () => setSessionStart(Date.now());

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

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: "voice", label: "Voice",     icon: <Mic size={14} /> },
    { id: "chat",  label: "Text Chat", icon: <MessageSquare size={14} /> },
    { id: "stats", label: "Analytics", icon: <BarChart2 size={14} /> },
    { id: "memory",label: "Memory",    icon: <Brain size={14} /> },
  ];

  void userId; // will be used when Convex is connected

  return (
    <div className="page-wrapper">
      {/* Ambient blobs */}
      <div
        className="blob"
        style={{
          top: "15%", left: "5%",
          width: "400px", height: "400px",
          background: `radial-gradient(circle, ${selectedPersona.color}18 0%, transparent 70%)`,
          transition: "background 0.5s ease",
        }}
      />
      <div
        className="blob blob-blue"
        style={{ top: "50%", right: "5%", width: "300px", height: "300px" }}
      />

      <div className="container">
        {/* Header row */}
        <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="badge" style={{ marginBottom: "0.75rem" }}>
              <Bot size={11} />
              VoxMind Dashboard
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, marginBottom: "0.3rem" }}>
              Hey{" "}
              <span style={{
                background: selectedPersona.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {firstName}
              </span>{" "}👋
            </h1>
            <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
              Pick a persona and language, then start talking or chatting.
            </p>
          </div>

          {/* Language selector */}
          <LanguageSelector selected={selectedLanguage} onSelect={setSelectedLanguage} />
        </div>

        {/* Tab nav */}
        <div className="tab-bar" style={{ marginBottom: "1.5rem" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={activeTab === tab.id ? {
                background: selectedPersona.color,
                boxShadow: `0 2px 12px ${selectedPersona.glow}`,
              } : {}}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── VOICE TAB ─────────────────────────────────────── */}
        {activeTab === "voice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <PersonaSelector selected={selectedPersona} onSelect={setSelectedPersona} />
            </div>

            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                borderColor: `${selectedPersona.color}35`,
                boxShadow: `0 4px 28px ${selectedPersona.glow.replace("0.25", "0.12")}`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="badge" style={{
                  background: `${selectedPersona.color}18`,
                  border: `1px solid ${selectedPersona.color}35`,
                  color: selectedPersona.color,
                }}>
                  {selectedPersona.emoji} {selectedPersona.name} · {selectedLanguage.flag} {selectedLanguage.label}
                </div>
              </div>
              <VoiceAgent
                userName={firstName}
                persona={selectedPersona}
                language={selectedLanguage}
                onSessionStart={handleSessionStart}
                onSessionEnd={handleSessionEnd}
              />
            </div>

            <div style={{
              padding: "0.875rem 1.125rem",
              background: `${selectedPersona.color}0c`,
              border: `1px solid ${selectedPersona.color}20`,
              borderRadius: "12px",
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              display: "flex", gap: "8px",
            }}>
              <span>💡</span>
              <span>
                <strong style={{ color: selectedPersona.color }}>{selectedPersona.name}:</strong>{" "}
                {selectedPersona.id === "aria"
                  ? "Ask me anything — from daily questions to creative brainstorms."
                  : selectedPersona.id === "alex"
                  ? "Share your code, describe a bug, or ask me to design a system."
                  : "Tell me a theme and I'll turn it into a story, poem, or idea."}
              </span>
            </div>
          </div>
        )}

        {/* ── CHAT TAB ─────────────────────────────────────── */}
        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
              <PersonaSelector selected={selectedPersona} onSelect={setSelectedPersona} />
            </div>
            <div
              className="glass-card"
              style={{
                overflow: "hidden",
                borderColor: `${selectedPersona.color}35`,
                boxShadow: `0 4px 28px ${selectedPersona.glow.replace("0.25", "0.1")}`,
              }}
            >
              <ChatPanel
                persona={selectedPersona}
                language={selectedLanguage}
                userName={firstName}
              />
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ────────────────────────────────── */}
        {activeTab === "stats" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="section-title">Usage Analytics</h2>
              <p className="section-sub">Your session history and AI usage breakdown.</p>
            </div>
            <UsageDashboard sessions={localSessions} />
          </div>
        )}

        {/* ── MEMORY TAB ───────────────────────────────────── */}
        {activeTab === "memory" && (
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <h2 className="section-title">AI Memory</h2>
              <p className="section-sub">
                Store facts about yourself so VoxMind always knows your context.
              </p>
            </div>
            <MemoryPanel
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              memories={localMemories as any}
              onAdd={(fact, category) => {
                setLocalMemories((prev) => [
                  { _id: `local-${Date.now()}`, fact, category, createdAt: Date.now() },
                  ...prev,
                ]);
              }}
              onDelete={(id) => {
                setLocalMemories((prev) => prev.filter((m) => m._id !== id));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
