import { TRPCError } from '@trpc/server'
import { TaskListService } from '../../../../../core/src/services/task-list-service'
import { GetTaskListByIdInput } from '../../../../../core/src/services/task-list-service/get-task-list-by-id'
import { userProcedure } from '../../procedure/user-procedure'

export const GetTaskListById = userProcedure.input(GetTaskListByIdInput).query(
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
				message: `User ${id} does not have permission to view list ${listId}`,
			})
		return list
	},
)
