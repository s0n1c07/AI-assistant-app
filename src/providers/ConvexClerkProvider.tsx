"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud"
);

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  const isConvexConfigured = !!process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!isConvexConfigured) {
    // Fallback: run without Convex until it's configured
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
