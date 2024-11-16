import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-auto">
        <Header />
        <main className="flex flex-1 flex-col gap-4 pb-2 pl-4 pr-4 md:pr-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
