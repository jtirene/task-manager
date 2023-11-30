import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { Lists } from '../entities/list.sql.js'
import { Profiles } from '../entities/profile.sql'
import { Tasks } from '../entities/task.sql'
import { DATABASE_PASSWORD, DATABASE_USERNAME } from './config'

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
})

export const db = drizzle(connection, {
	schema: {
		tasks: Tasks,
		taskLists: Lists,
		userProfiles: Profiles,
	},
})
