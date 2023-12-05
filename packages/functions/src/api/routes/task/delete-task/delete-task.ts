import { UserProcedure } from '../../../procedure/user-procedure'
import { DeleteTaskInput } from './delete-task-input'

export const DeleteTask = UserProcedure.input(DeleteTaskInput).query(
	async () => {},
)
