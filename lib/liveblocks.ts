import { Liveblocks } from "@liveblocks/node"

import { workflowRoomId } from "@/lib/liveblocks-client"

export { workflowRoomId }

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function ensureWorkflowRoom({
  workflowId,
  orgId,
  title,
}: {
  workflowId: string
  orgId: string
  title: string
}) {
  return liveblocks.getOrCreateRoom(workflowRoomId(workflowId), {
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["*:write"],
    },
    organizationId: orgId,
    metadata: {
      title,
      workflowId,
    },
  })
}
