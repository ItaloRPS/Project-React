import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #03A9F4;
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

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
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
export const P = styled.p`
  font-size: 13px;
  color: #575757;
  margin: 0;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;