import api from "../../services/api";

export const Estado = {
  add: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post("estado", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  update: async (id, data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.patch(`estado/${id}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listAll: async () => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get("estado");
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listCombo: async (idpais=1) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get(`estado/${idpais}`);
      const arrayEstado = []
      for (let i = 0; i < result.data.result.length; i++) {
        const element = result.data.result[i];
        arrayEstado.push({
          label: element.descricao,
          value: element.idestado
        })
      }

      result.arrayEstado = arrayEstado
      return result;
    } catch (error) {
      return error.code;
    }
  },

  get: async (id) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get(`estado/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
