import api from "../../services/api";

export const User = {
  add: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post("user", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  addUserLead: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post("user/userLead", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },

  update: async (id, data) => {
    delete data.perfil
    delete data.UserEmpresa
    delete data.lead
    console.log(JSON.stringify(data))
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.patch(`user/${id}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      return result;
    } catch (error) {
      return error.code;
    }
  },
  
  userEmpresa: async (data) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.post(`user/userEmpresa`, JSON.stringify(data), {
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
      const result = await api.get("user");
      return result;
    } catch (error) {
      return error;
    }
  },

  listCombo: async () => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get("user");
      const arrayUser = []
      for (let i = 0; i < result.data.result.length; i++) {
        const element = result.data.result[i];
        arrayUser.push({
          label: element.name,
          value: element.id
        })
      }

      result.arrayUser = arrayUser
      return result;
    } catch (error) {
      return error;
    }
  },

  get: async (id) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get(`user/${id}`);
      return result;
    } catch (error) {
      return error;
    }
  },

  getEmail: async (email) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get(`user/userEmail?email=${email}`);
      return result;
    } catch (error) {
      return error;
    }
  },

  findUniqueToken: async (token) => {
    const tokenData = sessionStorage.getItem("authToken");
    if (tokenData) {
      api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
    }
    try {
      const result = await api.get(`/user/token/${token}`);
      return result;
    } catch (error) {
      return error;
    }
  },
};
