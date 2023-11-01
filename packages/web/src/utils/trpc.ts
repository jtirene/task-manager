import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../core/src/trpc'

export const trpc = createTRPCReact<AppRouter>()
