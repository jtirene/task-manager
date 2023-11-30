import { UserProfileService } from '../../../../../core/src/services/user-profile-service'
import { userProcedure } from '../../procedure/user-procedure'

export const GetCurrentUserProfile = userProcedure.query(
	async ({
		ctx: {
			user: { id },
		},
	}) => {
		return await UserProfileService.GetUserProfileById({ userId: id })
	},
)
