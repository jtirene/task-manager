import { TRPCError } from '@trpc/server'
import { CreateTaskList, TaskLists } from '../../../../../core/src/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const update = userProcedure
	.input(
		CreateTaskList.pick({
			listId: true,
			name: true,
		}),
	)
	.mutation(async ({ ctx, input }) => {
		const listId = input.listId
		const userId = ctx.user.id

		const list = await TaskLists.getById({ listId })
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List not found: ${listId}`,
			})

		if (list.ownerId !== userId)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${userId} is not authorized to update list ${listId}`,
			})

		await TaskLists.update({
			listId,
			payload: {
				name: input.name,
			},
		})
	})
