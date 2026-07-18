import { PlusIcon, WorkflowIcon } from "lucide-react"

import { createWorkflowAction } from "@/features/workflows/actions"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function WorkflowNotFound() {
  return (
    <Empty className="border-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle>Workflow not found</EmptyTitle>
        <EmptyDescription>
          This workflow does not exist or you do not have access to it.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <form action={createWorkflowAction}>
          <Button type="submit">
            <PlusIcon data-icon="inline-start" />
            New workflow
          </Button>
        </form>
      </EmptyContent>
    </Empty>
  )
}
