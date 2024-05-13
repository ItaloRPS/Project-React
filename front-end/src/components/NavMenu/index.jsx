import * as Style from './styles'
import {Link} from "react-router-dom";

export const NavMenu = ({items}) =>{
     return (
          <Style.NavMenu>
                {items.map((data)=>{
                    return(
                        <Link to={`.${data.key}`} key={data.key}>{data.label}</Link>
                    )
                })}
                <Link to={`./politicypolicy`} key="sair">Política de privacidade</Link>
                <Link style={{color:"red"}} to={`/`} key="sair">Sair</Link>
          </Style.NavMenu>
     )
}
