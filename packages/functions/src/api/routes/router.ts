import { inferRouterOutputs } from '@trpc/server'
import { trpc } from '../util/trpc'
import { CreateList } from './list/create-list/create-list'
import { DeleteList } from './list/delete-list/delete-list'
import { GetListById } from './list/get-list-by-id/get-list-by-id'
import { GetListsForCurrentUser } from './list/get-lists-for-current-user/get-lists-for-current-user'
import { GetTasksForList } from './list/get-tasks-for-list/get-tasks-for-list'
import { UpdateList } from './list/update-list/update-list'
import { CreateProfile } from './profile/create-profile'
import { GetCurrentUserProfile } from './profile/get-current-user-profile'
import { CreateTask } from './task/create-task/create-task'
import { DeleteTask } from './task/delete-task/delete-task'
import { GetAllTasksForCurrentUser } from './task/get-all-tasks-for-current-user'
import { UpdateTask } from './task/update-task/update-task'

export type AppRouter = typeof AppRouter
export type AppRouterOutputs = inferRouterOutputs<AppRouter>

export const AppRouter = trpc.router({
	CreateList,
	CreateProfile,
	CreateTask,
	DeleteList,
	DeleteTask,
	GetAllTasksForCurrentUser,
	GetCurrentUserProfile,
	GetListById,
	GetListsForCurrentUser,
	GetTasksForList,
	UpdateList,
	UpdateTask,
})
