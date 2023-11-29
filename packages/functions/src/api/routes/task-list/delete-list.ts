import { TRPCError } from '@trpc/server'
import { TaskList, TaskLists } from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const deleteList = userProcedure
	.input(
		TaskList.pick({
			listId: true,
		}),
	)
	.mutation(async ({ ctx, input }) => {
		const list = await TaskLists.getById({ listId: input.listId })

		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${input.listId} not found`,
			})

		if (list.ownerId !== ctx.user.id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${ctx.user.id} is not allowed to delete list ${input.listId}`,
			})

		await TaskLists.deleteList({ listId: input.listId })
	})
