"use client"

import { useCallback, useState } from "react"
import { useTheme } from "next-themes"
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react"

import { StepNode } from "@/features/workflows/components/step-node"
import {
  normalizeWorkflowGraph,
  type WorkflowGraph,
} from "@/features/workflows/nodes/graph"
import type { StepNodeType } from "@/features/workflows/nodes/node-registry"

const nodeTypes = { step: StepNode }

export function Canvas({ graph }: { graph: WorkflowGraph }) {
  const { resolvedTheme } = useTheme()
  const initialGraph = normalizeWorkflowGraph(graph)
  const [nodes, setNodes] = useState(initialGraph.nodes)
  const [edges, setEdges] = useState(initialGraph.edges)

  const onNodesChange = useCallback(
    (changes: NodeChange<StepNodeType>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: "step" }}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
