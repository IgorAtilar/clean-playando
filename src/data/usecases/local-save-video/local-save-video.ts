import { AddToPlaylistGlobalState } from '@/data/protocols/cache/add-to-playlist-global-state';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';

export class LocalSaveVideo implements SaveVideo {
  constructor(private readonly addGlobalState: AddToPlaylistGlobalState) {}

  save(video: Video): void {
    this.addGlobalState.addToPlaylist(video);
  }
}
