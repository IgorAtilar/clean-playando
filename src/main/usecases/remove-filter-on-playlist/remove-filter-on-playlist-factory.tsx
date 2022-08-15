import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { LocalRemoveFilterOnPlaylist } from '@/data/usecases/local-remove-filter-on-playlist/local-remove-filter-on-playlist';
import { useRemoveFilterFromPlaylist } from '@/infra/state/adapters';

export function makeRemoveFilterOnPlaylist(): RemoveFilterOnPlaylist {
  const { removeFilterOnPlaylist } = useRemoveFilterFromPlaylist();
  return new LocalRemoveFilterOnPlaylist(removeFilterOnPlaylist);
}
