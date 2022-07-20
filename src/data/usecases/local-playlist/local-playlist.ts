import { Video } from '@/domain/models/video-model';
import { Playlist } from '@/domain/usecases/playlist';
import { GetPlaylistFromGlobalState } from '@/data/protocols/cache/global-state';

export class LocalPlaylist implements Playlist {
  constructor(private readonly getGlobalState: GetPlaylistFromGlobalState) {}

  get(): Video[] {
    return this.getGlobalState.getPlaylist();
  }
}
