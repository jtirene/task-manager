import {
	CreateTaskList,
	TaskLists,
} from '../../../../../core/src/services/task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const createTaskList = userProcedure
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
		})
	})
