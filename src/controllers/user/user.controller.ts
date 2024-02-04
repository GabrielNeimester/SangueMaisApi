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
      
      static async index(req: Request, res: Response) {

        const { userId } = req.headers
        try {
          
          const userRole = await User.findOneBy({ id: Number(userId) });

         
          if (!userRole) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Access the user's role
          if(userRole.role ==='Adm'){

            const user = await User.find()
            return res.json(user)

          }
          else{
            return res.status(401).json({ error: 'Acesso não autorizado' });
          }
    

        } catch (error) {
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }



    }
}

