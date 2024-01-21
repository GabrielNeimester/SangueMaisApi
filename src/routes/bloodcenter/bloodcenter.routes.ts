import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middlewares'
import BloodcenterController from '../../controllers/bloodcenter/bloodcenter.controller'

const bloodcenterRoutes = Router()


bloodcenterRoutes.get('/', BloodcenterController.index)
bloodcenterRoutes.get('/:id', BloodcenterController.show)
bloodcenterRoutes.post('/', BloodcenterController.store)
bloodcenterRoutes.put('/:id', BloodcenterController.update)
bloodcenterRoutes.delete('/:id', BloodcenterController.delete)


export default bloodcenterRoutes