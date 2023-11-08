import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useProfileState } from '../../hooks/useProfileState'
import { useNavigate } from '../../router'

export default () => {
	const navigate = useNavigate()
	const { isSignedIn } = useUser()
	const { isProfileCreated } = useProfileState()

	useEffect(() => {
		if (!isSignedIn) navigate('/')
		else if (!isProfileCreated) navigate('/profile/create')
	}, [isSignedIn, isProfileCreated])

	return <Outlet />
}
