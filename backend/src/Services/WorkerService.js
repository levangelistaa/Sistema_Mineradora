import supabase from '../config/supabaseClient.js'

class WorkerService {

    // Valida que o nome contém apenas letras e espaços (sem números)
    _validarNome(nome) {
        if (!nome || typeof nome !== 'string') {
            throw new Error('Nome é obrigatório e deve ser uma string.')
        }

        const apenasLetras = /^[a-zA-ZÀ-ÿ\s]+$/

        if (!apenasLetras.test(nome.trim())) {
            throw new Error('Nome inválido: o nome do trabalhador não pode conter números ou caracteres especiais.')
        }
    }

    // Valida que o CPF contém exatamente 11 dígitos numéricos
    _validarCpf(cpf) {
        if (!cpf || typeof cpf !== 'string') {
            throw new Error('CPF é obrigatório.')
        }

        const cpfLimpo = cpf.replace(/\D/g, '')

        if (cpfLimpo.length !== 11) {
            throw new Error('CPF inválido: deve conter exatamente 11 dígitos.')
        }
    }

    async create(worker) {
        this._validarNome(worker.name_worker)
        this._validarCpf(worker.cpf)

        const { data, error } = await supabase
            .from('workers')
            .insert(worker)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async list() {
        const { data, error } = await supabase
            .from('workers')
            .select('*')

        if (error) throw error

        return data
    }

    async findById(cpf) {
        const { data, error } = await supabase
            .from('workers')
            .select('*')
            .eq('cpf', cpf)
            .single()

        if (error) throw error

        return data
    }

    async update(cpf, worker) {
        if (worker.name_worker !== undefined) {
            this._validarNome(worker.name_worker)
        }

        const { data, error } = await supabase
            .from('workers')
            .update(worker)
            .eq('cpf', cpf)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async delete(cpf) {
        const { error } = await supabase
            .from('workers')
            .delete()
            .eq('cpf', cpf)

        if (error) throw error
    }

}

export default new WorkerService()
