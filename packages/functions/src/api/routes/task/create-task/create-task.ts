import { CreateTaskInput } from './create-task-input'
import { UserProcedure } from '../../../procedure/user-procedure'

export const CreateTask = UserProcedure.input(CreateTaskInput).query(
	async () => {},
)
