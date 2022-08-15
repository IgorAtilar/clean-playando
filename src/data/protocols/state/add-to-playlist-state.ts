import { Video } from '@/domain/models/video-model';
import { SaveVideoResponse } from '@/domain/usecases/save-video';

export type AddToPlaylistState = (video: Video) => SaveVideoResponse;
