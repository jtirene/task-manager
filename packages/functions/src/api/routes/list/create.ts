import { ListService } from '../../../../../core/src/services/list'
import { CreateInput } from '../../input/list/create'
import { UserProcedure } from '../../procedure/user-procedure'

export const Create = UserProcedure.input(CreateInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		await ListService.Create.execute({
			listId,
			ownerId: id,
			name,
		})
	},
)
