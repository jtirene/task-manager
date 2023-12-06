import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../core/src/entities/list/list.sql'
import { db } from '../../../../../core/src/util/db'
import { UserProcedure } from '../../procedure/user-procedure'

export const GetAllTasksForCurrentUser = UserProcedure.query(
	async ({
		ctx: {
			user: { id },
		},
	}) => {
		const lists = await db.query.Lists.findMany({
			where: eq(Lists.ownerId, id),
			with: {
				tasks: true,
			},
		})
		return lists.filter((list) => list.tasks.length > 0)
	},
)
