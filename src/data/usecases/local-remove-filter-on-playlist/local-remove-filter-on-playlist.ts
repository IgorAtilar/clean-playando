import { RemoveFilterOnPlaylistOnGlobalState } from '@/data/protocols/cache/global-state';
import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';

export class LocalRemoveFilterOnPlaylist implements RemoveFilterOnPlaylist {
  constructor(
    private readonly removeFilterOnPlaylistOnGlobalState: RemoveFilterOnPlaylistOnGlobalState
  ) {}

  remove(): void {
    this.removeFilterOnPlaylistOnGlobalState.removeFilterOnPlaylist();
  }
}
