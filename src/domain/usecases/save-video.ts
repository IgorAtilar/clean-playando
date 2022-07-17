import { Video } from '../models/video-model';

export interface SaveVideo {
  save: (video: Video) => void;
}
