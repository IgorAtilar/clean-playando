import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { LocalFilterPlaylist } from '@/data/usecases/local-filter-playlist/local-filter-playlist';
import { useFilterPlaylist } from '@/infra/state/adapters';

export function makeFilterPlaylist(): FilterPlaylist {
  const { filterPlaylist } = useFilterPlaylist();

  return new LocalFilterPlaylist(filterPlaylist);
}
