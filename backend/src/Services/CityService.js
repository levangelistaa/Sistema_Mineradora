import supabase from '../config/supabaseClient.js'

class CityService {

    // Valida que o nome contém apenas letras e espaços (sem números)
    _validarNome(nome) {
        if (!nome || typeof nome !== 'string') {
            throw new Error('Nome é obrigatório e deve ser uma string.')
        }

        const apenasLetras = /^[a-zA-ZÀ-ÿ\s]+$/

        if (!apenasLetras.test(nome.trim())) {
            throw new Error('Nome inválido: o nome da cidade não pode conter números ou caracteres especiais.')
        }
    }

    async create(cidade) {
        this._validarNome(cidade.name_city)

        const { data, error } = await supabase
            .from('cities')
            .insert(cidade)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async list() {
        const { data, error } = await supabase
            .from('cities')
            .select('*')

        if (error) throw error

        return data
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('cities')
            .select('*')
            .eq('id_city', id)
            .single()

        if (error) throw error

        return data
    }

    async update(id, cidade) {
        if (cidade.name_city !== undefined) {
            this._validarNome(cidade.name_city)
        }

        const { data, error } = await supabase
            .from('cities')
            .update(cidade)
            .eq('id_city', id)
            .select()
            .single()

        if (error) throw error

        return data
    }

    async delete(id) {
        const { error } = await supabase
            .from('cities')
            .delete()
            .eq('id_city', id)

        if (error) throw error
    }

}

export default new CityService()
