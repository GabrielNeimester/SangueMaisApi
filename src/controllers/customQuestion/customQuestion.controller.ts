import { Request, Response } from 'express'
import Custom_Question from '../../models/customQuestion.entity'
import Bloodcenter from '../../models/bloodcenter.entity';
import User from '../../models/user.entity';
import Question_Option from '../../models/questionOption.entity';


export default class CustomQuestionController {
  static async store(req: Request, res: Response) {
    const { userId } = req.headers;
    const { question_number, description } = req.body

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!question_number || isNaN(Number(question_number))) {
      return res.status(400).json({ error: 'A questão precisa ter um número' })
    }

    const bloodcenter = await Bloodcenter.findOneBy({ user: { id: Number(userId) } })
    const user = await User.findOneBy({ id: Number(userId) })

    if (!bloodcenter) {
      return res.status(400).json({ error: 'Hemocentro não encontrado com a ID fornecida' });
    }

    if (!user) {
      return res.status(500).json({ error: 'Erro interno do Servidor' });
    }

    if (!question_number || !description) {
      return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
    }

    const existentQuestion = await Custom_Question.findOneBy({ question_number: Number(question_number) })

    if (existentQuestion) {
      return res.status(400).json({ erro: "Já existe uma questão cadastrada nesse número" })
    }

    const custom_question = new Custom_Question()
    custom_question.question_number = question_number
    custom_question.bloodcenter = bloodcenter
    custom_question.description = description
    await custom_question.save()

    const responseObject = {
      id: custom_question.id_question,
      question_number: custom_question.question_number,
      description: custom_question.description,
      bloodcenter: custom_question.bloodcenter
    }

    return res.status(201).json(responseObject)
  }

  static async index(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'É necessário informar o hemocentro' })
    }

    const custom_question = await Custom_Question.find({
      where: { bloodcenter: { cod_bloodcenter: Number(id) } },
    })

    return res.json(custom_question)
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const custom_question = await Custom_Question.findOneBy({ id_question: Number(id) })
    return res.json(custom_question)
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }


    const user = await User.findOneBy({ id: Number(userId) })

    if (!user) {
      return res.status(400).json({ error: 'Erro ao buscar usuário' })
    }

    const bloodcenter = await Bloodcenter.findOneBy({ user: user })

    if (!bloodcenter) {
      return res.status(400).json({ error: 'Usuário não associado a hemocentro' })
    }

    const custom_question = await Custom_Question.findOneBy({ id_question: Number(id), bloodcenter: bloodcenter })

    if (!custom_question) {
      return res.status(404).json({ error: 'Questão não encontrada' })
    }

    const questionOption = await Question_Option.find({
      where: { custom_question: { id_question: Number(id) } },
    })

    try {
      for (const option of questionOption) {
        await option.remove();
      }
      await custom_question.remove()
      return res.status(204).json()
    }
    catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

  }


  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers;
    const { description } = req.body

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const bloodcenter = await Bloodcenter.findOneBy({ user: { id: Number(userId) } })

    if (!bloodcenter) {
      return res.status(400).json({ error: 'Hemocentro do usuário não encontrado' })
    }


    const custom_question = await Custom_Question.findOneBy({ id_question: Number(id), bloodcenter: bloodcenter })

    if (!custom_question) {
      return res.status(404).json({ error: 'Questão não encontrada' })
    }

    custom_question.description = description
    await custom_question.save()

    const responseObject = {
      id: custom_question.id_question,
      question_number: custom_question.question_number,
      description: custom_question.description,
      bloodcenter: custom_question.bloodcenter
    }

    return res.json(responseObject)

  }

}