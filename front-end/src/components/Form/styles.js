import style, { css } from 'styled-components'


const columnGrid = (column)=>{
    switch (column) {
        case "col-md-1":
            return css`
            grid-column: span 1;
            @media (max-width: 768px) {
                grid-column: span 2;
            }
        `
            break;
      
        case "col-md-2":
            return css`
            grid-column: span 2;
            @media (max-width: 768px) {
                grid-column: span 3;
            }
        `
            break;
      
        case "col-md-3":
            return css`
            grid-column: span 3;
        `
            break;
      
        case "col-md-4":
            return css`
            grid-column: span 4;
        `
            break;
      
        case "col-md-5":
            return css`
            grid-column: span 5;
        `
            break;
      
        case "col-md-6":
            return css`
            grid-column: span 6;
        `
            break;
      
        case "col-md-7":
            return css`
            grid-column: span 7;
        `
            break;
      
        case "col-md-8":
            return css`
            grid-column: span 8;
        `
            break;
      
        case "col-md-9":
            return css`
            grid-column: span 9;
        `
            break;
      
        case "col-md-10":
            return css`
            grid-column: span 10;
        `
            break;
      
        case "col-md-11":
            return css`
            grid-column: span 11;
        `
            break;
      
        case "col-md-12":
            return css`
            grid-column: span 12;
        `
            break;
      
    }

}


export const Container = style.div`
    ${({theme})=> css`
`}
`

export const Form = style.form`
    ${({theme})=> css`
    .row {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 20px;
    }
    
    .col-md-1{
        grid-column: span 1;
     }
    .col-md-2{
        grid-column: span 2;
    }
    .col-md-3{
        grid-column: span 3;
    }
    .col-md-4{
        grid-column: span 4;
    }
    .col-md-5{
        grid-column: span 5;
    }
    .col-md-6{
        grid-column: span 6;
    }
    .col-md-7{
        grid-column: span 7;
    }
    .col-md-8{
        grid-column: span 8;
    }
    .col-md-9{
        grid-column: span 9;
    }
    .col-md-10{
        grid-column: span 10;
    }
    .col-md-11{
        grid-column: span 11;
    }
    .col-md-12{
        grid-column: span 12;
    }

`}
`

export const Row = style.div`
    ${({theme})=> css`
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 20px;
        margin: 25px; 

        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, 50px);
          }
`}
`
export const Col = style.div`
    ${({theme, column,visible})=> css`
    ${columnGrid(column)};
    ${visible==="false"?'display:none':''}
    
`}
`