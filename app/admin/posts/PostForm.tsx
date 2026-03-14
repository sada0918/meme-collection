"use client";

import { useActionState } from "react";
import { createPost, deletePost, PostActionState } from "./actions";

type Category = {
  id: number;
  name: string;
};

export default function PostForm({ categories }: { categories: Category[] }) {
  const [state, action, isPending] = useActionState<PostActionState, FormData>(
    createPost,
    null,
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState<
    PostActionState,
    FormData
  >(deletePost, null);

  return (
    <>
      <form action={action}>
        <select name="categoryId">
          <option value="">カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input name="postId" placeholder="追加するポストIDまたはURL" required />
        <button type="submit" disabled={isPending}>
          追加
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>ポストが追加されました！</p>}
      </form>
      <form
        action={deleteAction}
        onSubmit={(e) => {
          if (!confirm("このポストを削除しますか？")) {
            e.preventDefault();
          }
          if (!confirm("この操作は取り消せません。続行しますか？")) {
            e.preventDefault();
          }
        }}
      >
        <input name="postId" placeholder="削除するポストIDまたはURL" required />
        <button type="submit" disabled={isDeletePending}>
          削除
        </button>
        {deleteState?.error && <p>{deleteState.error}</p>}
        {deleteState?.success && <p>ポストが削除されました！</p>}
      </form>
    </>
  );
}
