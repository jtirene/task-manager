import { createId } from '@paralleldrive/cuid2'
import { ClerkUserService } from '../../../../../core/src/services/clerk-user-service'
import { privateProcedure } from '../../procedure/private-procedure'
import { UserProfileService } from './../../../../../core/src/services/user-profile-service/index'

export const CreateUserProfile = privateProcedure.mutation(
	async ({
		ctx: {
			user: { sub },
		},
	}) => {
		const clerkUser = await ClerkUserService.GetBySub({
			userSub: sub,
		})
		if (!clerkUser.publicMetadata.userId) {
			let userId = createId()
			try {
				await UserProfileService.CreateUserProfile({
					userId,
					userSub: sub,
					email: clerkUser.primaryEmailAddress.emailAddress,
					firstName: clerkUser.firstName,
					profilePicture: clerkUser.imageUrl,
					notificationsEnabled: false,
				})
			} catch (error) {
				userId = (
					await UserProfileService.GetUserProfileBySub({ userSub: sub })
				).userId
			}
			await ClerkUserService.SetUserIdMetadata({ userSub: sub, userId })
		}
	},
)
