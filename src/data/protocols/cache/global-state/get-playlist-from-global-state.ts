import { Video } from '@/domain/models/video-model';

export interface GetPlaylistFromGlobalState {
  getPlaylist(): Video[];
}
