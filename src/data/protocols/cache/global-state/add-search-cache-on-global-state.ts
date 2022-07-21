import { Video } from '@/domain/models/video-model';

export interface AddSearchCacheOnGlobalState {
  addToSearchCache(search: string, videos: Video[]): void;
}
