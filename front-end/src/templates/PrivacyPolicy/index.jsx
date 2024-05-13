import * as Style from './styles'

export const PrivacyPolicy = ({children}) =>{
     return (
          <Style.Iframe  allow="microphone; camera"
          frameborder="0" src='https://4bi-diogo.s3.us-east-2.amazonaws.com/Politica+de+Privacidade/POLÍTICA+DE+PRIVACIDADE.pdf' />
     )
}
