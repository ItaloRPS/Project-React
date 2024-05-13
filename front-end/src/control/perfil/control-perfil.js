import api from "../../services/api";

export const Perfil = {
  add: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post("perfil", JSON.stringify(data), {
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
      const result = await api.patch(`perfil/${id}`, JSON.stringify(data), {
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
      const result = await api.get("perfil");
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
      const result = await api.get("perfil");
      const arrayperfil = []
      for (let i = 0; i < result.data.result.length; i++) {
        const element = result.data.result[i];
        arrayperfil.push({
          label: element.nome,
          value: element.idperfil
        })
      }

      result.arrayperfil = arrayperfil
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
      const result = await api.get(`perfil/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
