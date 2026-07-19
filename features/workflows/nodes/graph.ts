import type { Edge } from "@xyflow/react"

import {
  createStepNode,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"

export type WorkflowEdge = Edge<Record<string, unknown>, "step">

export type WorkflowGraph = {
  nodes: StepNodeType[]
  edges: WorkflowEdge[]
}

export function createDefaultWorkflowGraph(): WorkflowGraph {
  return {
    nodes: [
      createStepNode("start", {
        id: "start",
        position: { x: 0, y: 0 },
      }),
    ],
    edges: [],
  }
}

export function normalizeWorkflowGraph(graph: unknown): WorkflowGraph {
  if (
    graph &&
    typeof graph === "object" &&
    Array.isArray((graph as WorkflowGraph).nodes) &&
    Array.isArray((graph as WorkflowGraph).edges) &&
    (graph as WorkflowGraph).nodes.length > 0
  ) {
    return graph as WorkflowGraph
  }

  return createDefaultWorkflowGraph()
}
