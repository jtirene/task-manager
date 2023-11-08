import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { trpc } from '../../util/trpc'

export default () => {
	const navigate = useNavigate()
	const { user } = useUser()
	const create = trpc.userProfile.create.useMutation()

	return (
		<div>
			<div>CreateProfile</div>
			{create.isLoading && <div>Creating...</div>}
			<Button
				onClick={() => {
					create.mutate(undefined, {
						onSuccess: async () => {
							await user?.reload()
							navigate('/app')
						},
					})
				}}
			>
				Create
			</Button>
		</div>
	)
}
