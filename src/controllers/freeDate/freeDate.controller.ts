import { Request, Response } from 'express'
import Free_Date from '../../models/freeDate.entity'
import Bloodcenter from '../../models/bloodcenter.entity';
import User from '../../models/user.entity';
import DateHour from '../../models/dateHour.entity';


export default class FreeDateController {
  static async store(req: Request, res: Response) {
    const { date } = req.body;
    const { userId } = req.headers;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const bloodcenter = await Bloodcenter.findOneBy({ user: { id: Number(userId) } })
    const user = await User.findOneBy({ id: Number(userId) })

    if (!date || !bloodcenter || !user) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    if (!bloodcenter) {
      return res.status(400).json({ error: 'Hemocentro não encontrado com a ID fornecida' });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de data inválido' })
    }

    // Converta a string da data para um objeto Date
    const parsedDate = new Date(date)

    // Verifique se o valor é um número válido
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Formato de data inválido' });
    }

    if (parsedDate <= new Date()) {
      return res.status(400).json({ error: 'A data deve ser posterior à data atual' });
    }

    try {
      const free_date = new Free_Date()
      free_date.date = date
      free_date.bloodcenter = bloodcenter
      free_date.user = user;
      free_date.isActive = true
      await free_date.save();
      
      const responseObject = {
        id: free_date.id_date,
        date: free_date.date,
        isActive: free_date.isActive
      }

      return res.status(201).json(responseObject)
    }

    catch (error) {
      return res.status(500).json("internal server error")
    }

  }

  static async index(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id do hemocentro é obrigatório' })
    }

    const bloodcenter = await Bloodcenter.findOneBy({ cod_bloodcenter: Number(id) })
    if (bloodcenter) {
      const free_date = await Free_Date.findBy({ bloodcenter: { cod_bloodcenter: Number(bloodcenter.cod_bloodcenter) } })
      return res.json(free_date)
    }
    else return res.status(404).json({ error: 'Nenhum dado encontrado' })
  }

  static async indexActive (req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id do hemocentro é obrigatório' })
    }

    const bloodcenter = await Bloodcenter.findOneBy({ cod_bloodcenter: Number(id) })
    if (bloodcenter) {
      const free_date = await Free_Date.findBy({ bloodcenter: { cod_bloodcenter: Number(bloodcenter.cod_bloodcenter) }, isActive: true })
      return res.json(free_date)
    }
    else return res.status(404).json({ error: 'Nenhum dado encontrado' })
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const free_date = await Free_Date.findOneBy({ id_date: Number(id) })
    return res.json(free_date)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers;
    const { isActive } = req.body

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const bloodcenter = await Bloodcenter.findOneBy({ user: { id: Number(userId) } })
    if (!bloodcenter) {
      return res.status(404).json({ error: 'Hemocentro não encontrado' })
    }

    const free_date = await Free_Date.findOneBy({ id_date: Number(id), bloodcenter: { cod_bloodcenter: Number(bloodcenter.cod_bloodcenter) } })
    if (!free_date) {
      return res.status(404).json({ error: 'Data não encontrada' })
    }

    if (isActive === false) {
      const date_hour = await DateHour.findBy({ free_date: { id_date: Number(id) } })
      for (let i = 0; i < date_hour.length; i++) {
        if (date_hour[i].isActive === true) {
          date_hour[i].isActive = false;
          await date_hour[i].save();
        }
      }
      free_date.isActive = isActive
      await free_date.save()
      const responseObject = {
        id: free_date.id_date,
        date: free_date.date,
        isActive: free_date.isActive
      };

      return res.status(201).json(responseObject);
    }
    else {
      free_date.isActive = isActive
      await free_date.save()

      const responseObject = {
        id: free_date.id_date,
        date: free_date.date,
        isActive: free_date.isActive
      };

      return res.status(201).json(responseObject);
    }

  }
}