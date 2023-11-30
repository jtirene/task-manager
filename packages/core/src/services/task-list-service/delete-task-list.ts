import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { TaskList, TaskListTable } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type DeleteTaskListInput = z.infer<typeof DeleteTaskListInput>
export const DeleteTaskListInput = TaskList.pick({
	listId: true,
})

export const DeleteTaskList = validate(
	DeleteTaskListInput,
	async ({ listId }) => {
		await db.delete(TaskListTable).where(eq(TaskListTable.listId, listId))
	},
)
