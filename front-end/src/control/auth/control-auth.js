import api from '../../services/api'

export const Auth = {

    sideIn: async(email, password) => {

        const data = {
          "email": email,
          "password": password
        }
        try {
          var resp = await api.post('login',data,{headers:{'Content-Type': 'application/json'}})
          api.defaults.headers.common = {'Authorization':`Bearer ${resp.data?.access_token}`}
          return {data:resp.data?.access_token,status:200}
        } catch (error) {
          if (error?.response?.status === 401) {
            return {data:'Usuário ou senha inválidos',status:401}
          }
        }
      },

    sendEmail: async (data) =>{
        const sideIn = await Auth.sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL)
        
        if (sideIn.status === 200) {
            api.defaults.headers.common = { Authorization: `Bearer ${sideIn.data}` };
        }else{
            return sideIn
        }

        try {
           const result =  await api.post('requestReset',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },

    updatePassword: async (token, data) =>{
        const sideIn = await Auth.sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL)
        if (sideIn.status === 200) {
            api.defaults.headers.common = { Authorization: `Bearer ${sideIn.data}` };
        }else{
            return sideIn
        }

        try {
           const result =  await api.patch(`passwordReset/${token}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    
}