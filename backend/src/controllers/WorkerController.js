import WorkerService from '../Services/WorkerService.js'

class WorkerController {

    async list(req, res) {
        try {
            const workers = await WorkerService.list()

            return res.json(workers)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar trabalhadores",
                erro: error.message
            })
        }
    }

    async findById(req, res) {
        try {
            const { cpf } = req.params

            const worker = await WorkerService.findById(cpf)

            return res.json(worker)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao buscar trabalhador por CPF",
                erro: error.message
            })
        }
    }

    async create(req, res) {
        try {
            const { nome, cargo, cpf, setor } = req.body

            const worker = await WorkerService.create({
                name_worker: nome,
                cargo,
                cpf,
                sector: setor
            })

            return res.status(201).json(worker)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inválido') || error.message.includes('obrigatório')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao criar trabalhador",
                erro: error.message
            })
        }
    }

    async update(req, res) {
        try {
            const { cpf } = req.params
            const { nome, cargo, setor } = req.body

            const worker = await WorkerService.update(cpf, {
                name_worker: nome,
                cargo,
                sector: setor
            })

            return res.json(worker)

        } catch (error) {
            console.error(error)

            if (error.message.includes('inv\u00e1lido') || error.message.includes('obrigat\u00f3rio')) {
                return res.status(400).json({
                    mensagem: error.message
                })
            }

            return res.status(500).json({
                mensagem: "Erro ao atualizar trabalhador",
                erro: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { cpf } = req.params

            await WorkerService.delete(cpf)

            return res.sendStatus(204)

        } catch (error) {
            console.error(error)

            return res.status(500).json({
                mensagem: "Erro ao deletar trabalhador",
                erro: error.message
            })
        }
    }

}

export default new WorkerController()
