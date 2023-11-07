import { StackContext, StaticSite, use } from 'sst/constructs'
import { API } from './api'
import { Auth } from './auth'

export function Site({ stack }: StackContext) {
	const { api } = use(API)
	const { CLERK_PUBLISHABLE_KEY } = use(Auth)

	const site = new StaticSite(stack, 'react', {
		path: 'packages/web',
		buildOutput: 'dist',
		buildCommand: 'pnpm run build',
		environment: {
			VITE_APP_API_URL: api.url,
			VITE_APP_CLERK_PUBLISHABLE_KEY: CLERK_PUBLISHABLE_KEY.value,
		},
	})

	stack.addOutputs({
		SiteURL: site.url || 'http://localhost:5173',
	})

	return {
		site,
	}
}
