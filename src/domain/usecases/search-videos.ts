import { Video } from '../models/video-model';

export type SearchVideosParams = {
  query: string;
  maxResults?: number;
};

export type SearchVideosResponse = {
  videos?: Video[];
  errorMessage?: string;
};

export interface SearchVideos {
  search(params: SearchVideosParams): Promise<SearchVideosResponse>;
}
