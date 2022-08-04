/* eslint-disable react/jsx-no-useless-fragment */
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from '../contexts/ToastContext';
import { GlobalStyles, theme } from '../styles';

type AppProps = {
  makeHome: FC;
};

export function App({ makeHome }: AppProps) {
  const Home = makeHome;

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Home />
      </ToastProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
