import api from '../../services/api';

const setAuthorizationHeader = () => {
  const tokenData = sessionStorage.getItem('authToken');
  if (tokenData) {
    api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
  }
};

export const Modelo = {
  add: async (data) => {
    try {
      setAuthorizationHeader();
      const result = await api.post('modelo', JSON.stringify(data), {
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
      const result = await api.patch(`modelo/${id}`, JSON.stringify(data), {
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
      const result = await api.get('modelo');
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listCombo: async (state) => {
    try {
      setAuthorizationHeader();
      const result = await api.get('modelo');
      const arrayModelo = result.data.result.map((element) => ({
        label: element.nome,
        value: element.idmodelo,
      }));
      result.arrayModelo = arrayModelo;
      return result;
    } catch (error) {
      return error.code;
    }
  },

  get: async (id) => {
    try {
      setAuthorizationHeader();
      const result = await api.get(`modelo/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
