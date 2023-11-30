import { z } from 'zod'
import { TaskLists } from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export type GetTaskListsOwnedByUserInput = z.infer<
	typeof GetTaskListsOwnedByUserInput
>
export const GetTaskListsOwnedByUserInput = z.object({
	limit: z.number().min(1),
})

export const GetTaskListsOwnedByUser = userProcedure
	.input(GetTaskListsOwnedByUserInput)
	.query(async ({ ctx: { user }, input: { limit } }) => {
		return await TaskLists.getAll({
			limit: limit,
			ownerId: user.id,
		})
	})
