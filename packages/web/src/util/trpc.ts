import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from './../../../functions/src/trpc/router'

export const trpc = createTRPCReact<AppRouter>()
