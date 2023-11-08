import Clerk from '@clerk/clerk-sdk-node/esm/instance'
import { CLERK_SECRET_KEY } from './config'

export const clerkClient = Clerk({
	secretKey: CLERK_SECRET_KEY,
})
