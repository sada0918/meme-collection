"use client";

import { useActionState } from "react";
import { createCategory, CategoryActionState, deleteCategory } from "./actions";
import { Category } from "@/app/generated/prisma/browser";

export default function CategoryForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, action, isPending] = useActionState<
    CategoryActionState,
    FormData
  >(createCategory, null);
  const [deleteState, deleteAction, isDeletePending] = useActionState<
    CategoryActionState,
    FormData
  >(deleteCategory, null);

  return (
    <>
      <form action={action}>
        <input name="name" placeholder="新しいカテゴリ名" />
        <input name="popularYear" type="number" placeholder="人気の年" />
        <button type="submit" disabled={isPending}>
          追加
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>カテゴリが追加されました！</p>}
      </form>
      <form action={deleteAction}>
        <select name="id">
          <option value="">削除するカテゴリを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isDeletePending}>
          削除
        </button>
        {deleteState?.error && <p>{deleteState.error}</p>}
        {deleteState?.success && <p>カテゴリが削除されました！</p>}
      </form>
    </>
  );
}
