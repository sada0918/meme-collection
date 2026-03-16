"use client";

import { useActionState } from "react";
import { createCategory, CategoryActionState, deleteCategory } from "./actions";
import { Category } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">カテゴリを追加</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-3">
            <Input name="name" placeholder="カテゴリ名" required />
            <Input name="popularYear" type="number" placeholder="人気の年" required />
            <Input name="imageUrl" placeholder="カテゴリ画像URL（任意）" />
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isPending}>
                追加
              </Button>
              {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              {state?.success && (
                <p className="text-sm text-muted-foreground">
                  カテゴリが追加されました
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">カテゴリを削除</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={deleteAction}
            className="space-y-3"
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
            <select
              name="id"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">削除するカテゴリを選択</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <Button type="submit" variant="destructive" disabled={isDeletePending}>
                削除
              </Button>
              {deleteState?.error && (
                <p className="text-sm text-destructive">{deleteState.error}</p>
              )}
              {deleteState?.success && (
                <p className="text-sm text-muted-foreground">
                  カテゴリが削除されました
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
