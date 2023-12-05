import { UserProcedure } from '../../../procedure/user-procedure'
import { CreateTaskInput } from './create-task-input'

export const CreateTask = UserProcedure.input(CreateTaskInput).query(
	async ({
		ctx,
		input: {
			taskId,
			listId,
			title,
			description,
			priority,
			dateStart,
			dateEnd,
			recurrenceRule,
			dateRecurrenceEnd,
		},
	}) => {},
)
