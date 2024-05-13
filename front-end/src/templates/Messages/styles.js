import styled, { css } from 'styled-components'

export const Content = styled.div`
    ${({theme})=> css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
  input{
    margin-left: 10px;
    width: 34rem!important;
  }

  
`}
`

export const Container = styled.div`
    ${({theme})=> css`
    margin: 10px;
    a{
        color: #03A9F4;
        &:hover{
            color:#0b7db0;
        }
    }

    @media (max-width: 768px) {
      li.ant-list-item{
        display: block;
      }
    }
    
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