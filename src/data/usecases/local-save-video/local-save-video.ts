import { AddToPlaylistState } from '@/data/protocols/state';
import { Video } from '@/domain/models/video-model';
import { SaveVideo, SaveVideoResponse } from '@/domain/usecases/save-video';
import { SaveVideoOnStorage } from '@/domain/usecases/save-video-on-storage';

export class LocalSaveVideo implements SaveVideo {
  constructor(
    private readonly addToPlaylistState: AddToPlaylistState,
    private readonly saveVideoOnStorage: SaveVideoOnStorage
  ) {}

  save(video: Video): SaveVideoResponse {
    this.saveVideoOnStorage.save(video);
    return this.addToPlaylistState(video);
  }
}
