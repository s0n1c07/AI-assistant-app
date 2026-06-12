"use client";

import { personas, type Persona } from "@/constants/personas";

interface PersonaSelectorProps {
  selected: Persona;
  onSelect: (persona: Persona) => void;
}

export default function PersonaSelector({ selected, onSelect }: PersonaSelectorProps) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.78rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.75rem",
        }}
      >
        Choose Your AI
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {personas.map((persona) => {
          const isSelected = selected.id === persona.id;
          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
              style={{
                flex: 1,
                minWidth: "130px",
                padding: "1rem",
                borderRadius: "14px",
                border: `2px solid ${isSelected ? persona.color : "rgba(255,255,255,0.07)"}`,
                background: isSelected
                  ? `linear-gradient(135deg, ${persona.color}22, ${persona.color}11)`
                  : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${persona.color}60`;
                  (e.currentTarget as HTMLButtonElement).style.background = `${persona.color}0a`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                }
              }}
            >
              {/* Selected glow */}
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${persona.color}20, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
              )}

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    marginBottom: "0.4rem",
                    filter: isSelected ? "none" : "grayscale(30%)",
                    transition: "filter 0.2s",
                  }}
                >
                  {persona.emoji}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                    marginBottom: "2px",
                    transition: "color 0.2s",
                  }}
                >
                  {persona.name}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: isSelected ? persona.color : "var(--text-muted)",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}
                >
                  {persona.tagline}
                </div>

                {/* Active dot */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: persona.color,
                      boxShadow: `0 0 8px ${persona.glow}`,
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <div
        style={{
          marginTop: "0.75rem",
          padding: "0.75rem 1rem",
          borderRadius: "10px",
          background: `${selected.color}0d`,
          border: `1px solid ${selected.color}25`,
          fontSize: "0.82rem",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          transition: "all 0.3s ease",
        }}
      >
        <span style={{ color: selected.color, fontWeight: 600 }}>{selected.name}:</span>{" "}
        {selected.description}
      </div>
    </div>
  );
}
