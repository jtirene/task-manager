import { InsertProfile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const Create = createServiceFunction(InsertProfile, async (input) => {
	await db.insert(Profiles).values(input)
})
