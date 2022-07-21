import { Video } from '../models/video-model';

export interface PlaylistStorage {
  get: () => Video[];
}
