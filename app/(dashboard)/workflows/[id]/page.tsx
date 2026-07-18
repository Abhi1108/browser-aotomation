import { notFound } from "next/navigation"

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
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-6">
      <div>
        <h1 className="font-heading text-lg font-medium tracking-tight">
          {workflow.name}
        </h1>
        <p className="text-sm text-muted-foreground">ID: {workflow.id}</p>
      </div>
      <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
        {JSON.stringify(workflow.graph, null, 2)}
      </pre>
    </div>
  )
}
