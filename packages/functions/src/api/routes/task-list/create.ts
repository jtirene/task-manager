import { createId } from '@paralleldrive/cuid2'
import { CreateTaskList, TaskLists } from '../../../../../core/src/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const create = userProcedure
	.input(
		CreateTaskList.pick({
			listId: true,
			name: true,
		}),
	)
	.mutation(async ({ ctx, input }) => {
		await TaskLists.create({
			...input,
			ownerId: ctx.user.id,
			listId: createId(),
		})
	})
