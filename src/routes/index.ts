import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import bloodcenterRoutes from './bloodcenter/bloodcenter.routes'
import freeDateRoutes from './freeDate/freeDate.routes'
import dateHourRoutes from './dateHour/dateHour.routes'

const routes = Router()

routes.use('/bloodcenter', bloodcenterRoutes)
routes.use('/auth', authRoutes)
routes.use('/freedate', freeDateRoutes)
routes.use('/dateHour', dateHourRoutes)

export default routes