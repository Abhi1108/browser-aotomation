import { auth } from "@clerk/nextjs/server"
import { desc, eq } from "drizzle-orm"

import { db } from "@/db"
import { workflows, type WorkflowListItem } from "@/db/schema"

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

export async function createWorkflow({
  name,
  graph = {},
}: {
  name: string
  graph?: Record<string, unknown>
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

  return workflow
}
