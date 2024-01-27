import { Request, Response } from 'express'
import User from '../../models/user.entity'
import DateHour from '../../models/dateHour.entity'

export default class DateHourController {
    static async store(req: Request, res: Response) {
        const { start_hour, finish_hour, spaces} = req.body
        const { userId } = req.headers


        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!start_hour || !finish_hour || !spaces ) {
            return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
        }


        try {
          // Find the user by ID
          const user = await User.findOneBy({ id: Number(userId) });
    
          if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Access the user's role
          if(user.role ==='Adm'){

            const date_hour = new DateHour();
            date_hour.start_hour
            date_hour.finish_hour = finish_hour;
            date_hour.spaces = spaces;
            date_hour.userId = Number(userId)
 
            await date_hour.save();
      
            return res.status(201).json({ date_hour});

          }
          else{
            return res.status(501).json({ error: 'Acesso não autorizado' });
          }
    

        } catch (error) {
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }

    

    static async index(req: Request, res: Response) {

        const date_hour = await DateHour.find()
        return res.json(date_hour)
    }

    static async show (req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const date_hour = await DateHour.findOneBy({id_date_hour: Number(id)})
        return res.json(date_hour)
      }

      static async delete (req: Request, res: Response) {
        const { id } = req.params

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const date_hour = await DateHour.findOneBy({id_date_hour: Number(id)})
        if (!date_hour) {
          return res.status(404).json({ error: 'Horario não disponível' })
        }
    
        await date_hour.remove()
        return res.status(204).json()
      }


    static async update (req: Request, res: Response) {
        const { id } = req.params
        const { start_hour, finish_hour, spaces} = req.body
        const { userId } = req.headers

    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const date_hour = await DateHour.findOneBy({id_date_hour: Number(id)})
        if (!date_hour) {
          return res.status(404).json({ error: 'Horario não disponível' })
        }
    

        date_hour.start_hour
        date_hour.finish_hour = finish_hour;
        date_hour.spaces = spaces;
        date_hour.userId = Number(userId)

        await date_hour.save();
    
        return res.json(date_hour)
      }
}