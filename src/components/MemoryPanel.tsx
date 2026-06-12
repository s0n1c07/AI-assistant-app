"use client";

import { useState } from "react";
import { Brain, Plus, Trash2, Tag, ChevronDown } from "lucide-react";
import type { Id } from "../../convex/_generated/dataModel";

interface Memory {
  _id: Id<"memories">;
  fact: string;
  category: string;
  createdAt: number;
}

interface MemoryPanelProps {
  memories: Memory[];
  onAdd: (fact: string, category: string) => void;
  onDelete: (id: Id<"memories">) => void;
}

const CATEGORIES = [
  { id: "personal", label: "Personal", emoji: "👤", color: "#7c3aed" },
  { id: "preference", label: "Preference", emoji: "❤️", color: "#db2777" },
  { id: "project", label: "Project", emoji: "🛠️", color: "#059669" },
  { id: "interest", label: "Interest", emoji: "⭐", color: "#f59e0b" },
];

export default function MemoryPanel({ memories, onAdd, onDelete }: MemoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newFact, setNewFact] = useState("");
  const [newCategory, setNewCategory] = useState("personal");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newFact.trim()) return;
    onAdd(newFact.trim(), newCategory);
    setNewFact("");
    setIsAdding(false);
  };

  const getCategoryInfo = (id: string) =>
    CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

  return (
    <div
      className="glass-card"
      style={{ overflow: "hidden", transition: "all 0.3s ease" }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "1rem 1.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(124,58,237,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={16} color="var(--accent-purple-light)" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>Aria&apos;s Memory</p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {memories.length} fact{memories.length !== 1 ? "s" : ""} stored
            </p>
          </div>
        </div>
        <ChevronDown
          size={16}
          color="var(--text-muted)"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {/* Expandable body */}
      {isOpen && (
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          {/* Category filters */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {CATEGORIES.map((cat) => {
              const count = memories.filter((m) => m.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}30`,
                    fontSize: "0.72rem",
                    color: cat.color,
                    fontWeight: 600,
                  }}
                >
                  {cat.emoji} {cat.label} ({count})
                </div>
              );
            })}
          </div>

          {/* Memory list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              maxHeight: "200px",
              overflowY: "auto",
              marginBottom: "1rem",
            }}
          >
            {memories.length === 0 ? (
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  padding: "1.5rem 0",
                }}
              >
                No memories yet. Add facts about yourself so Aria remembers them! 🧠
              </p>
            ) : (
              memories.map((memory) => {
                const cat = getCategoryInfo(memory.category);
                return (
                  <div
                    key={memory._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      padding: "0.625rem 0.875rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                      <span style={{ fontSize: "1rem" }}>{cat.emoji}</span>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {memory.fact}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: cat.color,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {cat.label}
                      </span>
                      <button
                        onClick={() => onDelete(memory._id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          padding: "3px",
                          borderRadius: "5px",
                          transition: "color 0.2s",
                          display: "flex",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)")
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Add new memory */}
          {isAdding ? (
            <div
              style={{
                padding: "1rem",
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <input
                type="text"
                placeholder="e.g. I prefer TypeScript over JavaScript"
                value={newFact}
                onChange={(e) => setNewFact(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                autoFocus
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.6rem 0.875rem",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  outline: "none",
                  width: "100%",
                }}
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <Tag size={13} color="var(--text-muted)" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setNewCategory(cat.id)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      border: `1px solid ${newCategory === cat.id ? cat.color : "rgba(255,255,255,0.1)"}`,
                      background: newCategory === cat.id ? `${cat.color}20` : "transparent",
                      color: newCategory === cat.id ? cat.color : "var(--text-muted)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={handleAdd}
                  disabled={!newFact.trim()}
                  className="btn-glow"
                  style={{ flex: 1, padding: "8px", fontSize: "0.875rem", opacity: newFact.trim() ? 1 : 0.5 }}
                >
                  Save Memory
                </button>
                <button
                  onClick={() => { setIsAdding(false); setNewFact(""); }}
                  className="btn-ghost"
                  style={{ padding: "8px 16px", fontSize: "0.875rem" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: "10px",
                border: "1px dashed rgba(124,58,237,0.3)",
                background: "transparent",
                color: "var(--accent-purple-light)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,58,237,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,58,237,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,58,237,0.3)";
              }}
            >
              <Plus size={14} />
              Add a memory for Aria
            </button>
          )}
        </div>
      )}
    </div>
  );
}
