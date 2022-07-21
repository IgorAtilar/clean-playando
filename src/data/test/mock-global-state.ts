import { Video } from '@/domain/models/video-model';
import {
  AddToPlaylistGlobalState,
  FilterPlaylistOnGlobalState,
  GetPlaylistFromGlobalState,
  RemoveFilterOnPlaylistOnGlobalState,
  RemoveFromPlaylistGlobalState
} from '../protocols/cache/global-state';

export class GlobalStateMock
  implements
    FilterPlaylistOnGlobalState,
    GetPlaylistFromGlobalState,
    RemoveFilterOnPlaylistOnGlobalState,
    RemoveFromPlaylistGlobalState
{
  value: any;

  removeFromPlaylist(id: string): void {}

  removeFilterOnPlaylist(): void {}

  getPlaylist(): Video[] {
    return [];
  }

  filterPlaylist(pattern: string): void {}

  addToPlaylist(value: Video): void {
    this.value = [...(this.value || []), value];
  }
}
