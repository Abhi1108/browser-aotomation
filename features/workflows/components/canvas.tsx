"use client"

import { useTheme } from "next-themes"
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from "@xyflow/react"
import { Cursors, useLiveblocksFlow } from "@liveblocks/react-flow"

import { StepNode } from "@/features/workflows/components/step-node"
import {
  normalizeWorkflowGraph,
  type WorkflowGraph,
} from "@/features/workflows/nodes/graph"

const nodeTypes = { step: StepNode }

export function Canvas({ graph }: { graph: WorkflowGraph }) {
  const { resolvedTheme } = useTheme()
  const initialGraph = normalizeWorkflowGraph(graph)

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: {
        initial: initialGraph.nodes,
      },
      edges: {
        initial: initialGraph.edges,
      },
    })

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
        <Cursors />
      </ReactFlow>
    </div>
  )
}
