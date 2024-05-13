import styled ,{css}from "styled-components";

const displayFile = (type)=>{
  if(type === "picture-card"){
   return css`
      .ant-upload-wrapper,.ant-upload-list{
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      border: 0px;
    }
      .ant-upload-select{
        height: 23px!important;
        border: 0px!important;
    }
      `
  }
}

export const Container = styled.div`
  ${({theme, typedisplay})=>css`
    ${displayFile(typedisplay)}
  `}
 `;

