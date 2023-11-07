import { Routes } from '@generouted/react-router'
import { ThemeProvider } from './components/theme/theme-provider'
import { TRPCProvider } from './components/trpc-provider'

export const App = () => {
	return (
		<TRPCProvider>
			<ThemeProvider>
				<Routes />
			</ThemeProvider>
		</TRPCProvider>
	)
}
