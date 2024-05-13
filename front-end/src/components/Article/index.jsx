import * as Style from './styles.css'
import { Card } from 'antd';
export const Article = ({children,title}) =>{
     return (
          <Card title={title} bordered={true} style={{ width: '100%',boxShadow:'rgb(184, 184, 184) 1px 3px 5px',padding:'1px',}}>
          {children}
        </Card>
     )
}
