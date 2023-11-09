import { sql } from 'drizzle-orm'
import { char, timestamp } from 'drizzle-orm/mysql-core'

export const cuid = (name: string) => char(name, { length: 24 })

export const timeCreated = timestamp('time_created', {
	mode: 'string',
})
	.notNull()
	.default(sql`CURRENT_TIMESTAMP`)

export const timeUpdated = timestamp('time_updated', {
	mode: 'string',
})
	.notNull()
	.default(sql`CURRENT_TIMESTAMP`)
	.onUpdateNow()

export const timeDeleted = timestamp('time_deleted', {
	mode: 'string',
})
