import { Video } from '../models/video-model';

export interface Playlist {
  get: () => Video[];
}
