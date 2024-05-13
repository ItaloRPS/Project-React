import api from '../../services/api'

export const Files = {

    upload: async (data, callback=()=>{}) =>{
        try {
           const result =  await api.post('file/upload',data,{
                                            headers:{'Content-Type': 'multipart/form-data;*'},
                                            onUploadProgress:(progressEvent) => {
                                                let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                callback((dataFile)=>({
                                                    ...dataFile,
                                                    status: 'uploading',
                                                    percent: progress,
                                                  }));
                                                }
                                            })
           return result;

        } catch (error) {
            return error.code
        }
    },

}