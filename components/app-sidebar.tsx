import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const workflows = await listWorkflows()

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="flex-row items-center gap-1 group-data-[collapsible=icon]:justify-center">
        <div className="flex min-w-0 flex-1 items-center group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "w-full min-w-0",
                organizationSwitcherTrigger:
                  "w-full justify-start gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent",
                organizationPreview: "gap-2",
                organizationPreviewTextContainer: "text-sm",
                organizationSwitcherTriggerIcon: "opacity-60",
              },
            }}
          />
        </div>
        <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav workflows={workflows} />
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <UserButton
          appearance={{
            elements: {
              rootBox: "flex items-center",
              avatarBox: "size-8",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
