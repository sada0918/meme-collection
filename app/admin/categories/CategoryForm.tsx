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
        <input name="name" placeholder="新しいカテゴリ名" required />
        <input
          name="popularYear"
          type="number"
          placeholder="人気の年"
          required
        />
        <input name="imageUrl" placeholder="カテゴリ画像URL" />
        <button type="submit" disabled={isPending}>
          追加
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>カテゴリが追加されました！</p>}
      </form>

      <form
        action={deleteAction}
        onSubmit={(e) => {
          if (
            !confirm(
              "本当にこのカテゴリを削除しますか？(カテゴリに紐づく投稿もすべて削除されます)",
            )
          ) {
            e.preventDefault();
          }
          if (!confirm("この操作は取り消せません。続行しますか？")) {
            e.preventDefault();
          }
        }}
      >
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
