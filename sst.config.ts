import { SSTConfig } from 'sst'
import { API } from './stacks/api'
import { Auth } from './stacks/auth'
import { Database } from './stacks/database'
import { Site } from './stacks/site'

export default {
	config(_input) {
		return {
			name: 'task-manager',
			region: 'us-east-1',
		}
	},
	stacks(app) {
		app.stack(Auth)
		app.stack(Database)
		app.stack(API)
		app.stack(Site)
	},
} satisfies SSTConfig
