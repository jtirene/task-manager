import { Lists } from '../../../../../../core/src/entities/list/list.sql'
import { db } from '../../../../../../core/src/util/db'
import { UserProcedure } from '../../../procedure/user-procedure'
import { CreateListInput } from './create-list-input'

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
