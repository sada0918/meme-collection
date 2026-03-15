import Link from "next/link";
import prisma from "@/lib/prisma";
import PostForm from "./PostForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const categories = await prisma.category.findMany();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ポスト管理</h1>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/">管理者トップ</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/categories">カテゴリ管理</Link>
          </Button>
        </div>
      </div>
      <Separator />
      <PostForm categories={categories} />
    </div>
  );
}
