import styled, { css } from 'styled-components'
import {Button} from '../../components/Button/styles'
export const Container = styled.div`
    ${({theme})=> css`
  ${Button}{
    margin-top: 24px;
    padding: 11px;
    width: 77px;
    font-size: 13px;
    background-color: #4096ff;

    &:hover{
      background-color: #5fa3f5;
    }
  }   
`}
`
export const ContainerLink = styled.div`
    ${({theme})=> css`
 a{
    margin: 18px 5px 5px 5px;
    display: flex;
    justify-content: center;
    width: 159px;
 }
`}
`


