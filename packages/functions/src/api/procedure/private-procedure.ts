import { isAuthenticated } from '../middleware/is-authenticated'
import { PublicProcedure } from './public-procedure'

export const PrivateProcedure = PublicProcedure.use(isAuthenticated)
