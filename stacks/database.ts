import { Config, StackContext } from 'sst/constructs'

export function Database({ stack }: StackContext) {
	const DATABASE_USERNAME = new Config.Secret(stack, 'DATABASE_USERNAME')
	const DATABASE_PASSWORD = new Config.Secret(stack, 'DATABASE_PASSWORD')

	return {
		DATABASE_USERNAME,
		DATABASE_PASSWORD,
	}
}
