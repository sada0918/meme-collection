import Link from "next/link";
import prisma from "../../lib/prisma";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: { popularYear: "desc" },
  });

  if (categories.length === 0) {
    return <>カテゴリが見つかりませんでした。</>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {categories.map((category) => (
        <Card
          className="mx-auto w-full max-w-sm overflow-hidden pt-0"
          key={category.id}
        >
          <div className="relative aspect-video">
            {category.imageUrl ? (
              <Image src={category.imageUrl} alt={category.name} fill />
            ) : (
              <>
                <span className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                  No Image
                </span>
                <div className="absolute inset-0 bg-black/25" />
              </>
            )}
          </div>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/categories/${category.id}`}>ポストを見る</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
