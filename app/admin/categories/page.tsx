import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: { popularYear: "desc" },
  });
  return (
    <div>
      <h1>カテゴリ管理ページ</h1>
      <ul>
        <li>
          <a href="/admin/">管理者トップ</a>
          <a href="/admin/posts" style={{ marginLeft: "1rem" }}>
            ポスト管理
          </a>
        </li>
      </ul>
      <CategoryForm categories={categories} />
    </div>
  );
}
