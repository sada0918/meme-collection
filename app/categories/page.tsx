import prisma from "../../lib/prisma";
export default async function Page() {
  const categories = await prisma.category.findMany();
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
