import { TRPCError } from '@trpc/server'
import { TaskListService } from '../../../../../core/src/services/task-list-service'
import { UpdateTaskListInput } from '../../../../../core/src/services/task-list-service/update-task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const UpdateTaskList = userProcedure.input(UpdateTaskListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		const list = await TaskListService.GetTaskListById({ listId })
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List not found: ${listId}`,
			})
		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not authorized to update list ${listId}`,
			})
		await TaskListService.UpdateTaskList({
			listId,
			name,
		})
	},
)
