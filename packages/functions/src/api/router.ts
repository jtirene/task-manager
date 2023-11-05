import { publicProcedure } from './procedures'
import { taskList } from './routes/task-list'
import { trpc } from './trpc'

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	getUser: publicProcedure.query(() => {
		return { name: 'Bilbo' }
	}),
	taskList,
})
