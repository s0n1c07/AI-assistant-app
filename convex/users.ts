import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── USERS ────────────────────────────────────────────────

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

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// ── SESSIONS ──────────────────────────────────────────────

export const getUserSessions = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

export const startSession = mutation({
  args: {
    userId: v.string(),
    personaId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      userId: args.userId,
      personaId: args.personaId,
      startedAt: Date.now(),
    });
  },
});

export const endSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    endedAt: v.number(),
    messageCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) return;
    await ctx.db.patch(args.sessionId, {
      endedAt: args.endedAt,
      duration: args.endedAt - session.startedAt,
      messageCount: args.messageCount,
    });
  },
});

// ── MEMORIES ──────────────────────────────────────────────

export const getUserMemories = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("memories")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addMemory = mutation({
  args: {
    userId: v.string(),
    fact: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memories", {
      userId: args.userId,
      fact: args.fact,
      category: args.category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const deleteMemory = mutation({
  args: { memoryId: v.id("memories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.memoryId);
  },
});

export const updateMemory = mutation({
  args: {
    memoryId: v.id("memories"),
    fact: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.memoryId, {
      fact: args.fact,
      updatedAt: Date.now(),
    });
  },
});
