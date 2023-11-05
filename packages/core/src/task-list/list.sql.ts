import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { cuid, timestamps } from '../util/sql'

export const taskLists = mysqlTable(
	'tm_task_lists',
	{
		listId: cuid('list_id').notNull(),
		ownerId: cuid('owner_id').notNull(),
		...timestamps,
		name: varchar('name', { length: 255 }).notNull(),
	},
	(table) => ({
		primary: primaryKey(table.listId),
	})
)
