import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { UserProfile, UserProfileTable } from '../../entities/user-profile.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type GetUserProfileBySubInput = z.infer<typeof GetUserProfileBySubInput>
export const GetUserProfileBySubInput = UserProfile.pick({
	userSub: true,
})

export const GetUserProfileBySub = validate(
	GetUserProfileBySubInput,
	async ({ userSub }) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(UserProfileTable.userSub, userSub),
		})
		if (!profile) throw new Error(`no profile found for userSub: ${userSub}`)
		return profile
	},
)
