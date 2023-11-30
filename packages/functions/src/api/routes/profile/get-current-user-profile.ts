import { ProfileService } from '../../../../../core/src/services/profile'
import { UserProcedure } from '../../procedure/user-procedure'

export const GetCurrentUserProfile = UserProcedure.query(
	async ({
		ctx: {
			user: { id },
		},
	}) => {
		return await ProfileService.GetById.execute({ userId: id })
	},
)
