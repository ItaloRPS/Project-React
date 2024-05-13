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

export const Section = styled.div`
    ${({theme, background})=> css`
    width: 90%;
    max-height: 36%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 6px 3px 5px -4px black;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color:${background};
    @media (max-width: 768px) {
        margin-top: 4px;
        width: 84%;
    }
    
`}
`

export const ContainerColor = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
`}
`

export const ContainerUrl = styled.div`
    ${({theme})=> css`
    
`}
`
export const Share = styled.div`
    ${({theme,color})=> css`
    position: absolute;
    right: 12%;
    top: 8%;
    font-size: 16px;
    >svg{
        color: ${color};
    }
    @media (max-width: 768px) {
        font-size: 10px;
        right: 15%;
        top: 13%;
    }
`}
`

export const ContainerLogo = styled.div`
    ${({theme})=> css`
    background-color: #ffffff;
    border-radius: 50%;
    max-width: 9rem;
    min-width: 9rem;
    min-height: 9rem;
    max-height: 9rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    top: -20px;
    @media (max-width: 768px) {
        max-width: 4rem;
        min-width: 4rem;
        min-height: 4rem;
        max-height: 4rem;
    }
`}
`

export const Logo = styled.img`
    ${({theme})=> css`
    width: 100%;
    height: 100%;
    max-width: 21rem;

    @media (max-width: 768px) {
        max-height: 7rem;
        max-width: 7rem
    }
`}
`
export const Title = styled.h1`
    ${({theme,textcolor})=> css`
    color: ${textcolor};
    font-size: 15px;
    margin: 0;
    text-align: center;
    position: relative;
    top: -17px;
    @media (max-width: 768px) {
        font-size: 9px;
    }
`}
`
export const SubTitle = styled.h4`
    ${({theme,textcolor})=> css`
    color: ${textcolor};
    font-size: 13px;
    margin: 0;
    text-align: center;
    position: relative;
    top: -17px;
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: 7px;
    }
`}
`

export const ContanerImgTemplate = styled.div`
    ${({theme})=> css`
    width: 100%;
    height: 80%;
   
`}
`

export const ImgTemplate = styled.img`
    ${({theme})=> css`
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    margin-top: 1px;
    margin-top: 1px;
    border-bottom: solid 1px white;

    @media (max-width: 768px) {
        max-width: 16rem;
    }
`}
`
export const ContainerContact = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    >svg{
        font-size: 28px;
    }
    >div{
        width: 100%;
    }

    @media (max-width: 768px) {
       
    }
`}
`
export const ContainerContactNumber = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    >svg{
        font-size: 26px;
    }
    >div{
        width: 83%;
    }

    @media (max-width: 768px) {
        >svg{
        font-size: 26px;
        }
        >div{
            width: 100%;
        }
    }
`}
`

export const Label = styled.label`
    ${({theme})=> css`
    font-size: 15px;
    font-weight: 700;
    color: #727272;
    white-space: nowrap;
    
`}
`
export const AreaDescription = styled.div`
    ${({theme, textcolor})=> css`
    margin: 0px 12px;
    color: ${textcolor};
    font-size: 10px;
    font-weight: 500;
    max-height: 26rem;
    position: relative;
    top: 5px;
    height: 67px;
    width: 88%;
    height: max-content;
    p{
        margin: 0px 0px 6px 3px;
    }
    ul,ol{
        margin: 3px 3px 3px 7px;;
        padding: 4px;
    }
    h1,h2,h3,h4,h5,h6{
        margin: 2px 2px 2px 7px;;
    }

    @media (max-width: 768px) {
        margin: 2px 8px;
        font-size: 5.6px;
    }
`}
`
export const ModelView = styled.div`
    ${({theme})=> css`
   float: right;
    margin: 1rem 3.5rem 1rem;
   
   @media (max-width: 768px) {
    float: none;
     margin: 2rem 5rem 2rem;  
    }
`}
`

export const Screnn = styled.div`
    ${({theme})=> css`
   float: right;
   margin: 10rem 16rem;
`}
`
export const MidiaAndContacts = styled.div`
    ${({theme})=> css`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 0px;
        bottom: 0%;
        width: 92%;
    }


`}
`
export const Link = styled.a`
    ${({theme,background})=> css`
    text-decoration: none;
    width: 90%;
    border-radius: 24px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    box-shadow: 6px 3px 5px -4px black;
    background-color:${background};
    padding: 8px 5px 8px 5px;
    svg{
        font-size: 20px;
    }  
    @media (max-width: 768px) {
        font-size: 8px;
        padding: 3px 4px 3px 4px;
        svg{
            font-size: 11px;
        } 
    } 
`}
`
export const Iframe = styled.iframe`
    ${({theme})=> css`
    border-radius: 5px;
    @media (max-width: 768px) {
        height: 45vh;
         width: 92vw;
    }
`}
`

export const SocialMidia = styled.div`
    ${({theme,textcolor,background})=> css`
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        >a{
            color: ${textcolor};
            background-color:${background};
        }

    >svg{
        font-size: 35px;
    }
    @media (max-width: 768px) {
        gap: 2px;
        font-size: 6px;
        margin-bottom: 0px;
    }
`}
`
export const Facebook = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* color: #3F51B5; */
        /* background: white; */
        background-clip: text;
        background-clip: border-box;
        border-radius: 61px;
        /* border: solid 1px white; */
    }
      
`}
`
export const Whatsapp = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* background-image: linear-gradient(#4CAF50, #5b7241,#4CAF50); */
        background-clip: text;
        background-clip: border-box;
        border-radius: 63px; 
    }
   `}
`
export const Instagram = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* background-image: linear-gradient(#8406d6, #d60696,#FF9800); */
        background-clip: text;
        /* color: white; */
        background-clip: border-box;
        border-radius: 10px;
    }
   `}
`
export const Twitter = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* color: white; */
    }
   `}
`
export const Linkedin = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* color: #3F51B5;
        background: white; */
        background-clip: text;
        background-clip: border-box;
        border-radius: 7px;
        /* border: solid 1px #ffffff; */
    }
   `}
`
export const Url = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    &:hover{
         transform: scale(1);
    }
`}
`
export const Pix = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        /* color: #00BCD4;
        background: white; */
        background-clip: text;
        background-clip: border-box;
        border-radius: 60px
    }
   `}
`
export const Email = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        font-size: 20px;
    }
    @media (max-width: 768px) {
        margin-bottom: 1px;
        font-size: 7px;
        padding: 0px;
        svg{
            font-size: 9px;
        } 
    }

`}
`

export const Fone = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        font-size: 20px;
    }

    @media (max-width: 768px) {
        margin-bottom: 1px;
        font-size: 7px;
        padding: 0px;
        svg{
            font-size: 9px;
        } 
    }

`}
`
export const Site = styled.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    gap: 3px;
    >svg{
        font-size: 20px;
    }
       @media (max-width: 768px) {
        margin-bottom: 1px;
        padding: 0px;
        svg{
            font-size: 9px;
        } 
    }
    

`}
`

export const BtnContact = styled.button`
    ${({theme,textcolor})=> css`
    font-weight: 700;
    background: #f0f8ff00;
    border: solid;
    padding: 4px;
    border-radius: 15px;
    font-size: 9px;
    margin-bottom: 8px;
    color: ${textcolor};
    @media (max-width: 768px) {
        font-size: 4px;
        margin-bottom: 0px;
        border: solid 1.5px;
        position: relative;
        top: -15px;
    }

`}
`