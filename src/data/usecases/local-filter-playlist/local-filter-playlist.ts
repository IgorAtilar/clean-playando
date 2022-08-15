import { FilterPlaylistOnState } from '@/data/protocols/state';
import { FilterPlaylist } from '@/domain/usecases/filter-playlist';

export class LocalFilterPlaylist implements FilterPlaylist {
  constructor(private readonly filterPlaylistOnState: FilterPlaylistOnState) {}

  filter(pattern: string): void {
    this.filterPlaylistOnState(pattern);
  }
}
