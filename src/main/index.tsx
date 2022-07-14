import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Home } from '@/presentation/pages/home';
import { theme, GlobalStyles } from '@/presentation/styles';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Home />
    <GlobalStyles />
  </ThemeProvider>,
  document.getElementById('root')
);
