import ReactDOM from 'react-dom';
import { App } from '@/presentation/app';
import { MakeHome } from './factories/pages/home/home-factory';
import { GlobalStateProvider } from '@/infra/cache/global-state-adapter';

ReactDOM.render(
  <GlobalStateProvider>
    <App makeHome={MakeHome} />
  </GlobalStateProvider>,
  document.getElementById('root')
);
