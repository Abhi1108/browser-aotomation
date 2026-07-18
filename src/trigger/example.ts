import { logger, task } from "@trigger.dev/sdk"

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload: { message?: string }, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx })

    return {
      message: payload.message ?? "Hello, world!",
    }
  },
})
