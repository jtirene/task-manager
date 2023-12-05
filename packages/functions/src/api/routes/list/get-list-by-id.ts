import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Lists } from '../../../../../core/src/entities/list.sql.js'
import { db } from '../../../../../core/src/util/db.js'
import { GetListByIdInput } from '../../input/list/get-list-by-id-input.js'
import { UserProcedure } from '../../procedure/user-procedure.js'

export const GetListById = UserProcedure.input(GetListByIdInput).query(
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
				message: `User ${id} does not have permission to view list ${listId}`,
			})
		return list
	},
)
