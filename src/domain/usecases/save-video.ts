import { Video } from '../models/video-model';

export type SaveVideoResponse = {
  success?: string;
  errorMessage?: string;
};

export interface SaveVideo {
  save: (video: Video) => SaveVideoResponse;
}
