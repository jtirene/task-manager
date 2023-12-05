import { InsertProfile } from '../../entities/profile/profile.sql'
import { clerkClient } from '../../util/clerk'
import { createServiceFunction } from '../../util/service'

export const SetClerkUserMetadata = createServiceFunction(
	InsertProfile.pick({
		userId: true,
		userSub: true,
	}),
	async ({ userId, userSub }) => {
		await clerkClient.users.updateUser(userSub, {
			publicMetadata: {
				userId,
			},
		})
	},
)
