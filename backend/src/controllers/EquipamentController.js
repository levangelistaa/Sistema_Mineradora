import supabase from '../config/supabaseClient.js'
import EquipamentService from '../services/EquipamentService.js'

class EquipamentController {
    

    async list(req, res) {
    try {
        const equipamentos = await EquipamentService.list()

        return res.json(equipamentos)

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            mensagem: "Erro ao buscar equipamentos",
            erro: error.message
        })
    }
}

    async findById(req, res) {

    const { id } = req.params

    const equipamento = await EquipamentService.findById(id)

    return res.json(equipamento)
}

    async create(req, res) {

    try {

        const { nome, setor } = req.body

        const equipamento = await EquipamentService.create({
            nome,
            setor
        })

        return res.status(201).json(equipamento)

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            mensagem: "Erro no POST",
            erro: error.message
        })
    }
}

    async delete(req, res) {

        const { id } = req.params

        await EquipamentService.delete(id)

        return res.sendStatus(204)
    }

}

export default new EquipamentController()