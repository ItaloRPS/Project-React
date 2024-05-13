import api from '../../services/api'

export const Access = {

    add: async (data) =>{
        try {
           const result =  await api.post('acesso',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    update: async (id, data) =>{
        try {
           const result =  await api.patch(`acesso/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
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
           const result =  await api.get('acesso')
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
           const result =  await api.get(`acesso/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    getHash: async (hash) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`acesso/url/${hash}`)
           return result;

        } catch (error) {
            return error.code
        }
    },
}