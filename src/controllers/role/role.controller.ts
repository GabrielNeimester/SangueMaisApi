import { Request, Response } from 'express'
import Role from '../../models/role.entity'

export default class RoleController {
    
    static async show (req: Request, res: Response) {
        const { id } = req.params
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
        
        const role = await Role.findOneBy({id_role: Number(id)})
        return res.json(role)
      }
      
}