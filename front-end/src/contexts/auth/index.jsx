import React, { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [isLead, setIsLead] = useState(false);

  useEffect(() => {
    const validateToken = () => {
      const tokenData = sessionStorage.getItem("authToken");
      if (tokenData) {
        api.defaults.headers.common = { Authorization: `Bearer ${tokenData}` };
        setSigned(true);
      }
    };
    validateToken();
  }, []);
  
    const sideIn = async(email, password) => {
      const data = {
        "email": email,
        "password": password
      }
      try {
        var resp = await api.post('login',data,{headers:{'Content-Type': 'application/json'}})
        api.defaults.headers.common['Authorization'] = `Bearer ${resp.data?.access_token}`
        sessionStorage.setItem('authToken',resp.data?.access_token)
        setSigned(true)
       const resultUser =  await getUser()
        return resultUser
      } catch (error) {
        if (error?.response?.status === 401) {
          return 'Usuário ou senha inválidos'
        }
      }
    }

    const getUser = async(token) => {
      
      try {
        var resp = await api.get('user/me')
        sessionStorage.setItem('user',JSON.stringify(resp.data))
        return ''
      } catch (error) {
        return 'Não foi possivel buscar dados do usuario'
      }
     
    }

    const getRoutes = async() => {
      
      try {
        const tokenData = sessionStorage.getItem('authToken')
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
        var resp = await api.get('permissoes/rotas')
        return resp.data.result
      } catch (error) {
        return 'Não foi possivel buscar dados'
      }
     
    }

    const signup = (email, password) => {
            
        return api.auth(email,password)
      };

    const sideOut = () => {
      sessionStorage.clear()
    }


  return (
    <AuthContext.Provider
      value={{
        signed: sessionStorage.getItem("authToken")?.length > 0,
        sideOut,
        sideIn,
        signup,
        getRoutes,
        isLead,
        setIsLead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
