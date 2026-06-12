"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Clock, MessageSquare, TrendingUp, Bot } from "lucide-react";

interface Session {
  startedAt: number;
  endedAt?: number;
  duration?: number;
  messageCount?: number;
  personaId?: string;
}

interface UsageDashboardProps {
  sessions: Session[];
}

function formatDuration(ms: number) {
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  if (hours > 0) return `${hours}h ${mins % 60}m`;
  if (mins > 0) return `${mins}m ${secs % 60}s`;
  return `${secs}s`;
}

const PERSONA_COLORS: Record<string, string> = {
  aria: "#7c3aed",
  alex: "#059669",
  nova: "#db2777",
};

const PERSONA_EMOJIS: Record<string, string> = {
  aria: "🤖",
  alex: "💻",
  nova: "✨",
};

export default function UsageDashboard({ sessions }: UsageDashboardProps) {
  const completedSessions = sessions.filter((s) => s.endedAt);

  // Total stats
  const totalTalkTime = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalMessages = completedSessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
  const avgDuration =
    completedSessions.length > 0 ? totalTalkTime / completedSessions.length : 0;

  // Sessions per day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      timestamp: d.setHours(0, 0, 0, 0),
      sessions: 0,
      minutes: 0,
    };
  });

  sessions.forEach((s) => {
    const day = new Date(s.startedAt);
    day.setHours(0, 0, 0, 0);
    const bucket = last7Days.find((d) => d.timestamp === day.getTime());
    if (bucket) {
      bucket.sessions++;
      bucket.minutes += Math.round((s.duration || 0) / 60000);
    }
  });

  // Persona breakdown
  const personaCounts: Record<string, number> = {};
  sessions.forEach((s) => {
    const p = s.personaId || "aria";
    personaCounts[p] = (personaCounts[p] || 0) + 1;
  });
  const pieData = Object.entries(personaCounts).map(([name, value]) => ({
    name,
    value,
    color: PERSONA_COLORS[name] || "#7c3aed",
  }));

  const statCards = [
    {
      icon: <Clock size={18} />,
      label: "Total Talk Time",
      value: totalTalkTime > 0 ? formatDuration(totalTalkTime) : "—",
      sub: `${completedSessions.length} sessions`,
      color: "#7c3aed",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Total Messages",
      value: totalMessages > 0 ? totalMessages.toString() : "—",
      sub: "across all sessions",
      color: "#3b82f6",
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Avg Session",
      value: avgDuration > 0 ? formatDuration(avgDuration) : "—",
      sub: "per conversation",
      color: "#06b6d4",
    },
    {
      icon: <Bot size={18} />,
      label: "Favorite AI",
      value:
        pieData.length > 0
          ? `${PERSONA_EMOJIS[pieData.sort((a, b) => b.value - a.value)[0].name]} ${pieData[0].name.charAt(0).toUpperCase() + pieData[0].name.slice(1)}`
          : "—",
      sub: "most used persona",
      color: "#db2777",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            className="glass-card"
            style={{ padding: "1.25rem" }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: `${card.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.color,
                marginBottom: "0.875rem",
              }}
            >
              {card.icon}
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}
            >
              {card.value}
            </p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sessions.length > 0 ? "1fr 280px" : "1fr",
          gap: "1rem",
        }}
      >
        {/* Sessions area chart */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--text-secondary)",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Sessions — Last 7 Days
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={last7Days}>
              <defs>
                <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "var(--accent-purple-light)" }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#sessionGrad)"
                dot={{ fill: "#7c3aed", r: 3 }}
                activeDot={{ r: 5, fill: "#9d5eff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Persona pie chart */}
        {sessions.length > 0 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Persona Usage
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={140} height={140}>
                <Pie
                  data={pieData}
                  cx={70}
                  cy={70}
                  innerRadius={42}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "0.5rem" }}>
              {pieData.map((entry) => (
                <div
                  key={entry.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: entry.color,
                      }}
                    />
                    <span style={{ color: "var(--text-secondary)" }}>
                      {PERSONA_EMOJIS[entry.name]} {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}
                    </span>
                  </div>
                  <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {sessions.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</p>
          <p>No sessions yet. Start a voice conversation to see your stats!</p>
        </div>
      )}
    </div>
  );
}
