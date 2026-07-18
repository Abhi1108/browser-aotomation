import { tasks } from "@trigger.dev/sdk"
import { NextResponse } from "next/server"

import type { helloWorldTask } from "@/src/trigger/example"

export async function GET() {
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from Next.js!",
  })

  return NextResponse.json(handle)
}
