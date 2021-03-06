import { Video } from '@/domain/models/video-model';
import { SaveVideoResponse } from '@/domain/usecases/save-video';
import {
  AddToPlaylistGlobalState,
  FilterPlaylistOnGlobalState,
  GetPlaylistFromGlobalState,
  RemoveFilterOnPlaylistOnGlobalState,
  RemoveFromPlaylistGlobalState,
  AddSearchCacheOnGlobalState,
  GetSearchCacheOnGlobalState
} from '../protocols/cache/global-state';

export class GlobalStateMock
  implements
    AddToPlaylistGlobalState,
    FilterPlaylistOnGlobalState,
    GetPlaylistFromGlobalState,
    RemoveFilterOnPlaylistOnGlobalState,
    RemoveFromPlaylistGlobalState,
    AddSearchCacheOnGlobalState,
    GetSearchCacheOnGlobalState
{
  value: any;

  getSearchCacheOnGlobalState(search: string): Video[] {
    return [];
  }

  addToSearchCache(search: string, videos: Video[]): void {}

  removeFromPlaylist(id: string): void {}

  removeFilterOnPlaylist(): void {}

  getPlaylist(): Video[] {
    return [];
  }

  filterPlaylist(pattern: string): void {}

  addToPlaylist(value: Video): SaveVideoResponse {
    this.value = [...(this.value || []), value];

    return {};
  }
}
