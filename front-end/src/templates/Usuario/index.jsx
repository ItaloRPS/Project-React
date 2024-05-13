import * as Style from './styles'
import { Article } from '../../components/Article'
import { LinkButton } from '../../components/LinkButton'
import { Loading } from '../../components/Loading'
import { MdAdd ,MdModeEditOutline} from "react-icons/md"
import { Button, Table, Tag ,Space} from 'antd';
import { Input } from 'antd';
// const { Search } = Input;

import {Link} from "react-router-dom"

import {User} from '../../control/user/control-user'
import { useEffect, useState} from 'react'
import { Fieldset } from '../../components/Fieldset'
import { SearchOutlined } from '@ant-design/icons';



export const Usuario = () =>{
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
      const getUser = async ()=>{
        setLoading(true)
        const UserData = await User.listAll()
        if(UserData?.status && UserData.status === 200 && UserData.data.result.length){
          setItems(UserData.data.result)
        }else{
          setLoading(false)
        }
      }
      getUser()
    }, [])
    
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'name',
        sorter: (a, b) => a.nome.localeCompare(b.nome), // Custom sorter function for 'Name' column
        sortDirections: ['ascend', 'descend'],
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
        title: 'Email',
        dataIndex: 'email',
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
        key: item.id,
        name: item.name,
        email: item.email,
        status: <Tag color={item.status==="A"?"green":"volcano"}>{item.status==="A"?"ATIVO":"INATIVO"}</Tag>,
        actions: <Style.Actions size="small">
                  <Link to={`./cadastrausuario/${item.id}`}><MdModeEditOutline/>Editar</Link>
                </Style.Actions>,
      }
    })

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
    
    if(!items.length){
      return (<Loading loading={true}/>)
    }
     return (
      <Article title="Usuário">
        <Style.Content>
              {/* <Input.Search placeholder="Buscar..." size='large' style={{ width: 200 }} /> */}
               <LinkButton to="./cadastrausuario" color='success'>&nbsp;<MdAdd/> Novo Usuário</LinkButton>
        </Style.Content>
        <Style.Container>
          <Fieldset title={"Usuários Cadastrados"}>
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
          </Fieldset>
        </Style.Container>
      </Article>
     )
}
