import api from "../../services/api";

export const Pais = {
  add: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post("pais", JSON.stringify(data), {
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
      const result = await api.patch(`pais/${id}`, JSON.stringify(data), {
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
      const result = await api.get("pais");
      return result;
    } catch (error) {
      return error.code;
    }
  },

  listCombo: async () => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get("pais");
      const arrayCountry = []
      for (let i = 0; i < result.data.result.length; i++) {
        const element = result.data.result[i];
        arrayCountry.push({
          label: element.descricao,
          value: element.idpais
        })
      }

      result.arrayCountry = arrayCountry
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
      const result = await api.get(`pais/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
