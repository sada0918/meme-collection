import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";

export default async function Page() {
  const categories = await prisma.category.findMany();
  return <CategoryForm categories={categories} />;
}
