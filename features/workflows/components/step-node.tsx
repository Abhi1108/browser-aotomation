"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

import { Separator } from "@/components/ui/separator"
import {
  nodeRegistry,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"
import { cn } from "@/lib/utils"

function StepNodeComponent({ data, selected }: NodeProps<StepNodeType>) {
  const { type, kind, title, values } = data
  const def = nodeRegistry[type]
  const Icon = def.icon

  const entries = def.fields
    .map((field) => {
      const value = values[field.key]?.trim()
      if (!value) return null
      return { key: field.key, label: field.label, value }
    })
    .filter((entry) => entry != null)

  // A trigger starts the flow and takes no input, so it has no target handle.
  const hasTarget = kind !== "trigger"

  return (
    <div
      className={cn(
        "min-w-50 max-w-80 rounded-(--radius) border-2 border-border bg-card text-card-foreground",
        selected && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ transform: "translate(-100%, -50%)" }}
          className="h-3.5! w-1.5! min-w-0! rounded-l-xs! rounded-r-none! border-0! bg-border!"
        />
      )}

      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            def.accent
          )}
        >
          <Icon className="size-4" />
        </div>
        <span className="text-sm font-semibold">{title}</span>
      </div>

      {entries.length > 0 ? (
        <>
          <Separator />
          <div className="flex flex-col gap-1.5 px-3 py-2">
            {entries.map((entry) => (
              <p
                key={entry.key}
                className="flex items-baseline justify-between gap-3 truncate text-xs text-muted-foreground"
                title={`${entry.label}: ${entry.value}`}
              >
                <span className="shrink-0 font-medium">{entry.label}</span>
                <span className="min-w-0 truncate text-right text-foreground">
                  {entry.value}
                </span>
              </p>
            ))}
          </div>
        </>
      ) : null}

      <Handle
        type="source"
        position={Position.Right}
        style={{ transform: "translate(100%, -50%)" }}
        className="h-3.5! w-1.5! min-w-0! rounded-l-none! rounded-r-xs! border-0! bg-border!"
      />
    </div>
  )
}

export const StepNode = memo(StepNodeComponent)
