import { createId } from '@paralleldrive/cuid2'
import { ClerkUserService } from '../../../../../core/src/services/clerk-user'
import { ProfileService } from '../../../../../core/src/services/profile/index'
import { PrivateProcedure } from '../../procedure/private-procedure'

export const Create = PrivateProcedure.mutation(
	async ({
		ctx: {
			user: { sub },
		},
	}) => {
		const clerkUser = await ClerkUserService.GetBySub.execute({
			userSub: sub,
		})
		if (!clerkUser.publicMetadata.userId) {
			let userId = createId()
			try {
				await ProfileService.Create.execute({
					userId,
					userSub: sub,
					email: clerkUser.primaryEmailAddress.emailAddress,
					firstName: clerkUser.firstName,
					profilePicture: clerkUser.imageUrl,
					notificationsEnabled: false,
				})
			} catch (error) {
				const profile = await ProfileService.GetBySub.execute({
					userSub: sub,
				})
				userId = profile.userId
			}
			await ClerkUserService.SetMetadata.execute({ userSub: sub, userId })
		}
	},
)
