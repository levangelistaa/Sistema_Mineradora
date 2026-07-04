import ServiceWorkService from '../Services/ServiceWorkService.js'

class ServiceWorkController {

    async list(req, res) {
        try {
            const servicos = await ServiceWorkService.list()

            return res.json(servicos)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar serviços",
                erro: error.message
            })
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params

            const servico = await ServiceWorkService.findById(id)

            return res.json(servico)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar serviço por ID",
                erro: error.message
            })
        }
    }

    async create(req, res) {
        try {
            const { nome } = req.body

            const servico = await ServiceWorkService.create({
                name_service: nome
            })

            return res.status(201).json(servico)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido') || error.message.includes('obrigatório')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao criar serviço",
                erro: error.message
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { nome } = req.body

            const servico = await ServiceWorkService.update(id, {
                name_service: nome
            })

            return res.json(servico)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido') || error.message.includes('obrigatório')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao atualizar serviço",
                erro: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await ServiceWorkService.delete(id)

            return res.sendStatus(204)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao deletar serviço",
                erro: error.message
            })
        }
    }

}

export default new ServiceWorkController()
