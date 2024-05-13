import * as Style from './styles'

export const PhoneContainer = ({children, background, size}) =>{
     return (
          <Style.Phone size={size}>
             <Style.Img src='/assets/images/phone/60.png'/>
             <Style.Screen size={size} background={background}>
               <Style.Content>
                    {children}
               </Style.Content>
            </Style.Screen>
          </Style.Phone>
     )
}
