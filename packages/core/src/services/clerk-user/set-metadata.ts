import { Profile } from '../../entities/profile.sql'
import { clerkClient } from '../../util/clerk'
import { createServiceFunction } from '../../util/service'

const SetMetadataInput = Profile.pick({
	userId: true,
	userSub: true,
})

export const SetMetadata = createServiceFunction(
	SetMetadataInput,
	async ({ userId, userSub }) => {
		await clerkClient.users.updateUser(userSub, {
			publicMetadata: {
				userId,
			},
		})
	},
)
