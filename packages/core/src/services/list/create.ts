import { InsertList, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const Create = createServiceFunction(
	InsertList.pick({
		listId: true,
		ownerId: true,
		name: true,
	}),
	async (input) => {
		await db.insert(Lists).values(input)
	},
)
