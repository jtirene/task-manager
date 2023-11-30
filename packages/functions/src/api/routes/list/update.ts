import { TRPCError } from '@trpc/server'
import { ListService } from '../../../../../core/src/services/list'
import { UpdateInput } from '../../input/list/update'
import { UserProcedure } from '../../procedure/user-procedure'

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
