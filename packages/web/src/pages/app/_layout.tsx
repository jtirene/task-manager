import { useUser } from '@clerk/clerk-react'
import { useProfileState } from '../../hooks/useProfileState'
import { Navigate } from '../../router'
import { MainContent } from './_components/layout/main-content'
import { SidebarContent } from './_components/layout/sidebar-content'

export default () => {
	const { isLoaded, isSignedIn } = useUser()
	const { isProfileCreated } = useProfileState()

	if (!isLoaded) return null
	if (!isSignedIn) return <Navigate to="/" />
	if (!isProfileCreated) return <Navigate to="/profile/create" />

	return (
		<div className="h-screen flex">
			<div className="w-1/5">
				<SidebarContent />
			</div>
			<div className="flex-1">
				<MainContent />
			</div>
		</div>
	)
}
