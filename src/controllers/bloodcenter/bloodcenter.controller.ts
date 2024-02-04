import { Request, Response } from 'express'
import Bloodcenter from '../../models/bloodcenter.entity'
import User from '../../models/user.entity'

export default class BloodcenterController {
    static async store(req: Request, res: Response) {
        const { cnpj, nome, estado, cidade, bairro, telefone, email } = req.body
        const { userId } = req.headers


        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!cnpj || !nome || !estado || !cidade || !bairro || !telefone || !email) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }


        try {
          
          const user = await User.findOneBy({ id: Number(userId) });
    
          if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Access the user's role
          if(user.role ==='Adm'){

            const bloodcenter = new Bloodcenter();
            bloodcenter.cpnj = cnpj;
            bloodcenter.nome = nome;
            bloodcenter.estado = estado;
            bloodcenter.cidade = bairro;
            bloodcenter.telefone = telefone;
            bloodcenter.bairro = bairro;
            bloodcenter.email = email;
            await bloodcenter.save();
      
            return res.status(201).json({ bloodcenter});

          }
          else{
            return res.status(401).json({ error: 'Acesso não autorizado' });
          }
    

        } catch (error) {
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
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

    static async update (req: Request, res: Response) {
        const { id } = req.params
        const { cnpj, nome, estado, cidade, bairro, telefone, email } = req.body

        const { userId } = req.headers


        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!cnpj || !nome || !estado || !cidade || !bairro || !telefone || !email) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const bloodcenter = await Bloodcenter.findOneBy({cod_bloodcenter: Number(id), user: { id: Number(userId) }})
        
        if (!bloodcenter) {
          return res.status(404).json({ error: 'Hemocentro não encontrado' })
        }
    
        bloodcenter.cpnj = cnpj
        bloodcenter.nome = nome
        bloodcenter.estado = estado
        bloodcenter.cidade = cidade
        bloodcenter.telefone = telefone
        bloodcenter.email = email
        bloodcenter.bairro = bairro
        await bloodcenter.save()
    
        return res.json(bloodcenter)
      }

      static async delete (req: Request, res: Response) {
        const { id } = req.params

        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        const bloodcenter = await Bloodcenter.findOneBy({cod_bloodcenter: Number(id)})
        if (!bloodcenter) {
          return res.status(404).json({ error: 'Hemocentro não disponível' })
        }
    
        await bloodcenter.remove()
        return res.status(204).json()
      }
}

