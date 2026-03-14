"use client";

import { useActionState } from "react";
import { createPost, PostActionState } from "./actions";

type Category = {
  id: number;
  name: string;
};

export default function PostForm({ categories }: { categories: Category[] }) {
  const [state, action, isPending] = useActionState<PostActionState, FormData>(
    createPost,
    null,
  );

  return (
    <form action={action}>
      <select name="categoryId">
        <option value="">カテゴリを選択</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input name="postId" placeholder="ポストIDまたはURL" />
      <button type="submit" disabled={isPending}>
        追加
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>ポストが追加されました！</p>}
    </form>
  );
}
