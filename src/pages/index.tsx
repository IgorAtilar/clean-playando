import { MakeHome } from '@/main/factories/pages/home/home-factory';
import { App } from '@/presentation/app';

function MyApp() {
  return <App makeHome={MakeHome} />;
}

export default MyApp;
