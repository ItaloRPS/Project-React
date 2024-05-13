import * as Style from "./styles";
import {Layout} from 'antd';
import {SideMenu} from '../../components/SideMenu'
import { RoutesApp } from '../../routes/routesApp';

import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from 'react';
import { NavMenu } from "../../components/NavMenu";
import * as Icons from "@ant-design/icons";
const { Header, Sider, Content,Footer} = Layout;

export const Home = () =>{
const {getRoutes, isLead} = useAuth();
const [rotas, setRotas] = useState([]) 
const [screenSize, setScreenSize] = useState("big");


useEffect(()=>{
    window.innerWidth <= 768 ? setScreenSize("small") : setScreenSize("big");
    setRotas((e)=>[{label: "Home", key: "/dashboard",icon:<Icons.HomeOutlined />}])
    const dataRoutes  = async() =>{
        const data = await getRoutes()
        const dataRotas = data.map((data)=>{
            const Icon = Icons[data.icone]
            return {...data,icon:<Icon/>}
        })
         setRotas((e)=>[...e, ...dataRotas])
     }
     dataRoutes()

},[])

    return (
        <Layout style={{ minHeight: '100vh' }}>
                <Header style={{background: "linear-gradient(0deg, #346e9c 0%, #346e9c 47%, #346e9c 91%)",height:'8rem'}}>  
                    <Style.Header>
                    <Style.Logo src="/assets/images/img/Multleads_logo.png"/>
                        {/* <HeaderMenu/>     */}
                    </Style.Header>   
                </Header>
                {screenSize === "small"&&<NavMenu items={rotas}/>}
                <Layout hasSider style={{ minHeight: '80vh' }}>
                 { screenSize === "big"&& (<Sider  breakpoint="lg" height="100%" collapsedWidth="0" style={{boxShadow: "-4px 4px 5px #00000012",background: "linear-gradient(0deg, rgb(249 249 249) 0%, rgb(255 255 255) 47%, rgb(255 255 255) 91%)"}}>
                                                <SideMenu items={rotas}/>
                                            </Sider>)}
                    <Content>
                        <Style.Section>
                            <RoutesApp/>
                        </Style.Section>
                    </Content>
                </Layout>
            
                {/* <Footer></Footer> */}
        </Layout>
         )
}
