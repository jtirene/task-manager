import { z } from 'zod'
import { InsertProfile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type CreateInput = z.infer<typeof CreateInput>
const CreateInput = InsertProfile

export const Create = createServiceFunction(CreateInput, async (input) => {
	await db.insert(Profiles).values(input)
})
