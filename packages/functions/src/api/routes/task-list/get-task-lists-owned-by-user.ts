import { z } from 'zod'
import { TaskListService } from '../../../../../core/src/services/task-list-service'
import { userProcedure } from '../../procedure/user-procedure'

export type GetTaskListsOwnedByUserInput = z.infer<
	typeof GetTaskListsOwnedByUserInput
>
export const GetTaskListsOwnedByUserInput = z.object({
	limit: z.number().min(1),
})

export const GetTaskListsOwnedByUser = userProcedure
	.input(GetTaskListsOwnedByUserInput)
	.query(
		async ({
			ctx: {
				user: { id },
			},
			input: { limit },
		}) => {
			return await TaskListService.GetAllTaskListsOwnedByUser({
				limit: limit,
				ownerId: id,
			})
		},
	)
