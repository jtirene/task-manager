import { z } from 'zod'
import { ListService } from '../../../../../core/src/services/list'
import { UserProcedure } from '../../procedure/user-procedure'

export type GetForCurrentUserInput = z.infer<typeof GetForCurrentUserInput>
export const GetForCurrentUserInput = ListService.GetByOwner.input.pick({
	limit: true,
})

export const GetForCurrentUser = UserProcedure.input(
	GetForCurrentUserInput,
).query(
	async ({
		ctx: {
			user: { id },
		},
		input: { limit },
	}) => {
		return await ListService.GetByOwner.execute({
			limit: limit,
			ownerId: id,
		})
	},
)
