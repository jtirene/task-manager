import { createId } from '@paralleldrive/cuid2'
import { CreateTaskList, TaskLists } from '../../../../../core/src/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const create = userProcedure
	.input(
		CreateTaskList.pick({
			name: true,
		}),
	)
	.mutation(({ ctx, input }) => {
		TaskLists.create({
			...input,
			ownerId: ctx.user.id,
			listId: createId(),
		})
	})
