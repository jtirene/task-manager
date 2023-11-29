import { z } from 'zod'
import { TaskLists } from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const getAllOwnedByUser = userProcedure
	.input(z.object({ limit: z.number() }))
	.query(async ({ ctx, input }) => {
		return await TaskLists.getAll({
			limit: input.limit,
			ownerId: ctx.user.id,
		})
	})
