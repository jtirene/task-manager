import { inferRouterOutputs } from '@trpc/server'
import { trpc } from '../util/trpc'
import { CreateList } from './list/create-list'
import { DeleteList } from './list/delete-list'
import { GetListById } from './list/get-list-by-id'
import { GetListsForCurrentUser } from './list/get-lists-for-current-user'
import { UpdateList } from './list/update-list'
import { CreateProfile } from './profile/create-profile'
import { GetCurrentUserProfile } from './profile/get-current-user-profile'

export type AppRouter = typeof AppRouter
export type AppRouterOutputs = inferRouterOutputs<AppRouter>

export const AppRouter = trpc.router({
	CreateList,
	DeleteList,
	GetListById,
	GetListsForCurrentUser,
	UpdateList,

	CreateProfile,
	GetCurrentUserProfile,
})
