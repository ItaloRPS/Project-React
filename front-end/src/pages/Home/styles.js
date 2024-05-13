import styles, { css } from 'styled-components'

export const Section = styles.div`
    ${({theme})=> css`
    margin: 24px 0px 16px 16px;
    padding: 0px 24px 24px 24px;
    overflow-y: hidden;

    @media (max-width: 768px) {
        margin: 0px;
        padding: 0px;
      }
`}
`

export const Header = styles.div`
    ${({theme})=> css`
    display: flex;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
        justify-content: center;
      }
`}
`

export const Logo = styles.img`
    ${({theme})=> css`
   width: 15rem;
   filter: drop-shadow(2px 4px 6px black);
`}
`