import {ThemeProvider} from 'styled-components';
import {StyledApp, theme} from './styled-components/StyledApp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp />
      <h1>skere</h1>
    </ThemeProvider>
  );
}

export default App;
