import { GetPlaylistFromState } from '@/data/protocols/state';
import { Video } from '@/domain/models/video-model';
import { Playlist } from '@/domain/usecases/playlist';

export class LocalPlaylist implements Playlist {
  constructor(private readonly getPlaylistFromState: GetPlaylistFromState) {}

  get(): Video[] {
    return this.getPlaylistFromState();
  }
}
