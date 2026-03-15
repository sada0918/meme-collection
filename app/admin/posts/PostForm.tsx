"use client";

import { useActionState } from "react";
import { createPost, deletePost, PostActionState } from "./actions";
import type { Category } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">ポストを追加</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-3">
            <select name="categoryId" className={inputClass}>
              <option value="">カテゴリを選択</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input name="postId" placeholder="追加するポストIDまたはURL" required className={inputClass} />
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isPending}>
                追加
              </Button>
              {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
              {state?.success && <p className="text-sm text-muted-foreground">ポストが追加されました</p>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">ポストを削除</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={deleteAction}
            className="space-y-3"
            onSubmit={(e) => {
              if (!confirm("このポストを削除しますか？")) {
                e.preventDefault();
              }
              if (!confirm("この操作は取り消せません。続行しますか？")) {
                e.preventDefault();
              }
            }}
          >
            <input name="postId" placeholder="削除するポストIDまたはURL" required className={inputClass} />
            <div className="flex items-center gap-3">
              <Button type="submit" variant="destructive" disabled={isDeletePending}>
                削除
              </Button>
              {deleteState?.error && <p className="text-sm text-destructive">{deleteState.error}</p>}
              {deleteState?.success && <p className="text-sm text-muted-foreground">ポストが削除されました</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
