import { Request, Response } from 'express'
import Custom_Question from '../../models/customQuestion.entity'
import User from '../../models/user.entity'
import Question_Option from '../../models/questionOption.entity'
import Bloodcenter from '../../models/bloodcenter.entity';


export default class questionOptionController {
    static async store(req: Request, res: Response) {
        const { userId } = req.headers;
        const { description, impediment, impedimentDays, customQuestionId } = req.body



        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }


        if (!description || !impediment || !customQuestionId || isNaN(Number(customQuestionId))) {
            return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
        }

        const user = await User.findOneBy({ id: Number(userId) })

        if (!user) {
            return res.status(400).json({ error: 'Erro ao buscar usuário' })
        }
        const bloodcenter = await Bloodcenter.findOneBy({ user: user })


        if (!bloodcenter) {
            return res.status(400).json({ error: 'Usuário não associado a hemocentro' })
        }

        const customQuestion = await Custom_Question.findOneBy({ id_question: Number(customQuestionId), bloodcenter: bloodcenter })


        if (!customQuestion) {
            return res.status(404).json({ error: 'Questão não encontrada' });
        }


        if (impediment) {
            if (impediment === "temporario") {
                if (!impedimentDays || isNaN(Number(impedimentDays))) {
                    return res.status(400).json({ error: 'É necessário informar a quantidade de dias de impedimento' })
                }

                const questionOption = new Question_Option()
                questionOption.description = description
                questionOption.impediment = impediment
                questionOption.impedimentDays = impedimentDays
                questionOption.custom_question = customQuestion

                const responseObject = {
                    id: questionOption.id_option,
                    question_number: questionOption.description,
                    description: questionOption.impediment,
                    bloodcenter: questionOption.impedimentDays,
                    customQuestionId: questionOption.custom_question.id_question

                }

                await questionOption.save()
                return res.status(201).json(responseObject)
            }
            else if (impediment === "definitivo" || impediment == "sem_restricao") {
                const questionOption = new Question_Option()
                questionOption.description = description
                questionOption.impediment = impediment
                questionOption.custom_question = customQuestion

                const responseObject = {
                    id: questionOption.id_option,
                    question_number: questionOption.description,
                    description: questionOption.impediment,
                    customQuestionId: questionOption.custom_question.id_question
                }

                await questionOption.save()
                return res.status(201).json(responseObject)
            }
            else {
                return res.status(400).json({ error: 'tipo de impedimento inválido' })
            }
        }

    }

    static async index(req: Request, res: Response) {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'É necessário informar o id da questão' })
        }

        const questionOption = await Question_Option.find({
            where: { custom_question: { id_question: Number(id) } },
        })

        return res.json(questionOption)
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório' })
        }

        const questionOption = await Question_Option.findOneBy({ id_option: Number(id) })
        return res.json(questionOption)
    }

    static async delete(req: Request, res: Response) {
        const { userId } = req.headers
        const { id } = req.params

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

        const questionOption = await Question_Option.findOneBy({ id_option: Number(id), custom_question: { bloodcenter: bloodcenter } })

        if (!questionOption) {
            return res.status(404).json({ error: 'Opção não encontrada' })
        }

        await questionOption.remove()
        return res.status(204).json()
    }


    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers;
        const { description, impediment, impedimentDays } = req.body

        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' })
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

        const questionOption = await Question_Option.findOneBy({ id_option: Number(id), custom_question: { bloodcenter: bloodcenter } })

        if (!questionOption) {
            return res.status(404).json({ error: 'Opção não encontrada' })
        }

        if (!description || !impediment) {
            return res.status(400).json({ error: 'Campo obirgatórios não preenchidos' })
        }

        if (impediment) {
            if (impediment === "temporario") {
                if (!impedimentDays || isNaN(Number(impedimentDays))) {
                    return res.status(400).json({ error: 'É necessário informar a quantidade de dias de impedimento' })
                }

                const questionOption = new Question_Option()
                questionOption.description = description
                questionOption.impediment = impediment
                questionOption.impedimentDays = impedimentDays

                const responseObject = {
                    id: questionOption.id_option,
                    question_number: questionOption.description,
                    description: questionOption.impediment,
                    bloodcenter: questionOption.impedimentDays,

                }

                await questionOption.save()
                return res.status(201).json(responseObject)
            }
            else if (impediment === "definitivo" || impediment == "sem_restricao") {
                const questionOption = new Question_Option()
                questionOption.description = description
                questionOption.impediment = impediment

                const responseObject = {
                    id: questionOption.id_option,
                    question_number: questionOption.description,
                    description: questionOption.impediment,
                }

                await questionOption.save()
                return res.status(201).json(responseObject)
            }
            else {
                return res.status(400).json({ error: 'tipo de impedimento inválido' })
            }
        }



    }

}