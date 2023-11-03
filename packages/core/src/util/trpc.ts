import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

export const trpc = initTRPC.context<Context>().create()

export type Context = inferAsyncReturnType<typeof createContext>
export const createContext = ({
	event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
	return {
		auth: {
			token: event.headers.authorization?.split(' ')[1] ?? null,
		},
	}
}

export const publicProcedure = trpc.procedure

export type AppRouter = typeof appRouter
export const appRouter = trpc.router({
	getUser: publicProcedure.query(() => {
		return { name: 'Bilbo' }
	}),
})
