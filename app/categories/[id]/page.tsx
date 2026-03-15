import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import PostList from "./PostList";
import { Suspense } from "react";

type OEmbedResponse = {
  html: string;
};

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
  if (category === null) {
    return notFound();
  }

  const posts = await prisma.post.findMany({
    where: { categoryId: categoryId },
  });

  const embeddedPosts = await Promise.all(
    posts.map(async (post) => {
      try {
        const postCard = await fetch(
          `https://publish.x.com/oembed?url=https://x.com/i/status/${post.postId}`,
        );
        if (!postCard.ok) {
          return;
        }
        const data = (await postCard.json()) as OEmbedResponse;
        return data.html;
      } catch (error) {
        console.error(
          "Error fetching oEmbed data for post",
          post.postId,
          ":",
          error,
        );
        return;
      }
    }),
  );

  if (posts.length === 0) {
    return <>このカテゴリには投稿がありません。</>;
  }

  if (embeddedPosts.every((html) => html === undefined)) {
    return <>このカテゴリの投稿の埋め込みに失敗しました。</>;
  }

  return (
    <div>
      カテゴリ名: {category.name}
      {/* TODO fallback対応 */}
      <Suspense fallback={null}>
        <PostList posts={posts} embeddedPosts={embeddedPosts} />
      </Suspense>
    </div>
  );
}
