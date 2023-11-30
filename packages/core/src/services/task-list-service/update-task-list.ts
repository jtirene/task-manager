import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { InsertTaskList, TaskListTable } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type UpdateTaskListInput = z.infer<typeof UpdateTaskListInput>
export const UpdateTaskListInput = InsertTaskList.pick({
	listId: true,
	name: true,
})

export const UpdateTaskList = validate(
	UpdateTaskListInput,
	async ({ listId, name }) => {
		await db
			.update(TaskListTable)
			.set({ name })
			.where(eq(TaskListTable.listId, listId))
	},
)
