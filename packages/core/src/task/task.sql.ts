import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const task = mysqlTable('tm_task', {
	name: varchar('name', { length: 255 }).notNull(),
})
