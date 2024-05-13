import * as Style from './style'
export const Cardboard = ({children, info, title, type="default"}) =>{
   
     return (
         <Style.Card >
          <Style.Content>
               <Style.Info>{title}</Style.Info>
               <Style.Title>{info}</Style.Title>
          </Style.Content>
         <Style.Simbol type={type}>{children}</Style.Simbol >
        </Style.Card>
     )
}
