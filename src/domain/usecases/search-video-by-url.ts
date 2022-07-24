import { Video } from '../models/video-model';

export type SearchVideoByUrlParams = {
  id: string;
};

export type SearchVideoByUrlResponse = {
  video?: Video;
  errorMessage?: string;
  success?: string;
};

export interface SearchVideoByUrl {
  search: (videoUrl: string) => Promise<SearchVideoByUrlResponse>;
}
