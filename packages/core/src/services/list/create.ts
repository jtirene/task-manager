import { InsertList, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

const CreateInput = InsertList.pick({
	listId: true,
	ownerId: true,
	name: true,
})

export const Create = createServiceFunction(CreateInput, async (input) => {
	await db.insert(Lists).values(input)
})
