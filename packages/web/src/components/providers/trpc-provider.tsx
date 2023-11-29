import { useAuth } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { ReactNode, useState } from 'react'
import { trpc } from '../../util/trpc'

type TRPCProvider = {
	children: ReactNode
}

export const TRPCProvider = ({ children }: TRPCProvider) => {
	const { getToken } = useAuth()

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 1000 * 60 * 5,
					},
				},
			}),
	)
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${import.meta.env.VITE_APP_API_URL}/trpc`,
					async headers() {
						const token = await getToken()
						return {
							...(token && { Authorization: `Bearer ${token}` }),
						}
					},
				}),
			],
		}),
	)

	return (
		// https://github.com/TanStack/query/issues/6186
		// @ts-ignore
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
			</QueryClientProvider>
		</trpc.Provider>
	)
}
