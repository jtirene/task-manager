import { boolean, mysqlTable, unique, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeUpdated } from '../../util/sql'
import {
	PROFILE_EMAIL_MAX_LENGTH,
	PROFILE_FIRST_NAME_MAX_LENGTH,
	PROFILE_PICTURE_MAX_LENGTH,
	PROFILE_USER_SUB_MAX_LENGTH,
} from './profile'

export const Profiles = mysqlTable(
	'tm_profiles',
	{
		userId: cuid('user_id').primaryKey(),
		userSub: varchar('user_sub', {
			length: PROFILE_USER_SUB_MAX_LENGTH,
		}).notNull(),
		timeCreated,
		timeUpdated,
		email: varchar('email', { length: PROFILE_EMAIL_MAX_LENGTH }),
		firstName: varchar('first_name', { length: PROFILE_FIRST_NAME_MAX_LENGTH }),
		profilePicture: varchar('profile_picture', {
			length: PROFILE_PICTURE_MAX_LENGTH,
		}),
		notificationsEnabled: boolean('notifications_enabled').notNull(),
	},
	(table) => ({
		unique: unique().on(table.userSub),
	}),
)

export const Profile = createSelectSchema(Profiles)
export const InsertProfile = createInsertSchema(Profiles)
