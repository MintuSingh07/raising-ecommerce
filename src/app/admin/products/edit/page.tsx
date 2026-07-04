import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ProductFormClient from "../ProductFormClient";

export const dynamic = "force-dynamic";

export default async function EditProductPage() {
  const session = await getSession();
  if (!session || !session.userId) {
    redirect("/admin/login");
  }

  return <ProductFormClient />;
}
