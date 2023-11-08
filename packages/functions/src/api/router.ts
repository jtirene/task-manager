import { taskList } from './routes/task-list'
import { userProfile } from './routes/user-profile'
import { trpc } from './trpc'

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	taskList,
	userProfile,
})
