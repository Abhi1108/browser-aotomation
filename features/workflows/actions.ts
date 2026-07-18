"use server"

import { runs, tasks } from "@trigger.dev/sdk"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { generateSlug } from "@/features/lib/generate-slug"
import { createWorkflow } from "@/features/workflows/data"
import type { helloWorldTask } from "@/src/trigger/example"

export type WorkflowRunStatus = {
  id: string
  status: string
  isCompleted: boolean
  isSuccess: boolean
  isFailed: boolean
  output?: unknown
  error?: string
}

export async function createWorkflowAction() {
  const workflow = await createWorkflow({
    name: generateSlug(),
  })

  if (!workflow) {
    throw new Error("Failed to create workflow")
  }

  revalidatePath("/", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction(): Promise<WorkflowRunStatus> {
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from workflow Run",
  })

  return {
    id: handle.id,
    status: "QUEUED",
    isCompleted: false,
    isSuccess: false,
    isFailed: false,
  }
}

export async function getWorkflowRunStatusAction(
  runId: string
): Promise<WorkflowRunStatus> {
  const run = await runs.retrieve(runId)

  return {
    id: run.id,
    status: run.status,
    isCompleted: run.isCompleted,
    isSuccess: run.isSuccess,
    isFailed: run.isFailed,
    output: run.output,
    error: run.error?.message,
  }
}
