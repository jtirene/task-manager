import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../core/src/entities/list.sql.js'
import { db } from '../../../../../core/src/util/db.js'
import { UpdateListInput } from '../../input/list/update-list-input.js'
import { UserProcedure } from '../../procedure/user-procedure.js'

export const UpdateList = UserProcedure.input(UpdateListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		const list = await db.query.taskLists.findFirst({
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
