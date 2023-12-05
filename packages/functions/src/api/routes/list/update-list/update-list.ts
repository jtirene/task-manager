import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../../core/src/entities/list/list.sql.js'
import { db } from '../../../../../../core/src/util/db.js'
import { UserProcedure } from '../../../procedure/user-procedure.js'
import { UpdateListInput } from './update-list-input.js'

export const UpdateList = UserProcedure.input(UpdateListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		const list = await db.query.TaskLists.findFirst({
			where: eq(Lists.listId, listId),
		})
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List not found: ${listId}`,
			})
		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not authorized to update list ${listId}`,
			})
		await db.update(Lists).set({ name }).where(eq(Lists.listId, listId))
	},
)
