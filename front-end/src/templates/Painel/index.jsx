import * as Style from './styles'
import { Article } from '../../components/Article'

import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload,Button } from 'antd';
import {Files} from '../../control/files/control-file'


const getBase64 = (file) =>{
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const getBlob = (file) =>{
  return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsArrayBuffer(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
  });
}

export const Painel = () =>{

const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      status: 'done',
      url: 'https://4bi-diogo.s3.us-east-2.amazonaws.com/lconn.app_colecoes.png',
    },
   
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = async ({ fileList: newFileList }) => setFileList(newFileList)
  return (
    <div className='testexxxxx'>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        
        onChange={handleChange}
        customRequest={({action,data,file,filename,headers,onError,onProgress,onSuccess, withCredentials})=>{
          const formData = new FormData()
          formData.append('file',file)
          Files.upload(formData).then((result)=>{
            if(result.status && result.status === 201)
            onSuccess(file)
          }).catch((e)=>{
            onError(e.error,file)
          })
          
        }}
       
      >
     <Button icon={<PlusOutlined />}>Alterar</Button>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
      
     
}
