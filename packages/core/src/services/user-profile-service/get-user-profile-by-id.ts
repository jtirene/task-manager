import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { UserProfile, UserProfileTable } from '../../entities/user-profile.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type GetUserProfileByIdInput = z.infer<typeof GetUserProfileByIdInput>
export const GetUserProfileByIdInput = UserProfile.pick({
	userId: true,
})

export const GetUserProfileById = validate(
	GetUserProfileByIdInput,
	async (input) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(UserProfileTable.userId, input.userId),
		})
		if (!profile)
			throw new Error(`no profile found for userId: ${input.userId}`)
		return profile
	},
)
