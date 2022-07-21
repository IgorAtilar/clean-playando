import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';
import { SaveVideoOnStorage } from '@/domain/usecases/save-video-on-storage';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalSaveVideo implements SaveVideo {
  constructor(
    private readonly globalState: GlobalStateAdapter,
    private readonly persistentStorage: SaveVideoOnStorage
  ) {}

  save(video: Video): void {
    this.globalState.addToPlaylist(video);
    this.persistentStorage.save(video);
  }
}
