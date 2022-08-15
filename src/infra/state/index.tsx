import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

export function StateProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
