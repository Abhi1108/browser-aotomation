"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusIcon, WorkflowIcon } from "lucide-react"

import { createWorkflowAction } from "@/features/workflows/actions"
import type { WorkflowListItem } from "@/db/schema"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function WorkflowNav({
  workflows,
}: {
  workflows: WorkflowListItem[]
}) {
  const { state } = useSidebar()
  const pathname = usePathname()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return (
      <SidebarGroup className="items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Workflows"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <WorkflowIcon />
                  <span className="sr-only">Workflows</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuItem
                  onSelect={() => {
                    void createWorkflowAction()
                  }}
                >
                  <PlusIcon />
                  New workflow
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {workflows.map((workflow) => (
                  <DropdownMenuItem key={workflow.id} asChild>
                    <Link href={`/workflows/${workflow.id}`}>
                      {workflow.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <form action={createWorkflowAction}>
        <SidebarGroupAction type="submit" title="New workflow">
          <PlusIcon />
          <span className="sr-only">New workflow</span>
        </SidebarGroupAction>
      </form>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow) => (
            <SidebarMenuItem key={workflow.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/workflows/${workflow.id}`}
                tooltip={workflow.name}
              >
                <Link href={`/workflows/${workflow.id}`}>
                  <span>{workflow.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
