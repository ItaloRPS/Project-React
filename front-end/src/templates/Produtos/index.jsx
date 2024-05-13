import * as Style from './styles'
import { Article } from '../../components/Article'
import { Loading } from '../../components/Loading'
import { LinkButton } from '../../components/LinkButton'
import { MdAdd ,MdModeEditOutline} from "react-icons/md"
import { Avatar,Table, Tag ,Button, Tooltip, Input, Space, Modal, message} from 'antd';
import { EditOutlined, SearchOutlined,DeleteOutlined } from "@ant-design/icons";
// const { Search } = Input;

import {Link, useNavigate} from "react-router-dom"

import {Product} from '../../control/product/control-product'
import { useEffect, useState} from 'react'
import { Fieldset } from '../../components/Fieldset'
import { Lead } from '../../control/lead/control-lead'



export const Produtos = () =>{
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [userData, setLoadedData] = useState('');
  const [loadings, setLoadings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prodName, setProdName] = useState(false);
  const [hashLead, setHashLead] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(()=>{
    const user = sessionStorage.getItem('user');
      if (user) {
        setLoadedData(JSON.parse(user).data.perfil.nome);
      }
      const getProducts = async ()=>{
        setLoading(true)
        const ProductData = await Product.listAll()
        if(ProductData?.status && ProductData.status === 200 && ProductData.data.message == 'sucesso'){
          // Ordenar os dados pelo campo "quantidade" do maior para o menor
        const retorno = ProductData.data.result.sort((a, b) => b.idproduto - a.idproduto);
          setItems(retorno)
          setLoading(false)
        }else{
          setLoading(false)
        }
      }
      getProducts()
    },[reload])
    

    const showModal = (data) => {
      setProdName(data?.name);
      setIsModalOpen((open) => !open);
      setHashLead(data?.hash)
    };

    const deleteAccess = async (hash) => {
      const result = await Lead.deleteAccess(hash)
      if (result && result.status && result.data.message == "sucesso") {
        showModal();
        message.success("acesso excluido.", 2, setReload((data) => !data) );
      } else {
        message.error(`"Não foi possível excluie o produto."`, 2);
      }
    };



    const columns = [
      {
        title: '',
        dataIndex: 'img',
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Name"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters()}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        onFilter: (value, record) =>
        record.name.toString().toLowerCase().includes(value.toLowerCase()),
      },
      // {
      //   title: 'Etiquetas',
      //   dataIndex: 'tickets',
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortDirections: ['descend'],
      // },
      // {
      //   title: 'Lotes',
      //   dataIndex: 'batch',
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortDirections: ['descend'],
      // },
      {
        title: 'Status',
        dataIndex: 'stutus',
        defaultSortOrder: 'descend',
        filters: [
          {
            text: 'Ativo',
            value: 'ATIVO',
          },
          {
            text: 'Inativo',
            value: 'INATIVO',
          },
        ],
        onFilter: (value, record) => record.stutus.props.children.indexOf(value) === 0,
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (_, record) => (
          <Style.Actions size="small" key={record.idproduto}>
                 {userData === "Admin" ||userData === "Empresa"? (
                    <Link to={`./cadastraprod/${record.idproduto}`}>
                      <MdModeEditOutline /> Editar
                    </Link>
                  ) : userData === "Lead" && record.editatemplate===1 &&(
                    <Tooltip placement="top" title="Editar">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      loading={loadings[2]}
                      onClick={()=>navigate(`../template/${record.idlote}/${record.hash}`)}
                    ></Button>
                  </Tooltip>
                  ) }  
                  {userData === "Lead"&&
                  (<Tooltip placement="top" title="Deletar">
                    <Button
                      type="default"
                      icon={<DeleteOutlined/>}
                      loading={loadings[2]}
                      onClick={()=>showModal(record)}
                    ></Button>
                  </Tooltip> )}               
                </Style.Actions>
        )
        
      }
    ];

    const data = items.map((item)=>{
      return {
        key: item.idproduto,
        img: <Avatar size={55} src={item.imagem} key={item.idproduto}/>,
        name: item.nome,
        tickets: '112',
        batch: '2',
        stutus: <Tag color={item.status==="A"?"green":"volcano"} key={item.idproduto}>{item.status==="A"?"ATIVO":"INATIVO"}</Tag>,
        idproduto:item.idproduto,
        idlote:item.idlote,
        hash:item.hash,
        editatemplate:item.editatemplate
      }
    })
    
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
    
    if(!items?.length&& loading){
      return (<Loading loading={true}/>)
    }
     return (
      <Article title="Produtos">     
            <Modal style={{ padding: 1 }} title={prodName} open={isModalOpen} onCancel={() => showModal()}  footer={
          <>
            <Button onClick={() => deleteAccess(hashLead)}>Excluir</Button>
            <Button onClick={() => showModal()}>Cancelar</Button>
          </>
        }
      >
        <Style.TextDescrption>      
            Prezado(a), o produto "{prodName}" vinculado ao seu acesso será desvinculado.
        </Style.TextDescrption>
      </Modal>     
        <Style.Content>
          {/* <Input.Search placeholder="Buscar..." size='large' style={{ width: 200 }} /> */}
          {userData != "Lead" && (<>
            <LinkButton to="./cadastraprod" color='success'>&nbsp;<MdAdd/> Novo Produto</LinkButton>
          </>)}
          
        </Style.Content>
        <Style.Container>
          <Fieldset title={"Produtos Cadastrados"}>
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
          </Fieldset>

        </Style.Container>
      </Article>
     )
}
