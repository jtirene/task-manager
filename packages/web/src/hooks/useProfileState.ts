import { useUser } from '@clerk/clerk-react'

export const useProfileState = () => {
	const { isSignedIn, user } = useUser()

	const isProfileCreated = isSignedIn && user.publicMetadata?.userId

	return {
		isProfileCreated,
	}
}
