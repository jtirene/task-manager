import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { TaskListTable } from '../entities/task-list.sql'
import { TaskTable } from '../entities/task.sql'
import { UserProfileTable } from '../entities/user-profile.sql'
import { DATABASE_PASSWORD, DATABASE_USERNAME } from './config'

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
})

export const db = drizzle(connection, {
	schema: {
		tasks: TaskTable,
		taskLists: TaskListTable,
		userProfiles: UserProfileTable,
	},
})
