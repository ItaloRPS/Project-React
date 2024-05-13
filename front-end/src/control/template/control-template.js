import api from "../../services/api";

export const Template = {
  add: async (data) => {
    try {
      const result = await api.post("template", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  update: async (id, data) => {
    try {
      const result = await api.patch(`template/${id}`, JSON.stringify(data), {
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
      const result = await api.get("template");
      return result;
    } catch (error) {
      return error.code;
    }
  },

  themesByCompany: async (idCompany) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      // const result = await api.get(`/tema/temaDefault/${idCompany}`);
      const result = await api.get(`/tema/temaDefault`);
      const element = result.data.result;
      const arrayTemplate = element.map((data) => {
        return {
          label: data.nomeTema,
          value: data.idtema,
        };
      });

      result.arrayTemplate = arrayTemplate;
      return result;
    } catch (error) {
      return error.code;
    }
  },

  themesByUser: async (idtema) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      // const result = await api.get(`/tema/temaDefault/${idUser}`);
      const result = await api.get(`/tema/temaDefault`);
      const filteredThemes = result.data.result.filter(theme => theme.idtema === idtema);
      return filteredThemes;
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
      const result = await api.get(`template/${id}`);
      return result;
    } catch (error) {
      return error.code;
    }
  },
};
