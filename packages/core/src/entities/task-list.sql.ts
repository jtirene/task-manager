import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeUpdated } from '../util/sql'

export const TaskListTable = mysqlTable(
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

export const TaskList = createSelectSchema(TaskListTable)
export const InsertTaskList = createInsertSchema(TaskListTable)
