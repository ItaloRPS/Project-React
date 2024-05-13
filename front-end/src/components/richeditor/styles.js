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
 .ql-toolbar {
    border: 1px solid #ececec!important;
    border-radius: 6px 6px 0px 0px;
    box-shadow: inset 0px 0px 3px #b3b3b3;
  }
  .ql-container{
    border-radius: 0px 0px 6px 6px;
    box-shadow: inset 3px 2px 7px -1px #d0d0d0;
    min-height: 100px;
  }
  .ql-container :focus{
        outline: none;
        box-shadow: 0px 0px 3px #0a68ff;
        
  }
  .ql-editor{
    min-height: 100px;
  }
  .ql-picker-item[data-value="1"]::before{
    content: "Título 1"!important;
  }
  .ql-picker-item[data-value="2"]::before{
    content: "Título 2"!important;
  }
  .ql-picker-item[data-value="3"]::before{
    content: "Título 3"!important;
  }
  
  .ql-picker-label[data-value="1"]::before{
    content: "Título 1"!important;
  }
  
  .ql-picker-label[data-value="2"]::before{
    content: "Título 2"!important;
  }
  
  .ql-picker-label[data-value="3"]::before{
    content: "Título 3"!important;
  }
  
 
`;



export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #727272;
`;



export const Error = styled.p`
 margin: 0;
 font-size: 13px;
 color: red;
`;

