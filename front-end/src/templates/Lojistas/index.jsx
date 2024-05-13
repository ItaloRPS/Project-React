import * as Style from './styles'
import { Article } from '../../components/Article'
import { LinkButton } from '../../components/LinkButton'
import { Loading } from '../../components/Loading'
import { MdModeEditOutline} from "react-icons/md"
import { Button, Table, Tag ,Space} from 'antd';
import { Input } from 'antd';
// const { Search } = Input;

import {Link} from "react-router-dom"

import {Lojista} from '../../control/lojista/control-lojista'
import { useEffect, useState} from 'react'
import { Fieldset } from '../../components/Fieldset'
import { SearchOutlined } from '@ant-design/icons';



export const Lojistas = () =>{
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
      const getUser = async ()=>{
        setLoading(true)
        const UserData = await Lojista.users()
        console.log(UserData)
        if(UserData?.status && UserData.status === 200 && UserData.data.length){
          setItems(UserData.data)
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
                  <Link to={`./cadastrolojista/${item.id}`}><MdModeEditOutline/>Editar</Link>
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
      <Article title="Lojista">
        <Style.Container>
          <Fieldset title={"Lojistas Cadastrados"}>
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
          </Fieldset>
        </Style.Container>
      </Article>
     )
}
