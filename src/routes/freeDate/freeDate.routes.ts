import { Router } from 'express'
import FreeDateController from '../../controllers/freeDate/freeDate.controller'
import authMiddleware from '../../middlewares/auth.middlewares'

const freeDateRoutes = Router()

freeDateRoutes.post('/', authMiddleware,FreeDateController.store)
freeDateRoutes.get('/byBloodcenter/:id', FreeDateController.index)
freeDateRoutes.get('/byDateId/:id', FreeDateController.show)
freeDateRoutes.put('/:id', authMiddleware, FreeDateController.update)

export default freeDateRoutes