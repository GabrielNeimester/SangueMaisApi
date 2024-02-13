import { Router } from 'express'

import authMiddleware from '../../middlewares/auth.middlewares'
import questionOptionController from '../../controllers/questionOption/questionOption.controller'


const questionOptionRoutes = Router()

questionOptionRoutes.post('/', authMiddleware,questionOptionController.store)
questionOptionRoutes.get('/byQuestion/:id', questionOptionController.index)
questionOptionRoutes.get('/:id', questionOptionController.show)
questionOptionRoutes.put('/:id', authMiddleware, questionOptionController.update)
questionOptionRoutes.delete('/:id', authMiddleware, questionOptionController.delete)

export default questionOptionRoutes