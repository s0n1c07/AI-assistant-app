"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, PhoneOff, Volume2, Loader2 } from "lucide-react";
import type { Persona } from "@/constants/personas";

type CallStatus = "idle" | "connecting" | "active" | "ending";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface VoiceAgentProps {
  userName?: string;
  persona: Persona;
  onSessionEnd?: (messageCount: number) => void;
}

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

export default function VoiceAgent({ userName, persona, onSessionEnd }: VoiceAgentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus("active");
      messageCountRef.current = 0;
      setMessages([
        {
          role: "assistant",
          content: `Hello${userName ? `, ${userName}` : ""}! I'm ${persona.name}. ${
            persona.id === "aria"
              ? "How can I help you today?"
              : persona.id === "alex"
              ? "Ready to code? What are we building?"
              : "What shall we create together?"
          }`,
          timestamp: new Date(),
        },
      ]);
    };

    const onCallEnd = () => {
      setCallStatus("idle");
      setIsSpeaking(false);
      setVolumeLevel(0);
      onSessionEnd?.(messageCountRef.current);
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onVolumeLevel = (level: number) => setVolumeLevel(level);

    const onMessage = (msg: { type: string; role?: string; transcript?: string }) => {
      if (msg.type === "transcript" && msg.role && msg.transcript) {
        messageCountRef.current++;
        setMessages((prev) => [
          ...prev,
          {
            role: msg.role as "user" | "assistant",
            content: msg.transcript!,
            timestamp: new Date(),
          },
        ]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("volume-level", onVolumeLevel);
      vapi.off("message", onMessage);
    };
  }, [userName, persona, onSessionEnd]);

  const startCall = async () => {
    if (callStatus !== "idle") return;
    setCallStatus("connecting");
    setMessages([]);
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!);
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus("idle");
    }
  };

  const endCall = async () => {
    setCallStatus("ending");
    vapi.stop();
  };

  const toggleMute = () => {
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const orbScale = 1 + volumeLevel * 0.4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "1.5rem",
      }}
    >
      {/* Voice Orb */}
      <div style={{ position: "relative", width: "180px", height: "180px" }}>
        {/* Volume rings */}
        {callStatus === "active" &&
          [1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: `${-i * 14}px`,
                borderRadius: "50%",
                border: `1px solid ${persona.color}${Math.round((0.4 - i * 0.1) * 255).toString(16).padStart(2, "0")}`,
                animation: isSpeaking ? `ripple ${0.6 + i * 0.3}s ease-out infinite` : "none",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}

        {/* Orb */}
        <div
          onClick={callStatus === "idle" ? startCall : undefined}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              callStatus === "idle"
                ? "radial-gradient(circle at 35% 35%, #374151, #111118)"
                : callStatus === "connecting"
                ? "radial-gradient(circle at 35% 35%, #f59e0b, #92400e)"
                : callStatus === "active"
                ? persona.gradient.replace("linear-gradient(135deg, ", "radial-gradient(circle at 35% 35%, ").replace(")", ", #0a0a0f)")
                : "radial-gradient(circle at 35% 35%, #ef4444, #7f1d1d)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: callStatus === "idle" ? "pointer" : "default",
            transform: `scale(${callStatus === "active" ? orbScale : 1})`,
            transition: "transform 0.1s ease, background 0.4s ease, box-shadow 0.4s ease",
            boxShadow:
              callStatus === "active"
                ? `0 0 40px ${persona.glow}, 0 0 80px ${persona.glow.replace("0.4", "0.15")}`
                : callStatus === "connecting"
                ? "0 0 40px rgba(245,158,11,0.4)"
                : "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {callStatus === "idle" && (
            <div style={{ textAlign: "center" }}>
              <Mic size={48} color="white" style={{ opacity: 0.7 }} />
              <p style={{ color: "white", fontSize: "0.75rem", marginTop: "6px", opacity: 0.6 }}>
                Tap to Start
              </p>
            </div>
          )}
          {callStatus === "connecting" && (
            <Loader2 size={48} color="white" style={{ animation: "spin 1s linear infinite" }} />
          )}
          {callStatus === "active" &&
            (isSpeaking ? (
              <Volume2
                size={52}
                color="white"
                style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))" }}
              />
            ) : (
              <Mic
                size={52}
                color="white"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}
              />
            ))}
          {callStatus === "ending" && (
            <Loader2 size={48} color="white" style={{ animation: "spin 1s linear infinite" }} />
          )}
        </div>
      </div>

      {/* Status */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color:
              callStatus === "idle"
                ? "var(--text-secondary)"
                : callStatus === "connecting"
                ? "#f59e0b"
                : callStatus === "active"
                ? persona.color
                : "#ef4444",
          }}
        >
          {callStatus === "idle" && `Click the orb to talk to ${persona.name}`}
          {callStatus === "connecting" && `Connecting to ${persona.name}...`}
          {callStatus === "active" && (isSpeaking ? `🎙️ ${persona.name} is speaking...` : "🎤 Listening...")}
          {callStatus === "ending" && "Ending session..."}
        </p>
      </div>

      {/* Controls */}
      {callStatus === "active" && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={toggleMute}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: isMuted ? "#ef4444" : "var(--border)",
              background: isMuted ? "rgba(239,68,68,0.15)" : "var(--bg-card)",
              color: isMuted ? "#ef4444" : "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
          <button
            onClick={endCall}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2px solid #ef4444",
              background: "rgba(239,68,68,0.15)",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <PhoneOff size={22} />
          </button>
        </div>
      )}

      {/* Transcript */}
      {messages.length > 0 && (
        <div
          className="glass-card"
          style={{
            width: "100%",
            maxHeight: "260px",
            overflowY: "auto",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.25rem",
            }}
          >
            Conversation
          </p>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "0.6rem 1rem",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background:
                    msg.role === "user"
                      ? `linear-gradient(135deg, ${persona.color}50, ${persona.color}30)`
                      : "rgba(255,255,255,0.05)",
                  border: "1px solid",
                  borderColor:
                    msg.role === "user" ? `${persona.color}40` : "rgba(255,255,255,0.07)",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "0.68rem",
                    color: msg.role === "user" ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
                    marginBottom: "3px",
                    fontWeight: 600,
                  }}
                >
                  {msg.role === "user" ? "You" : persona.name}
                </span>
                {msg.content}
              </div>
            </div>
          ))}
          {isSpeaking && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "16px 16px 16px 4px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <div className="typing-dot" style={{ background: persona.color }} />
                <div className="typing-dot" style={{ background: persona.color }} />
                <div className="typing-dot" style={{ background: persona.color }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
