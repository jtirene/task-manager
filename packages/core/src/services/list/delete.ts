import { eq } from 'drizzle-orm'
import { List, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const Delete = createServiceFunction(
	List.pick({
		listId: true,
	}),
	async ({ listId }) => {
		await db.delete(Lists).where(eq(Lists.listId, listId))
	},
)
