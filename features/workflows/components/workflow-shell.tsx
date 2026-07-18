"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function WorkflowShell({ workflowId }: { workflowId: string }) {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="size-full"
      id={`workflow-${workflowId}`}
    >
      <ResizablePanel minSize="30rem" className="min-h-0">
        <ResizablePanelGroup orientation="vertical" className="size-full">
          <ResizablePanel minSize="18rem" className="min-h-0">
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              Canvas
            </div>
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
        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
          Inspector
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
