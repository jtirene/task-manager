import { WebhookEvent } from '@clerk/clerk-sdk-node'
import { ApiHandler } from 'sst/node/api'

export const handler = ApiHandler(async (event) => {
	const webhookEvent = JSON.parse(event.body || '{}') as WebhookEvent
	console.log('user created webhookEvent', webhookEvent)
	return {
		statusCode: 200,
	}
})
