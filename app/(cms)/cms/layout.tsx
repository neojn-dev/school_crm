import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
