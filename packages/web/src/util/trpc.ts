import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../core/src/util/trpc'

export const trpc = createTRPCReact<AppRouter>()
