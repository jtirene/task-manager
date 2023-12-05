import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../../core/src/entities/list/list.sql.js'
import { db } from '../../../../../../core/src/util/db.js'
import { UserProcedure } from '../../../procedure/user-procedure.js'
import { DeleteListInput } from './delete-list-input.js'

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
