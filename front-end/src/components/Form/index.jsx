import * as Style from './styles'
import { Col as ColAnt, Row as RowAnt} from 'antd';

export const Form = ({children, onSubmit}) =>{
     return (
          <Style.Container>
            <Style.Form onSubmit={onSubmit}>
                 {children}
            </Style.Form>
          </Style.Container> 
     )
}

export const Row = ({children, styles}) =>{
    return (
         <Style.Row  style={styles}>
            {children}
         </Style.Row>
    )
}


export const Col = ({children, column, visible="true", styles }) =>{
    return (
         <Style.Col column={column} visible={visible} style={styles}>
                {children}
         </Style.Col>
    )
}
