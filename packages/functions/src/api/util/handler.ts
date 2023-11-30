import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { appRouter } from '../routes/router'
import { createContext } from './context'

export const handler = awsLambdaRequestHandler({
	router: appRouter,
	createContext,
	onError: ({ error, path }) => {
		console.error(error.code, path, error.message, error.stack)
	},
})
