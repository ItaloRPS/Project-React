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

export const Textarea = styled.textarea`
  ${({theme, error})=> css`
  width: 85%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 1px 2px 7px 0px #d0d0d0;
  resize: none; */
  ${error&&inputInvalid()}
  
  &:focus {
        outline: none;
        box-shadow: 0px 0px 3px #0a68ff;
    }
`}
`

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

