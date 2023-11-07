import { ClerkProvider } from '@clerk/clerk-react'

type AuthProvider = {
	children: React.ReactNode
}

const publishableKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY

export const AuthProvider = ({ children }: AuthProvider) => {
	return (
		<ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
	)
}
