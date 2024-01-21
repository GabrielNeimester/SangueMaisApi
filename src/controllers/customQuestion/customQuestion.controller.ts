import { Request, Response } from 'express'
import Custom_Question from '../../models/customQuestion.entity'


export default class CustomQuestionController {
    static async store(req: Request, res: Response) {
        const {question_number, description, bloodcenter, user} = req.body

        if (question_number|| !description || !bloodcenter || !user) {
            return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
        }

        const custom_question = new Custom_Question()
        custom_question.question_number =  question_number
        custom_question.bloodcenter = bloodcenter
        custom_question.description = description
        await custom_question.save()

        return res.status(201).json(custom_question)
    }

    static async index(req: Request, res: Response) {
        const {bloodcenterId} = req.params

        if(!bloodcenterId || isNaN(Number(bloodcenterId))) {
          return res.status(400).json({ error: 'É necessário informar o hemocentro' })
        }

        const custom_question = await Custom_Question.find({
          where: { bloodcenter: { cod_bloodcenter: Number(bloodcenterId) } },})
        return res.json(custom_question)
    }

    static async show (req: Request, res: Response) {
        const { id } = req.params
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const custom_question = await Custom_Question.findOneBy({id_question: Number(id)})
        return res.json(custom_question)
      }

      static async delete (req: Request, res: Response) {
        const { id } = req.params

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const custom_question = await Custom_Question.findOneBy({id_question: Number(id)})
        if (!custom_question) {
          return res.status(404).json({ error: 'Questão não encontrada' })
        }
    
        await custom_question.remove()
        return res.status(204).json()
      }


    static async update (req: Request, res: Response) {
        const { id } = req.params
        const {question_number, description, bloodcenter, user} = req.body

    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const custom_question = await Custom_Question.findOneBy({id_question: Number(id)})
        if (!custom_question) {
          return res.status(404).json({ error: 'Questão não encontrada' })
        }
        
    
        custom_question.question_number =  question_number
        custom_question.bloodcenter = bloodcenter
        custom_question.description = description
        await custom_question.save()
    
        return res.json(custom_question)
      }
}