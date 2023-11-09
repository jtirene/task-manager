export * as UserProfile from './index'

import { eq } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'
import { zod } from '../zod'
import { userProfiles } from './user-profile.sql'

export type CreateInput = z.infer<typeof CreateInput>
export const CreateInput = createInsertSchema(userProfiles)
export const create = zod(CreateInput, async (input) => {
	await db.insert(userProfiles).values(input)
})

export type GetInput = z.infer<typeof GetInput>
export const GetInput = createSelectSchema(userProfiles).pick({
	userSub: true,
})
export const get = zod(GetInput, async (input) => {
	return await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userSub, input.userSub),
	})
})
