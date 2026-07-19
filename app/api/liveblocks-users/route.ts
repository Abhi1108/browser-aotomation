import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { colorFromId } from "@/lib/user-color"

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { userIds } = (await request.json()) as { userIds?: string[] }

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return NextResponse.json([])
  }

  const client = await clerkClient()
  const { data } = await client.users.getUserList({
    userId: userIds,
    limit: Math.min(userIds.length, 100),
  })

  const usersById = new Map(data.map((user) => [user.id, user]))

  return NextResponse.json(
    userIds.map((id) => {
      const user = usersById.get(id)

      if (!user) {
        return undefined
      }

      return {
        name:
          user.fullName ||
          user.username ||
          user.primaryEmailAddress?.emailAddress ||
          "User",
        avatar: user.imageUrl,
        color: colorFromId(id),
      }
    })
  )
}
