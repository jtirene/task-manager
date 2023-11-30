import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ListService } from '../../../../../core/src/services/list'
import { UserProcedure } from '../../procedure/user-procedure'

export type DeleteInput = z.infer<typeof DeleteInput>
export const DeleteInput = ListService.Delete.input

export const Delete = UserProcedure.input(DeleteInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId },
	}) => {
		const list = await ListService.GetById.execute({ listId })
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
		await ListService.Delete.execute({ listId })
	},
)
