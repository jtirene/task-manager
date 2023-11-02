import { trpc } from './util/trpc'

export const GetUser = () => {
	const getUser = trpc.getUser.useQuery()
	return getUser.data ? <p>{getUser.data.name}</p> : null
}
