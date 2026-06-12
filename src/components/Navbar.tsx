"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(124,58,237,0.4)",
          }}
        >
          <Bot size={20} color="white" />
        </div>
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Aria AI
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div
          style={{ display: "flex", gap: "1.5rem" }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color:
                  pathname === link.href
                    ? "var(--accent-purple-light)"
                    : "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
                borderBottom:
                  pathname === link.href
                    ? "2px solid var(--accent-purple-light)"
                    : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost" style={{ padding: "8px 20px", fontSize: "0.875rem" }}>
                Sign In
              </button>
            </SignInButton>
            <Link href="/sign-up">
              <button className="btn-glow" style={{ padding: "8px 20px", fontSize: "0.875rem" }}>
                Get Started
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="btn-glow" style={{ padding: "8px 20px", fontSize: "0.875rem" }}>
                Dashboard
              </button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile hamburger */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "none",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color:
                  pathname === link.href
                    ? "var(--accent-purple-light)"
                    : "var(--text-secondary)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
