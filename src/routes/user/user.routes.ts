import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middlewares'
import UserController from '../../controllers/user/user.controller'

const bloodcenterRoutes = Router()

bloodcenterRoutes.get('/', authMiddleware, UserController.show)

export default bloodcenterRoutes