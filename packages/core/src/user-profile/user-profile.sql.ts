import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { cuid } from '../sql'
import { timeCreated, timeUpdated } from './../sql'

export const userProfiles = mysqlTable(
	'tm_user_profiles',
	{
		userId: cuid('user_id').notNull(),
		userSub: varchar('user_sub', { length: 256 }).notNull(),
		timeCreated,
		timeUpdated,
	},
	(table) => ({
		primary: table.userId,
		unique: [[table.userSub]],
	})
)
