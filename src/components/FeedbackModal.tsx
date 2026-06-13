"use client";

import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

interface FeedbackModalProps {
  onClose: () => void;
  userName?: string;
}

const SUBJECTS = ["General", "Bug Report", "Feature Request", "Voice Quality", "Performance", "Design"];

export default function FeedbackModal({ onClose, userName }: FeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [subject, setSubject] = useState("General");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!message.trim()) { setError("Please write a message."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName || "Anonymous",
          email,
          rating,
          subject,
          message,
        }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card animate-fade-in-up">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "3px" }}>
              Share Feedback 💬
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              Help us improve VoxMind AI
            </p>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {done ? (
          /* Success state */
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <CheckCircle size={52} color="var(--accent-green)" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Thank you! 🎉
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Your feedback has been sent. We read every message and use it to make VoxMind better.
            </p>
            <button className="btn-glow" style={{ marginTop: "1.5rem", padding: "10px 24px" }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Star Rating */}
            <div>
              <p className="section-label">Overall Rating</p>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="star-btn"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                    style={{ opacity: star <= (hoveredStar || rating) ? 1 : 0.3 }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <p className="section-label">Subject</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "100px",
                      border: `1px solid ${subject === s ? "var(--accent-purple)" : "var(--border)"}`,
                      background: subject === s ? "rgba(124,58,237,0.15)" : "transparent",
                      color: subject === s ? "var(--accent-purple-light)" : "var(--text-secondary)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="section-label">Email (optional)</p>
              <input
                className="input-field"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Message */}
            <div>
              <p className="section-label">Message *</p>
              <textarea
                className="textarea-field"
                placeholder="Tell us what you think, what's broken, or what you'd love to see..."
                value={message}
                onChange={(e) => { setMessage(e.target.value); setError(""); }}
                rows={4}
              />
            </div>

            {error && (
              <p style={{ fontSize: "0.82rem", color: "#ef4444" }}>{error}</p>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-glow"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
                onClick={submit}
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <><Send size={14} /> Send Feedback</>
                )}
              </button>
              <button className="btn-ghost" style={{ padding: "11px 18px" }} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
