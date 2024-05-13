import api from '../../services/api'

export const Lead = {

    add: async (data) =>{
        const tokenData = sessionStorage.getItem("authToken");
        if (tokenData) {
            api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
        }
        try {
           const result =  await api.post('lead',JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error.code
        }
    },
    
    addBondLead: async (data) => {
        const tokenData = sessionStorage.getItem("authToken");
        if (tokenData) {
        api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
        }
        try {
        const result = await api.post("lead/vincularLead", JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
        return result;
        } catch (error) {
        return error.code;
        }
    },

    update: async (id, data) =>{
        try {
           const result =  await api.patch(`lead/${id}`,JSON.stringify(data),{headers:{'Content-Type': 'application/json'}})
           return result;

        } catch (error) {
            return error
        }
    },

    delete: async (email) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`lead/removeemail?email=${email}`)
           return result;

        } catch (error) {
            return error
        }
    },

    deleteLinks: async (hash) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`lead/removeHash?hash=${hash}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    deleteAccess: async (hash) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.delete(`lead/deleteaccess?hash=${hash}`)
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
           const result =  await api.get('lead')
           return result;

        } catch (error) {
            return error.code
        }
    },

    listAllByCompanyDownload: async (company) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lead/company/download/${company}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    listAllByCompany: async () =>{
        const tokenData = sessionStorage.getItem('authToken')
        const company = JSON.parse(sessionStorage.getItem('user')).data.idempresa[0]
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lead/company/${company}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    listAllByLote: async (idlote,filter) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lead/lote/${idlote}${filter}`)
           return result;

        } catch (error) {
            return error.code
        }
    },

    listId: async (idempresa) =>{
        const tokenData = sessionStorage.getItem('authToken')
        if (tokenData) {
          api.defaults.headers.common = {'Authorization':`Bearer ${tokenData}`}
        }
        try {
           const result =  await api.get(`lead/company/${idempresa}`)
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
           const result =  await api.get(`lead/${id}`)
           return result;

        } catch (error) {
            return error.code
        }
    },
}