"use client"

import { PlusIcon, WorkflowIcon } from "lucide-react"

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

const workflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function WorkflowNav() {
  const { state } = useSidebar()
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
                <DropdownMenuItem>
                  <PlusIcon />
                  New workflow
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {workflows.map((workflow) => (
                  <DropdownMenuItem key={workflow}>{workflow}</DropdownMenuItem>
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
      <SidebarGroupAction title="New workflow">
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow) => (
            <SidebarMenuItem key={workflow}>
              <SidebarMenuButton>
                <span>{workflow}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
