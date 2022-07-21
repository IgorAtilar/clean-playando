import { RemoveVideo } from '@/domain/usecases/remove-video';
import { RemoveVideoOnStorage } from '@/domain/usecases/remove-video-on-storage';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalRemoveVideo implements RemoveVideo {
  constructor(
    private readonly globalState: GlobalStateAdapter,
    private readonly persistentStorage: RemoveVideoOnStorage
  ) {}

  remove(id: string): void {
    this.globalState.removeFromPlaylist(id);
    this.persistentStorage.remove(id);
  }
}
