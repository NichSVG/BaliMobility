import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard — Bali Mobility",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return <AdminDashboard user={session.user} />;
}
