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
  background-color: #0f0;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Montreal,Helvetica,Arial,sans-serif;
  ${'' /* font-weight: 400; */}
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
  :hover {
    text-decoration: underline;
    font-style: italic;
  }
}
button, input {
  font: inherit;
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