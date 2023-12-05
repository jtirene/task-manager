import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../core/src/entities/list.sql.js'
import { db } from '../../../../../core/src/util/db.js'
import { DeleteListInput } from '../../input/list/delete-list-input.js'
import { UserProcedure } from '../../procedure/user-procedure.js'

export const DeleteList = UserProcedure.input(DeleteListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId },
	}) => {
		const list = await db.query.taskLists.findFirst({
			where: eq(Lists.listId, listId),
		})
		if (!list)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `List ${listId} not found`,
			})
		if (list.ownerId !== id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: `User ${id} is not allowed to delete list ${listId}`,
			})
		await db.delete(Lists).where(eq(Lists.listId, listId))
	},
)
