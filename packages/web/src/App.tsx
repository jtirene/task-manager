import { Routes } from '@generouted/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './util/trpc'

function App() {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${import.meta.env.VITE_APP_API_URL}/trpc`,
					async headers() {
						return {
							// TODO include authorization header
							// authorization: getAuthCookie(),
						}
					},
				}),
			],
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Routes />
			</QueryClientProvider>
		</trpc.Provider>
	)
}

export default App
