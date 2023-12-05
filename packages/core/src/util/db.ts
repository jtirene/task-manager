import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { Lists, ListsRelations } from '../entities/list/list.sql.js'
import { Profiles } from '../entities/profile/profile.sql.js'
import { Tasks, TasksRelations } from '../entities/task/task.sql.js'
import { DATABASE_PASSWORD, DATABASE_USERNAME } from './config'

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
})

export const db = drizzle(connection, {
	schema: {
		Tasks,
		TasksRelations,
		Lists,
		ListsRelations,
		Profiles,
	},
})
