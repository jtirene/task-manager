import { relations } from 'drizzle-orm'
import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeUpdated } from '../../util/sql'
import { Tasks } from '../task/task.sql'
import { LIST_NAME_MAX_LENGTH } from './list'

export const Lists = mysqlTable(
	'tm_lists',
	{
		listId: cuid('list_id').notNull(),
		ownerId: cuid('owner_id').notNull(),
		timeCreated,
		timeUpdated,
		name: varchar('name', { length: LIST_NAME_MAX_LENGTH }).notNull(),
	},
	(table) => ({
		primary: primaryKey(table.listId),
	}),
)

export const ListsRelations = relations(Lists, ({ many }) => ({
	tasks: many(Tasks),
}))

export const List = createSelectSchema(Lists)
export const InsertList = createInsertSchema(Lists)
