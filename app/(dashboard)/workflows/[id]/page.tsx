import { notFound } from "next/navigation"

import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { getWorkflow } from "@/features/workflows/data"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const workflow = await getWorkflow(id)

  if (!workflow) {
    notFound()
  }

  return (
    <div className="min-h-0 flex-1">
      <WorkflowShell workflowId={workflow.id} />
    </div>
  )
}
