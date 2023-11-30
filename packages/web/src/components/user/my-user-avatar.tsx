import { trpc } from '../../util/trpc'
import { UserAvatar } from './user-avatar'

export const MyUserAvatar = () => {
	const { data } = trpc.Profile.GetCurrentUserProfile.useQuery()
	return data ? (
		<UserAvatar
			imageSrc={data.profilePicture || undefined}
			imageFallback={undefined}
		/>
	) : null
}
