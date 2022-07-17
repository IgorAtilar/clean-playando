import { AddToGlobalState } from '@/data/protocols/cache/add-global-state';
import { Video } from '@/domain/models/video-model';
import { SaveVideo } from '@/domain/usecases/save-video';

export const LOCAL_SAVE_VIDEO_LIST = 'playlist';

export class LocalSaveVideo implements SaveVideo {
  constructor(private readonly addGlobalState: AddToGlobalState) {}

  save(video: Video): void {
    this.addGlobalState.add(LOCAL_SAVE_VIDEO_LIST, video);
  }
}
