import { eq } from 'drizzle-orm'
import { Profile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const GetById = createServiceFunction(
	Profile.pick({
		userId: true,
	}),
	async (input) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(Profiles.userId, input.userId),
		})
		if (!profile)
			throw new Error(`no profile found for userId: ${input.userId}`)
		return profile
	},
)
