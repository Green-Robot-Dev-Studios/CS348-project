// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const ensureOneConnection = async (context: HookContext) => {
  if (!context.params.user) return context
  if (!context.data?.roomId) return context
  const existingConnections = await context.service.find({
    query: { userId: context.params.user.id, roomId: context.data.roomId }
  })

  if (existingConnections.total > 0) context.result = existingConnections.data[0]

  return context
}
