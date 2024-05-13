import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Button } from 'antd';
import {Link} from "react-router-dom";

export const HeaderMenu = () =>{
  const user = JSON.parse(sessionStorage.getItem('user'));
  const {sideOut} = useAuth();
  const items = [
    {
      key: '1',
      label: (      
        <Link target="" to="/"
           onClick={()=>sideOut()}>
          Sair
        </Link>
      ),
    }
  ];


    
    return (
      <>
        LOGO

        
        <Dropdown menu={{ items }}>                     
          <Link onClick={(e) => e.preventDefault()} 
             style={{color:'black'}}
          >            
            <Space>
               <span>{user?.name}</span>
              <Space wrap size={16}>
                  <Avatar size="large" icon={<UserOutlined />} />
               </Space>
               <DownOutlined />
            </Space>
          </Link>
        </Dropdown>

      </>
    )

}