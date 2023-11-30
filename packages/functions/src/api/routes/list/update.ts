import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ListService } from '../../../../../core/src/services/list'
import { UserProcedure } from '../../procedure/user-procedure'

export type UpdateInput = z.infer<typeof UpdateInput>
export const UpdateInput = ListService.Update.input

export const Update = UserProcedure.input(UpdateInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		const list = await ListService.GetById.execute({ listId })
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
		await ListService.Update.execute({
			listId,
			name,
		})
	},
)
