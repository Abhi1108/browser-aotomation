"use client"

import type { ReactNode } from "react"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense"

import { Spinner } from "@/components/ui/spinner"
import { workflowRoomId } from "@/lib/liveblocks-client"

export function WorkflowRoom({
  workflowId,
  children,
}: {
  workflowId: string
  children: ReactNode
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const response = await fetch("/api/liveblocks-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds }),
        })

        if (!response.ok) {
          return userIds.map(() => undefined)
        }

        return response.json()
      }}
    >
      <RoomProvider id={workflowRoomId(workflowId)}>
        <ClientSideSuspense
          fallback={
            <div className="flex size-full items-center justify-center">
              <Spinner className="size-5" />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
