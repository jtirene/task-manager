import { Profile } from '../../entities/profile.sql'
import { clerkClient } from '../../util/clerk'
import { createServiceFunction } from '../../util/service'

export const SetMetadata = createServiceFunction(
	Profile.pick({
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
