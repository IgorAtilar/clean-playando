import { Video } from '@/domain/models/video-model';
import { PersistentStorageMock } from '@/data/test/mock-persistent-storage';
import { PLAYLIST_PERSISTENT_STORAGE_KEY } from '@/services/persistent-storage';
import { mockVideo } from '@/presentation/test/mock-video';
import { LocalSaveVideoOnStorage } from './local-save-video-on-storage';

describe('Data: LocalSaveVideoOnStorage', () => {
  it('should save the video on storage when save method is called', () => {
    const persistentStorage = new PersistentStorageMock<Video>();
    const localSaveVideoOnStorage = new LocalSaveVideoOnStorage(persistentStorage);
    const video = mockVideo();
    localSaveVideoOnStorage.save(video);
    const currentStorage = persistentStorage.get(PLAYLIST_PERSISTENT_STORAGE_KEY);
    expect(currentStorage).toStrictEqual([video]);
  });
});
