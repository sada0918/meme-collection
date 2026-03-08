import prisma from "../lib/prisma";

async function main() {
  const funnyCategory = await prisma.category.create({
    data: {
      name: "Funny",
      popularYear: 2020,
    },
  });

  const sadCategory = await prisma.category.create({
    data: {
      name: "Sad",
      popularYear: 2019,
    },
  });
  console.log({ funnyCategory, sadCategory });

  const post1 = await prisma.post.create({
    data: {
      postId: "1",
      categoryId: funnyCategory.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      postId: "2",
      categoryId: sadCategory.id,
    },
  });
  console.log({ post1, post2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
