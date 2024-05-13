import styled, { css } from 'styled-components'
export const Container = styled.div`
    ${({theme})=> css`
    margin-top: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;

    a{
        padding: 14px 81px;
    }

    >button{
        max-width:220px;
    }

`}
`

export const TitleContainer = styled.div`
    ${({theme, background})=> css`
    width: 90%;
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    margin: 52px 11px 11px 11px;
    box-shadow: 6px 3px 5px -4px black;
    background-color:${background};
    @media (max-width: 768px) {
        margin: 40px 11px 5px 11px;
        width: 84%;
        height: 20%;
    }
`}
`

export const Screnn = styled.div`
    ${({theme})=> css`
   float: right;
   margin: 10rem 16rem;
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