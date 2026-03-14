import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryForm from "./CategoryForm";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return <CategoryForm />;
}
