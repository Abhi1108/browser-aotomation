"use client"

import type { ReactNode } from "react"
import { ReactFlowProvider } from "@xyflow/react"

export function WorkflowReactFlowProvider({
  children,
}: {
  children: ReactNode
}) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>
}
