import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/db";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  // Find user details by userId from session directly
  const user = await findUserById(session.userId);

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch count stats from MongoDB for dashboard visual feedback
  await dbConnect();
  const categoryCount = await Category.countDocuments({});
  const productCount = await Product.countDocuments({});

  return (
    <AdminDashboardClient
      user={{
        name: user.name,
        email: user.email,
      }}
      stats={{
        categories: categoryCount,
        products: productCount,
      }}
    />
  );
}
