import api from './api'



export default{
  auth : async(email, password)=>{
    const data = {
      "email": email,
      "password": password
    }
    try {
      const result =  await api.post('login',data,{headers:{'Content-Type': 'application/json'}})
        return result.data.access_token
    } catch (error) {
      
      console.log(error)
      return 
    }

  }
}