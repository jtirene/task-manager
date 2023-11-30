import { z } from 'zod'
import {
	InsertTaskList,
	TaskLists,
} from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export type CreateTaskListInput = z.infer<typeof InsertTaskList>
export const CreateTaskListInput = InsertTaskList.pick({
	listId: true,
	name: true,
})

export const CreateTaskList = userProcedure
	.input(CreateTaskListInput)
	.mutation(async ({ ctx: { user }, input: { listId, name } }) => {
		await TaskLists.create({
			listId,
			ownerId: user.id,
			name,
		})
	})
