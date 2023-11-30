import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { AppRouter } from '../routes/router'
import { createContext } from './context'

export const handler = awsLambdaRequestHandler({
	router: AppRouter,
	createContext,
	onError: ({ error, path }) => {
		console.error(error.code, path, error.message, error.stack)
	},
})
