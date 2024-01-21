import { Request, Response } from 'express'
import User from '../../models/user.entity'

export default class UserController {
    
    static async show (req: Request, res: Response) {
        const { id } = req.params
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
        
        const user = await User.findOneBy({id: Number(id)})
        return res.json(user)
      }
      
}