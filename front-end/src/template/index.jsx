import {Layout} from 'antd';
import {SideMenu} from '../components/SideMenu'

const { Header, Sider, Content,  Footer} = Layout;

export const Template = ({children, items}) =>{
     return (
          <Layout style={{ minHeight: '100vh' }}>
               <Header>Header</Header>
               <Layout hasSider style={{height:'100vh'}}>
                    <Sider  breakpoint="lg" collapsedWidth="0" >
                         <SideMenu {...items}/>
                    </Sider>
                    <Content style={{margin: '24px 16px', padding: 24 }}>{children}</Content>
               </Layout>
        </Layout>
     )
}
