import { z } from 'zod'
import { UserProfile } from '../../entities/user-profile.sql'
import { clerkClient } from '../../util/clerk'
import { validate } from '../../util/zod'

export type SetUserIdMetadataInput = z.infer<typeof SetUserIdMetadataInput>
export const SetUserIdMetadataInput = UserProfile.pick({
	userId: true,
	userSub: true,
})

export const SetUserIdMetadata = validate(
	SetUserIdMetadataInput,
	async ({ userId, userSub }) => {
		await clerkClient.users.updateUser(userSub, {
			publicMetadata: {
				userId,
			},
		})
	},
)
