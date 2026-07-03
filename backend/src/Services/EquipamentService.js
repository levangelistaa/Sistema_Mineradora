import supabase from '../config/supabaseClient.js'

class EquipamentService {

    async create(equipamento) {

    const { data, error } = await supabase
        .from('equipaments')
        .insert(equipamento)
        .select()
        .single()

    if (error) throw error

    return data
    }

    async list() {

    const { data, error } = await supabase
        .from('equipaments')
        .select('*')
        

    if (error) throw error

    return data
    }

    async findById(id) {

    const { data, error } = await supabase
        .from('equipaments')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error

    return data
    }

    async update(id, equipamento) {

    const { data, error } = await supabase
        .from('equipaments')
        .update(equipamento)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error

    return data
    }

    async delete(id) {

    const { error } = await supabase
        .from('equipaments')
        .delete()
        .eq('id', id)

    if (error) throw error
    }

}

export default new EquipamentService()