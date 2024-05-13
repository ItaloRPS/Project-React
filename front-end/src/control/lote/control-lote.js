import api from '../../services/api'

export const Lote = {

    add: async (data) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.post('lote',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    update: async (id, data) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.patch(`lote/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    aprovar: async (id, data) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.post(`lote/aprovar/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
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
           const result =  await api.get('lote')
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
           const result =  await api.get(`lote/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    getLink: async (id) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lote/downloadLink/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },
}