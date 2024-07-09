// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const ensureConnectionForVote = async (context: HookContext) => {
  if (!context.params.user) return context
  if (!context.data?.roomId) return context
  const existingConnections = await context.app.service('connections').find({
    query: { userId: context.params.user.id, roomId: context.data.roomId }
  })

  if (existingConnections.total < 1) {
    await context.app.service('connections').create({
      userId: context.params.user.id,
      roomId: context.data.roomId
    })
  }

  return context
}
