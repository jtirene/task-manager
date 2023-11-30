import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { Profile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type GetByIdInput = z.infer<typeof GetByIdInput>
const GetByIdInput = Profile.pick({
	userId: true,
})

export const GetById = createServiceFunction(GetByIdInput, async (input) => {
	const profile = await db.query.userProfiles.findFirst({
		where: eq(Profiles.userId, input.userId),
	})
	if (!profile) throw new Error(`no profile found for userId: ${input.userId}`)
	return profile
})
