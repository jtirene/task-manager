import { z } from 'zod'
import { ListService } from '../../../../../core/src/services/list'
import { UserProcedure } from '../../procedure/user-procedure'

export type CreateInput = z.infer<typeof CreateInput>
export const CreateInput = ListService.Create.input.pick({
	listId: true,
	name: true,
})

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
