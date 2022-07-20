import { Video } from '@/domain/models/video-model';

export interface AddToPlaylistGlobalState {
  addToPlaylist(value: Video): void;
}
