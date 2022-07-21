import { FilterPlaylist } from '@/domain/usecases/filter-playlist';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalFilterPlaylist implements FilterPlaylist {
  constructor(private readonly globalState: GlobalStateAdapter) {}

  filter(pattern: string): void {
    this.globalState.filterPlaylist(pattern);
  }
}
