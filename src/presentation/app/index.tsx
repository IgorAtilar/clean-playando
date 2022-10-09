import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from '../contexts/ToastContext';
import { GlobalStyles, theme } from '../styles';
import store from '@/infra/state/redux/store';

type AppProps = {
  makeHome: FC;
};

export function App({ makeHome }: AppProps) {
  const Home = makeHome;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Home />
        </ToastProvider>
        <GlobalStyles />
      </ThemeProvider>
    </Provider>
  );
}
