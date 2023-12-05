import { UserProcedure } from '../../../procedure/user-procedure'
import { GetTasksForListInput } from './get-tasks-for-list-input'

export const GetTasksForList = UserProcedure.input(GetTasksForListInput).query(
	async () => {},
)
