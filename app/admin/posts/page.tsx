import prisma from "@/lib/prisma";
import PostForm from "./PostForm";

export default async function Page() {
  const categories = await prisma.category.findMany();

  return <PostForm categories={categories} />;
}
