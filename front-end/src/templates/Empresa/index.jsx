import * as Style from './styles'
import { Article } from '../../components/Article'
import { LinkButton } from '../../components/LinkButton'
import { Loading } from '../../components/Loading'
import { MdAdd ,MdModeEditOutline} from "react-icons/md"
import { Button, Input, Space, Table, Tag } from 'antd';

import {Link} from "react-router-dom"

import {Company} from '../../control/company/control-company.js'
import { useEffect, useState} from 'react'
import { Fieldset } from '../../components/Fieldset'
import { SearchOutlined } from '@ant-design/icons'



export const Empresa = () =>{
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCompany = async () => {
      setLoading(true)
      const CompanyData = await Company.listAll();
  
      if (CompanyData?.status && CompanyData.status === 200 && CompanyData?.data?.result?.length) {
        const sortedData = CompanyData.data.result.slice().sort(compareNames); 
        setItems(sortedData);
      }else{
        setLoading(false)
      }
    };
  
    getCompany();
  }, []);
  
  function compareNames(a, b) {
    const nameA = a.status;
    const nameB = b.status;
  
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
    const user = JSON.parse(sessionStorage.getItem('user')).data
    const columns = [
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
      {
        title: 'CNPJ',
        dataIndex: 'cnpj',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Fone',
        dataIndex: 'phone',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.status - b.status,
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
        onFilter: (value, record) => record.status.props.children.indexOf(value) === 0,
      },
      {
        title: '',
        dataIndex: 'actions',
      }
    ];

    const data = items.map((item)=>{
      return {
        key: item.idempresa,
        name: item.nome,
        cnpj: item.cnpj,
        email: item.email,
        phone: item.telefone,
        status: <Tag color={item.status==="A"?"green":"volcano"}>{item.status==="A"?"ATIVO":"INATIVO"}</Tag>,
        actions: <Style.Actions size="small">
                  <Link to={`./cadastraempresa/${item.idempresa}`}><MdModeEditOutline/>Editar</Link>
                </Style.Actions>,
      }
    })

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
    if(!items.length && loading){
      return (<Loading loading={true}/>)
    }

     return (
      <Article title="Empresa">
        <Style.Content>
              {/* <Input.Search placeholder="Buscar..." size='large' style={{ width: 200 }} /> */}
               {user.perfil.idperfil === 1&&<LinkButton to="./cadastraempresa" color='success'>&nbsp;<MdAdd/> Nova Empresa</LinkButton>}
        </Style.Content>
        <Style.Container>
          <Fieldset title={"Empresas Cadastradas"}>
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
          </Fieldset>

        </Style.Container>
      </Article>
     )
}
