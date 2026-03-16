"use client";

import { useActionState } from "react";
import { createPost, deletePost, PostActionState } from "./actions";
import type { Category } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <Select name="categoryId">
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input name="postId" placeholder="追加するポストIDまたはURL" required />
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isPending}>
                追加
              </Button>
              {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              {state?.success && (
                <p className="text-sm text-muted-foreground">
                  ポストが追加されました
                </p>
              )}
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
            <Input name="postId" placeholder="削除するポストIDまたはURL" required />
            <div className="flex items-center gap-3">
              <Button type="submit" variant="destructive" disabled={isDeletePending}>
                削除
              </Button>
              {deleteState?.error && (
                <p className="text-sm text-destructive">{deleteState.error}</p>
              )}
              {deleteState?.success && (
                <p className="text-sm text-muted-foreground">
                  ポストが削除されました
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
