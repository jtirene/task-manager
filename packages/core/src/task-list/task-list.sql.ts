import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { cuid, timeCreated, timeUpdated } from '../sql'

export const taskLists = mysqlTable(
	'tm_task_lists',
	{
		listId: cuid('list_id').notNull(),
		ownerId: cuid('owner_id').notNull(),
		timeCreated,
		timeUpdated,
		name: varchar('name', { length: 255 }).notNull(),
	},
	(table) => ({
		primary: primaryKey(table.listId),
	}),
)
