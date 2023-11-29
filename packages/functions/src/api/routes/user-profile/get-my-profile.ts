import { UserProfile } from '../../../../../core/src/services/user-profile'
import { userProcedure } from '../../procedure/user-procedure'

export const getMyProfile = userProcedure.query(async ({ ctx }) => {
	return await UserProfile.getById({ userId: ctx.user.id })
})
