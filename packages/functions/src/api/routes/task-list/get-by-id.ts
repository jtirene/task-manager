import { TRPCError } from '@trpc/server'
import { TaskList, TaskLists } from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const getById = userProcedure
	.input(
		TaskList.pick({
			listId: true,
		}),
	)
	.query(async ({ ctx, input }) => {
		const list = await TaskLists.getById(input)
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${input.listId} not found`,
			})

		if (list.ownerId !== ctx.user.id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${ctx.user.id} does not have permission to view list ${input.listId}`,
			})

		return list
	})
