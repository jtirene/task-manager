import { UserProfile } from '../../../../../core/src/services/user-profile'
import { userProcedure } from '../../procedure/user-procedure'

export const GetCurrentUserProfile = userProcedure.query(
	async ({ ctx: { user } }) => {
		return await UserProfile.getById({ userId: user.id })
	},
)
