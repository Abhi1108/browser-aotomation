import { auth } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm"

import { db } from "@/db"
import { workflows, type Workflow, type WorkflowListItem } from "@/db/schema"
import {
  createDefaultWorkflowGraph,
  type WorkflowGraph,
} from "@/features/workflows/nodes/graph"
import { ensureWorkflowRoom } from "@/lib/liveblocks"

export async function listWorkflows(): Promise<WorkflowListItem[]> {
  const { orgId } = await auth()

  if (!orgId) {
    return []
  }

  return db
    .select({
      id: workflows.id,
      name: workflows.name,
      updatedAt: workflows.updatedAt,
    })
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.updatedAt))
}

export async function getWorkflow(id: string): Promise<Workflow | null> {
  const { orgId } = await auth()

  if (!orgId) {
    return null
  }

  const [workflow] = await db
    .select()
    .from(workflows)
    .where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
    .limit(1)

  return workflow ?? null
}

export async function createWorkflow({
  name,
  graph = createDefaultWorkflowGraph(),
}: {
  name: string
  graph?: WorkflowGraph
}) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const [workflow] = await db
    .insert(workflows)
    .values({
      orgId,
      name,
      graph,
    })
    .returning({
      id: workflows.id,
      name: workflows.name,
      graph: workflows.graph,
      createdAt: workflows.createdAt,
      updatedAt: workflows.updatedAt,
    })

  await ensureWorkflowRoom({
    workflowId: workflow.id,
    orgId,
    title: workflow.name,
  })

  return workflow
}

export async function deleteWorkflow(id: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const [deleted] = await db
    .delete(workflows)
    .where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
    .returning({ id: workflows.id })

  return deleted ?? null
}
