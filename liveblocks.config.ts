// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

declare global {
  interface Liveblocks {
    Presence: Record<string, never>

    Storage: Record<string, never>

    UserMeta: {
      id: string
      info: {
        name: string
        avatar: string
        color: string
      }
    }

    RoomEvent: Record<string, never>

    ThreadMetadata: Record<string, never>

    RoomInfo: {
      title: string
    }

    GroupInfo: Record<string, never>

    ActivitiesData: Record<string, never>
  }
}

export {}
