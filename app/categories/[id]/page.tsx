import prisma from "../../../lib/prisma";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = parseInt(id, 10);
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  const posts = await prisma.post.findMany({
    where: { categoryId: categoryId },
  });
  return (
    <div>
      カテゴリ名: {category?.name ?? "カテゴリが見つかりませんでした"}
      {posts.map((post) => (
        <div key={post.id}>{post.postId}</div>
      ))}
    </div>
  );
}
