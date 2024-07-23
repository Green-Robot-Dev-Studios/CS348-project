// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const pickWinnerFood = async (context: HookContext) => {

    const db = context.app.get('mysqlClient')

    if (context.data.approved) {

        const approvedCount = await db.raw(
            `
            SELECT SUM(approved) AS approvedCount
            FROM votes 
            WHERE foodId = ? AND roomId = ?;`,
            [context.data.foodId, context.data.roomId]
        )

        const totalUsers = await db.raw(
            `
            SELECT COUNT(DISTINCT userId) AS totalUsers
            FROM connections 
            WHERE roomId = ?;`,
            [context.data.roomId]
        )

        if (approvedCount[0][0].approvedCount === totalUsers[0][0].totalUsers) {
            await context.app.service('rooms').patch(context.data.roomId, { picked: context.data.foodId })
            return context
        }
    }

    const votedFoodCount = await db.raw(
        `
        SELECT MIN(votedFoodCount) AS min
        FROM (
            SELECT COUNT(DISTINCT v.foodID) AS votedFoodCount
            FROM votes v RIGHT OUTER JOIN connections c 
                ON v.userId = c.userId AND v.roomId = c.roomId
            WHERE c.roomId = ? 
            GROUP BY c.userId
        ) AS userVotedFoodCount;`,
        [context.data.roomId]
    )

    const closeFoodCount = (await context.app.service('close-food')
        .find({ query: { roomId: context.data.roomId } }))?.total ?? 0;

    if (votedFoodCount[0][0].min === closeFoodCount) {

        const maxVote = await db.raw(
            `
            WITH countedVotes AS (
                SELECT v.foodId, SUM(v.approved) as foodVotes
                FROM votes v 
                WHERE v.roomId = ? 
                GROUP BY v.foodId
            ), MaxVotes AS (
                SELECT MAX(cv.foodVotes) as maxVotes 
                FROM countedVotes cv
            )
            SELECT cv.foodId
            FROM countedVotes cv 
            JOIN MaxVotes mv ON cv.foodVotes = mv.maxVotes
            LIMIT 1;`,
            [context.data.roomId]
        )

        await context.app.service('rooms').patch(context.data.roomId, { picked: maxVote[0][0].foodId })
    }

    return context
}
