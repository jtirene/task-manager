import { boolean, mysqlTable, unique, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeUpdated } from '../util/sql'

export const Profiles = mysqlTable(
	'tm_profiles',
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

export const Profile = createSelectSchema(Profiles)
export const InsertProfile = createInsertSchema(Profiles)
