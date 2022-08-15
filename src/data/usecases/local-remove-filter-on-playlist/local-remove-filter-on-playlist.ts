import { RemoveFilterOnPlaylistState } from '@/data/protocols/state';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';

export class LocalRemoveFilterOnPlaylist implements RemoveFilterOnPlaylist {
  constructor(private readonly removeFilterOnPlaylistState: RemoveFilterOnPlaylistState) {}

  remove(): void {
    this.removeFilterOnPlaylistState();
  }
}
