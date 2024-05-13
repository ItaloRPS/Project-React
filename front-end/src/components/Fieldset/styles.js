import style ,{css}from "styled-components";

export const Content = style.fieldset`
    ${({theme, overflow})=> css`
    overflow: ${overflow};
    min-width: auto;
    margin-top: 25px;
    border-color:#d8d8d826;
    border-radius: 8px;
    padding: 2px;
`}
`

export const Title = style.legend`
    ${({theme})=> css`
    margin: 0px 0px 7px 10px;
    // color: #1484de;
    color: #346e9c;
    font-size: 18px;
    font-weight: 600;
    padding: 0px 7px 10px 5px;
    font-style: italic;
`}
`
