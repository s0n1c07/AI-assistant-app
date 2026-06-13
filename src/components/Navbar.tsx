"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Bot, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/constants";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackModal from "@/components/FeedbackModal";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Bot size={20} color="white" />
          </div>
          <span className="navbar-logo-text">VoxMind AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links hide-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="navbar-right">
          <ThemeToggle />

          <button
            className="btn-icon hide-mobile"
            onClick={() => setFeedbackOpen(true)}
            title="Share feedback"
          >
            <MessageSquare size={16} />
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost hide-mobile" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
                Sign In
              </button>
            </SignInButton>
            <Link href="/sign-up">
              <button className="btn-glow" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
                Get Started
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="btn-glow hide-mobile" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
                Dashboard
              </button>
            </Link>
            <UserButton />
          </SignedIn>

          {/* Mobile hamburger */}
          <button
            className="btn-icon show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: "64px", left: 0, right: 0,
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 99,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`navbar-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="btn-ghost"
            style={{ textAlign: "left", padding: "8px 0", border: "none", fontSize: "0.9rem" }}
            onClick={() => { setMenuOpen(false); setFeedbackOpen(true); }}
          >
            💬 Share Feedback
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackOpen && (
        <FeedbackModal onClose={() => setFeedbackOpen(false)} />
      )}
    </>
  );
}
