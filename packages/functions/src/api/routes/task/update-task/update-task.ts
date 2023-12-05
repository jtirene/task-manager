import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Tasks } from '../../../../../../core/src/entities/task/task.sql'
import { db } from '../../../../../../core/src/util/db'
import { UserProcedure } from '../../../procedure/user-procedure'
import { UpdateTaskInput } from './update-task-input'

export const UpdateTask = UserProcedure.input(UpdateTaskInput).query(
	async ({
		ctx: {
			user: { id },
		},
		input: {
			taskId,
			title,
			description,
			priority,
			dateStart,
			dateEnd,
			recurrenceRule,
			dateRecurrenceEnd,
		},
	}) => {
		const task = await db.query.Tasks.findFirst({
			where: eq(Tasks.taskId, taskId),
			with: {
				list: true,
			},
		})

		if (!task)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `Task ${taskId} not found`,
			})

		if (task.list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not authorized to update task ${taskId}`,
			})

		await db
			.update(Tasks)
			.set({
				title,
				description,
				priority,
				dateStart,
				dateEnd,
				recurrenceRule,
				dateRecurrenceEnd,
			})
			.where(eq(Tasks.taskId, taskId))
	},
)
