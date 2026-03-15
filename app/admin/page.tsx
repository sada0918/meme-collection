import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">管理者ページ</h1>
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/admin/categories">カテゴリ管理</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/posts">ポスト管理</Link>
        </Button>
      </div>
    </div>
  );
}
