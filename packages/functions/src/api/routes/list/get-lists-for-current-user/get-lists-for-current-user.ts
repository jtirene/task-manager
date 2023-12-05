import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../../core/src/entities/list/list.sql.js'
import { db } from '../../../../../../core/src/util/db.js'
import { UserProcedure } from '../../../procedure/user-procedure.js'
import { GetListsForCurrentUserInput } from './get-lists-for-current-user-input.js'

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
