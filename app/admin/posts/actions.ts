"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export type PostActionState = { error?: string; success?: boolean } | null;

function extractPostId(input: string): string {
  const match = input.match(/\/status\/(\d+)/);
  if (match) return match[1];
  return input.trim();
}

export async function createPost(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const session = await auth();
  if (!session)
    return { error: "セッションが切れました。再ログインしてください。" };

  const rawPostId = formData.get("postId") as string;
  const categoryId = Number(formData.get("categoryId"));

  if (!rawPostId || categoryId === 0 || Number.isNaN(categoryId))
    return { error: "入力値が不正です。" };

  const postId = extractPostId(rawPostId);

  try {
    await prisma.post.create({ data: { postId, categoryId } });
    return { success: true };
  } catch {
    return { error: "ポストの追加に失敗しました。" };
  }
}
