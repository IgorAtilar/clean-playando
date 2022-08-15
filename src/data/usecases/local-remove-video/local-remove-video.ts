import { RemoveFromPlaylistState } from '@/data/protocols/state';
import { RemoveVideo } from '@/domain/usecases/remove-video';
import { RemoveVideoOnStorage } from '@/domain/usecases/remove-video-on-storage';

export class LocalRemoveVideo implements RemoveVideo {
  constructor(
    private readonly removeFromPlaylistState: RemoveFromPlaylistState,
    private readonly removeVideoOnStorage: RemoveVideoOnStorage
  ) {}

  remove(id: string): void {
    this.removeFromPlaylistState(id);
    this.removeVideoOnStorage.remove(id);
  }
}
