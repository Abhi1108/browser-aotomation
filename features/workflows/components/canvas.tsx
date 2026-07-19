"use client"

import { useTheme } from "next-themes"
import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
} from "@xyflow/react"
import { Cursors } from "@liveblocks/react-flow"
import { AvatarStack } from "@liveblocks/react-ui"

import { StepNode } from "@/features/workflows/components/step-node"
import { useWorkflowFlow } from "@/features/workflows/components/workflow-flow-provider"

const nodeTypes = { step: StepNode }

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useWorkflowFlow()

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: "step" }}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-right">
          <AvatarStack size={28} variant="outline" max={5} />
        </Panel>
        <Cursors />
      </ReactFlow>
    </div>
  )
}
