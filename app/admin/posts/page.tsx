import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import PostForm from "./PostForm";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const categories = await prisma.category.findMany();

  return <PostForm categories={categories} />;
}
