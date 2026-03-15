"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  const imageUrl = formData.get("imageUrl") as string | null;
  if (imageUrl?.trim()) {
    try {
      new URL(imageUrl);
    } catch {
      return { error: "URLの形式が不正です。" };
    }
  }

  try {
    await prisma.category.create({
      data: { name, popularYear, imageUrl: imageUrl?.trim() ?? null },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts");
    return { success: true };
  } catch {
    return { error: "カテゴリの追加に失敗しました。" };
  }
}

export async function deleteCategory(
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const session = await auth();
  if (!session)
    return { error: "セッションが切れました。再ログインしてください。" };

  const id = Number(formData.get("id"));
  if (id === 0 || Number.isNaN(id)) return { error: "入力値が不正です。" };

  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts");
    return { success: true };
  } catch {
    return { error: "カテゴリの削除に失敗しました。" };
  }
}
