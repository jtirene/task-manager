import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ListService } from '../../../../../core/src/services/list'
import { UserProcedure } from '../../procedure/user-procedure'

export type GetByIdInput = z.infer<typeof GetByIdInput>
export const GetByIdInput = ListService.GetById.input

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
