import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: {
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                boxShadow: "0 8px 40px rgba(59,130,246,0.2)",
              },
              headerTitle: { color: "var(--text-primary)" },
              headerSubtitle: { color: "var(--text-secondary)" },
              socialButtonsBlockButton: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              },
              formFieldLabel: { color: "var(--text-secondary)" },
              formFieldInput: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              },
              footerActionLink: { color: "var(--accent-purple-light)" },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                border: "none",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
