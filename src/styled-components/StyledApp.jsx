import { createGlobalStyle } from 'styled-components';

const StyledApp = createGlobalStyle`
@font-face {
  font-family: Neue Montreal;
  src: local('Montreal'), url(./fonts/montreal/NeueMontreal-Light.otf) format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: Neue Montreal;
  src: local('Montreal'), url(./fonts/montreal/NeueMontreal-LightItalic.otf) format('truetype');
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: Neue Montreal;
  src: local('Montreal'), url(./fonts/montreal/NeueMontreal-Bold.otf) format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: Neue Montreal;
  src: local('Montreal'), url(./fonts/montreal/NeueMontreal-BoldItalic.otf) format('truetype');
  font-weight: 700;
  font-style: italic;
}
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  height: 100%;
  font-size: 62.5%;
}
::-webkit-scrollbar {
  background-color: #000;
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #fff;
}
::selection {
  background-color: ${props => props.theme.colors.red};
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Montreal,Helvetica,Arial,sans-serif;
  font-size: 1.6rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  color: white;
}
*,
:after,
:before {
  box-sizing: inherit;
}
h1, h2, h3, h4, h5, h6, p, a {
  margin: 0;
  padding: 0;
  font-weight: inherit;
  font-style: inherit;
}
span {
  display: block;
}
hr {
  border: 0px;
  margin: 0px;
  padding-top: 1rem;
  :before {
    content: "";
    display: block;
    border-top: 2px solid ${props => props.theme.colors.pink};
  }
}
a {
  color: ${props => props.theme.colors.green};
  text-decoration: none;
  word-break: break-all;
}
button, input {
  font: inherit;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
.noClick {
    z-index: -1;
  }
`;

const theme = {
  colors: {
    pink: '#f2d5d5',
    red: '#bd2929',
    green: '#aee19f'
  }
};

export {StyledApp, theme};