import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { TaskList, TaskListTable } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type GetAllTaskListsOwnedByUserInput = z.infer<
	typeof GetAllTaskListsOwnedByUserInput
>
export const GetAllTaskListsOwnedByUserInput = z.object({
	ownerId: TaskList.shape.ownerId,
	limit: z.number().min(1),
})

export const GetAllTaskListsOwnedByUser = validate(
	GetAllTaskListsOwnedByUserInput,
	async ({ ownerId, limit }) => {
		return await db
			.select()
			.from(TaskListTable)
			.where(eq(TaskListTable.ownerId, ownerId))
			.limit(limit)
	},
)
