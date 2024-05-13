import styled, {css}from "styled-components";

const typeColor = (type)=>{
  switch (type) {
      case "success":
          return css`
                     background-color: #4CAF50;
                     &:hover{  background-color: #52ba56;}
                     &:active{ background-color: #3e8941;}
              `
          break;
  
      case "into":
          return css`
                     background-color: #03A9F4;
                     &:hover{  background-color: #05a3ea;}
                     &:active{ background-color: #069de1;}
              `
          break;
  
      case "warning":
          return css`
                    background-color: #d3c440;
                     &:hover{  background-color: #d8c942;}
                     &:active{ background-color: #c6b83d;}
              `
          break;
  
          case "danger":
              return css`
                     background-color: #d22215;
                     &:hover{  background-color: #f24141;}
                     &:active{ background-color: #b71515;}
                  `
              break;
  
      default:
          break;
  }
  }
  
  export const Content = styled.div`
  ${({theme, color})=> css`
  a{
    padding: 11px 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 16px;
    max-width: 350px;
    background-color: #484848;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 2px


    &:hover{
      background-color: #515151;
    }
    &:active{
      background-color: #2c2c2c;
    }

    ${typeColor(color)}
  }

`}
`
  
export const Button = styled.button`
  ${({theme,color})=> css`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  background-color: #484848;


  &:hover{
    background-color: #515151;
  }
  &:active{
    background-color: #2c2c2c;
  }

  ${typeColor(color)}
`}
`