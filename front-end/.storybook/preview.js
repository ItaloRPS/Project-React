import { ThemeProvider } from "styled-components"
import { theme } from "../src/styles/theme"
import {GlobalStyle} from '../src/styles/styles-global'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;


export const decorators = [
  (Story)=>(
  <ThemeProvider theme={theme}>
    <Story />
    <GlobalStyle/>
  </ThemeProvider>
  )
]