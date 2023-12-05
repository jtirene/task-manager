import { UserProcedure } from '../../../procedure/user-procedure'
import { UpdateTaskInput } from './update-task-input'

export const UpdateTask = UserProcedure.input(UpdateTaskInput).query(
	async () => {},
)
