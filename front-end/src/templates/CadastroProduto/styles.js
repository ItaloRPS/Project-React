import styled, { css } from 'styled-components'
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


