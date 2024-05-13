import {useNavigate} from 'react-router-dom'
import {Menu} from 'antd'
import useAuth from "../../hooks/useAuth";
import { FileProtectOutlined, LogoutOutlined  } from '@ant-design/icons';

export const SideMenu = ({items}) =>{
    const {sideOut} = useAuth();
    const navigate = useNavigate()
    return (
        <Menu 
        color='red'
        style={{ minHeight: '100%',paddingTop:'15px',maxWidth:'220px',minWidth:'220px',width:'220px'}}
        onClick={({key})=>{
            if(key !== 'signout' && key !== 'login'){
                navigate(`.${key}`)
            }else if(key === 'login'){
                sideOut()
                navigate('/')
            }
        }}
        items={[...items,...[{label:'Política de privacidade',key:'/politicypolicy',icon:<FileProtectOutlined  />},{label:'Sair',key:'login', icon:<LogoutOutlined />, danger:true}]]}
        >
        </Menu>
    )
}
