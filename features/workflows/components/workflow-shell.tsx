"use client"

import { Canvas } from "@/features/workflows/components/canvas"
import { RightSidebar } from "@/features/workflows/components/right-sidebar"
import type { WorkflowGraph } from "@/features/workflows/nodes/graph"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function WorkflowShell({
  workflowId,
  graph,
}: {
  workflowId: string
  graph: WorkflowGraph
}) {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="size-full"
      id={`workflow-${workflowId}`}
    >
      <ResizablePanel minSize="30rem" className="min-h-0">
        <ResizablePanelGroup orientation="vertical" className="size-full">
          <ResizablePanel minSize="18rem" className="min-h-0">
            <Canvas graph={graph} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem" className="min-h-0">
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              Logs
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize="16rem"
        minSize="14rem"
        maxSize="36rem"
        className="min-h-0"
      >
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
