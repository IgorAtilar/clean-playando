import ReactDOM from 'react-dom';
import { App } from '@/presentation/app';
import { MakeHome } from './factories/pages/home/home-factory';
import { StateProvider } from '@/infra/state';

ReactDOM.render(
  <StateProvider>
    <App makeHome={MakeHome} />
  </StateProvider>,
  document.getElementById('root')
);
