import styles, { css } from 'styled-components'
const typeColor = (type)=>{
switch (type) {
    case "success":
        return css`
                background: #42b94642;
                svg{
                    color:#4CAF50;
                }
            `
        break;

    case "into":
        return css`
                background: #346e9c6b;
                svg{
                    color:#346e9c;
                }
            `
        break;

    case "warning":
        return css`
                background: #ffed5045;
                svg{
                    color:#dfc800;
                }
            `
        break;

        case "danger":
            return css`
                    background: #ff4c3e54;
                    svg{
                        color:#F44336;
                    }
                `
            break;

    default:
        break;
}
}




export const Card = styles.div`
    ${({theme,type})=> css`
    display: grid;
    grid-template-columns: 65% 1fr;
    align-items: center;
    border-radius: 24px 8px 8px 24px;
    box-shadow: -4px 4px 8px 0px #eaeaea;
    width: 29rem;
    height: 125px;
    background: #ffffff;
    
`}
`
export const Content = styles.div`
    ${({theme})=> css`
    text-align: center

`}
`
export const Title = styles.h1`
    ${({theme})=> css`
    font-size: 45px;
    margin: 10px 20px 20px 20px;
`}
`
export const Info = styles.p`
    ${({theme})=> css`
    margin: 12px 8px 3px 8px;
    font-weight: 500;
    font-size: 15px;
`}
`

export const Simbol = styles.div`
    ${({theme, type})=> css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #83838375;
    border-radius: 81rem 8rem 8rem 81rem;
    box-shadow: -3px 1px 5px #dddddd;
    svg{
        height: 45px;
        width: 65px;
        color:#4b4b4b;
    }
    &:hover svg{
        transform: scale(1.1);
        transition: 0.3s;

    }
    ${typeColor(type)}
`}
`