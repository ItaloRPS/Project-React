import api from '../../services/api'

export const Lojista = {

    add: async (data) =>{
        const tokenData = sessionStorage.getItem("authToken");
        if (tokenData) {
            api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
        }
        try {
            console.log(JSON.stringify(data))
           const result =  await api.post('lojista',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },
    
    update: async (id, data) =>{
        try {
           const result =  await api.post(`lojista/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },

    delete: async (email) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`lojista/${email}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    listAll: async (idempresa) =>{
        const empresa = idempresa?`?idempresa=${idempresa}`:''      
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lojista${empresa}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    listCombo: async (idestado, idcidade, empresa) => {
        const tokenData = sessionStorage.getItem("authToken");
        if (tokenData) {
          api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
        }
        try {
          const result = await api.get(`lojista/filter/${idestado}/${idcidade}/${empresa}`);
          const arrayLojista = []
          for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i];
            arrayLojista.push({
              label: element.User.name,
              value: element.User.id
            })
          }
    
          result.arrayLojista = arrayLojista
          return result;
        } catch (error) {
          return error.code;
        }
      },
    
    get: async (id) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lojista/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },
    
    users: async (id) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lojista/users`)
           return result;

        } catch (error) {
            return error.code
        }
    },
}