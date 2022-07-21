import { Video } from '@/domain/models/video-model';

export interface GetSearchCacheOnGlobalState {
  getSearchCacheOnGlobalState(search: string): Video[];
}
