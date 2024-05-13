import styled ,{css}from "styled-components";



export const NavMenu = styled.nav`
 ${({theme, error})=> css`
    background-color: #fdfdfd;
    height: 47px;
    margin-bottom: 8px;
    font-weight: 400;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;

  >a{
    color: #565656;
    border-left: solid 1px #d7d7d7;
    padding-left: 7px;
    cursor: pointer;

    &:focus{
      color: #1484de;
    }
  }
 
`}
`;



