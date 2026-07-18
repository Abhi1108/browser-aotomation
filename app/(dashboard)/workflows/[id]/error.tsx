"use client"

import { WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function WorkflowError({
  error,
  unstable_retry: retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <Empty className="border-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          {error.message || "Failed to load this workflow."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={retry}>Try again</Button>
      </EmptyContent>
    </Empty>
  )
}
