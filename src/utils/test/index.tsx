import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { theme } from '@/presentation/styles';
import { AppStore, RootState, setupStore } from '@/infra/state/redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function configureTestStore(initialState = {} as RootState) {
  const store = setupStore(initialState);
  store.dispatch = jest.fn();

  return store;
}

export function AllTheProviders({
  children,
  store = configureTestStore()
}: {
  children: ReactNode;
  store?: AppStore;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {} as RootState,
    store = configureTestStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
