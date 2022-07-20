import { RemoveFromPlaylistGlobalState } from '@/data/protocols/cache/global-state';
import { RemoveVideo } from '@/domain/usecases/remove-video';

export class LocalRemoveVideo implements RemoveVideo {
  constructor(private readonly removeFromPlaylistGlobalState: RemoveFromPlaylistGlobalState) {}

  remove(id: string): void {
    this.removeFromPlaylistGlobalState.removeFromPlaylist(id);
  }
}
