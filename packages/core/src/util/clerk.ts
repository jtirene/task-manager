import Clerk from '@clerk/clerk-sdk-node/esm/instance'
import { CLERK_SECRET_KEY } from '../../../functions/src/api/util/config'

export const clerkClient = Clerk({
	secretKey: CLERK_SECRET_KEY,
})
