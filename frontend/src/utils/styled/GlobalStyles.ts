import { createGlobalStyle } from 'styled-components';

import { media } from 'utils/responsive';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    text-decoration: none;
    border: 0;
    text-decoration: none;
    user-select:none;
  }

  [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
    outline: none;
  }

  button,
  textarea,
  input,
  select,
  a,
  span {
    width: initial;
    background-color: transparent;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  html {
    box-sizing: border-box; 
  }

  html{
    font-size: calc(100vw / 375 * 10);
    
    ${media.tablet}{
      font-size: calc(100vw / 1920 * 10);
    }

    ${media.custom(1920)}{
      font-size: 62.5%;
    }
  }

  html,
  body {
    top:0;
    left:0;
    position: fixed;
    overflow: hidden;
    user-select:none;
  }


  body,
  input,
  textarea,
  button {
    font-family: Open Sans,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight:400;
    font-style:normal;
  }

  a[href^="tel"]{
    color:inherit;
    text-decoration:none;
  }



`;
