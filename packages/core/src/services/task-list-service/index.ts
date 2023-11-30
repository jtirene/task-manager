import { CreateTaskList } from './create-task-list'
import { DeleteTaskList } from './delete-task-list'
import { GetAllTaskListsOwnedByUser } from './get-all-task-lists'
import { GetTaskListById } from './get-task-list-by-id'
import { UpdateTaskList } from './update-task-list'

export const TaskListService = {
	CreateTaskList,
	DeleteTaskList,
	GetAllTaskListsOwnedByUser,
	GetTaskListById,
	UpdateTaskList,
}
