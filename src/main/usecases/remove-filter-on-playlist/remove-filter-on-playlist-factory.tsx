import { GlobalStateAdapter, useGlobalState } from '@/infra/cache/global-state-adapter';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { LocalRemoveFilterOnPlaylist } from '@/data/usecases/local-remove-filter-on-playlist/local-remove-filter-on-playlist';

export function makeRemoveFilterOnPlaylist(): RemoveFilterOnPlaylist {
  const { removeFilterOnPlaylistState } = useGlobalState();
  return new LocalRemoveFilterOnPlaylist(new GlobalStateAdapter({ removeFilterOnPlaylistState }));
}
