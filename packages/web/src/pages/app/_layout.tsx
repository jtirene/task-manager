import { useUser } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { useProfileState } from '../../hooks/useProfileState'
import { Navigate } from '../../router'

export default () => {
	const { isLoaded, isSignedIn } = useUser()
	const { isProfileCreated } = useProfileState()

	if (!isLoaded) return null
	if (!isSignedIn) return <Navigate to="/" />
	if (!isProfileCreated) return <Navigate to="/profile/create" />

	return <Outlet />
}
