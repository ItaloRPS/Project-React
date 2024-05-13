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
export const Content = styled.div`
    ${({theme})=> css`
    height: 100vh;
    padding: 15px;
    margin-bottom: 15px;
    >.ant-modal-footer{
        background-color: red:  !important;;
    }
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

export const Iframe = styled.iframe`
    ${({theme})=> css`
    width: 99%;
    height: 100vh;
    @media (max-width: 768px) {
        height: 33vh;
    }
`}
`

export const Logo = styled.img`
    ${({theme})=> css`
    max-height: 14rem;
    max-width: 29rem;
    border-radius: 66%;
`}
`
export const ImgBanner = styled.img`
    ${({theme})=> css`
    height: 63vh;
    max-width: 100%;
    border-radius: 5px;
`}
`

export const Title = styled.h1`
    ${({theme})=> css`
    max-height: 14rem;
    max-width: 29rem;
    font-size: 51px;
    text-transform: uppercase;
    font-weight: 600;
    text-shadow: 1px 1px 2px black;
`}
`

export const Header = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
`}
`


export const linkCadastro = styled.a`
    ${({theme})=> css`
    margin: 12px;
    color: #00a2ec;
    text-decoration: underline;
    cursor: pointer;
`}
`


export const linkPoliticy = styled.a`
    ${({theme})=> css`
    color: #00a2ec;
    margin-left: 4px;

    &:hover{
        color: #0f87bd;
    }
`}
`

