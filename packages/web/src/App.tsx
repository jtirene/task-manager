import { Routes } from '@generouted/react-router'
import { AuthProvider } from './components/providers/auth-provider'
import { TRPCProvider } from './components/providers/trpc-provider'
import { ThemeProvider } from './components/theme/theme-provider'

export const App = () => {
	return (
		<ThemeProvider>
			<AuthProvider>
				<TRPCProvider>
					<Routes />
				</TRPCProvider>
			</AuthProvider>
		</ThemeProvider>
	)
}
