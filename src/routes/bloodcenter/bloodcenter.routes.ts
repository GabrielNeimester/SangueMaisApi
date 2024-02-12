import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middlewares'
import BloodcenterController from '../../controllers/bloodcenter/bloodcenter.controller'

const bloodcenterRoutes = Router()


bloodcenterRoutes.get('/', BloodcenterController.index)
bloodcenterRoutes.get('/getById/:id', BloodcenterController.show)
bloodcenterRoutes.get('/getByUser/', authMiddleware, BloodcenterController.showByUserId)
bloodcenterRoutes.post('/', authMiddleware, BloodcenterController.store)
bloodcenterRoutes.put('/:id', authMiddleware,BloodcenterController.update)


export default bloodcenterRoutes