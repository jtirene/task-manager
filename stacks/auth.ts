import { Config, StackContext } from 'sst/constructs'

export function Auth({ stack }: StackContext) {
	const CLERK_PUBLISHABLE_KEY = new Config.Parameter(
		stack,
		'CLERK_PUBLISHABLE_KEY',
		{
			value: 'pk_test_Z29vZC1ob3JuZXQtMzcuY2xlcmsuYWNjb3VudHMuZGV2JA',
		}
	)

	return {
		CLERK_PUBLISHABLE_KEY,
	}
}
