import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { Profile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type GetBySubInput = z.infer<typeof GetBySubInput>
const GetBySubInput = Profile.pick({
	userSub: true,
})

export const GetBySub = createServiceFunction(
	GetBySubInput,
	async ({ userSub }) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(Profiles.userSub, userSub),
		})
		if (!profile) throw new Error(`no profile found for userSub: ${userSub}`)
		return profile
	},
)
