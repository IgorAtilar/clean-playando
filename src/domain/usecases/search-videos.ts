import { Video } from '../models/video-model';

export type SearchVideosParams = {
  q: string;
  maxResults?: number;
};

export type SearchVideosResponse = {
  videos: Video[];
};

export interface SearchVideos {
  search(params: SearchVideosParams): Promise<SearchVideosResponse>;
}
