import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../core/src/entities/list.sql.js'
import { db } from '../../../../../core/src/util/db.js'
import { GetListsForCurrentUserInput } from '../../input/list/get-lists-for-current-user.js'
import { UserProcedure } from '../../procedure/user-procedure.js'

export const GetListsForCurrentUser = UserProcedure.input(
	GetListsForCurrentUserInput,
).query(
	async ({
		ctx: {
			user: { id },
		},
		input: { limit },
	}) => {
		return await db
			.select()
			.from(Lists)
			.where(eq(Lists.ownerId, id))
			.limit(limit)
	},
)
