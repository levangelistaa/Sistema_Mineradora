import supabase from '../config/supabaseClient.js'

class ServiceWorkService {

    // Valida que o nome contém apenas letras e espaços (sem números)
    _validarNome(nome) {
        if (!nome || typeof nome !== 'string') {
            throw new Error('Nome é obrigatório e deve ser uma string.')
        }

        const apenasLetras = /^[a-zA-ZÀ-ÿ\s]+$/

        if (!apenasLetras.test(nome.trim())) {
            throw new Error('Nome inválido: o nome do serviço não pode conter números ou caracteres especiais.')
        }
    }

    async create(serviceWork) {
        this._validarNome(serviceWork.name_service)

        const { data, error } = await supabase
            .from('service_works')
            .insert(serviceWork)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async list() {
        const { data, error } = await supabase
            .from('service_works')
            .select('*')

        if (error) throw error

        return data
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('service_works')
            .select('*')
            .eq('id_service', id)
            .single()

        if (error) throw error

        return data
    }

    async update(id, serviceWork) {
        if (serviceWork.name_service !== undefined) {
            this._validarNome(serviceWork.name_service)
        }

        const { data, error } = await supabase
            .from('service_works')
            .update(serviceWork)
            .eq('id_service', id)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async delete(id) {
        const { error } = await supabase
            .from('service_works')
            .delete()
            .eq('id_service', id)

        if (error) throw error
    }

}

export default new ServiceWorkService()
