"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react"
import { useLiveblocksFlow } from "@liveblocks/react-flow"
import type {
  OnConnect,
  OnDelete,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react"
import { toast } from "sonner"

import {
  normalizeWorkflowGraph,
  type WorkflowEdge,
  type WorkflowGraph,
} from "@/features/workflows/nodes/graph"
import {
  createStepNode,
  nodeRegistry,
  type NodeType,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"

type WorkflowFlowContextValue = {
  nodes: StepNodeType[]
  edges: WorkflowEdge[]
  onNodesChange: OnNodesChange<StepNodeType>
  onEdgesChange: OnEdgesChange<WorkflowEdge>
  onConnect: OnConnect
  onDelete: OnDelete<StepNodeType, WorkflowEdge>
  addNodeType: (type: NodeType) => void
  updateNodeField: (nodeId: string, key: string, value: string) => void
}

const WorkflowFlowContext = createContext<WorkflowFlowContextValue | null>(null)

export function WorkflowFlowProvider({
  graph,
  children,
}: {
  graph: WorkflowGraph
  children: ReactNode
}) {
  const initialGraph = useMemo(() => normalizeWorkflowGraph(graph), [graph])

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow<StepNodeType, WorkflowEdge>({
      suspense: true,
      nodes: {
        initial: initialGraph.nodes,
      },
      edges: {
        initial: initialGraph.edges,
      },
    })

  const addNodeType = useCallback(
    (type: NodeType) => {
      const def = nodeRegistry[type]

      if (def.kind === "trigger") {
        const hasTrigger = nodes.some((node) => node.data.kind === "trigger")
        if (hasTrigger) {
          toast.error("Only one trigger node is allowed")
          return
        }
      }

      const sameTypeCount = nodes.filter((node) => node.data.type === type).length
      const title = `${def.label} ${sameTypeCount + 1}`

      const offset = nodes.length * 48
      const node = createStepNode(type, {
        id: crypto.randomUUID(),
        position: { x: 120 + offset, y: 80 + offset },
        title,
      })

      onNodesChange([
        ...nodes
          .filter((existing) => existing.selected)
          .map((existing) => ({
            type: "select" as const,
            id: existing.id,
            selected: false,
          })),
        { type: "add", item: node },
        {
          type: "select",
          id: node.id,
          selected: true,
        },
      ])
    },
    [nodes, onNodesChange]
  )

  const updateNodeField = useCallback(
    (nodeId: string, key: string, value: string) => {
      const node = nodes.find((item) => item.id === nodeId)
      if (!node) return

      onNodesChange([
        {
          type: "replace",
          id: nodeId,
          item: {
            ...node,
            data: {
              ...node.data,
              values: {
                ...node.data.values,
                [key]: value,
              },
            },
          },
        },
      ])
    },
    [nodes, onNodesChange]
  )

  const value = useMemo(
    () => ({
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onDelete,
      addNodeType,
      updateNodeField,
    }),
    [
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onDelete,
      addNodeType,
      updateNodeField,
    ]
  )

  return (
    <WorkflowFlowContext.Provider value={value}>
      {children}
    </WorkflowFlowContext.Provider>
  )
}

export function useWorkflowFlow() {
  const context = useContext(WorkflowFlowContext)

  if (!context) {
    throw new Error("useWorkflowFlow must be used within WorkflowFlowProvider")
  }

  return context
}
