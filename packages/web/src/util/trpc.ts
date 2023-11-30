import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '../../../functions/src/api/routes/router'

export const trpc = createTRPCReact<AppRouter>()
