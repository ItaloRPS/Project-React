import api from '../../services/api';

const setAuthorizationHeader = () => {
    const tokenData = sessionStorage.getItem('authToken');
    if (tokenData) {
        api.defaults.headers.common = {'Authorization': `Bearer ${tokenData}`};
    }
};

export const Product = {
    add: async (data) => {
        try {
            const result = await api.post('produto', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
            return result;
        } catch (error) {
            return error.code;
        }
    },

    update: async (id, data) => {
        try {
            const result = await api.patch(`produto/${id}`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
            return result;
        } catch (error) {
            return error.code;
        }
    },

    listAll: async () => {
        setAuthorizationHeader();
        try {
            const result = await api.get('produto');
            return result;
        } catch (error) {
            return error.code;
        }
    },
    listAllByLote: async (company) => {
        setAuthorizationHeader();
        try {
            const result = await api.get(`produto/produtolote/${company}`);
            return result;
        } catch (error) {
            return error.code;
        }
    },

    listAllByCompany: async (company,filter='') => {
        setAuthorizationHeader();
        try {
            const result = await api.get(`produto/company/${company}${filter}`);
            return result;
        } catch (error) {
            return error.code;
        }
    },

    listCombo: async () => {
        setAuthorizationHeader();
        try {
            const result = await api.get('produto');
            const arrayProduto = result.data.result
                .filter((element) => element.status === 'A')
                .map((element) => ({
                    label: element.nome,
                    value: element.idproduto
                }));
            result.arrayProduto = arrayProduto;
            return result;
        } catch (error) {
            return error.code;
        }
    },

    get: async (id) => {
        setAuthorizationHeader();
        try {
            const result = await api.get(`produto/${id}`);
            return result;
        } catch (error) {
            return error.code;
        }
    },

    getConfig: async (id) => {
        setAuthorizationHeader();
        try {
            const result = await api.get(`configproduto`);
            return result;
        } catch (error) {
            return error.code;
        }
    },
};
