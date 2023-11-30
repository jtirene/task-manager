import { TRPCError } from '@trpc/server'
import { TaskListService } from '../../../../../core/src/services/task-list-service'
import { DeleteTaskListInput } from '../../../../../core/src/services/task-list-service/delete-task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const DeleteTaskList = userProcedure.input(DeleteTaskListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId },
	}) => {
		const list = await TaskListService.GetTaskListById({ listId })
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${listId} not found`,
			})
		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not allowed to delete list ${listId}`,
			})
		await TaskListService.DeleteTaskList({ listId })
	},
)
