import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { appRouter, createContext } from '../../core/src/trpc'

export const handler = awsLambdaRequestHandler({
	router: appRouter,
	createContext,
	onError: ({ error, path }) => {
		console.error(error.code, path, error.message, error.stack)
	},
})
