import { Lists } from '../../../../../core/src/entities/list.sql'
import { db } from '../../../../../core/src/util/db'
import { CreateListInput } from '../../input/list/create-list-input'
import { UserProcedure } from '../../procedure/user-procedure'

export const CreateList = UserProcedure.input(CreateListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		await db.insert(Lists).values({
			listId,
			ownerId: id,
			name,
		})
	},
)
