export * as UserProfile from './index'

import { eq } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { userProfiles } from '../../entities/user-profile.sql'
import { db } from '../../util/db'
import { zod } from '../../util/zod'

export type CreateInput = z.infer<typeof CreateInput>
export const CreateInput = createInsertSchema(userProfiles)
export const create = zod(CreateInput, async (input) => {
	await db.insert(userProfiles).values(input)
})

export type GetBySubInput = z.infer<typeof GetBySubInput>
export const GetBySubInput = createSelectSchema(userProfiles).pick({
	userSub: true,
})
export const getBySub = zod(GetBySubInput, async (input) => {
	const profile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userSub, input.userSub),
	})
	if (!profile)
		throw new Error(`no profile found for userSub: ${input.userSub}`)
	return profile
})

export type GetByIdInput = z.infer<typeof GetByIdInput>
export const GetByIdInput = createSelectSchema(userProfiles).pick({
	userId: true,
})
export const getById = zod(GetByIdInput, async (input) => {
	const profile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userId, input.userId),
	})
	if (!profile) throw new Error(`no profile found for userId: ${input.userId}`)
	return profile
})
