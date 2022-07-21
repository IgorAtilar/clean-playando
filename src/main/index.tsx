import ReactDOM from 'react-dom';
import { App } from '@/presentation/app';
import { MakeHome } from './factories/pages/home/home-factory';
import { GlobalStateProvider } from '@/infra/cache/global-state-adapter';
import { LocalPlaylistOnStorage } from '@/data/usecases/local-playlist-on-storage/local-playlist-on-storage';
import { PersistentStorageAdapter } from '@/infra/cache/persistent-storage-adapter';

const playlist = new LocalPlaylistOnStorage(new PersistentStorageAdapter()).get();

ReactDOM.render(
  <GlobalStateProvider playlistOnStorage={playlist}>
    <App makeHome={MakeHome} />
  </GlobalStateProvider>,
  document.getElementById('root')
);
