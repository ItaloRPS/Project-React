import styled, { css } from "styled-components";
export const Container = styled.div`
  ${({ theme, background }) => css`
    /* overflow-y: auto; */
    height: 112.6%;
    position: absolute;
    width: 100vw;
    padding-top: 20px;
    background-color: #b42b2b;
    align-items: center;
    text-align: -webkit-center;
    overflow-x: hidden;
    background-color: ${background};
  `}
`;

export const TitleContainer = styled.div`
  ${({ theme, background }) => css`
    width: 90%;
    min-height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    margin: 30px 11px 11px 11px;
    box-shadow: 5px 4px 5px -4px black;
    background-color: ${background};
  `}
`;
export const Section = styled.div`
  ${({ theme, background, display = "flex" }) => css`
    width: 90%;
    /* max-height: 36%; */
    min-height: 36%;
    display: ${display};
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 5px 4px 5px -4px black;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: ${background};
  `}
`;
export const ContainerConfig = styled.div`
  ${({ theme, color }) => css`
    position: absolute;
    right: 5%;
    font-size: 23px;
    top: 11px;
    cursor: pointer;
    color: ${color};
    display: flex;
    gap: 5px;
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    height: 100vh;
  `}
`;
export const ContainerColor = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const ContainerUrl = styled.div`
  ${({ theme }) => css``}
`;
export const Share = styled.div`
  ${({ theme, color }) => css`
    position: absolute;
    right: 12%;
    top: 8%;
    font-size: 16px;
    > svg {
      color: ${color};
    }
  `}
`;

export const ContainerLogo = styled.div`
  ${({ theme }) => css`
    background-color: #ffffff;
    border-radius: 50%;
    max-width: 11rem;
    min-width: 11rem;
    min-height: 11rem;
    max-height: 11rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    top: -20px;
    @media (max-width: 768px) {
      top: -30px;
    }
  `}
`;

export const Logo = styled.img`
  ${({ theme }) => css`
    height: 11rem;
    width: 11rem;
    max-height: 11rem;
    max-width: 11rem;
    min-height: 11rem;
    min-width: 11rem;

    @media (max-width: 768px) {
      max-height: 13rem;
      max-width: 13rem;
    }
  `}
`;
export const Title = styled.h1`
  ${({ theme, textcolor }) => css`
    color: ${textcolor};
    font-size: 15px;
    margin: 0;
    text-align: center;
    position: relative;
    top: -17px;
  `}
`;

export const SubTitle = styled.h4`
  ${({ theme, textcolor }) => css`
    color: ${textcolor};
    font-size: 13px;
    margin: 0;
    text-align: center;
    position: relative;
    top: -17px;
    font-weight: 500;
  `}
`;

export const ContanerImgTemplate = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
  `}
`;

export const ContanerImgBanner = styled.div`
  ${({ theme, background }) => css`
    width: 90%;
    border-radius: 7px;
    margin: 15px;
    box-shadow: 5px 4px 3px -7px black;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    background-color: ${background};
  `}
`;

export const ImgTemplate = styled.img`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    @media (max-width: 768px) {
    }
  `}
`;
export const ImgBanner = styled.img`
  ${({ theme }) => css`
    border-radius: 24px;
    width: 100%;
    height: 100%;
    // @media (max-width: 768px) {
    //     max-height: 7rem;
    //     max-width: 19rem;
    // }
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: 15px;
    font-weight: 700;
    color: #727272;
  `}
`;
export const Paragraph = styled.p`
  ${({ theme, textcolor }) => css`
    color: ${textcolor};
    font-size: 15px;
    margin: 14px;
    min-height: 19%;
    max-height: 19%;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `}
`;
export const AreaDescription = styled.div`
  ${({ theme, textcolor }) => css`
    margin: 0px 12px;
    color: ${textcolor};
    font-size: 14px;
    font-weight: 500;
    max-height: 26rem;
    position: relative;
    top: 5px;
    height: 67px;
    width: 88%;
    height: max-content;
    p {
      margin: 0px 0px 9px 6px;
    }
    ul,
    ol {
      margin: 6px 6px 6px 10px;
      padding: 7px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 5px 5px 5px 10px;
    }

    @media (max-width: 768px) {
      margin: 2px 8px;
      font-size: 13.5px;
    }
  `}
`;

export const ModelView = styled.div`
  ${({ theme }) => css`
    float: right;
    margin: 2rem 10rem 2rem;
    @media (max-width: 768px) {
      margin: 2rem 5rem 2rem;
    }
  `}
`;

export const Screnn = styled.div`
  ${({ theme }) => css`
    float: right;
    margin: 10rem 16rem;
  `}
`;

export const Iframe = styled.iframe`
  ${({ theme }) => css`
    height: 90%;
    width: 99%;
    border-radius: 5px;
    @media (max-width: 768px) {
      height: 90%;
      width: 99%;
    }
  `}
`;
export const MidiaAndContacts = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 0px;
      bottom: 0%;
    }
  `}
`;
export const SocialMidia = styled.div`
  ${({ theme, textcolor, background }) => css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    > a {
      color: ${textcolor};
      background-color: ${background};
    }

    > svg {
      font-size: 35px;
      color: ${textcolor};
    }
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 0px;
    }
  `}
`;
export const Contacts = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    > svg {
      font-size: 35px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 0px;
    }
  `}
`;

export const Link = styled.a`
  ${({ theme, background }) => css`
    text-decoration: none;
    width: 90%;
    border-radius: 24px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    box-shadow: 5px 4px 5px -4px black;
    background-color: ${background};
    padding: 5px;
    svg {
      font-size: 27px;
    }
    &:hover {
      cursor: pointer;
      transform: scale(1.02);
    }
  `}
`;

export const Facebook = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* color: white; */
      /* color: #3F51B5; */
      /* background: white; */
      background-clip: text;
      background-clip: border-box;
      border-radius: 61px;
      /* border: solid 1px white; */
    }
  `}
`;
export const Whatsapp = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* color: white; */
      /* background-image: linear-gradient(#4CAF50, #5b7241,#4CAF50); */
      background-clip: text;
      background-clip: border-box;
      border-radius: 63px;
    }
  `}
`;
export const Instagram = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* background-image: linear-gradient(#8406d6, #d60696,#FF9800); */
      background-clip: text;
      /* color: white; */
      background-clip: border-box;
      border-radius: 10px;
    }
  `}
`;
export const Twitter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* color: white; */
    }
  `}
`;
export const Linkedin = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* color: #3F51B5;
        background: white; */
      background-clip: text;
      background-clip: border-box;
      border-radius: 7px;
      /* border: solid 1px #ffffff; */
    }
  `}
`;
export const Url = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    &:hover {
      transform: scale(1);
    }
  `}
`;
export const Pix = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      /* color: #00BCD4;
        background: white; */
      background-clip: text;
      background-clip: border-box;
      border-radius: 60px;
    }
  `}
`;
export const Email = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      font-size: 28px;
    }
  `}
`;

export const Fone = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 15px;
      margin-bottom: 0px;
    }
  `}
`;
export const Site = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 3px;
    > svg {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 0px;
    }
  `}
`;

export const BtnContact = styled.button`
  ${({ theme, textcolor }) => css`
    font-weight: 700;
    background: #f0f8ff00;
    border: solid;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    color: ${textcolor};
    @media (max-width: 768px) {
      font-size: 12px;
      margin-bottom: 2px;
    }
  `}
`;
