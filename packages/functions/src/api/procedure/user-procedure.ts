import { isUser } from '../middleware/is-user'
import { publicProcedure } from './public-procedure'

export const userProcedure = publicProcedure.use(isUser)
