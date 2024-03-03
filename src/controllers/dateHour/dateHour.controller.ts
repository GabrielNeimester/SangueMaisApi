import { Request, Response } from 'express'
import User from '../../models/user.entity'
import DateHour from '../../models/dateHour.entity'
import Free_Date from '../../models/freeDate.entity'
import { LessThan, MoreThan } from 'typeorm'

export default class DateHourController {
  static async store(req: Request, res: Response) {
    const { start_hour, finish_hour, freeDateId } = req.body
    const { userId } = req.headers


    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    if (!start_hour || !finish_hour || !freeDateId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }



    // Expressão regular para validar o formato HH:mm:ss
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (!timeRegex.test(start_hour)) {
      return res.status(400).json({ error: 'Hora de início inválida. Use o formato HH:mm:ss' });
    }

    if (!timeRegex.test(finish_hour)) {
      return res.status(400).json({ error: 'Hora de fim inválida. Use o formato HH:mm:ss' });
    }

    const freeDate = await Free_Date.findOneBy({ id_date: Number(freeDateId) })
    const user = await User.findOneBy({id: Number(userId)})


    if (!freeDate || !user) res.status(404).json({ error: 'Data associada não encontrada' })
    else if(freeDate.isActive===false){
      return res.status(401).json({ error: 'Data cancelada' })
    }
    else{

       // Verificar se já existe uma hora que sobreponha a nova hora
       const overlappingDateHour = await DateHour.findOne({
        where: {
          free_date: freeDate,
          start_hour: LessThan(finish_hour),
          finish_hour: MoreThan(start_hour)
        }
      });

      if (overlappingDateHour) {
        return res.status(400).json({ error: 'A nova hora está sobreposta a outra hora existente' });
      }
    
    const dateHour = new DateHour();
    dateHour.start_hour = start_hour
    dateHour.finish_hour = finish_hour
    dateHour.free_date = freeDate
    dateHour.user = user
    dateHour.isActive = true
    await dateHour.save()

    const responseObject = {
      id: dateHour.id_date_hour,
      start_hour: dateHour.start_hour,
      finish_hour: dateHour.finish_hour,
      freeDate: dateHour.free_date.id_date,
      isActive: dateHour.isActive
    }

    return res.status(201).json(responseObject)
    }
    

  }



  static async index(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const date_hour = await DateHour.findBy({ free_date: { id_date: Number(id) } })

    return res.json(date_hour)
  }

  static async indexActive(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const date_hour = await DateHour.findBy({ free_date: { id_date: Number(id) }, isActive: true })

    return res.json(date_hour)
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const date_hour = await DateHour.findOneBy({ id_date_hour: Number(id) })
    if(!date_hour) return res.status(400).json({ error: 'Dados Não encontrado' })
    return res.json(date_hour)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const {isActive } = req.body
    const { userId } = req.headers


    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const date_hour = await DateHour.findOneBy({ id_date_hour: Number(id) })
    if (!date_hour) {
      return res.status(404).json({ error: 'Horario não disponível' })
    }

    const user = await User.findOneBy({ id: Number(userId) })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }


    const freeDate = await Free_Date.findOneBy({dateHour:date_hour })

    if(!freeDate){
      return res.status(404).json({error: 'Ocorreu um erro na pesquisa'})
    }

    if(freeDate.isActive == false){
      return res.status(500).json({error: 'Não é possível alterar status de um horário em uma data cancelada'})
    }

    date_hour.user = user
    date_hour.isActive = isActive

    await date_hour.save();
    const responseObject = {
      id: date_hour.id_date_hour,
      start_hour:  date_hour.start_hour,
      finish_hour: date_hour.finish_hour,
      freeDate:  date_hour.free_date.id_date,
      isActive:  date_hour.isActive
    }

    return res.status(201).json(responseObject)

  }
}