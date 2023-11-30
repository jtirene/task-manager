import { trpc } from '../util/trpc'
import { CreateTaskList } from './task-list/create-task-list'
import { DeleteTaskList } from './task-list/delete-task-list'
import { GetTaskListById } from './task-list/get-task-list-by-id'
import { GetTaskListsOwnedByUser } from './task-list/get-task-lists-owned-by-user'
import { UpdateTaskList } from './task-list/update-task-list'
import { CreateUserProfile } from './user-profile/create-user-profile'
import { GetCurrentUserProfile } from './user-profile/get-current-user-profile'

export type AppRouter = typeof AppRouter
export const AppRouter = trpc.router({
	// Task List
	CreateTaskList,
	DeleteTaskList,
	GetTaskListById,
	GetTaskListsOwnedByUser,
	UpdateTaskList,

	// User Profile
	CreateUserProfile,
	GetCurrentUserProfile,
})
