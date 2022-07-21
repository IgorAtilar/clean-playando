import { Video } from '@/domain/models/video-model';
import { SaveVideoOnStorage } from '@/domain/usecases/save-video-on-storage';

export class PersistentStorageMock implements SaveVideoOnStorage {
  value: any;

  save(video: Video) {
    this.value = [...(this.value || []), video];
  }
}
