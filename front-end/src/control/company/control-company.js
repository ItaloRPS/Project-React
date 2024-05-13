import api from '../../services/api';

const setAuthorizationHeader = () => {
  const tokenData = sessionStorage.getItem('authToken');
  if (tokenData) {
    api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
  }
};

export const Company = {
  add: async (data) => {
    try {
      setAuthorizationHeader();
      const result = await api.post('empresa', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  update: async (id, data) => {
    try {
      setAuthorizationHeader();
      const result = await api.patch(`empresa/${id}`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listAll: async () => {
    try {
      setAuthorizationHeader();
      const result = await api.get('empresa');
      return result;
    } catch (error) {
      return error;
    }
  },

  listAllByUser: async () => {
    try {
      var user = JSON.parse(sessionStorage.getItem('user')).data.id
      setAuthorizationHeader();
      const result = await api.get(`empresa/user/${user}`);
      if(result.data.message !== 'erro'){
      return {status:200, data:{result:result.data.result.UserEmpresa}};

      }else{
        return {status:200,data:{result:[]}}
      }

    } catch (error) {
      return error;
    }
  },

  listCombo: async () => {
    try {
      var user = JSON.parse(sessionStorage.getItem('user')).data.id
      setAuthorizationHeader();
      const result = await api.get(`empresa`);
      if(result.data.message !== 'erro'){
        const arrayCompany  =  result.data.result
        .filter((element) => element.status === 'A')
        .map((element) => ({
          label: element.nome,
          value: element.idempresa,
        }));
      result.arrayCompany = arrayCompany;
      return result;
      }else{
        return result.arrayCompany = []
      }
 
    } catch (error) {
      return error.code;
    }
  },

  get: async (id) => {
    try {
      setAuthorizationHeader();
      const result = await api.get(`empresa/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
