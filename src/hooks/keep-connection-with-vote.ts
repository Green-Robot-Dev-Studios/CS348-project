// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const keepConnectionWithVote = async (context: HookContext) => {
  if (!context.params.user) return context
  if (!context.data?.roomId) return context
  const votesWithConnection = await context.service('votes').find({
    query: { userId: context.params.user.id, roomId: context.data.roomId },
    $limit: 0
  })

  if (votesWithConnection.total > 0) context.result = context.data; // Skip deleting the connection since there's a vote
  return context;
}
