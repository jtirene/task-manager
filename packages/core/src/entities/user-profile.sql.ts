import { boolean, mysqlTable, unique, varchar } from 'drizzle-orm/mysql-core'
import { cuid, timeCreated, timeUpdated } from '../util/sql'

export const userProfiles = mysqlTable(
	'tm_user_profiles',
	{
		userId: cuid('user_id').primaryKey(),
		userSub: varchar('user_sub', { length: 256 }).notNull(),
		timeCreated,
		timeUpdated,
		email: varchar('email', { length: 320 }),
		firstName: varchar('first_name', { length: 256 }),
		profilePicture: varchar('profile_picture', { length: 2048 }),
		notificationsEnabled: boolean('notifications_enabled').notNull(),
	},
	(table) => ({
		unique: unique().on(table.userSub),
	}),
)
