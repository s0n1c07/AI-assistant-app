"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, MessageSquare, Trash2, Bot } from "lucide-react";
import type { Persona } from "@/constants/personas";
import type { Language } from "@/constants/languages";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  persona: Persona;
  language: Language;
  userName?: string;
}

export default function ChatPanel({ persona, language, userName }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [noKey, setNoKey] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scroll(); }, [messages, scroll]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          persona: persona.id,
          language: language.vapiLang,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.error?.includes("OpenAI")) setNoKey(true);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
        setStreaming(false);
        return;
      }

      // Stream the response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                aiText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: aiText };
                  return updated;
                });
              }
            } catch {
              // ignore parse errors in stream
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  const greetingMsg = messages.length === 0 ? (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{persona.emoji}</div>
      <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.35rem" }}>
        Chat with {persona.name}
      </p>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {persona.description}
      </p>
      {noKey && (
        <div style={{
          marginTop: "1.25rem", padding: "0.875rem 1rem", borderRadius: "10px",
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
          fontSize: "0.82rem", color: "#f59e0b",
        }}>
          ⚠️ Add <code style={{ background: "rgba(0,0,0,0.3)", padding: "1px 5px", borderRadius: "4px" }}>OPENAI_API_KEY</code> to <code style={{ background: "rgba(0,0,0,0.3)", padding: "1px 5px", borderRadius: "4px" }}>.env.local</code> to enable chat mode.
        </div>
      )}
    </div>
  ) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "460px" }}>
      {/* Header */}
      <div style={{
        padding: "0.875rem 1.25rem",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MessageSquare size={15} color={persona.color} />
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Text Chat · {persona.emoji} {persona.name}
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "4px" }}>
            {language.flag} {language.label}
          </span>
        </div>
        {messages.length > 0 && (
          <button
            className="btn-icon"
            onClick={() => setMessages([])}
            title="Clear chat"
            style={{ width: "30px", height: "30px", borderRadius: "7px" }}
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "1rem 1.25rem",
        display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        {greetingMsg}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "bubble-row-user" : "bubble-row-ai"}>
            {msg.role === "assistant" && (
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                background: persona.gradient, display: "flex", alignItems: "center",
                justifyContent: "center", marginRight: "8px", alignSelf: "flex-end",
              }}>
                <Bot size={14} color="white" />
              </div>
            )}
            <div
              className={`bubble ${msg.role === "user" ? "bubble-user" : "bubble-ai"}`}
              style={msg.role === "user" ? {
                background: `linear-gradient(135deg, ${persona.color}50, ${persona.color}30)`,
                border: `1px solid ${persona.color}40`,
              } : {}}
            >
              <span className="bubble-sender">
                {msg.role === "user" ? (userName || "You") : persona.name}
              </span>
              {msg.content}
              {streaming && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                <div style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                  <div className="typing-dot" style={{ background: persona.color }} />
                  <div className="typing-dot" style={{ background: persona.color }} />
                  <div className="typing-dot" style={{ background: persona.color }} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "0.875rem 1.25rem",
        borderTop: "1px solid var(--border)",
        display: "flex", gap: "0.625rem",
      }}>
        <input
          className="input-field"
          placeholder={`Message ${persona.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          disabled={streaming}
          style={{ flex: 1 }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || streaming}
          style={{
            width: "42px", height: "42px", borderRadius: "10px", border: "none",
            background: input.trim() && !streaming ? persona.gradient : "var(--bg-card-hover)",
            color: "white", cursor: input.trim() && !streaming ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
