import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import bloodcenterRoutes from './bloodcenter/bloodcenter.routes'
import freeDateRoutes from './freeDate/freeDate.routes'
import dateHourRoutes from './dateHour/dateHour.routes'
import customQuestionRoutes from './customQuestion/customQuestion.routes'
import questionOptionRoutes from './questionOption/questionOption.routes'

const routes = Router()

routes.use('/bloodcenter', bloodcenterRoutes)
routes.use('/auth', authRoutes)
routes.use('/freedate', freeDateRoutes)
routes.use('/dateHour', dateHourRoutes)
routes.use('/customQuestion', customQuestionRoutes)
routes.use('/questionOption', questionOptionRoutes)

export default routes