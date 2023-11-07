import { Api, StackContext, use } from 'sst/constructs'
import { Auth } from './auth'
import { Database } from './database'

export function API({ stack }: StackContext) {
	const { CLERK_PUBLIC_KEY } = use(Auth)
	const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = use(Database)

	const api = new Api(stack, 'api', {
		routes: {
			'GET /trpc/{proxy+}': 'packages/functions/src/api/handler.handler',
			'POST /trpc/{proxy+}': 'packages/functions/src/api/handler.handler',
		},
		defaults: {
			function: {
				bind: [
					DATABASE_NAME,
					DATABASE_USERNAME,
					DATABASE_PASSWORD,
					CLERK_PUBLIC_KEY,
				],
				runtime: 'nodejs18.x',
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
