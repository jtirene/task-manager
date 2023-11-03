import { inferAsyncReturnType } from '@trpc/server'
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

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
