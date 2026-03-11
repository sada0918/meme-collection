"use client";

import { useActionState } from "react";
import { createCategory, CategoryActionState } from "./actions";

export default function CategoryForm() {
  const [state, action, isPending] = useActionState<CategoryActionState, FormData>(createCategory, null);

  return (
    <form action={action}>
      <input name="name" placeholder="新しいカテゴリ名" />
      <input name="popularYear" type="number" placeholder="人気の年" />
      <button type="submit" disabled={isPending}>追加</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
