import { GetGlobalState } from '@/data/protocols/cache/get-global-state';
import { Video } from '@/domain/models/video-model';
import { Playlist } from '@/domain/usecases/playlist';
import { LOCAL_SAVE_VIDEO_LIST } from '../local-save-video/local-save-video';

export class LocalPlaylist implements Playlist {
  constructor(private readonly getGlobalState: GetGlobalState) {}

  get(): Video[] {
    return this.getGlobalState.get(LOCAL_SAVE_VIDEO_LIST);
  }
}
