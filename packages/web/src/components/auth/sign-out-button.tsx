import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-react'

export const SignOutButton = () => {
	const { signOut } = useAuth()

	return (
		<Button variant="ghost" onClick={() => signOut()}>
			Sign out
		</Button>
	)
}
