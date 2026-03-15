import Link from "next/link";
import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: { popularYear: "desc" },
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">カテゴリ管理</h1>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/">管理者トップ</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/posts">ポスト管理</Link>
          </Button>
        </div>
      </div>
      <Separator />
      <CategoryForm categories={categories} />
    </div>
  );
}
