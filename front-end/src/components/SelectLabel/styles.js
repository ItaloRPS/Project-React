import styled ,{css}from "styled-components";

const selectInvalid = ()=>{
  return css`
    border: solid 1px red!important;
`
}

export const Content = styled.div`
 ${({theme, error})=> css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2px;
  
  .ant-select-selector{
    padding: 31px;
    box-shadow: inset 1px 2px 7px 0px #d0d0d0;
    width: 100%;
    height: 38px!important;
    border: solid 0px black!important;
    ${error&&selectInvalid()}
  }
  .ant-select-selector .ant-select-selection-item{
    display: flex;
    align-items: center;
  }
`}
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

