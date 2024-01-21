import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import bloodcenterRoutes from './bloodcenter/bloodcenter.routes'

const routes = Router()

routes.use('/bloodcenter', bloodcenterRoutes)
routes.use('/auth', authRoutes)

export default routes