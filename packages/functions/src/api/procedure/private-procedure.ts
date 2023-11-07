import { isAuthenticated } from '../middleware/is-authenticated'
import { publicProcedure } from './public-procedure'

export const privateProcedure = publicProcedure.use(isAuthenticated)
