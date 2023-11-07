import { privateProcedure } from './procedure/private-procedure'
import { publicProcedure } from './procedure/public-procedure'
import { taskList } from './routes/task-list'
import { trpc } from './trpc'

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	taskList,
	privateTest: privateProcedure.query(() => {
		return { message: 'Hello from a private procedure!' }
	}),
	publicTest: publicProcedure.query(() => {
		return { message: 'Hello from a public procedure!' }
	}),
})
