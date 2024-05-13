import * as Style from './styles'
import { useEffect, useState} from 'react'

import { Article } from '../../components/Article'
import { LinkButton } from '../../components/LinkButton'
import { Loading } from '../../components/Loading'
import { MdAdd ,MdModeEditOutline} from "react-icons/md"
import { Button, Modal, Table, message, Tooltip } from 'antd';
import {Link} from "react-router-dom"

import {Messages as MessagesApi} from '../../control/messages/control-messages'
import { Fieldset } from '../../components/Fieldset'
import { DeleteOutlined } from '@ant-design/icons';

export const Messages = () =>{
  
  const [messages, setMessages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageName, setMessageName] = useState(false);
  const [messageId, setMessageid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadMessages, setReloadMessages] = useState(0);
  useEffect(()=>{
      const getMessages= async ()=>{
        setLoading(true)
        const company = JSON.parse(sessionStorage.getItem('user')).data.idempresa[0]
        const messageData = await MessagesApi.listAllByCompany(company)
        if(messageData?.status && messageData?.status === 200 && messageData?.data?.result?.length){
          setMessages((e)=>e = messageData.data.result)
        }else{
          setLoading(false)
        }
      }
      getMessages()
    }, [reloadMessages])
    

    const columns = [
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        sorter: (a, b) => a.descricao.length - b.descricao.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Empresa',
        dataIndex: 'empresa',
      },
      {
        title: 'Data de envio',
        dataIndex: 'data',
      },
      {
        title: 'Hora de envio',
        dataIndex: 'hora',
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (_, record) => (
          <Style.Actions size="small">
          {/* <Link to={`./cadastrausuario/${record.idmensagem}`}><MdModeEditOutline/>Editar</Link> */}
          <Tooltip placement="top" title="Excluir">
            <Button onClick={()=>showModal(record)}>
              <DeleteOutlined/>
            </Button>
         </Tooltip>
        </Style.Actions>
        )
      }
    ];

    const data = messages?.map((item)=>{
      return {
        key: item.idmensagem,
        empresa: item.empresa.nome,
        descricao: item.descricao,
        data: item.data,
        hora: item.hora,
        actions: <Style.Actions size="small">
                  <Link to={`./cadastrausuario/${item.id}`}><MdModeEditOutline/>Editar</Link>
                  <Tooltip placement="top" title="Excluir">
                    <Button onClick={()=>showModal(item.id)}>
                      <DeleteOutlined/>
                    </Button>
                 </Tooltip>
                </Style.Actions>,
      }
    })

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
    
    const showModal = (data) => {
      setIsModalOpen((open)=>!open);
      setMessageid(data?.key)
    };

    const deleteMessage = async(id)=>{
      const result = await MessagesApi.delete(id)
      if(result && result.status && result.status == 204){
        
        message.success("mansagem excluida.", 2);
        setReloadMessages((prev) => prev + 1);
        setIsModalOpen(false); 
        } else {
          message.error(`"Não foi possível excluie o Lead."`, 2);
        }
     }

     if(!messages.length && loading){
      return (<Loading loading={true}/>)
    }

     return (
      <Article title="Mensagens">
        <Modal style={{padding:1}} title={messageName} open={isModalOpen}  onCancel={()=>showModal()} footer={<><Button onClick={()=>deleteMessage(messageId)}>Excluir</Button><Button onClick={()=>showModal()}>Cancelar</Button></>}></Modal>
        <Style.Content>
              {/* <Input.Search placeholder="Buscar..." size='large' style={{ width: 200 }} /> */}
               <LinkButton to="../enviomensagem" color='success'>&nbsp;<MdAdd/> Nova Mensagem</LinkButton>
        </Style.Content>
        <Style.Container>
          <Fieldset title={"Mensagens Cadastradas"}>
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
          </Fieldset>

        </Style.Container>
      </Article>
     )
}
