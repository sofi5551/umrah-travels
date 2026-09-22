import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/getAdminSession";
import { getSiteSettings } from "@/lib/siteSettings";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen bg-sand">
      <AdminSidebar email={session.email} faviconUrl={settings.faviconUrl} />
      <main className="min-w-0 flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
