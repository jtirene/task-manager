import { trpc } from '../../util/trpc'
import { Create } from './create'
import { GetCurrentUserProfile } from './get-current-user-profile'

export const Profile = trpc.router({
	Create,
	GetCurrentUserProfile,
})
