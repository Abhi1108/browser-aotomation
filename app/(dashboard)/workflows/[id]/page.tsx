import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import { WorkflowReactFlowProvider } from "@/features/workflows/components/workflow-react-flow-provider"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { getWorkflow } from "@/features/workflows/data"
import { normalizeWorkflowGraph } from "@/features/workflows/nodes/graph"
import { ensureWorkflowRoom } from "@/lib/liveblocks"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()
  const workflow = await getWorkflow(id)

  if (!workflow || !orgId) {
    notFound()
  }

  await ensureWorkflowRoom({
    workflowId: workflow.id,
    orgId,
    title: workflow.name,
  })

  return (
    <div className="min-h-0 flex-1">
      <WorkflowReactFlowProvider>
        <WorkflowShell
          workflowId={workflow.id}
          graph={normalizeWorkflowGraph(workflow.graph)}
        />
      </WorkflowReactFlowProvider>
    </div>
  )
}
