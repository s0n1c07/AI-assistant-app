import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  sessions: defineTable({
    userId: v.string(),
    personaId: v.string(),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    duration: v.optional(v.number()),
    messageCount: v.optional(v.number()),
  }).index("by_user_id", ["userId"]),

  memories: defineTable({
    userId: v.string(),
    fact: v.string(),
    category: v.string(), // "preference", "personal", "project", "interest"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"]),
});
