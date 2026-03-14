"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export type CategoryActionState = { error?: string; success?: boolean } | null;

export async function createCategory(
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const session = await auth();
  if (!session)
    return { error: "セッションが切れました。再ログインしてください。" };

  const name = formData.get("name") as string;
  const popularYear = Number(formData.get("popularYear"));

  if (!name || !name.trim() || popularYear === 0 || Number.isNaN(popularYear))
    return { error: "入力値が不正です。" };

  try {
    await prisma.category.create({ data: { name, popularYear } });
    return { success: true };
  } catch {
    return { error: "カテゴリの追加に失敗しました。" };
  }
}
