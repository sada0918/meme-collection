import Link from "next/link";
import prisma from "../../lib/prisma";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: { popularYear: "desc" },
  });

  if (categories.length === 0) {
    return <>カテゴリが見つかりませんでした。</>;
  }

  return (
    <div>
      {categories.map((category) => (
        <Link href={`/categories/${category.id}`} key={category.id}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
