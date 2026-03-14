import prisma from "@/lib/prisma";
import PostForm from "./PostForm";

export default async function Page() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1>ポスト管理ページ</h1>
      <ul>
        <li>
          <a href="/admin/">管理者トップ</a>
          <a href="/admin/categories" style={{ marginLeft: "1rem" }}>
            カテゴリ管理
          </a>
        </li>
      </ul>
      <PostForm categories={categories} />
    </div>
  );
}
