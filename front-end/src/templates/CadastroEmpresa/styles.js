import styled, { css } from 'styled-components'

const displayLoading = (visible)=>{
    return JSON.parse(visible)?css`opacity: 1;`:css`opacity: 0;visibility: hidden;`
  }
  

export const Container = styled.div`
    ${({theme})=> css`
    margin-top: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    a{
        padding: 14px 81px;
    }

    >button{
        max-width:220px;
    }
    
`}
`

export const Loading = styled.div`
   ${({theme,visible="false"})=> css`
  position: absolute;
  background: #d5d5d569;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  display: flex;
  ${displayLoading(visible)};
  align-items: center;
  justify-content: center;
  float: left;

  `}
`


export const Actions = styled.div`
    ${({theme})=> css`
    display: flex;
    justify-content: flex-end; 
    gap: 15px;
    a{
        
        color: #03A9F4;
        &:hover{
            color:#0b7db0;
        }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      
      a{
        font-size: 0px;
        padding: 1px 47px 0px 5px;
              }
      svg{
        font-size: 21px;
        margin-top:5px ;
      }
    }
    
`}
`

export const ContainerTable = styled.div`
    ${({theme})=> css`
    overflow: auto;
    width: 80%;
    background: white;
    border-radius: 6px;
    border: solid 1px #7e7e7e1f;
    margin: 0px 15px 15px 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      
      a{
        font-size: 0px;
        padding: 1px 47px 0px 5px;
              }
      svg{
        font-size: 21px;
        margin-top:5px ;
      }
    }
`}
`
export const ContaineQrcode = styled.div`
    ${({theme})=> css`
    display: flex;
    justify-content: center;
    align-items: center;
`}
`

export const TextDescrption = styled.h3`
    ${({theme})=> css`
    color: red;
    
`}
`

export const LoadingWhats = styled.div`
    ${({theme, visible='false'})=> css`
      position: absolute;
      width: 89%;
      background: #c6c6c617;
      height: 67%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      ${displayLoading(visible)};
`}
`