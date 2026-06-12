import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClerkProvider } from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aria AI — Your Intelligent Voice Assistant",
  description:
    "Chat and talk with Aria, a real-time AI assistant powered by voice AI. Sign in to get started.",
  keywords: ["AI assistant", "voice chat", "Aria", "AI", "Next.js"],
  openGraph: {
    title: "Aria AI — Your Intelligent Voice Assistant",
    description: "Real-time AI chat and voice assistant",
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
        <body className={`${inter.variable} font-sans antialiased`}>
          <ConvexClerkProvider>
            <Navbar />
            <main>{children}</main>
          </ConvexClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
