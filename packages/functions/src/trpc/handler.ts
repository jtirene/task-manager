import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { createContext } from './context'
import { appRouter } from './router'

export const handler = awsLambdaRequestHandler({
	router: appRouter,
	createContext,
	onError: ({ error, path }) => {
		console.error(error.code, path, error.message, error.stack)
	},
})
