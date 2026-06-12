import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update user on sign-in
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Get user sessions
export const getUserSessions = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(20);
  },
});

// Start a new session
export const startSession = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      userId: args.userId,
      startedAt: Date.now(),
    });
  },
});

// End a session
export const endSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    endedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) return;
    const duration = args.endedAt - session.startedAt;
    await ctx.db.patch(args.sessionId, {
      endedAt: args.endedAt,
      duration,
    });
  },
});
