import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight:${({ theme }) => theme.fonts.regular};
    font-size: 0.875rem;
    line-height: 1;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  a {
    text-decoration: none;
  }


  button {
    cursor: pointer;
  }

`;
