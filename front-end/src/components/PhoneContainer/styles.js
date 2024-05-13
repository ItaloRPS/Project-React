import styled, { css } from 'styled-components'


const sizePhone = (size)=>{
    switch (size) {
        case 'small':
            return css`
            width:20rem ;
        `
        case 'mediun':
            return css`
            width:30rem ;
            `
        default:
            return css`
            width:40rem ;
        `
    }
}

const sizeScreen = (size)=>{
    switch (size) {
        case 'small':
            return css`
            height: 36.5rem;
            margin: 10px;  
            margin: 5px;
             @media (max-width: 768px) {
                height: 36rem;
            } 
        `
        case 'mediun':
            return css`
             height: 55vh;
             margin: 11px;  
             @media (max-width: 768px) {
                height: 55rem;
            }  
            `
        default:
            return css`
             height: 72rem;
             margin: 25px 31px 15px 31px;
             @media (max-width: 768px) {
                height: 100vw;
            }  
        `
    }
}

export const Phone = styled.div`
    ${({theme, size})=> css`
    padding: 5px;
    border-radius: 36px;
    ${sizePhone(size)}
`}
`

export const Screen = styled.div`
    ${({theme, background, size})=> css`
   background-color: ${background};
    position: sticky;
    top: -3px;
    border-radius: 36px;
    z-index: 1;
    max-height: 100%;
   ${sizeScreen(size)}

`}
`
export const Content = styled.div`
    ${({theme})=> css`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    overflow-wrap: anywhere;
`}
`
export const Img = styled.img`
    ${({theme})=> css`
    max-width: 100%;
    float: right;
    z-index: 2;
    position: relative;

`}
`