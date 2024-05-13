import styled ,{css}from "styled-components";

const inputInvalid = ()=>{
  return css`
  border: solid 1px red;
  border-radius: 5px;
  &:has(input:focus) {
      outline: none;
        box-shadow: 0px 0px 3px red;
    }

`
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  ${({theme, error})=> css`
  width: 100%;
  padding: 11px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 3px 2px 7px -1px #d0d0d0;
  ${error&&inputInvalid()}
  
  &:focus {
        outline: none;
        box-shadow: 0px 0px 3px #ffffff;
    }
`}
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #727272;
`;

export const Span = styled.span`
  ${({theme, error})=> css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: 5px;
    box-shadow: inset 1px 2px 7px 0px #d0d0d0;
    border-radius: 5px;
    padding-right: 4px;
    &:has(input:focus) {
      outline: none;
      box-shadow: 0px 0px 3px #0a68ff;
    }
    ${error&&inputInvalid()}

    svg{
      font-size: 28px;
      cursor: pointer;
    }
`}
`

export const Error = styled.p`
 margin: 0;
 font-size: 13px;
 color: red;
`;

