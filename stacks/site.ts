import { StackContext, StaticSite, use } from 'sst/constructs'
import { API } from './api'

export function Site({ stack }: StackContext) {
	const { api } = use(API)

	const site = new StaticSite(stack, 'react', {
		path: 'packages/web',
		buildOutput: 'dist',
		buildCommand: 'pnpm run build',
		environment: {
			VITE_APP_API_URL: api.url,
		},
	})

	stack.addOutputs({
		SiteURL: site.url || 'http://localhost:5173',
	})

	return {
		site,
	}
}
