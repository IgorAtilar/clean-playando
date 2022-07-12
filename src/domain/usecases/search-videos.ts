import { VideoListModel } from '@/domain/models/video-list-model';

export type SearchVideosParams = {
  query: string;
  maxResults?: number;
};

export interface SearchVideo {
  search(params: SearchVideosParams): Promise<VideoListModel>;
}
