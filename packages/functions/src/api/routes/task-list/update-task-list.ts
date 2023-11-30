import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
	InsertTaskList,
	TaskLists,
} from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export type UpdateTaskListInput = z.infer<typeof InsertTaskList>
export const UpdateTaskListInput = InsertTaskList.pick({
	listId: true,
	name: true,
})

export const UpdateTaskList = userProcedure
	.input(UpdateTaskListInput)
	.mutation(async ({ ctx: { user }, input: { listId, name } }) => {
		const list = await TaskLists.getById({ listId })
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List not found: ${listId}`,
			})
		if (list.ownerId !== user.id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${user.id} is not authorized to update list ${listId}`,
			})
		await TaskLists.update({
			listId,
			payload: {
				name: name,
			},
		})
	})
