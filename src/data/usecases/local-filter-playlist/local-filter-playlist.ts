import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { FilterPlaylistOnGlobalState } from '@/data/protocols/cache/filter-playlist-on-global-state';

export class LocalFilterPlaylist implements FilterPlaylist {
  constructor(private readonly filterPlaylistOnGlobalState: FilterPlaylistOnGlobalState) {}

  filter(pattern: string): void {
    this.filterPlaylistOnGlobalState.filterPlaylist(pattern);
  }
}