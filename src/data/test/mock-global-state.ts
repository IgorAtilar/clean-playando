import { Video } from '@/domain/models/video-model';
import { AddToPlaylistGlobalState } from '../protocols/cache/global-state';

export class AddGlobalStateMock implements AddToPlaylistGlobalState {
  value: any;

  addToPlaylist(value: Video): void {
    this.value = [...(this.value || []), value];
  }
}
