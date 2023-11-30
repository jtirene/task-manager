import { TaskListService } from '../../../../../core/src/services/task-list-service'
import { CreateTaskListInput as SvcCreateTaskListInput } from '../../../../../core/src/services/task-list-service/create-task-list'
import { userProcedure } from '../../procedure/user-procedure'

export const CreateTaskListInput = SvcCreateTaskListInput.pick({
	listId: true,
	name: true,
})

export const CreateTaskList = userProcedure.input(CreateTaskListInput).mutation(
	async ({
		ctx: {
			user: { id },
		},
		input: { listId, name },
	}) => {
		await TaskListService.CreateTaskList({
			listId,
			ownerId: id,
			name,
		})
	},
)
