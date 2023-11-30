import { trpc } from '../util/trpc'
import { createTaskList } from './task-list/create-task-list'
import { deleteTaskList } from './task-list/delete-task-list'
import { getTaskListById } from './task-list/get-task-list-by-id'
import { getTaskListsOwnedByUser } from './task-list/get-task-lists-owned-by-user'
import { updateTaskList } from './task-list/update-task-list'
import { createUserProfile } from './user-profile/create-user-profile'
import { getCurrentUserProfile } from './user-profile/get-current-user-profile'

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	taskList: trpc.router({
		createTaskList,
		deleteTaskList,
		getTaskListById,
		getTaskListsOwnedByUser,
		updateTaskList,
	}),
	userProfile: trpc.router({
		createUserProfile,
		getCurrentUserProfile,
	}),
})
