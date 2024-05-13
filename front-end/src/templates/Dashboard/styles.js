import styled, { css } from 'styled-components'
export const Container = styled.div`
    ${({theme})=> css`
    margin: 0 auto;
    max-width: 180rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30rem);
    gap: 10px;
    justify-content: center;
`}
`