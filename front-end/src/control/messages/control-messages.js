import api from '../../services/api'

export const Messages = {

    add: async (data) =>{
        console.log(JSON.stringify(data))
        try {
           const result =  await api.post('message',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    listAll: async () =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get('message',{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    
    listAllByCompany: async (company) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`message/company/${company}`,{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    delete: async (idmensagem) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`message/${idmensagem}`)
           return result;

        } catch (error) {
            return error
        }
    },


    sendMessage: async (data) =>{
        JSON.stringify(data)
        try {
           const result =  await api.post('message/sendMessage',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },

}