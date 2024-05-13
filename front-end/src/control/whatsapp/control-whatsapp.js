import api from '../../services/api'

export const Whatsapp = {

    add: async (data) =>{
        try {
            const tokenData = sessionStorage.getItem('authToken')
            if (tokenData) {
              api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
            }
           const result =  await api.post('whatsapp',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    listAll: async () =>{
        try {
            const tokenData = sessionStorage.getItem('authToken')
            if (tokenData) {
              api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
            }
           const result =  await api.get('whatsapp',{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },

    findAllByCompany: async (company) =>{
        try {
            const tokenData = sessionStorage.getItem('authToken')
            if (tokenData) {
              api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
            }
           const result =  await api.get(`whatsapp/company/${company}`,{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },

    
    delete: async (idwhatsapp) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`whatsapp/${idwhatsapp}`)
           return result;

        } catch (error) {
            return error
        }
    },

    getQrCode: async (data) =>{
        try {
            const tokenData = sessionStorage.getItem('authToken')
            if (tokenData) {
              api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
            }
           const result =  await api.get(`whatsapp/drcode?session=${data.session}&sessionkey=${data.sessionkey}`,{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },


}