import { eq } from 'drizzle-orm'
import { InsertList, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const Update = createServiceFunction(
	InsertList.pick({
		listId: true,
		name: true,
	}),
	async ({ listId, name }) => {
		await db.update(Lists).set({ name }).where(eq(Lists.listId, listId))
	},
)
