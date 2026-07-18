import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider className="h-full min-h-0 overflow-hidden bg-sidebar">
        <AppSidebar />
        <SidebarInset className="min-h-0 min-w-0 overflow-hidden border border-sidebar-border">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
