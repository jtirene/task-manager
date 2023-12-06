import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../../core/src/entities/list/list.sql'
import { Tasks } from '../../../../../../core/src/entities/task/task.sql'
import { db } from '../../../../../../core/src/util/db'
import { UserProcedure } from '../../../procedure/user-procedure'
import { CreateTaskInput } from './create-task-input'

export const CreateTask = UserProcedure.input(CreateTaskInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: {
			taskId,
			listId,
			title,
			description,
			priority,
			dateStart,
			dateEnd,
			recurrenceRule,
			dateRecurrenceEnd,
		},
	}) => {
		const list = await db.query.Lists.findFirst({
			where: eq(Lists.listId, listId),
		})

		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${listId} not found`,
			})

		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not authorized to create task in list ${listId}`,
			})

		const values: typeof Tasks.$inferInsert = {
			taskId,
			listId,
			title,
			description,
			priority,
			dateStart,
			dateEnd,
			recurrenceRule,
			dateRecurrenceEnd,
		}
		await db.insert(Tasks).values(values)
	},
)
