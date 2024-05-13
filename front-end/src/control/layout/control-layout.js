import api from '../../services/api'

export const Layout = {

    add: async (data) =>{
        try {
           const result =  await api.post('tema',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    update: async (id, data) =>{
        try {
           const result =  await api.patch(`tema/updateItem/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    listAll: async () =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get('tema')
           return result;

        } catch (error) {
            return error.code
        }
    },
    
    get: async (id) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`tema/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    getByLote: async (id,hash) =>{
        const tokenData = sessionStorage.getItem('authToken')
        const hashData = hash?`?hash=${hash}`:''
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }

        try {
           const result =  await api.get(`lote/${id}${hashData}`)
           return result;

        } catch (error) {
            return error.code
        }
    },
}