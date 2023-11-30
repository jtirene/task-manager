import { ListService } from '../../../../../core/src/services/list'
import { GetForCurrentUserInput } from '../../input/list/get-by-owner'
import { UserProcedure } from '../../procedure/user-procedure'

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
