import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '@/presentation/app';
import { MakeHome } from './factories/pages/home/home-factory';
import store from '@/infra/state/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App makeHome={MakeHome} />
  </Provider>,
  document.getElementById('root')
);
