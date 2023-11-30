import { inferRouterOutputs } from '@trpc/server'
import { trpc } from '../util/trpc'
import { List } from './list'
import { Profile } from './profile'

export type AppRouter = typeof AppRouter
export type AppRouterOutputs = inferRouterOutputs<AppRouter>

export const AppRouter = trpc.router({
	List,
	Profile,
})
