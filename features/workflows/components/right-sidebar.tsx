"use client"

import { useEffect, useState, useTransition } from "react"
import { PlayIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  getWorkflowRunStatusAction,
  runWorkflowAction,
  type WorkflowRunStatus,
} from "@/features/workflows/actions"

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function statusVariant(
  run: WorkflowRunStatus
): "default" | "secondary" | "destructive" | "outline" {
  if (run.isSuccess) return "default"
  if (run.isFailed) return "destructive"
  if (run.isCompleted) return "secondary"
  return "outline"
}

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [run, setRun] = useState<WorkflowRunStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isRunning = isPending || (run != null && !run.isCompleted)

  useEffect(() => {
    if (!run?.id || run.isCompleted) return

    let cancelled = false

    const poll = async () => {
      try {
        const next = await getWorkflowRunStatusAction(run.id)
        if (!cancelled) {
          setRun(next)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch status")
        }
      }
    }

    void poll()
    const intervalId = setInterval(() => {
      void poll()
    }, 1000)

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [run?.id, run?.isCompleted])

  function handleRun() {
    setError(null)
    startTransition(async () => {
      try {
        const next = await runWorkflowAction()
        setRun(next)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to start run")
      }
    })
  }

  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <Button onClick={handleRun} disabled={isRunning}>
        {isRunning ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <PlayIcon data-icon="inline-start" />
        )}
        Run
      </Button>

      {run ? (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            {!run.isCompleted ? <Spinner className="size-3.5" /> : null}
            <Badge variant={statusVariant(run)}>{formatStatus(run.status)}</Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground break-all">
            {run.id}
          </p>
          {run.isSuccess && run.output != null ? (
            <p className="text-muted-foreground">
              {typeof run.output === "object" &&
              run.output !== null &&
              "message" in run.output
                ? String((run.output as { message: unknown }).message)
                : JSON.stringify(run.output)}
            </p>
          ) : null}
          {run.error ? (
            <p className="text-destructive">{run.error}</p>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
