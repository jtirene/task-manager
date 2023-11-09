export * as UserProfile from './index'

import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'
import { id, zod } from '../zod'
import { userProfiles } from './user-profile.sql'

export type CreateInput = z.infer<typeof CreateInput>
export const CreateInput = createInsertSchema(userProfiles)
export const create = zod(CreateInput, async (input) => {
	await db.transaction(async (tx) => {
		tx.insert(userProfiles).values(input)
	})
})

export type GetInput = z.infer<typeof GetInput>
export const GetInput = z.object({ userSub: id() })
export const get = zod(GetInput, async (input) => {
	return db.query.userProfiles.findFirst({
		where: eq(userProfiles.userSub, input.userSub),
	})
})
