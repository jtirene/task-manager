import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { TaskListTable } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { id, validate } from '../../util/zod'

export type GetTaskListByIdInput = z.infer<typeof GetTaskListByIdInput>
export const GetTaskListByIdInput = z.object({
	listId: id(),
})

export const GetTaskListById = validate(
	GetTaskListByIdInput,
	async ({ listId }) => {
		return await db.query.taskLists.findFirst({
			where: eq(TaskListTable.listId, listId),
		})
	},
)
