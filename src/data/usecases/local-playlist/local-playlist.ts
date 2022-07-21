import { Video } from '@/domain/models/video-model';
import { Playlist } from '@/domain/usecases/playlist';
import { GlobalStateAdapter } from '@/infra/cache/global-state-adapter';

export class LocalPlaylist implements Playlist {
  constructor(private readonly globalState: GlobalStateAdapter) {}

  get(): Video[] {
    return this.globalState.getPlaylist();
  }
}
