import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '../../../functions/src/api/router'

export const trpc = createTRPCReact<AppRouter>()
