import { RemoveFilterOnPlaylist } from '@/domain/usecases/remove-filter-of-playlist';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalRemoveFilterOnPlaylist implements RemoveFilterOnPlaylist {
  constructor(private readonly globalState: GlobalStateAdapter) {}

  remove(): void {
    this.globalState.removeFilterOnPlaylist();
  }
}
