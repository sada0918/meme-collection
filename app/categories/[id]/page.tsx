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

  const embeds = await Promise.all(
    posts.map(async (post) => {
      const postCard = await fetch(
        `https://publish.x.com/oembed?url=https://x.com/i/status/${post.postId}`,
      );
      const data = await postCard.json();
      return data.html;
    }),
  );

  return (
    <div>
      カテゴリ名: {category?.name ?? "カテゴリが見つかりませんでした"}
      {posts.map((post, index) => (
        <div
          key={post.id}
          dangerouslySetInnerHTML={{ __html: embeds[index] }}
        />
      ))}
    </div>
  );
}
