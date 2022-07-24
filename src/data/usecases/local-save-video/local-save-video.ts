import { Video } from '@/domain/models/video-model';
import { SaveVideo, SaveVideoResponse } from '@/domain/usecases/save-video';
import { SaveVideoOnStorage } from '@/domain/usecases/save-video-on-storage';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalSaveVideo implements SaveVideo {
  constructor(
    private readonly globalState: GlobalStateAdapter,
    private readonly saveVideoOnStorage: SaveVideoOnStorage
  ) {}

  save(video: Video): SaveVideoResponse {
    this.saveVideoOnStorage.save(video);
    return this.globalState.addToPlaylist(video);
  }
}
