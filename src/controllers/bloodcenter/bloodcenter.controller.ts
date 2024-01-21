import { Request, Response } from 'express'
import Bloodcenter from '../../models/bloodcenter.entity'

export default class BloodcenterController {
    static async store(req: Request, res: Response) {
        const { cnpj, nome, estado, cidade, bairro, telefone, email } = req.body

        if (!cnpj || !nome || !estado || !cidade || !bairro || !telefone || !email) {
            return res.status(400).json({ error: 'Todos os campos são obirgatórios' })
        }

        const bloodcenter = new Bloodcenter()
        bloodcenter.cpnj = cnpj
        bloodcenter.nome = nome
        bloodcenter.estado = estado
        bloodcenter.cidade = bairro
        bloodcenter.telefone = telefone
        bloodcenter.bairro = bairro
        bloodcenter.email = email
        await bloodcenter.save()

        return res.status(201).json(bloodcenter)
    }

    static async index(req: Request, res: Response) {

        const bloodcenter = await Bloodcenter.find()
        return res.json(bloodcenter)
    }

    static async show (req: Request, res: Response) {
        const { id } = req.params
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const bloodcenter = await Bloodcenter.findOneBy({cod_bloodcenter: Number(id)})
        return res.json(bloodcenter)
      }

      static async delete (req: Request, res: Response) {
        const { id } = req.params

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const bloodcenter = await Bloodcenter.findOneBy({cod_bloodcenter: Number(id)})
        if (!bloodcenter) {
          return res.status(404).json({ error: 'Hemocentro não encontrado' })
        }
    
        await bloodcenter.remove()
        return res.status(204).json()
      }


    static async update (req: Request, res: Response) {
        const { id } = req.params
        const { cnpj, nome, estado, cidade, bairro, telefone, email } = req.body

    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const bloodcenter = await Bloodcenter.findOneBy({cod_bloodcenter: Number(id)})
        if (!bloodcenter) {
          return res.status(404).json({ error: 'Hemocentro não encontrado' })
        }
    
        bloodcenter.cpnj = cnpj
        bloodcenter.nome = nome
        bloodcenter.estado = estado
        bloodcenter.cidade = bairro
        bloodcenter.telefone = telefone
        bloodcenter.email = email
        bloodcenter.bairro = bairro
        await bloodcenter.save()
    
        return res.json(bloodcenter)
      }
}