import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { LocalFilterPlaylist } from '@/data/usecases/local-filter-playlist/local-filter-playlist';

export function makeFilterPlaylist(): FilterPlaylist {
  const { filterPlaylistState } = useGlobalState();
  return new LocalFilterPlaylist(new GlobalStateAdapter({ filterPlaylistState }));
}
