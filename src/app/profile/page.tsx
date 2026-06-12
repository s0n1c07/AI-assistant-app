import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Mail, Calendar, Shield, Bot } from "lucide-react";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fields = [
    {
      icon: <User size={16} />,
      label: "Full Name",
      value: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Not set",
    },
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: user.emailAddresses[0]?.emailAddress || "Not set",
    },
    {
      icon: <Calendar size={16} />,
      label: "Member Since",
      value: joinDate,
    },
    {
      icon: <Shield size={16} />,
      label: "Account ID",
      value: user.id.slice(0, 20) + "...",
    },
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
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
          }}
        >
          Your <span className="gradient-text">Profile</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
          Manage your account information and preferences.
        </p>

        {/* Profile card */}
        <div
          className="glass-card"
          style={{ padding: "2rem", marginBottom: "1.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.firstName || "User"}
                  width={80}
                  height={80}
                  style={{
                    borderRadius: "50%",
                    border: "3px solid",
                    borderColor: "var(--accent-purple)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <User size={36} color="white" />
                </div>
              )}
              {/* Online indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: "2px solid var(--bg-card)",
                }}
              />
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "4px" }}>
                {user.firstName} {user.lastName}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {user.emailAddresses[0]?.emailAddress}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "8px",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                  fontSize: "0.75rem",
                  color: "var(--accent-purple-light)",
                  fontWeight: 600,
                }}
              >
                <Bot size={11} />
                Aria AI User
              </div>
            </div>
          </div>

          {/* Info fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {fields.map((field) => (
              <div
                key={field.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: "var(--accent-purple-light)" }}>
                    {field.icon}
                  </span>
                  {field.label}
                </div>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manage account via Clerk */}
        <div
          className="glass-card"
          style={{
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontWeight: 600, marginBottom: "3px" }}>Account Settings</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Update your password, profile picture, and more via Clerk.
            </p>
          </div>
          <a
            href="https://accounts.clerk.dev/user"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn-glow"
              style={{ padding: "10px 20px", fontSize: "0.875rem", whiteSpace: "nowrap" as const }}
            >
              Manage Account
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
