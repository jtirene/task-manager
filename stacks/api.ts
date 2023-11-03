import { Api, StackContext, use } from 'sst/constructs'
import { Database } from './database'

export function API({ stack }: StackContext) {
	const { DATABASE_USERNAME, DATABASE_PASSWORD } = use(Database)

	const api = new Api(stack, 'api', {
		routes: {
			'GET /trpc/{proxy+}': 'packages/functions/src/trpc.handler',
			'POST /trpc/{proxy+}': 'packages/functions/src/trpc.handler',
		},
		defaults: {
			function: {
				bind: [DATABASE_USERNAME, DATABASE_PASSWORD],
			},
		},
	})

	stack.addOutputs({
		ApiEndpoint: api.url,
	})

	return {
		api,
	}
}
