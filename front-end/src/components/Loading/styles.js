import styled, { css } from 'styled-components'

const displayLoading = (visible)=>{
    return JSON.parse(visible)?css`opacity: 1;`:css`opacity: 0;visibility: hidden;`
}

export const Container = styled.div`
    ${({theme})=> css`
`}
`

export const Loading = styled.div`
   ${({theme,visible="false"})=> css`
  position: absolute;
  background: #d5d5d545;
  width: -webkit-fill-available;
  height: 100vh;
  z-index: 10000;
  display: flex;
  ${displayLoading(visible)};
  align-items: center;
  justify-content: center;
  float: left;

  `}
`