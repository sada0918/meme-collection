import type { Category, Post } from "@/app/generated/prisma/client";

export type { Category, Post };

export type ActionState = { error?: string; success?: boolean } | null;
