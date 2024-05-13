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
`;

export const Input = styled.input`
  ${({theme, error})=> css`
  gap: 5px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 1px 2px 7px 0px #d0d0d0;
  margin-right: 5px;
  width: 16px;
  height: 16px;
  ${error&&inputInvalid()}
  
  &:focus {
        outline: none;
        box-shadow: 0px 0px 3px #0a68ff;
    }
`}
`

export const Label = styled.label`
  font-size: 11px;
  color: #727272;
  display: flex;
  align-items: center;  
  
`;

export const Error = styled.p`
 margin: 0;
 font-size: 13px;
 color: red;
`;



