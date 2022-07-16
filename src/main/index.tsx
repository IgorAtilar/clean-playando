import ReactDOM from 'react-dom';
import { App } from '@/presentation/app';
import { MakeHome } from './factories/pages/home/home-factory';

ReactDOM.render(<App makeHome={MakeHome} />, document.getElementById('root'));
