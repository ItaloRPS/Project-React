import styled, { css } from 'styled-components'
import {Button as Btn} from '../../components/Button/styles'

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

export const Button = styled.button`
    ${({theme})=> css`
    ${Btn} {
        margin-top: 27px;
        font-size: 13px;
        padding: 8px;
    }
`}
`



