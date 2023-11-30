import { TRPCError } from '@trpc/server'
import { ListService } from '../../../../../core/src/services/list'
import { GetByIdInput } from '../../input/list/get-by-id'
import { UserProcedure } from '../../procedure/user-procedure'

export const GetById = UserProcedure.input(GetByIdInput).query(
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
				message: `User ${id} does not have permission to view list ${listId}`,
			})
		return list
	},
)
