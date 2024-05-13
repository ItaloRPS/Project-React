import api from '../../services/api';

const setAuthorizationHeader = () => {
  const tokenData = sessionStorage.getItem('authToken');
  if (tokenData) {
    api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
  }
};

export const Cidade = {
  add: async (data) => {
    try {
      setAuthorizationHeader();
      const result = await api.post('cidade', JSON.stringify(data), {
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
      const result = await api.patch(`cidade/${id}`, JSON.stringify(data), {
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
      const result = await api.get('cidade');
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listCombo: async (state) => {
    try {
      setAuthorizationHeader();
      const result = await api.get('cidade');
      const arrayCity = result.data.result.map((element) => ({
        label: element.descricao,
        value: element.idcidade,
      }));
      result.arrayCity = arrayCity;
      return result;
    } catch (error) {
      return error.code;
    }
  },

  get: async (id) => {
    try {
      setAuthorizationHeader();
      const result = await api.get(`cidade/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },

  getAllCity: async (idEstado) => {
    try {
      setAuthorizationHeader();
      const result = await api.get(`cidade/cidadeAll/${idEstado}`);
      const arrayCity = result.data.result.cidade.map((element) => ({
        label: element.descricao,
        value: element.idcidade,
      }));
      result.arrayCity = arrayCity;
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
