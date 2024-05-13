import styled, { css } from 'styled-components'


export const Container = styled.div`
    ${({theme})=> css`
    height: 100vh;
    padding: 15px;
    background-color: #03a9f4;
    display: flex;
    justify-content: center;
`}
`
export const Content = styled.div`
    ${({theme})=> css`
    padding: 15px;
    margin: auto;
    background-color: #fdfdfd;
    border-radius: 10px;
    box-shadow: 0px 0px 11px -4px #0000007d;
`}
`
export const Actions = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 15px;
`}
`

export const Title = styled.h3`
    ${({theme})=> css`
    margin: auto;
    padding-left: 16px;
    color: #797979;
    text-transform: capitalize;
`}
`

