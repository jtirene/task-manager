import { clerkClient } from '../../util/clerk'

export async function getClerkUser(userSub: string) {
	const clerkUser = await clerkClient.users.getUser(userSub)

	const primaryEmailAddress = clerkUser.emailAddresses.find(
		(e) => e.id === clerkUser.primaryEmailAddressId,
	)
	if (!primaryEmailAddress)
		throw new Error(`no primary email address found for user: ${userSub}`)

	return {
		...clerkUser,
		primaryEmailAddress,
	}
}

export async function setClerkUserId(userSub: string, userId: string) {
	await clerkClient.users.updateUser(userSub, {
		publicMetadata: {
			userId,
		},
	})
}
