import styled ,{css}from "styled-components";

const inputInvalid = ()=>{
  return css`
  border: solid 1px red;
  border-radius: 5px;
`
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  button{
    width: 50%;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #727272;
`;

export const Error = styled.p`
 margin: 0;
 font-size: 13px;
 color: red;
`;

