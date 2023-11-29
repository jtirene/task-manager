import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { taskLists } from '../entities/task-list.sql'
import { tasks } from '../entities/task.sql'
import { userProfiles } from '../entities/user-profile.sql'
import { DATABASE_PASSWORD, DATABASE_USERNAME } from './config'

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
})

export const db = drizzle(connection, {
	schema: {
		tasks,
		taskLists,
		userProfiles,
	},
})
