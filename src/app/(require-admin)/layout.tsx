import { AdminNavbar } from "@/components/admin/admin-navbar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/auth0";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin ecommerce platform",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <>
    <AdminNavbar/>
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-1">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
    </>
  );
}