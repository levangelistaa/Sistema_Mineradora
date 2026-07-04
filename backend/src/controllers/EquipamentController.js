import EquipamentService from '../Services/EquipamentService.js'

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
        try {
            const { id } = req.params

            const equipamento = await EquipamentService.findById(id)

            return res.json(equipamento)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar equipamento por ID",
                erro: error.message
            })
        }
    }

    async create(req, res) {
        try {
            const { nome, setor } = req.body

            const equipamento = await EquipamentService.create({ name_equipament: nome, sector: setor })

            return res.status(201).json(equipamento)

        } catch (error) {
            console.error(error)

            // Validação de nome retorna status 400 (Bad Request)
            if (error.message.includes('inválido')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao criar equipamento",
                erro: error.message
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { nome, setor } = req.body

            const equipamento = await EquipamentService.update(id, { name_equipament: nome, sector: setor })

            return res.json(equipamento)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao atualizar equipamento",
                erro: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await EquipamentService.delete(id)

            return res.sendStatus(204)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao deletar equipamento",
                erro: error.message
            })
        }
    }

}

export default new EquipamentController()