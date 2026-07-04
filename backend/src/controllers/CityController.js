import CityService from '../Services/CityService.js'

class CityController {

    async list(req, res) {
        try {
            const cidades = await CityService.list()

            return res.json(cidades)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar cidades",
                erro: error.message
            })
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params

            const cidade = await CityService.findById(id)

            return res.json(cidade)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar cidade por ID",
                erro: error.message
            })
        }
    }

    async create(req, res) {
        try {
            const { nome } = req.body

            const cidade = await CityService.create({
                name_city: nome
            })

            return res.status(201).json(cidade)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido') || error.message.includes('obrigatório')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao criar cidade",
                erro: error.message
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { nome } = req.body

            const cidade = await CityService.update(id, {
                name_city: nome
            })

            return res.json(cidade)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido') || error.message.includes('obrigatório')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao atualizar cidade",
                erro: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await CityService.delete(id)

            return res.sendStatus(204)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao deletar cidade",
                erro: error.message
            })
        }
    }

}

export default new CityController()
