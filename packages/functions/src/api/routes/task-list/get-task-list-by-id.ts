import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { TaskList, TaskLists } from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export type GetTaskListByIdInput = z.infer<typeof TaskList>
export const GetTaskListByIdInput = TaskList.pick({
	listId: true,
})

export const GetTaskListById = userProcedure
	.input(GetTaskListByIdInput)
	.query(async ({ ctx: { user }, input: { listId } }) => {
		const list = await TaskLists.getById({ listId })
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${listId} not found`,
			})
		if (list.ownerId !== user.id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${user.id} does not have permission to view list ${listId}`,
			})
		return list
	})
