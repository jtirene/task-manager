import { eq } from 'drizzle-orm'
import { Profile, Profiles } from '../../entities/profile.sql'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

export const GetBySub = createServiceFunction(
	Profile.pick({
		userSub: true,
	}),
	async ({ userSub }) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(Profiles.userSub, userSub),
		})
		if (!profile) throw new Error(`no profile found for userSub: ${userSub}`)
		return profile
	},
)
