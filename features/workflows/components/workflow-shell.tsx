"use client"

import { Canvas } from "@/features/workflows/components/canvas"
import { RightSidebar } from "@/features/workflows/components/right-sidebar"
import { WorkflowFlowProvider } from "@/features/workflows/components/workflow-flow-provider"
import { WorkflowRoom } from "@/features/workflows/components/workflow-room"
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
    <WorkflowRoom workflowId={workflowId}>
      <WorkflowFlowProvider graph={graph}>
        <ResizablePanelGroup
          orientation="horizontal"
          className="size-full"
          id={`workflow-${workflowId}`}
        >
          <ResizablePanel minSize="30rem" className="min-h-0">
            <ResizablePanelGroup orientation="vertical" className="size-full">
              <ResizablePanel minSize="18rem" className="min-h-0">
                <Canvas />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel
                defaultSize="8rem"
                minSize="6rem"
                className="min-h-0"
              >
                <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                  Logs
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <RightSidebar workflowId={workflowId} />
        </ResizablePanelGroup>
      </WorkflowFlowProvider>
    </WorkflowRoom>
  )
}
