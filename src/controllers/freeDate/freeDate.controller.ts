import { Request, Response } from 'express'
import Free_Date from '../../models/freeDate.entity'


export default class FreeDateController {
    static async store(req: Request, res: Response) {
        const { date, bloodcenter, user} = req.body

        if (!date || !bloodcenter || !user) {
            return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
        }

        const free_date= new Free_Date()
        free_date.date = date
        free_date.bloodcenter = bloodcenter
        free_date.user = user
        await free_date.save()

        return res.status(201).json(bloodcenter)
    }

    static async index(req: Request, res: Response) {

        const free_date = await Free_Date.find()
        return res.json(free_date)
    }

    static async show (req: Request, res: Response) {
        const { id } = req.params
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const free_date = await Free_Date.findOneBy({id_date: Number(id)})
        return res.json(free_date)
      }

      static async delete (req: Request, res: Response) {
        const { id } = req.params

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const free_date= await Free_Date.findOneBy({id_date: Number(id)})
        if (!free_date) {
          return res.status(404).json({ error: 'Hemocentro não encontrado' })
        }
    
        await free_date.remove()
        return res.status(204).json()
      }


    static async update (req: Request, res: Response) {
        const { id } = req.params
        const {date, bloodcenter, user } = req.body

    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const free_date = await Free_Date.findOneBy({id_date: Number(id)})
        if (!free_date) {
          return res.status(404).json({ error: 'Hemocentro não encontrado' })
        }
    

        free_date.date = date
        free_date.bloodcenter = bloodcenter
        free_date.user = user
        await free_date.save()
        return res.json(free_date)
      }
}