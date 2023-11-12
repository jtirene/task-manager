import { trpc } from '../../util/trpc'
import { UserAvatar } from './user-avatar'

export const MyUserAvatar = () => {
	const { data } = trpc.userProfile.getMyProfile.useQuery()
	return data ? (
		<UserAvatar
			imageSrc={data.profilePicture || undefined}
			imageFallback={undefined}
		/>
	) : null
}
