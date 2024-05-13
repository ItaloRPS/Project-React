import styled,{css} from "styled-components";

const displayLoading = (visible)=>{
  return JSON.parse(visible)?css`opacity: 1;`:css`opacity: 0;visibility: hidden;`
}


export const Container = styled.div`
    display: grid;
    height: 100vh;
    align-items: center;
    grid-template-columns: 50% 50%;
    justify-items: center;
    background: linear-gradient(143deg, rgb(255 255 255) 0%, rgb(239 239 239) 47%, rgb(244 244 244) 91%);

    @media (max-width: 768px) {
      grid-template-columns: 100%;
      background: linear-gradient(0deg, rgba(70,173,252,1) 0%, rgba(119,186,255,1) 47%, rgba(152,199,255,1) 91%);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px #f4f4f4;
    width: 28rem;
    padding: 58px 30px;
    box-shadow: 0px 0px 11px -4px #0000007d;
    border-radius: 10px;
    gap: 22px;
    background-color: #fdfdfd;
`;

export const BackImg = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #676767;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;

  @media (max-width: 768px) {
      display: none;
    }

`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const Img = styled.img`
  width: 100%;
  bottom: 68px;
  position: relative;
  height: 115%;
`;

export const ImgLogo = styled.img`
    width: 46%;
    filter: drop-shadow(1px 1px 6px #0000004a);
    margin: auto;
    position: relative;
    top: -18px;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;
  text-align: center;
  a {
    color: #67676796;
    &:hover{
      color: #676767;
    }
  }
`;
export const Loading = styled.div`
   ${({theme,visible="false"})=> css`
  position: absolute;
  background: #d5d5d569;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  display: flex;
  ${displayLoading(visible)};
  align-items: center;
  justify-content: center;
  float: left;

  `}
`