import { GetPlaylistFromGlobalState } from '@/data/protocols/cache/get-playlist-from-global-state';
import { Video } from '@/domain/models/video-model';
import { Playlist } from '@/domain/usecases/playlist';

export class LocalPlaylist implements Playlist {
  constructor(private readonly getGlobalState: GetPlaylistFromGlobalState) {}

  get(): Video[] {
    return this.getGlobalState.getPlaylist();
  }
}
