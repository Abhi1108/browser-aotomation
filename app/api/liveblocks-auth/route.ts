import { auth, currentUser } from "@clerk/nextjs/server"

import { liveblocks } from "@/lib/liveblocks"

function colorFromId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash) % 360
  return `hsl(${hue} 70% 45%)`
}

export async function POST() {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await currentUser()
  const name =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Anonymous"

  const { status, body } = await liveblocks.identifyUser(
    {
      userId,
      organizationId: orgId,
      groupIds: [orgId],
    },
    {
      userInfo: {
        name,
        avatar: user?.imageUrl ?? "",
        color: colorFromId(userId),
      },
    }
  )

  return new Response(body, { status })
}
