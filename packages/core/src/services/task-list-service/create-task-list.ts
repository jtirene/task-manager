import { z } from 'zod'
import { InsertTaskList, TaskListTable } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type CreateTaskListInput = z.infer<typeof CreateTaskListInput>
export const CreateTaskListInput = InsertTaskList.pick({
	listId: true,
	ownerId: true,
	name: true,
})

export const CreateTaskList = validate(CreateTaskListInput, async (input) => {
	await db.insert(TaskListTable).values(input)
})
