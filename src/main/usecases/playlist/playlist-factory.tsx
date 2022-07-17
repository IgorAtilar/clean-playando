import { LocalPlaylist } from '@/data/usecases/local-playlist/local-playlist';
import { Playlist } from '@/domain/usecases/playlist';
import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';

export function makePlaylist(): Playlist {
  const { globalState } = useGlobalState();
  return new LocalPlaylist(new GlobalStateAdapter({ globalState }));
}
