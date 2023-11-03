import { initTRPC } from '@trpc/server'
import { Context } from './context'

export const trpc = initTRPC.context<Context>().create()

export const publicProcedure = trpc.procedure

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	getUser: publicProcedure.query(() => {
		return { name: 'Bilbo' }
	}),
})
