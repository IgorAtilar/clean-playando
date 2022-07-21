import { Video } from '../models/video-model';

export interface SaveVideoOnStorage {
  save: (video: Video) => void;
}
