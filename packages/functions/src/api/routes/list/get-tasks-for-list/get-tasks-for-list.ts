import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../../core/src/entities/list/list.sql'
import { db } from '../../../../../../core/src/util/db'
import { UserProcedure } from '../../../procedure/user-procedure'
import { GetTasksForListInput } from './get-tasks-for-list-input'

export const GetTasksForList = UserProcedure.input(GetTasksForListInput).query(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId },
	}) => {
		const list = await db.query.Lists.findFirst({
			where: eq(Lists.listId, listId),
			with: {
				tasks: {
					orderBy: (tasks, { desc }) => [desc(tasks.dateCreated)],
				},
			},
		})

		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${listId} not found`,
			})

		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not authorized to get tasks for list ${listId}`,
			})

		return list.tasks
	},
)
