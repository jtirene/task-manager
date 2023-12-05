import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Tasks } from '../../../../../../core/src/entities/task/task.sql'
import { db } from '../../../../../../core/src/util/db'
import { UserProcedure } from '../../../procedure/user-procedure'
import { DeleteTaskInput } from './delete-task-input'

export const DeleteTask = UserProcedure.input(DeleteTaskInput).query(
	async ({
		ctx: {
			user: { id },
		},
		input: { taskId },
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
				message: `User ${id} is not authorized to delete task ${taskId}`,
			})

		await db.delete(Tasks).where(eq(Tasks.taskId, taskId))
	},
)
