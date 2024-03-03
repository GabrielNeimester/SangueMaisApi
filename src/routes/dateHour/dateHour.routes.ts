import { Router } from 'express'

import authMiddleware from '../../middlewares/auth.middlewares'
import DateHourController from '../../controllers/dateHour/dateHour.controller'

const dateHourRoutes = Router()

dateHourRoutes.post('/', authMiddleware,DateHourController.store)
dateHourRoutes.get('/byFreeDate/:id', DateHourController.index)
dateHourRoutes.get('/activeByFreeDate/:id', DateHourController.indexActive)
dateHourRoutes.get('/byHour/:id', DateHourController.show)
dateHourRoutes.put('/:id', authMiddleware, DateHourController.update)

export default dateHourRoutes