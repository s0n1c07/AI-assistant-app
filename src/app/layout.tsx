import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClerkProvider } from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoxMind AI — Intelligent Voice & Chat Assistant",
  description:
    "Talk or type with VoxMind AI — multiple personas, 12 languages, memory system, and usage analytics. Powered by Vapi AI and Clerk.",
  keywords: ["AI assistant", "voice chat", "VoxMind", "AI personas", "Next.js", "Vapi"],
  openGraph: {
    title: "VoxMind AI — Intelligent Voice & Chat Assistant",
    description: "Real-time AI voice and text assistant with personas, memory, and analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Prevent theme flash on load */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const t = localStorage.getItem('voxmind-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                } catch(e) {}
              `,
            }}
          />
        </head>
        <body className={`${inter.variable}`}>
          <ConvexClerkProvider>
            <Navbar />
            <main>{children}</main>
          </ConvexClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
