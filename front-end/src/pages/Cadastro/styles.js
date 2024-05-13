import styled, {css}from "styled-components";

const showLoad = (visible)=>(
    visible==="false"&&css`
      display: none;
    `
)

export const Container = styled.div`
  background-color: #fdfdfd;
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px #f4f4f4;
    width: 45rem;
    padding: 60px 34px;
    box-shadow: 0px 0px 11px -4px #0000007d;
    border-radius: 10px;
    gap: 22px;
    background-color: #fdfdfd;

    >button{
      margin: auto;
    }
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
  text-align: center;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

export const Loading = styled.div`
 ${({theme, show})=> css`

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fdfdfd;
  width: 100%;
  height: 100vh;
  white-space: nowrap;
  ${showLoad(show)}

`}
`;

