import { Router } from 'express'

import authMiddleware from '../../middlewares/auth.middlewares'
import CustomQuestionController from '../../controllers/customQuestion/customQuestion.controller'

const customQuestionRoutes = Router()

customQuestionRoutes.post('/', authMiddleware,CustomQuestionController.store)
customQuestionRoutes.get('/byBloodcenter/:id', CustomQuestionController.index)
customQuestionRoutes.get('/:id', CustomQuestionController.show)
customQuestionRoutes.put('/:id', authMiddleware, CustomQuestionController.update)
customQuestionRoutes.delete('/:id', authMiddleware, CustomQuestionController.delete)

export default customQuestionRoutes