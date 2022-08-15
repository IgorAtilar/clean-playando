import { Playlist } from '@/domain/usecases/playlist';
import { LocalPlaylist } from '@/data/usecases/local-playlist/local-playlist';
import { useGetPlaylist } from '@/infra/state/adapters';

export function makePlaylist(): Playlist {
  const { getPlaylist } = useGetPlaylist();

  return new LocalPlaylist(getPlaylist);
}
