import { Api, StackContext } from 'sst/constructs'

export function API({ stack }: StackContext) {
	const api = new Api(stack, 'api', {
		routes: {
			'GET /trpc/{proxy+}': 'packages/functions/src/trpc.handler',
			'POST /trpc/{proxy+}': 'packages/functions/src/trpc.handler',
		},
	})

	stack.addOutputs({
		ApiEndpoint: api.url,
	})

	return {
		api,
	}
}
