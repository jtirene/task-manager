import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { DATABASE_PASSWORD, DATABASE_USERNAME } from './config'
import { taskLists } from './task-list/task-list.sql'
import { tasks } from './task/task.sql'
import { userProfiles } from './user-profile/user-profile.sql'

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
